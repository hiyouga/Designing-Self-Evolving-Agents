import {
  ChevronLeft,
  ChevronRight,
  Download,
  Fullscreen,
  Languages,
  LoaderCircle,
  Minimize,
  Monitor,
  Moon,
  SunMedium,
} from "lucide-react";

export function Toolbar({
  theme,
  locale,
  slideIndex,
  slideCount,
  onThemeChange,
  onLocaleChange,
  onPrev,
  onNext,
  onExportPdf,
  onToggleFullscreen,
  isExportingPdf,
  isFullscreen,
}) {
  return (
    <header className="presentation-toolbar">
      <div className="toolbar-group toolbar-group--nav" aria-label="Slide navigation">
        <button
          className="toolbar-icon-button"
          type="button"
          onClick={onPrev}
          disabled={slideIndex === 0}
          aria-label="Previous slide"
          title="Previous slide"
        >
          <ChevronLeft size={18} strokeWidth={1.8} />
        </button>
        <span className="toolbar-counter">
          {slideIndex + 1} / {slideCount}
        </span>
        <button
          className="toolbar-icon-button"
          type="button"
          onClick={onNext}
          disabled={slideIndex === slideCount - 1}
          aria-label="Next slide"
          title="Next slide"
        >
          <ChevronRight size={18} strokeWidth={1.8} />
        </button>
      </div>

      <div className="toolbar-group">
        <Monitor size={16} strokeWidth={1.8} aria-hidden="true" />
        <div className="segmented-control" aria-label="Theme">
          <button
            type="button"
            className={theme === "light" ? "is-active" : ""}
            onClick={() => onThemeChange("light")}
          >
            <SunMedium size={15} strokeWidth={1.8} />
            Light
          </button>
          <button
            type="button"
            className={theme === "dark" ? "is-active" : ""}
            onClick={() => onThemeChange("dark")}
          >
            <Moon size={15} strokeWidth={1.8} />
            Dark
          </button>
        </div>
      </div>

      <div className="toolbar-group">
        <Languages size={16} strokeWidth={1.8} aria-hidden="true" />
        <div className="segmented-control" aria-label="Language">
          <button
            type="button"
            className={locale === "zh" ? "is-active" : ""}
            onClick={() => onLocaleChange("zh")}
          >
            中文
          </button>
          <button
            type="button"
            className={locale === "en" ? "is-active" : ""}
            onClick={() => onLocaleChange("en")}
          >
            English
          </button>
        </div>
      </div>

      <div className="toolbar-group toolbar-group--export">
        <button
          className="toolbar-text-button"
          type="button"
          onClick={onToggleFullscreen}
          aria-label={isFullscreen ? "Exit slide fullscreen" : "Enter slide fullscreen"}
          title={isFullscreen ? "Exit slide fullscreen" : "Enter slide fullscreen"}
        >
          {isFullscreen ? (
            <Minimize size={16} strokeWidth={1.8} />
          ) : (
            <Fullscreen size={16} strokeWidth={1.8} />
          )}
          {isFullscreen ? "Exit" : "Fullscreen"}
        </button>
        <button
          className="toolbar-text-button"
          type="button"
          onClick={onExportPdf}
          disabled={isExportingPdf}
          aria-label="Export PDF"
          title="Export PDF"
        >
          {isExportingPdf ? (
            <LoaderCircle className="toolbar-spinner" size={16} strokeWidth={1.8} />
          ) : (
            <Download size={16} strokeWidth={1.8} />
          )}
          {isExportingPdf ? "Exporting" : "Export PDF"}
        </button>
      </div>
    </header>
  );
}
