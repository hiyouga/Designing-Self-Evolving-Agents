import { Fragment } from "react";
import { SlideTitle } from "../../components/Typography.jsx";

const copy = {
  zh: {
    title: "Agent Harness 的演化",
    quote: "Agent Harness 在 LLM 应用的第一天就已经出现。",
    modes: [
      {
        era: "过去",
        title: "手动挡 Harness",
        text: "人类编排 Workflow，Agent 按照固定步骤调用模型、解析输出、使用工具",
      },
      {
        era: "现在",
        title: "半自动挡 Harness",
        text: "LLM 自行决定下一步动作和工具调用，Harness 负责约束、执行和更新状态",
      },
      {
        era: "未来",
        title: "？",
        text: "",
      },
    ],
  },
  en: {
    title: "How Agent Harnesses Evolve",
    quote: "Agent harnesses have been part of LLM applications from day one",
    modes: [
      {
        era: "Past",
        title: "Manual Harness",
        text: "Humans design the workflow; the harness calls the model, parses outputs, and executes tools in fixed steps",
      },
      {
        era: "Now",
        title: "Semi-Autonomous Harness",
        text: "The LLM selects tools and next actions; the harness enforces constraints, runs tools, and updates state",
      },
      {
        era: "Future",
        title: "?",
        text: "",
      },
    ],
  },
};

export function AgentHarnessOriginSlide({ locale }) {
  const t = copy[locale];

  return (
    <div className="harness-origin-slide">
      <header className="slide-header">
        <SlideTitle>{t.title}</SlideTitle>
      </header>

      <div className="harness-origin-slide__body">
        <blockquote>“{t.quote}”</blockquote>
        <section className="harness-mode-grid" aria-label={locale === "zh" ? "Harness 形态" : "Harness modes"}>
          {t.modes.map((mode, index) => (
            <Fragment key={`${mode.era}-${mode.title}`}>
              <article className={`harness-mode-card${index === t.modes.length - 1 ? " harness-mode-card--future" : ""}`}>
                {mode.era ? <span>{mode.era}</span> : null}
                <h2>{mode.title}</h2>
                {mode.text ? <p>{mode.text}</p> : null}
              </article>
              {index < t.modes.length - 1 ? (
                <div className="harness-time-arrow" aria-hidden="true">
                  <svg viewBox="0 0 120 54" focusable="false">
                    <defs>
                      <linearGradient id={`harness-time-arrow-gradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                        <stop className="harness-time-arrow__stop harness-time-arrow__stop--start" offset="0%" />
                        <stop className="harness-time-arrow__stop harness-time-arrow__stop--end" offset="100%" />
                      </linearGradient>
                    </defs>
                    <path d="M0 14H74V0L120 27L74 54V40H0Z" fill={`url(#harness-time-arrow-gradient-${index})`} />
                  </svg>
                </div>
              ) : null}
            </Fragment>
          ))}
        </section>
      </div>
    </div>
  );
}
