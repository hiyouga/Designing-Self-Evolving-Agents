import { SLIDE_HEIGHT, SLIDE_WIDTH } from "./constants.js";

export function SlideFrame({ children, slide, slideIndex, slideCount, scale }) {
  return (
    <section
      className={`slide-canvas slide-canvas--${slide.kind || "standard"}`}
      style={{
        width: `${SLIDE_WIDTH}px`,
        height: `${SLIDE_HEIGHT}px`,
        transform: `scale(${scale})`,
      }}
      aria-label={`${slide.title.zh} / ${slide.title.en}`}
    >
      <div className="halo-mark" aria-hidden="true">
        <span className="halo-mark__circle" />
        <span className="halo-mark__dots">
          <span className="halo-mark__dot halo-mark__dot--a" />
          <span className="halo-mark__dot halo-mark__dot--b" />
          <span className="halo-mark__dot halo-mark__dot--c" />
        </span>
        <span className="halo-mark__corner" />
      </div>

      <div className="slide-content">{children}</div>

      <div className="slide-page-indicator" aria-hidden="true">
        {String(slideIndex + 1).padStart(2, "0")}
      </div>
      <div className="slide-brand-line" aria-hidden="true" />
    </section>
  );
}
