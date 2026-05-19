import { SlideTitle } from "../../components/Typography.jsx";
import { deckTitle } from "../deckMeta.js";

const copy = {
  zh: {
    title: deckTitle.zh,
    speakerName: "郑耀威",
    speakerTitle: "Founder@LlamaFactory, CTO@PrismShadow",
  },
  en: {
    title: deckTitle.en,
    speakerName: "Yaowei Zheng",
    speakerTitle: "Founder@LlamaFactory, CTO@PrismShadow",
  },
};

export function OverviewSlide({ locale }) {
  const t = copy[locale];
  const hasSpeakerTitle = t.speakerName && t.speakerTitle;

  return (
    <div className="overview-slide">
      <div className="overview-slide__cover">
        <SlideTitle>{t.title}</SlideTitle>
        {hasSpeakerTitle ? (
          <div className="cover-speaker cover-speaker--split">
            <span className="cover-speaker__name">{t.speakerName}</span>
            <span className="cover-speaker__title">{t.speakerTitle}</span>
          </div>
        ) : (
          <p className="cover-speaker">{t.speaker}</p>
        )}
      </div>
    </div>
  );
}
