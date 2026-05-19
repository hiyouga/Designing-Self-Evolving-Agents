import {
  BulletList,
  CodeBlock,
  DataTable,
  InfoCard,
  MathFormula,
  QuoteBlock,
} from "../../components/Blocks.jsx";
import { Highlight, SectionTitle, SlideTitle } from "../../components/Typography.jsx";

const copy = {
  zh: {
    title: "关键设计原则",
    principles: [
      {
        title: "模板与内容解耦",
        text: "Slide 外壳统一处理尺寸、缩放、底部识别线和主题变量。",
      },
      {
        title: "组件化内容定义",
        text: "每页幻灯片都是 React 组件，可自由插入卡片、表格、代码或图形。",
      },
      {
        title: "信息层级清晰",
        text: "使用少量粗体小标题、项目符号和绿色强调词组织重点。",
      },
    ],
    tableHeaders: ["Layer", "Responsibility", "Extensible"],
    tableRows: [
      ["Presentation", "Canvas / theme / navigation", "Stable"],
      ["Content", "Slide composition", "Flexible"],
      ["Components", "Reusable blocks", "Composable"],
    ],
    cardTitle: "Composable Blocks",
    cardText: "The same slide can host prose, code, math, quotes, tables, cards, and diagrams.",
    quote: "A restrained visual system gives research content more room to breathe.",
  },
  en: {
    title: "Design Principles",
    principles: [
      {
        title: "Presentation shell decoupled from content",
        text: "The slide frame owns canvas sizing, scaling, navigation, theme tokens, and the green identity line.",
      },
      {
        title: "Content defined as components",
        text: "Each slide is a React component that can compose cards, tables, code, and diagrams.",
      },
      {
        title: "Clear information hierarchy",
        text: "Sparse headings, compact bullets, and restrained emphasis keep technical material readable.",
      },
    ],
    tableHeaders: ["Layer", "Responsibility", "Extensible"],
    tableRows: [
      ["Presentation", "Canvas / theme / navigation", "Stable"],
      ["Content", "Slide composition", "Flexible"],
      ["Components", "Reusable blocks", "Composable"],
    ],
    cardTitle: "Composable Blocks",
    cardText: "A slide can combine prose, code, math, quotes, tables, cards, and diagrams without changing the shell.",
    quote: "A restrained visual system gives technical content more room to breathe.",
  },
};

export function KeyPointsSlide({ locale }) {
  const t = copy[locale];

  return (
    <div className="content-slide">
      <header className="slide-header">
        <SlideTitle>{t.title}</SlideTitle>
      </header>

      <div className="key-points-grid">
        <section className="key-points-grid__main">
          <SectionTitle>{locale === "zh" ? "适合研究型内容的默认骨架" : "A Practical Structure for Research Content"}</SectionTitle>
          <BulletList
            items={t.principles.map((item) => ({
              title: item.title,
              text: item.text,
            }))}
          />
        </section>

        <aside className="key-points-grid__side">
          <InfoCard title={t.cardTitle}>
            <p>{t.cardText}</p>
            <MathFormula>score = α · clarity + β · extensibility - γ · noise</MathFormula>
          </InfoCard>

          <DataTable headers={t.tableHeaders} rows={t.tableRows} />

          <CodeBlock
            code={`export const slides = [
  { id: "overview", component: OverviewSlide },
  { id: "architecture", component: ArchitectureSlide },
];`}
          />

          <QuoteBlock>
            {locale === "zh" ? (
              <>
                克制的视觉系统让 <Highlight>研究内容</Highlight> 拥有更多呼吸空间。
              </>
            ) : (
              t.quote
            )}
          </QuoteBlock>
        </aside>
      </div>
    </div>
  );
}
