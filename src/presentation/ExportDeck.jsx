import { SlideFrame } from "./SlideFrame.jsx";

export function ExportDeck({ slides, locale }) {
  return (
    <div className="export-deck" aria-hidden="true">
      {slides.map((slide, index) => {
        const SlideContent = slide.component;

        return (
          <div className="export-page" data-export-page key={slide.id}>
            <SlideFrame slide={slide} slideIndex={index} slideCount={slides.length} scale={1}>
              <SlideContent locale={locale} />
            </SlideFrame>
          </div>
        );
      })}
    </div>
  );
}
