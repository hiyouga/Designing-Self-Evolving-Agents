import { useEffect, useMemo, useRef, useState } from "react";
import { SlideViewer } from "./presentation/SlideViewer.jsx";
import { Toolbar } from "./presentation/Toolbar.jsx";
import { ExportDeck } from "./presentation/ExportDeck.jsx";
import { deckFilenameStem, deckTitle } from "./content/deckMeta.js";
import { slides } from "./content/slides.jsx";

const clampSlideIndex = (value) => Math.min(Math.max(value, 0), slides.length - 1);

const getFullscreenElement = () =>
  document.fullscreenElement ||
  document.webkitFullscreenElement ||
  document.mozFullScreenElement ||
  document.msFullscreenElement;

const requestElementFullscreen = (element) => {
  const requestFullscreen =
    element.requestFullscreen ||
    element.webkitRequestFullscreen ||
    element.mozRequestFullScreen ||
    element.msRequestFullscreen;

  return requestFullscreen?.call(element);
};

const exitDocumentFullscreen = () => {
  const exitFullscreen =
    document.exitFullscreen ||
    document.webkitExitFullscreen ||
    document.mozCancelFullScreen ||
    document.msExitFullscreen;

  return exitFullscreen?.call(document);
};

export function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("ppt-theme") || "light");
  const [locale, setLocale] = useState(() => localStorage.getItem("ppt-locale") || "en");
  const [slideIndex, setSlideIndex] = useState(0);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isSlideFullscreen, setIsSlideFullscreen] = useState(false);
  const slideViewerRef = useRef(null);

  const currentSlide = useMemo(() => slides[slideIndex], [slideIndex]);

  const goToSlide = (nextIndex) => {
    setSlideIndex(clampSlideIndex(nextIndex));
  };

  const exportPdf = async () => {
    if (isExportingPdf) return;

    setIsExportingPdf(true);

    try {
      const { exportSlidesToPdf } = await import("./presentation/exportPdf.js");

      await exportSlidesToPdf({
        filename: `${deckFilenameStem}-${locale}.pdf`,
      });
    } catch (error) {
      console.error("Failed to export PDF.", error);
      window.alert("PDF export failed. Please check image sources and try again.");
    } finally {
      setIsExportingPdf(false);
    }
  };

  const exitSlideFullscreen = async () => {
    try {
      if (getFullscreenElement() === slideViewerRef.current) {
        await exitDocumentFullscreen();
      }
    } catch (error) {
      console.error("Failed to exit slide fullscreen.", error);
    } finally {
      setIsSlideFullscreen(false);
    }
  };

  const toggleSlideFullscreen = async () => {
    const slideViewer = slideViewerRef.current;
    if (!slideViewer) return;

    if (isSlideFullscreen || getFullscreenElement() === slideViewer) {
      await exitSlideFullscreen();
      return;
    }

    try {
      const fullscreenResult = requestElementFullscreen(slideViewer);

      if (fullscreenResult) {
        await fullscreenResult;
      } else {
        setIsSlideFullscreen(true);
      }
    } catch (error) {
      console.error("Failed to toggle slide fullscreen.", error);
      setIsSlideFullscreen(true);
    }
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("ppt-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    document.title = deckTitle[locale];
    localStorage.setItem("ppt-locale", locale);
  }, [locale]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsSlideFullscreen(getFullscreenElement() === slideViewerRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isSlideFullscreen && !getFullscreenElement()) {
        setIsSlideFullscreen(false);
        return;
      }

      if (event.key === "ArrowRight" || event.key === "PageDown") {
        setSlideIndex((value) => clampSlideIndex(value + 1));
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        setSlideIndex((value) => clampSlideIndex(value - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSlideFullscreen]);

  return (
    <div className="presentation-app" data-theme={theme}>
      <Toolbar
        theme={theme}
        locale={locale}
        slideIndex={slideIndex}
        slideCount={slides.length}
        onThemeChange={setTheme}
        onLocaleChange={setLocale}
        onPrev={() => goToSlide(slideIndex - 1)}
        onNext={() => goToSlide(slideIndex + 1)}
        onExportPdf={exportPdf}
        onToggleFullscreen={toggleSlideFullscreen}
        isExportingPdf={isExportingPdf}
        isFullscreen={isSlideFullscreen}
      />

      <SlideViewer
        viewerRef={slideViewerRef}
        slide={currentSlide}
        slideIndex={slideIndex}
        slideCount={slides.length}
        locale={locale}
        isFullscreen={isSlideFullscreen}
        onExitFullscreen={exitSlideFullscreen}
      />

      <ExportDeck slides={slides} locale={locale} />
    </div>
  );
}
