import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Minimize } from "lucide-react";
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "./constants.js";
import { SlideFrame } from "./SlideFrame.jsx";

const calculateScale = (element) => {
  if (!element) return 1;

  const { width, height } = element.getBoundingClientRect();
  return Math.min(width / SLIDE_WIDTH, height / SLIDE_HEIGHT);
};

export function SlideViewer({
  viewerRef,
  slide,
  slideIndex,
  slideCount,
  locale,
  isFullscreen,
  onExitFullscreen,
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const SlideContent = slide.component;

  const setContainerRef = useCallback(
    (element) => {
      containerRef.current = element;

      if (viewerRef) {
        viewerRef.current = element;
      }
    },
    [viewerRef],
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const updateScale = () => {
      setScale(calculateScale(container));
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    window.addEventListener("resize", updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  return (
    <main
      className={`slide-viewer${isFullscreen ? " is-slide-fullscreen" : ""}`}
      ref={setContainerRef}
    >
      {isFullscreen ? (
        <button
          className="fullscreen-exit-button"
          type="button"
          onClick={onExitFullscreen}
          aria-label="Exit slide fullscreen"
          title="Exit slide fullscreen"
        >
          <Minimize size={18} strokeWidth={1.8} />
        </button>
      ) : null}
      <div
        className="scaled-slide"
        style={{
          width: `${SLIDE_WIDTH * scale}px`,
          height: `${SLIDE_HEIGHT * scale}px`,
        }}
      >
        <SlideFrame
          slide={slide}
          slideIndex={slideIndex}
          slideCount={slideCount}
          scale={scale}
        >
          <SlideContent locale={locale} />
        </SlideFrame>
      </div>
    </main>
  );
}
