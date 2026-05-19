import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "./constants.js";

const EXPORT_SCALE = 2;
const JPG_QUALITY = 1;
const VERTICAL_WRITING_MODE_PATTERN = /^(?:vertical|sideways)-/i;
const CJK_TEXT_PATTERN = /[\u3040-\u30ff\u3400-\u9fff\uf900-\ufaff]/;
const MODERN_COLOR_FUNCTION_PATTERN = /\b(?:color|color-mix|lab|lch|oklab|oklch)\(/i;
const CSS_COLOR_FUNCTION_PATTERN = /color\(\s*([a-z0-9-]+)\s+([^()]*)\)/gi;
const EXPORT_COLOR_PROPERTIES = [
  "color",
  "background-color",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
  "outline-color",
  "text-decoration-color",
  "column-rule-color",
  "caret-color",
  "fill",
  "stroke",
  "stop-color",
  "flood-color",
  "lighting-color",
  "text-shadow",
  "box-shadow",
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const parseRgbChannel = (value) => {
  if (value === "none") return 0;

  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) return null;

  if (value.endsWith("%")) {
    return clamp(Math.round((parsed / 100) * 255), 0, 255);
  }

  return clamp(Math.round(parsed <= 1 ? parsed * 255 : parsed), 0, 255);
};

const parseAlphaChannel = (value) => {
  if (!value || value === "none") return 1;

  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) return null;

  return clamp(value.endsWith("%") ? parsed / 100 : parsed, 0, 1);
};

const formatAlpha = (value) => Number(value.toFixed(4)).toString();

const normalizeCssColorFunction = (colorSpace, body, originalValue) => {
  if (!colorSpace.toLowerCase().includes("srgb")) {
    return originalValue;
  }

  const slashIndex = body.indexOf("/");
  const channelSource = slashIndex === -1 ? body : body.slice(0, slashIndex);
  const alphaSource = slashIndex === -1 ? "" : body.slice(slashIndex + 1);
  const channels = channelSource.trim().split(/\s+/).filter(Boolean).slice(0, 3).map(parseRgbChannel);
  const alpha = parseAlphaChannel(alphaSource.trim());

  if (channels.length !== 3 || channels.some((channel) => channel === null) || alpha === null) {
    return originalValue;
  }

  return `rgba(${channels[0]}, ${channels[1]}, ${channels[2]}, ${formatAlpha(alpha)})`;
};

const normalizeModernCssColors = (value) => {
  if (!value || !MODERN_COLOR_FUNCTION_PATTERN.test(value)) return value;

  return value.replace(CSS_COLOR_FUNCTION_PATTERN, (match, colorSpace, body) =>
    normalizeCssColorFunction(colorSpace, body, match),
  );
};

const setImportantStyle = (element, property, value) => {
  element.style.setProperty(property, value, "important");
};

const normalizeExportText = (value) => value.replace(/\s+/g, " ").trim();

const isVerticalWritingMode = (value) => VERTICAL_WRITING_MODE_PATTERN.test(value);

const createVerticalGlyph = (document, character) => {
  const glyph = document.createElement("b");

  glyph.textContent = character === " " ? "\u00a0" : character;
  glyph.setAttribute("aria-hidden", "true");
  setImportantStyle(glyph, "display", "block");
  setImportantStyle(glyph, "padding", "0");
  setImportantStyle(glyph, "font", "inherit");
  setImportantStyle(glyph, "font-style", "normal");
  setImportantStyle(glyph, "font-weight", "inherit");
  setImportantStyle(glyph, "line-height", "inherit");
  setImportantStyle(glyph, "letter-spacing", "0");
  setImportantStyle(glyph, "background", "transparent");
  setImportantStyle(glyph, "writing-mode", "horizontal-tb");
  setImportantStyle(glyph, "text-orientation", "mixed");

  if (character === " ") {
    setImportantStyle(glyph, "height", "0.45em");
    glyph.textContent = "";
  }

  return glyph;
};

const stackVerticalTextForExport = (element, text) => {
  const document = element.ownerDocument;

  element.replaceChildren();
  element.setAttribute("aria-label", text);
  setImportantStyle(element, "display", "inline-flex");
  setImportantStyle(element, "flex-direction", "column");
  setImportantStyle(element, "align-items", "center");
  setImportantStyle(element, "justify-content", "center");
  setImportantStyle(element, "white-space", "nowrap");
  setImportantStyle(element, "letter-spacing", "0");
  setImportantStyle(element, "writing-mode", "horizontal-tb");
  setImportantStyle(element, "text-orientation", "mixed");

  Array.from(text).forEach((character) => {
    element.appendChild(createVerticalGlyph(document, character));
  });
};

const rotateVerticalTextForExport = (element, writingMode) => {
  const rotation = writingMode.includes("vertical-lr") || writingMode.includes("sideways-lr") ? "-90deg" : "90deg";

  setImportantStyle(element, "display", "inline-block");
  setImportantStyle(element, "white-space", "nowrap");
  setImportantStyle(element, "letter-spacing", "0");
  setImportantStyle(element, "writing-mode", "horizontal-tb");
  setImportantStyle(element, "text-orientation", "mixed");
  setImportantStyle(element, "transform", `rotate(${rotation})`);
  setImportantStyle(element, "transform-origin", "center");
};

