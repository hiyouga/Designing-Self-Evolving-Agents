import { SlideTitle } from "../../components/Typography.jsx";

const copy = {
  zh: {
    title: "Agent 的内部状态",
    diagramLabel: "工作区、上下文与 LLM 的三层结构",
    unitLabel: "基本单位",
    lifecycleLabel: "生命周期",
    includesLabel: "包含",
    axisTop: "持久状态",
    axisBottom: "瞬时计算",
    layers: [
      {
        key: "workspace",
        name: "工作区",
        unit: "文件或者代码更改",
        lifecycle: "当前项目",
        summary: "Agent 专属的工作区，存放可复用能力",
      },
      {
        key: "context",
        name: "上下文",
        unit: "Token",
        lifecycle: "当前对话",
        summary: "模型单次可见的信息窗口，存放当前模型输入",
      },
      {
        key: "llm",
        name: "LLM",
        unit: "Tensor",
        lifecycle: "当前 Token",
        summary: "预训练 Transformer 模型，生成下一个 Token 的概率分布",
      },
    ],
  },
  en: {
    title: "Inside Agent State",
    diagramLabel: "Workspace, context, and LLM as three state layers",
    unitLabel: "Primitive",
    lifecycleLabel: "Lifetime",
    includesLabel: "Contains",
    axisTop: "Persistent state",
    axisBottom: "Ephemeral compute",
    layers: [
      {
        key: "workspace",
        name: "Workspace",
        unit: "Files and diffs",
        lifecycle: "Project lifetime",
        summary: "Persistent workspace for reusable capabilities and artifacts",
      },
      {
        key: "context",
        name: "Context",
        unit: "Tokens",
        lifecycle: "Conversation or task run",
        summary: "Model-visible window for instructions, history, and working inputs",
      },
      {
        key: "llm",
        name: "LLM",
        unit: "Tensors",
        lifecycle: "Single inference step",
        summary: "Transformer models that produce the next-token distribution",
      },
    ],
  },
};

function LayerStackItem({ layer, unitLabel, lifecycleLabel, includesLabel }) {
  return (
    <section className={`wcl-layer wcl-layer--${layer.key}`}>
      <div className="wcl-layer__heading">
        <p>
          <strong>{layer.name}：</strong>
          {layer.summary}
        </p>
      </div>
      <dl className="wcl-layer__facts">
        <div>
          <dt>{unitLabel}</dt>
          <dd>{layer.unit}</dd>
        </div>
        <div>
          <dt>{lifecycleLabel}</dt>
          <dd>{layer.lifecycle}</dd>
        </div>
      </dl>
      {layer.chips ? (
        <div className="wcl-chip-row" aria-label={includesLabel}>
          {layer.chips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function WorkspaceContextLlmSlide({ locale }) {
  const t = copy[locale];

  return (
    <div className="workspace-context-slide">
      <header className="slide-header">
        <SlideTitle>{t.title}</SlideTitle>
      </header>

      <div className="workspace-context-slide__body">
        <figure className="wcl-stack-figure" aria-label={t.diagramLabel}>
          <div className="wcl-stack-stage">
            <div className="wcl-stack-axis" aria-hidden="true">
              <span>{t.axisTop}</span>
              <span>{t.axisBottom}</span>
            </div>
            <div className="wcl-stack">
              {t.layers.map((layer) => (
                <LayerStackItem
                  key={layer.key}
                  layer={layer}
                  unitLabel={t.unitLabel}
                  lifecycleLabel={t.lifecycleLabel}
                  includesLabel={t.includesLabel}
                />
              ))}
            </div>
          </div>
        </figure>
      </div>
    </div>
  );
}
