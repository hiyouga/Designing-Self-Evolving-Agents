import { Highlight, SlideTitle } from "../../components/Typography.jsx";
import { deckTitle } from "../deckMeta.js";

const copy = {
  zh: {
    title: deckTitle.zh,
    leadBeforeState: "自进化 Agent 就是通过 Harness 在 ",
    leadState: "Agent 内部状态",
    leadAfterState: "发生",
    leadHighlight: "持久化",
    leadAfter: "的更新。",
    stateTitle: "Agent 内部状态",
    worldTitle: "外部世界",
    outputLabel: "输出动作和结果",
    feedbackLabel: "反馈和更新方向",
    harnessTitle: "Harness",
    harnessText: "控制 Agent 进化流程",
    stateLayers: [
      {
        key: "workspace",
        title: "工作区",
        items: ["Skill 更新", "Memory 更新"],
      },
      {
        key: "context",
        title: "上下文",
        items: ["Prompt 优化"],
      },
      {
        key: "llm",
        title: "LLM",
        items: ["模型参数优化"],
      },
    ],
    worldItems: ["任务记录", "环境奖励", "用户反馈"],
    challengeSentence: "“产生进化很简单，产生有效果的进化很难”",
  },
  en: {
    title: deckTitle.en,
    lead: "A self-evolving agent uses the harness to close the loop between agent state and the external environment, turning feedback into persistent updates.",
    stateTitle: "Agent State",
    worldTitle: "External Environment",
    outputLabel: "Actions and outcomes",
    feedbackLabel: "Feedback and update signal",
    harnessTitle: "Harness",
    harnessText: "Orchestrates the evolution loop",
    stateLayers: [
      {
        key: "workspace",
        title: "Workspace",
        items: ["Skill updates", "Memory"],
      },
      {
        key: "context",
        title: "Context",
        items: ["Prompt updates"],
      },
      {
        key: "llm",
        title: "LLM",
        items: ["Fine-tuning"],
      },
    ],
    worldItems: ["Task traces", "Environment rewards", "User feedback"],
    challengeSentence: '"Making agents change is easy. Making them improve is hard."',
  },
};

export function SelfEvolutionSlide({ locale }) {
  const t = copy[locale];
  const lead =
    locale === "zh" ? (
      <>
        {t.leadBeforeState}
        <span className="highlighter-underline">{t.leadState}</span>
        {t.leadAfterState}
        <Highlight>{t.leadHighlight}</Highlight>
        {t.leadAfter}
      </>
    ) : (
      t.lead
    );

  return (
    <div className="self-evolution-slide">
      <header className="slide-header">
        <SlideTitle>{t.title}</SlideTitle>
      </header>

      <div className="self-evolution-slide__body">
        <p className="self-evolution-lead">{lead}</p>

        <figure
          className="self-evolution-loop-diagram"
          aria-label={locale === "zh" ? "Agent 内部状态和外部世界的循环迭代" : "Evolution loop between agent state and the external environment"}
        >
          <svg className="self-evolution-loop-svg" viewBox="0 0 1360 500" aria-hidden="true">
            <defs>
              <marker
                id="self-evolution-arrow-output"
                viewBox="0 0 12 12"
                refX="10"
                refY="6"
                markerWidth="12"
                markerHeight="12"
                orient="auto"
              >
                <path className="self-evolution-arrowhead self-evolution-arrowhead--output" d="M 2 2 L 10 6 L 2 10" />
              </marker>
              <marker
                id="self-evolution-arrow-feedback"
                viewBox="0 0 12 12"
                refX="10"
                refY="6"
                markerWidth="12"
                markerHeight="12"
                orient="auto"
              >
                <path className="self-evolution-arrowhead self-evolution-arrowhead--feedback" d="M 2 2 L 10 6 L 2 10" />
              </marker>
            </defs>
            <path
              className="self-evolution-loop-arrow self-evolution-loop-arrow--output"
              d="M 536 126 C 616 58, 744 58, 824 126"
              markerEnd="url(#self-evolution-arrow-output)"
            />
            <path
              className="self-evolution-loop-arrow self-evolution-loop-arrow--feedback"
              d="M 824 374 C 744 442, 616 442, 536 374"
              markerEnd="url(#self-evolution-arrow-feedback)"
            />
          </svg>

          <span className="self-evolution-loop-label self-evolution-loop-label--output">{t.outputLabel}</span>
          <span className="self-evolution-loop-label self-evolution-loop-label--feedback">{t.feedbackLabel}</span>

          <article className="self-evolution-state-box">
            <h2>{t.stateTitle}</h2>
            <div className="self-evolution-state-layers">
              {t.stateLayers.map((layer) => (
                <section className={`self-evolution-state-layer self-evolution-state-layer--${layer.key}`} key={layer.key}>
                  <strong>{layer.title}</strong>
                  <div className="self-evolution-state-layer__items">
                    {layer.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>

          <div className="self-evolution-harness-control">
            <strong>{t.harnessTitle}</strong>
            <span>{t.harnessText}</span>
          </div>

          <article className="self-evolution-world-box">
            <h2>{t.worldTitle}</h2>
            <div className="self-evolution-world-items">
              {t.worldItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        </figure>

        <section className={`self-evolution-challenge self-evolution-challenge--${locale}`}>
          <blockquote>{t.challengeSentence}</blockquote>
        </section>
      </div>
    </div>
  );
}
