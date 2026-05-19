# Designing Self Evolving Agents

[English](README.md) | [简体中文](README_ZH.md)

这个仓库是一套基于 React + Vite 的 Web 演示文稿，主题是 LLM Agent 的系统结构、Agent Harness 如何控制执行过程，以及如何把任务反馈转化为可持久化的 Agent 改进。

这套 deck 基于 [Prism-Shadow/minimal-web-slides](https://github.com/Prism-Shadow/minimal-web-slides) 构建。

## 幻灯片大纲

### 1. 构建自进化的 LLM Agent

演讲封面

### 2. Agent 的基本构成元素

介绍 Agent 系统的三个主要部分

- Agent 内部状态：任务相关知识和工作数据
- 外部世界：工具可以读取或写入的一切外部环境
- Harness：负责在 Agent 和环境之间处理状态转移的确定性运行时代码

本页也进一步拆解 Agent 内部状态中的 LLM、上下文和工作区。

### 3. Agent 的内部状态

把 Agent 内部状态解释为从持久状态到瞬时计算的三层结构

- 工作区：文件和代码改动，生命周期是当前项目
- 上下文：模型在当前对话或任务运行中可见的 Token
- LLM：生成下一个 Token 概率分布的 Transformer 模型

### 4. Agent Harness 的定义

定义 Harness 如何控制 Agent 完成任务

- `observe`：把外部环境序列化成模型输入
- `act`：把模型输出转化为工具调用或环境变化
- `update`：在多次模型调用之间持久化上下文、工作区和其他状态

这些基础逻辑可以支撑规划、反思、委派、记忆更新等更高层行为。

### 5. Agent Harness 的演化

展示 Agent Harness 的演化路径

- 手动挡 Harness：人类设计 Workflow，Harness 按固定步骤执行
- 半自动挡 Harness：LLM 选择工具和下一步动作，Harness 负责约束和执行
- 未来 Harness：更多执行和改进闭环被自动化

### 6. 构建自进化的 LLM Agent

把自进化理解为 Agent 内部状态与外部世界之间的反馈闭环

- Harness 控制 Agent 的进化流程
- Agent 内部状态通过工作区、上下文和模型变化获得持久化更新
- 外部世界提供任务记录、环境奖励和用户反馈
- 核心挑战：“产生进化很简单，产生有效果的进化很难”

### 7. 评估基准是自进化 Agent 的最后一环

解释为什么评估基准是有效自进化的必要条件

- 手动挡 Harness 优化一轮对话结果
- 半自动挡 Harness 优化一次任务结果
- 全自动挡 Harness 优化多次任务结果
- 人类职责从编排 Workflow 转向定义评估标准

### 8. LLM Agent 的工程实现

总结实用 Agent 系统需要处理的工程界面

- LLM 调用：AgentHub 模型接口
- 工具：Bash 优先的工具接口
- 环境：真实 Linux 执行环境
- 观测：Trace 和状态捕获
- 评估：基于 Benchmark 的反馈
- 用户：人类意图和反馈

### 9. Thank You

结束页

## 本地预览

```bash
npm install
npm run dev
```

Vite 开发服务器通常会运行在：

```text
http://localhost:5173
```

## 构建

```bash
npm run build
```
