import { ArchitectureDiagram } from "../../components/ArchitectureDiagram.jsx";
import { SectionTitle, SlideTitle } from "../../components/Typography.jsx";

const copy = {
  zh: {
    title: "复杂框图：研究型 Agent 系统架构",
    captionTitle: "示例结构",
    caption:
      "输入层聚合数据与问题，中心模块完成规划、记忆和工具调用，输出层生成报告、证据链和可复现实验记录。",
  },
  en: {
    title: "Research Agent System Architecture",
    captionTitle: "Representative structure",
    caption:
      "Input adapters ingest papers, datasets, and research questions. The core plans, retrieves memory, and orchestrates tools. Outputs include reports, evidence trails, and reproducible experiment logs.",
  },
};

export function ArchitectureSlide({ locale }) {
  const t = copy[locale];

  return (
    <div className="architecture-slide">
      <header className="slide-header">
        <SlideTitle>{t.title}</SlideTitle>
      </header>

      <div className="architecture-slide__body">
        <div className="architecture-slide__caption">
          <SectionTitle>{t.captionTitle}</SectionTitle>
          <p>{t.caption}</p>
        </div>
        <ArchitectureDiagram locale={locale} />
      </div>
    </div>
  );
}
