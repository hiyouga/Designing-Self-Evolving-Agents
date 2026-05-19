# Designing Self Evolving Agents

[English](README.md) | [简体中文](README_ZH.md)

This repository contains a React + Vite web presentation about how LLM agents are structured, how agent harnesses control execution, and what it takes to turn task feedback into durable agent improvement.

The deck is built on top of [Prism-Shadow/minimal-web-slides](https://github.com/Prism-Shadow/minimal-web-slides).

## Slide Outline

### 1. Building Self-Evolving LLM Agents

Cover slide for the talk

### 2. Core Components of an Agent

Introduces the three major pieces of an agent system

- Agent state: task-specific knowledge and working data
- External environment: everything tools can read from or write to
- Harness: deterministic runtime code that mediates state transitions

The slide also breaks agent state into LLM, context, and workspace.

### 3. Inside Agent State

Explains agent state as a stack from persistent state to ephemeral compute

- Workspace: files and diffs that live for the project lifetime
- Context: tokens visible during a conversation or task run
- LLM: Transformer models that produce the next-token distribution

### 4. What an Agent Harness Defines

Defines the harness as the runtime that controls how an agent completes tasks

- `observe`: serialize the environment into model input
- `act`: turn model outputs into tool calls or environment changes
- `update`: persist context, workspace, and other state across model calls

These primitives support higher-level behaviors such as planning, reflection, delegation, and memory updates.

### 5. How Agent Harnesses Evolve

Shows agent harnesses as an evolution path

- Manual harness: humans design the workflow and the harness executes fixed steps
- Semi-autonomous harness: the LLM selects tools and next actions while the harness enforces constraints
- Future harness: more of the execution and improvement loop becomes automated

### 6. Building Self-Evolving LLM Agents

Frames self-evolution as a feedback loop between agent state and the external environment

- The harness orchestrates the evolution loop
- Agent state receives persistent updates through workspace, context, and model changes
- The external environment provides task traces, rewards, and user feedback
- Core challenge: "Making agents change is easy. Making them improve is hard."

### 7. Benchmarks Close the Loop for Self-Evolving Agents

Explains why evaluation benchmarks are required for useful self-evolution

- Manual harnesses optimize one response
- Semi-autonomous harnesses optimize one task run
- Autonomous harnesses optimize across task runs
- Human responsibility shifts from workflow orchestration toward defining evaluation criteria

### 8. Engineering LLM Agent Systems

Summarizes the engineering surface needed for practical agent systems

- LLM API: AgentHub model interface
- Tooling: Bash-first tool interface
- Runtime: real Linux execution environment
- Observability: trace and state capture
- Evaluation: benchmark-driven feedback
- User layer: human intent and feedback

### 9. Thank You

Closing slide

## Local Preview

```bash
npm install
npm run dev
```

The Vite dev server usually opens at:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```
