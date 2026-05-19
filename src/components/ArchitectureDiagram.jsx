const copy = {
  zh: {
    inputs: "输入层",
    inputsItems: "论文 / 数据 / 问题",
    planner: "任务规划器",
    plannerItems: "拆解目标 · 选择策略",
    memory: "研究记忆",
    memoryItems: "上下文 · 证据 · 假设",
    tools: "工具编排",
    toolsItems: "检索 · 计算 · 代码执行",
    verifier: "验证器",
    verifierItems: "一致性检查 · 反例搜索",
    outputs: "输出层",
    outputsItems: "报告 / 图表 / 实验记录",
    feedback: "反馈回路",
  },
  en: {
    inputs: "Inputs",
    inputsItems: "Papers / datasets / questions",
    planner: "Planner",
    plannerItems: "Decompose goals · choose strategy",
    memory: "Memory",
    memoryItems: "Context · evidence · hypotheses",
    tools: "Tool Orchestration",
    toolsItems: "Search · compute · execute code",
    verifier: "Verification",
    verifierItems: "Consistency checks · counterexample search",
    outputs: "Outputs",
    outputsItems: "Reports / charts / experiment logs",
    feedback: "Feedback Loop",
  },
};

function DiagramNode({ className, eyebrow, title, body }) {
  return (
    <div className={`diagram-node ${className || ""}`}>
      <span>{eyebrow}</span>
      <strong>{title}</strong>
      <p>{body}</p>
    </div>
  );
}

export function ArchitectureDiagram({ locale }) {
  const t = copy[locale];

  return (
    <div className="architecture-diagram" aria-label={locale === "zh" ? "系统架构图" : "System architecture diagram"}>
      <svg className="diagram-lines" viewBox="0 0 1320 560" aria-hidden="true">
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>
        <path d="M 214 280 C 318 280, 334 178, 448 178" />
        <path d="M 214 280 C 318 280, 334 280, 448 280" />
        <path d="M 214 280 C 318 280, 334 382, 448 382" />
        <path d="M 620 178 C 690 178, 690 280, 770 280" />
        <path d="M 620 382 C 690 382, 690 280, 770 280" />
        <path d="M 944 280 C 1030 280, 1046 280, 1120 280" />
        <path className="diagram-lines__feedback" d="M 1148 398 C 936 510, 650 510, 530 424" />
      </svg>

      <DiagramNode
        className="diagram-node--input"
        eyebrow="01"
        title={t.inputs}
        body={t.inputsItems}
      />
      <DiagramNode
        className="diagram-node--planner"
        eyebrow="02"
        title={t.planner}
        body={t.plannerItems}
      />
      <DiagramNode
        className="diagram-node--memory"
        eyebrow="03"
        title={t.memory}
        body={t.memoryItems}
      />
      <DiagramNode
        className="diagram-node--tools"
        eyebrow="04"
        title={t.tools}
        body={t.toolsItems}
      />
      <DiagramNode
        className="diagram-node--verifier"
        eyebrow="05"
        title={t.verifier}
        body={t.verifierItems}
      />
      <DiagramNode
        className="diagram-node--output"
        eyebrow="06"
        title={t.outputs}
        body={t.outputsItems}
      />

      <div className="diagram-feedback-label">{t.feedback}</div>
    </div>
  );
}
