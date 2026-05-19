import { SlideTitle } from "../../components/Typography.jsx";

const copy = {
  zh: {
    title: "评估基准是自进化 Agent 的最后一环",
    ariaLabel: "Agent Harness 控制自进化 Agent 的评估闭环",
    harnessTitle: "Harness",
    worldTitle: "外部世界",
    stateTitle: "Agent 内部状态",
    benchmarkTitle: "评估基准",
    tableHeaders: ["手动挡 Harness", "半自动挡 Harness", "全自动挡 Harness"],
    tableRows: [
      {
        label: "LLM 职责",
        cells: ["一轮对话结果最优", "一次任务结果最优", "多次任务结果最优"],
      },
      {
        label: "Harness 职责",
        cells: ["无", "驱动模型行动", "驱动 Agent 进化"],
      },
      {
        label: "人类职责",
        cells: ["编排 Workflow", "设计行动逻辑", "定义评估基准"],
      },
    ],
  },
  en: {
    title: "Benchmarks Close the Loop for Self-Evolving Agents",
    ariaLabel: "Agent harness controls the evaluation loop of a self-evolving agent",
    harnessTitle: "Harness",
    worldTitle: "External Environment",
    stateTitle: "Agent State",
    benchmarkTitle: "Evaluation Benchmark",
    tableHeaders: ["Manual Harness", "Semi-Autonomous Harness", "Autonomous Harness"],
    tableRows: [
      {
        label: "LLM Role",
        cells: ["Optimize one response", "Optimize one task run", "Optimize across task runs"],
      },
      {
        label: "Harness Role",
        cells: ["None", "Drive agent execution", "Drive agent improvement"],
      },
      {
        label: "Human Role",
        cells: ["Orchestrate workflows", "Design control logic", "Define evaluation criteria"],
      },
    ],
  },
};

export function EvolutionEvaluationSlide({ locale }) {
  const t = copy[locale];

  return (
    <div className="evolution-evaluation-slide">
      <header className="slide-header">
        <SlideTitle>{t.title}</SlideTitle>
      </header>

      <div className="evolution-evaluation-slide__body">
        <figure className="evaluation-system" aria-label={t.ariaLabel}>
          <div className="evaluation-harness-node">
            <span>{t.harnessTitle}</span>
          </div>
          <svg className="evaluation-harness-claw" viewBox="0 0 180 96" aria-hidden="true">
            <path className="evaluation-harness-claw__wrist" d="M 90 0 L 90 46" />
            <path d="M 90 46 L 66 70 L 76 80" />
            <path d="M 90 46 L 90 84" />
            <path d="M 90 46 L 114 70 L 104 80" />
          </svg>

          <div className="evaluation-controlled-boundary" aria-hidden="true" />

          <article className="evaluation-node evaluation-node--state">
            <h2>{t.stateTitle}</h2>
          </article>

          <article className="evaluation-node evaluation-node--world">
            <h2>{t.worldTitle}</h2>
          </article>

          <article className="evaluation-node evaluation-node--benchmark">
            <h2>{t.benchmarkTitle}</h2>
          </article>
        </figure>

        <table className="evaluation-comparison-table" aria-label={locale === "zh" ? "Harness 形态对比" : "Harness mode comparison"}>
          <thead>
            <tr>
              <th aria-label={locale === "zh" ? "职责" : "Role"} />
              {t.tableHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.tableRows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.cells.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
