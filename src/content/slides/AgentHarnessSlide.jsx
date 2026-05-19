import { SlideTitle } from "../../components/Typography.jsx";

const copy = {
  zh: {
    title: "Agent Harness 的定义",
    definition: "Agent Harness 是一套代码框架，约束了 Agent 完成任务的过程与逻辑",
    logicTitle: "基本逻辑",
    logics: [
      {
        title: "观测逻辑",
        code: "observe",
        text: "外部环境如何构成模型输入",
      },
      {
        title: "行动逻辑",
        code: "act",
        text: "当前的模型输出如何改变外部环境",
      },
      {
        title: "更新逻辑",
        code: "update",
        text: "多次调用之间 Agent 内部状态（上下文、工作区）的变化",
      },
    ],
    emergent:
      "基于这些基本逻辑，Agent 可以演化出更复杂的逻辑，比如规划（plan）、反思（reflect）、委派（delegate）等等",
  },
  en: {
    title: "What an Agent Harness Defines",
    definition: "An agent harness is the runtime that controls how an agent observes, acts, and updates state while completing tasks",
    logicTitle: "Core Runtime Logic",
    logics: [
      {
        title: "Observation",
        code: "observe",
        text: "How the environment is serialized into model input",
      },
      {
        title: "Action",
        code: "act",
        text: "How model outputs become tool calls or environment changes",
      },
      {
        title: "State update",
        code: "update",
        text: "How context, workspace, and other state persist across model calls",
      },
    ],
    emergent:
      "From these primitives, richer behaviors emerge: planning, reflection, delegation, memory updates, and more",
  },
};

export function AgentHarnessSlide({ locale }) {
  const t = copy[locale];

  return (
    <div className="agent-harness-slide">
      <header className="slide-header">
        <SlideTitle>{t.title}</SlideTitle>
      </header>

      <div className="agent-harness-slide__body">
        <section className="harness-definition">
          <p>{t.definition}</p>
        </section>

        <section className="harness-logic-section" aria-label={t.logicTitle}>
          <div className="harness-logic-frame">
            <h2>{t.logicTitle}</h2>
            <div className="harness-logic-pill-row">
              {t.logics.map((logic) => (
                <article className="harness-logic-pill" key={logic.code}>
                  <code>{logic.code}</code>
                  <h3>{logic.title}</h3>
                  <p>{logic.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="harness-notes">
          <p>{t.emergent}</p>
        </section>
      </div>
    </div>
  );
}
