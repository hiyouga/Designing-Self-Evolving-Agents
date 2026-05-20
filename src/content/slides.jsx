import { AgentStructureSlide } from "./slides/AgentStructureSlide.jsx";
import { AgentHarnessEngineeringSlide } from "./slides/AgentHarnessEngineeringSlide.jsx";
import { AgentHarnessOriginSlide } from "./slides/AgentHarnessOriginSlide.jsx";
import { AgentHarnessSlide } from "./slides/AgentHarnessSlide.jsx";
import { EvolutionEvaluationSlide } from "./slides/EvolutionEvaluationSlide.jsx";
import { OverviewSlide } from "./slides/OverviewSlide.jsx";
import { SelfEvolutionSlide } from "./slides/SelfEvolutionSlide.jsx";
import { ThankYouSlide } from "./slides/ThankYouSlide.jsx";
import { WorkspaceContextLlmSlide } from "./slides/WorkspaceContextLlmSlide.jsx";
import { deckTitle } from "./deckMeta.js";

export const slides = [
  {
    id: "overview",
    title: deckTitle,
    kind: "cover",
    component: OverviewSlide,
  },
  {
    id: "agent-structure",
    title: {
      zh: "Agent 的基本构成元素",
      en: "Core Components of an Agent",
    },
    kind: "diagram",
    component: AgentStructureSlide,
  },
  {
    id: "workspace-context-llm",
    title: {
      zh: "Agent 的内部状态",
      en: "Inside Agent State",
    },
    kind: "diagram",
    component: WorkspaceContextLlmSlide,
  },
  {
    id: "agent-harness",
    title: {
      zh: "Agent Harness 的定义",
      en: "What an Agent Harness Defines",
    },
    kind: "diagram",
    component: AgentHarnessSlide,
  },
  {
    id: "agent-harness-origin",
    title: {
      zh: "Agent Harness 的演化",
      en: "How Agent Harnesses Evolve",
    },
    kind: "diagram",
    component: AgentHarnessOriginSlide,
  },
  {
    id: "self-evolution",
    title: deckTitle,
    kind: "diagram",
    component: SelfEvolutionSlide,
  },
  {
    id: "evolution-evaluation",
    title: {
      zh: "评估基准是自进化 Agent 的最后一环",
      en: "Benchmarks Close the Loop for Self-Evolving Agents",
    },
    kind: "diagram",
    component: EvolutionEvaluationSlide,
  },
  {
    id: "agent-harness-engineering",
    title: {
      zh: "LLM Agent 的工程实现",
      en: "Engineering LLM Agent Systems",
    },
    kind: "diagram",
    component: AgentHarnessEngineeringSlide,
  },
  {
    id: "thank-you",
    title: {
      zh: "thank you",
      en: "Thank you",
    },
    kind: "closing",
    component: ThankYouSlide,
  },
];
