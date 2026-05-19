import { SlideTitle } from "../../components/Typography.jsx";

const copy = {
  zh: {
    title: "Agent 的基本构成元素",
    diagramLabel: "Agent 信息结构图",
    layers: [
      {
        title: "Agent 内部状态",
        text: "包含专属的知识和信息，引导 Agent 的每次推理过程",
        children: [
          {
            title: "LLM",
            text: "负责自然语言的理解和生成",
          },
          {
            title: "上下文",
            text: "负责维护模型的输入和输出 Token",
          },
          {
            title: "工作区",
            text: "Agent 专属的工作区，包括 GitHub 仓库和 Skill 文件等等",
          },
        ],
      },
      {
        title: "外部世界",
        text: "所有外部环境的集合，Agent 通过工具可以观察和影响外部世界",
      },
      {
        title: "Harness",
        text: "一系列确定性的代码框架，处理 Agent 内部状态和外部世界的变化逻辑",
      },
    ],
  },
  en: {
    title: "Core Components of an Agent",
    diagramLabel: "Agent state and environment structure",
    layers: [
      {
        title: "Agent State",
        text: "Holds task-specific knowledge and working data that condition each reasoning step",
        children: [
          {
            title: "LLM",
            text: "Performs language understanding, reasoning, and generation",
          },
          {
            title: "Context",
            text: "Stores the tokens currently visible to the model",
          },
          {
            title: "Workspace",
            text: "Persistent workspace for repositories, skills, memory, and generated artifacts",
          },
        ],
      },
      {
        title: "External Environment",
        text: "Everything outside the agent that tools can read from or write to",
      },
      {
        title: "Harness",
        text: "Deterministic runtime code that mediates state transitions between the agent and its environment",
      },
    ],
  },
};

function LayerNote({ title, text, children }) {
  return (
    <li className="agent-layer-note">
      <div className="agent-layer-note__content">
        <p>
          <strong>{title}：</strong>
          {text}
        </p>
        {children ? (
          <ul className="agent-layer-subnotes">
            {children.map((child) => (
              <li key={child.title}>
                <strong>{child.title}</strong>
                <span>{child.text}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}

export function AgentStructureSlide({ locale }) {
  const t = copy[locale];
  const [stateLayer, worldLayer, harnessLayer] = t.layers;
  const [llmLayer, contextLayer, workspaceLayer] = stateLayer.children;

  return (
    <div className="agent-structure-slide">
      <header className="slide-header">
        <SlideTitle>{t.title}</SlideTitle>
      </header>

      <div className="agent-structure-slide__body">
        <div className="agent-structure-slide__copy">
          <ol className="agent-layer-notes" aria-label={locale === "zh" ? "Agent 信息层级说明" : "Agent layer notes"}>
            {t.layers.map((layer) => (
              <LayerNote key={layer.title} {...layer} />
            ))}
          </ol>
        </div>

        <figure className="agent-structure-diagram" aria-label={t.diagramLabel}>
          <div className="agent-harness-node">
            <span>{harnessLayer.title}</span>
          </div>
          <svg className="agent-harness-claw" viewBox="0 0 500 560" aria-hidden="true">
            <path className="agent-harness-claw__wrist" d="M 80 289 L 102 289" />
            <path d="M 102 289 L 118 260 L 132 272" />
            <path d="M 102 289 L 132 289" />
            <path d="M 102 289 L 118 318 L 132 306" />
          </svg>
          <div className="agent-world-node">
            <span>{worldLayer.title}</span>
          </div>
          <svg className="agent-interaction-line" viewBox="0 0 500 560" aria-hidden="true">
            <path d="M 320 118 C 320 156, 320 194, 320 232" />
          </svg>
          <div className="agent-boundary agent-boundary--workspace">
            <span>{workspaceLayer.title}</span>
          </div>
          <div className="agent-boundary agent-boundary--context">
            <span>{contextLayer.title}</span>
          </div>
          <div className="agent-boundary agent-boundary--llm">
            <span>{llmLayer.title}</span>
          </div>
          <div className="agent-internal-state-label">{stateLayer.title}</div>
        </figure>
      </div>
    </div>
  );
}