const prepareVerticalTextForExport = (root) => {
  const verticalElements = [root, ...root.querySelectorAll("*")].filter((element) => {
    const writingMode = getComputedStyle(element).writingMode;

    return isVerticalWritingMode(writingMode);
  });

  verticalElements.forEach((element) => {
    const style = getComputedStyle(element);
    const text = normalizeExportText(element.textContent || "");

    if (!text) return;

    if (CJK_TEXT_PATTERN.test(text)) {
      stackVerticalTextForExport(element, text);
      return;
    }

    rotateVerticalTextForExport(element, style.writingMode);
  });
};

const waitForImages = async (root) => {
  const images = Array.from(root.querySelectorAll("img"));

  await Promise.all(
    images.map((image) => {
      if (image.complete) return Promise.resolve();

      return new Promise((resolve) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
      });
    }),
  );
};

const waitForPaint = () =>
  new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });

const normalizeBackgroundColor = (value) => {
  if (!value || value === "transparent" || value === "rgba(0, 0, 0, 0)") {
    return getComputedStyle(document.documentElement).getPropertyValue("--canvas-bg").trim() || "#ffffff";
  }

  return value;
};

const getSlideBackground = (page) => {
  const slideCanvas = page.querySelector(".slide-canvas");
  const slideBackground = slideCanvas ? getComputedStyle(slideCanvas).backgroundColor : "";
  const pageBackground = getComputedStyle(page).backgroundColor;

  return normalizeBackgroundColor(slideBackground || pageBackground);
};

const createRenderClone = (page, backgroundColor) => {
  const clone = page.cloneNode(true);
  const cloneCanvas = clone.querySelector(".slide-canvas");

  clone.setAttribute("data-pdf-render-page", "");

  Object.assign(clone.style, {
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "-1",
    width: `${SLIDE_WIDTH}px`,
    height: `${SLIDE_HEIGHT}px`,
    margin: "0",
    overflow: "hidden",
    pointerEvents: "none",
    background: backgroundColor,
  });

  if (cloneCanvas) {
    Object.assign(cloneCanvas.style, {
      width: `${SLIDE_WIDTH}px`,
      height: `${SLIDE_HEIGHT}px`,
      transform: "none",
      background: backgroundColor,
      boxShadow: "none",
    });
  }

  document.body.appendChild(clone);

  return clone;
};

const prepareDecorationForExport = (root) => {
  const halo = root.querySelector(".halo-mark");
  if (!halo) return;

  const accentColor =
    getComputedStyle(halo).color ||
    getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() ||
    "#1fa464";

  Object.assign(halo.style, {
    color: accentColor,
    zIndex: "1",
  });

  halo.querySelectorAll(".halo-mark__circle").forEach((circle) => {
    Object.assign(circle.style, {
      borderColor: accentColor,
      background: "transparent",
    });
  });

  halo.querySelectorAll(".halo-mark__dot").forEach((dot) => {
    dot.style.backgroundColor = accentColor;
  });

  halo.querySelectorAll(".halo-mark__corner").forEach((corner) => {
    Object.assign(corner.style, {
      borderTopColor: accentColor,
      borderRightColor: accentColor,
    });
  });
};

const normalizeCloneColorsForHtml2Canvas = (root) => {
  const elements = [root, ...root.querySelectorAll("*")];

  elements.forEach((element) => {
    const style = getComputedStyle(element);

    EXPORT_COLOR_PROPERTIES.forEach((property) => {
      const value = style.getPropertyValue(property);
      const normalizedValue = normalizeModernCssColors(value);

      if (normalizedValue !== value) {
        element.style.setProperty(property, normalizedValue, "important");
      }
    });
  });
};

export async function createSlidesPdfBlob({
  selector = "[data-export-page]",
} = {}) {
  const pages = Array.from(document.querySelectorAll(selector));

  if (pages.length === 0) {
    throw new Error("No export pages found.");
  }

  await document.fonts?.ready;
  await waitForPaint();

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [SLIDE_WIDTH, SLIDE_HEIGHT],
    compress: true,
  });

  for (const [index, page] of pages.entries()) {
    const backgroundColor = getSlideBackground(page);
    const renderPage = createRenderClone(page, backgroundColor);
    let dataUrl;

    try {
      prepareDecorationForExport(renderPage);
      prepareVerticalTextForExport(renderPage);
      normalizeCloneColorsForHtml2Canvas(renderPage);
      await waitForImages(renderPage);
      await waitForPaint();

      const canvas = await html2canvas(renderPage, {
        backgroundColor,
        scale: EXPORT_SCALE,
        useCORS: true,
        allowTaint: false,
        logging: false,
        width: SLIDE_WIDTH,
        height: SLIDE_HEIGHT,
        windowWidth: SLIDE_WIDTH,
        windowHeight: SLIDE_HEIGHT,
        scrollX: 0,
        scrollY: 0,
      });

      dataUrl = canvas.toDataURL("image/jpeg", JPG_QUALITY);
    } finally {
      renderPage.remove();
    }

    if (index > 0) {
      pdf.addPage([SLIDE_WIDTH, SLIDE_HEIGHT], "landscape");
    }

    pdf.addImage(dataUrl, "JPEG", 0, 0, SLIDE_WIDTH, SLIDE_HEIGHT, undefined, "NONE");
  }

  return pdf.output("blob");
}

export async function exportSlidesToPdf(options = {}) {
  const { filename = "presentation.pdf" } = options;
  const blob = await createSlidesPdfBlob(options);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);

  return blob;
}
