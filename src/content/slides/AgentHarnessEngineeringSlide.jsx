import { SlideTitle } from "../../components/Typography.jsx";

const copy = {
  zh: {
    title: "LLM Agent 的工程实现",
    principleLabel: "第一原则",
    principleText: "设计干净透明的统一接口",
    agentLabel: "LLM Agent",
    components: [
      { key: "llm", label: "LLM 调用", text: "AgentHub 接口" },
      { key: "tool", label: "工具", text: "Bash 是最优解决方案，类似 Pi Agent" },
      { key: "environment", label: "环境", text: "真实 Linux 系统" },
      { key: "observe", label: "观测", text: "待定" },
      { key: "evaluate", label: "评估", text: "待定" },
      { key: "user", label: "用户", text: "待定" },
    ],
  },
  en: {
    title: "Engineering LLM Agent Systems",
    principleLabel: "Design principle",
    principleText: "Use clean, transparent interfaces across the runtime",
    agentLabel: "LLM Agent",
    components: [
      { key: "llm", label: "LLM API", text: "AgentHub model interface" },
      { key: "tool", label: "Tooling", text: "Bash-first tool interface, in the spirit of Pi Agent" },
      { key: "environment", label: "Runtime", text: "Real Linux execution environment" },
      { key: "observe", label: "Observability", text: "Trace and state capture" },
      { key: "evaluate", label: "Evaluation", text: "Benchmark-driven feedback" },
      { key: "user", label: "User layer", text: "Human intent and feedback" },
    ],
  },
};

export function AgentHarnessEngineeringSlide({ locale }) {
  const t = copy[locale];

  return (
    <div className="harness-engineering-slide">
      <header className="slide-header">
        <SlideTitle>{t.title}</SlideTitle>
      </header>

      <div className="harness-engineering-slide__body">
        <section className="engineering-principle-card">
          <span>{t.principleLabel}：</span>
          <strong>{t.principleText}</strong>
        </section>

        <figure className="engineering-brace-map" aria-label={t.title}>
          <div className="engineering-agent-label">{t.agentLabel}</div>
          <div className="engineering-left-brace" aria-hidden="true">
            <span>{"{"}</span>
          </div>
          <div className="engineering-component-list">
            {t.components.map((component) => (
              <div className={`engineering-component-row engineering-component-row--${component.key}`} key={component.key}>
                <strong>{component.label}</strong>
                <span>{component.text}</span>
              </div>
            ))}
          </div>
        </figure>
      </div>
    </div>
  );
}
