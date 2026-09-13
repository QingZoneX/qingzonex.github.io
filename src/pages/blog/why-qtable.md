---
layout: ../../layouts/BlogPostLayout.astro
title: "为什么我又做了一个开源多维表格：QTable 想解决的其实不是「表格」问题"
description: "当 Airtable、Notion、飞书多维表格已经很成熟时，为什么还值得做 QTable？这篇文章解释 QTable 真正想构建的是怎样的 AI Native 工作底座。"
date: "2026-09-13"
locale: "zh-cn"
slug: "why-qtable"
series: "构建 QTable：一个 AI Native 工作系统的设计与实现"
seriesIndex: 1
seriesTotal: 10
sourcePath: "src/pages/blog/why-qtable.md"
---

如果今天再做一个多维表格产品，最先遇到的问题大概不是技术，而是一个更直接的问题：**为什么？**

Airtable 已经证明了数据库和表格之间存在巨大的产品空间；Notion 把数据库嵌入到了文档与知识工作里；飞书多维表格也已经把多视图、自动化、协作和企业场景做得非常成熟。

在这样的市场里，如果 QTable 的目标只是“再做一个支持 Grid、Kanban、Gantt 的开源表格”，那它很难形成真正有价值的差异。

所以在开发 QTable 的过程中，我越来越明确一件事：

> **QTable 想解决的其实不是表格问题，而是 AI 如何理解、组织并安全地执行真实工作的问题。**

多维表格只是目前我认为最适合承载这个问题的基础数据模型。

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/why-qtable/01-workflow-compare.svg" alt="传统工具路径与 QTable AI Native 工作路径对比" loading="eager" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">传统工具更强调“先搭系统再工作”；QTable 更关心“先表达目标，再由系统组织工作”。</figcaption>
</figure>

## 从“配置一个工具”到“描述一个目标”

传统项目管理或多维表格产品的典型使用路径，往往是先创建 Workspace，再创建 Table、设计字段、配置 View、录入任务、制作 Dashboard、配置自动化。等到这些都准备好之后，用户才真正开始工作。

这套模型没有错。事实上，它非常强大。

问题在于，它要求用户在真正开始工作之前，先把自己的业务结构翻译成软件配置。

一个产品负责人脑子里想的是：

> “下个月要发布 1.0，我需要把需求拆成任务，安排负责人，判断工作量，找到关键风险，并随时知道项目是否会延期。”

但软件通常要求他先回答另一组问题：

- 要建几张表？
- 哪些字段是 Select，哪些是 Relation？
- Kanban 按什么字段分组？
- Gantt 的开始时间和结束时间从哪里来？
- Dashboard 应该聚合哪些指标？
- 自动化应该监听什么事件？

这中间存在一个很大的**意图到结构的翻译成本**。

而大模型第一次让我们有机会重新设计这条路径。用户可以先说“我想完成什么”，系统再帮助他把目标翻译成 Workspace、Table、View、Task、成员分工、Dashboard 和可执行计划。

真正的变化不是“AI 帮你建了一张表”，而是：

> **用户开始从描述目标出发，而不是从配置软件出发。**

## AI Native 不是在右下角加一个聊天框

今天很多产品都已经有 AI Assistant。

最容易实现的方式，是把当前页面的数据拼成 Prompt，发送给模型，再把回答显示在一个 Chat 面板里。这当然有价值，但我并不认为这就叫 AI Native。

如果 AI 只能回答：

> “这个项目有哪些风险？”

却不能在用户确认之后真正完成：

- 创建缺失的任务；
- 修改负责人；
- 调整排期；
- 建立新的视图；
- 生成 Dashboard；
- 更新项目状态；

那么它仍然只是一个位于业务系统旁边的助手。

真正困难的问题不是模型会不会生成文字，而是：

> **AI 能不能成为业务系统中的一个受约束执行者？**

这也是 QTable 设计中非常重要的一条分界线。

## 为什么多维表格适合作为 Agent 的业务底座

Agent 如果要执行真实工作，首先需要一个足够明确的世界模型。

纯文档当然很灵活，但文档中的“任务”“成员”“状态”“截止日期”很多时候只是自然语言。传统数据库又非常结构化，但普通用户很难直接操作 Schema、Join、Constraint 和 Query。

多维表格恰好处在两者中间。

对于用户，它仍然是熟悉的表格和视图；对于系统，它却可以提供明确的结构：Workspace、Table、Field、Record、Relation、Formula 和 View 都是可查询、可验证、可操作的业务对象。

当一个任务拥有结构化的 `status`、`assignee`、`priority`、`startDate`、`dueDate` 和关系字段之后，AI 面对的就不再是一段模糊文本，而是一个可以被查询、验证和操作的业务对象。

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/why-qtable/02-table-foundation.svg" alt="多维表格作为 AI 业务底座的五个能力：结构化、可投影、可约束、可执行、可审计" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">多维表格的重要性不在于“像表格”，而在于它能成为 AI 可理解、可约束、可执行、可审计的业务工作模型。</figcaption>
</figure>

这件事很重要。因为从 Agent 的角度看，真正有价值的链路不是“自然语言 → 更多自然语言”，而是：

**Natural Language → Structured Intent → Structured Business Model → Validated Action**

这才更接近真正的“工作”。

## View 不应该成为第二份数据

这也影响了 QTable 对多视图的理解。

Grid、Kanban、Gantt、Calendar、Gallery 看起来是完全不同的产品体验，但它们不应该拥有各自独立的任务数据。

在 QTable 中，我更希望把它们理解成**同一份结构化数据的不同投影**。

这意味着：

- 在 Kanban 中拖动任务，本质上是在修改结构化字段；
- 在 Gantt 中调整排期，仍然回到相同的 Record；
- AI 创建任务之后，不需要再分别同步 Grid 和 Kanban；
- Dashboard 也应该从同一套权限和数据模型聚合，而不是保存一份旁路数据。

当 AI 开始参与系统之后，这种“一份事实，多种视图”的原则会变得更加重要。否则每增加一种交互方式，就增加一套同步和一致性问题。

## QTable 真正想做的不是功能堆叠

在当前的 QTable 设计里，Web 应用、API、权限、自动化、仪表盘、搜索、附件以及 AI 能力，并不是一些相互独立的功能点。

它们共享的是同一套核心产品模型：

- Table
- Record
- View
- Permission
- ChangeSet
- Workspace Context

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/why-qtable/03-unified-model.svg" alt="QTable Web、API、AI、Automation、Dashboard、Search 和 Files 围绕统一核心产品模型协作" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">QTable 并不是把很多功能拼在一起，而是让不同交互方式围绕同一个业务模型、同一个权限边界和同一条审计链路工作。</figcaption>
</figure>

这点非常重要。

一种很诱人的实现，是专门给 AI 做一套快捷接口：LLM 调用 AI-specific mutation，然后直接修改数据库。这样实现起来往往更快。

但长期来看，这会产生两套系统：

1. 用户手动操作时遵循的业务规则；
2. AI 操作时使用的另一套规则。

然后问题会迅速出现：权限不一致、审计缺失、数据校验不同、并发状态过期、自动化触发行为不同。

所以 QTable 更希望 AI 与人工操作复用同一套 Table、View、Dashboard、Permission 和 ChangeSet 模型。

换句话说：

> **AI 不应该获得一条绕过产品规则的“超级管理员捷径”。它只是另一种发起业务操作的方式。**

## 为什么“安全执行”比“聪明回答”更重要

我对 QTable 还有一个非常强烈的判断：

> **AI 如果只能回答问题，它只是一个助手；AI 如果能够在边界内安全执行工作，它才真正开始成为系统能力。**

但让 AI 执行工作，不能走“模型想到什么就直接改数据库”这条路。

当 AI 只能生成文字时，模型偶尔犯错的代价可能只是一段错误回答。当 AI 可以修改业务数据之后，错误的成本完全不同。

“把这个项目整理一下”可能最终意味着几十条记录更新、任务重排、负责人变化，甚至创建和删除对象。

因此 QTable 的 AI 写入流程从一开始就希望遵守：**Preview → Confirm → Apply**。

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/why-qtable/04-preview-confirm-apply.svg" alt="QTable Preview、Confirm、Apply 三阶段 AI 安全执行流程，以及权限、上下文、并发和审计校验" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">真正可落地的 AI 不是“想到就执行”，而是“先预览、再确认、后执行”，并把权限、上下文、并发与审计校验内建到执行链路里。</figcaption>
</figure>

Preview 不是一个 UI 动画，而是系统边界。

用户应该能看到 AI **准备做什么**，而不是只能在 AI **已经做完之后**寻找 Undo。

Confirm 也不能意味着“用户点过一次按钮，从此全部放行”。真正 Apply 时仍然需要重新检查当前权限和业务状态，因为从 Preview 到 Apply 之间，数据可能已经发生变化。

这不是为了让 AI 变慢，而是为了让 AI 能进入真实业务场景。

## AI 真正缺少的往往不是更大的模型，而是 Context

当 QTable 从聊天助手继续走向 Agent，另一个问题很快就出现了。

用户说：

> “帮我看看这个项目为什么延期。”

“这个项目”到底是什么？

AI 至少需要知道：

- 当前用户是谁；
- 当前 Workspace 是什么；
- 当前 Table / View 是什么；
- 用户正在处理哪个 Project / Task；
- 团队成员是谁；
- 当前用户能看到哪些行；
- 最近发生了什么；
- 之前的对话讨论过什么。

所以 QTable 后面逐渐形成了 Context Engine，把 User、Project、Table、Task、Team、Organization、View、Session / Conversation 等上下文统一起来。

这让我越来越相信：

> **Agent 产品体验的核心竞争力，很可能不是 Prompt Engineering，而是 Context Engineering。**

这个问题也会成为这个系列后续的一篇核心文章。

## 开源对 QTable 来说不是发布方式，而是产品约束

选择把 QTable 开源，也不仅是因为“开源容易获得用户”。

对于一个未来可能读取项目、成员、文件、任务甚至调用外部 Skill 的 AI 工作系统，信任会成为产品的一部分。

用户应该能够知道：

- 数据存在哪里；
- AI 能看到什么；
- 权限在哪里检查；
- 密钥如何保存；
- Docker 镜像从什么 commit 构建；
- 依赖有没有已知漏洞；
- 构建产物是否有 SBOM 和 provenance；
- 一次 AI 修改到底经过了哪些业务规则。

因此开源也反过来迫使 QTable 把一些“能跑就行”的工程问题变成显式契约。

这也是为什么项目里会出现 dependency audit、license policy、容器扫描、SBOM、provenance、CI contract 和 full-stack release gate。

这些东西不是 README 上的徽章，而是信任模型的一部分。

## QTable 现在是什么，又不是什么

QTable 目前仍然处于 Alpha 阶段。

它已经是公开的开源项目，但我不想把“仓库 Public”包装成“产品已经成熟”。大表性能、实时增量、模板质量、Agent Runtime、Context freshness、权限边界、生态集成等方面都还有很多工作。

同时，QTable 也并不试图在第一天替代所有成熟的多维表格产品。

当前更重要的目标是验证一个架构判断：

> **如果把结构化工作数据、权限系统、上下文引擎和可审计的 Agent Runtime 放在同一套产品模型里，我们能不能让 AI 从“告诉你应该怎么做”，逐渐变成“在你控制下把事情真正做完”？**

这才是我继续做 QTable 的主要原因。

## 这篇文章真正想表达什么

如果只用一句话总结这篇文章，那就是：

> **QTable 不是为了再做一个“更漂亮的表格”，而是为了探索：在 AI 时代，什么样的产品模型最适合承载真实工作。**

在我当前的答案里，多维表格依然是一个很强的起点，但它必须继续向前演化：

- 从静态配置工具，走向目标驱动系统；
- 从手工搭建工作流，走向 AI 辅助组织工作；
- 从“记录信息”，走向“承载执行”；
- 从单纯协作工具，走向可理解、可确认、可审计的 AI 工作底座。

这也是整个系列文章的起点。

## 接下来这个系列会写什么

《构建 QTable：一个 AI Native 工作系统的设计与实现》会继续围绕真实代码和实际架构展开，而不是只介绍功能。

后面计划讨论：

1. 为什么多维表格可能是 AI Agent 很合适的业务数据底座；
2. QTable 的 **Preview → Confirm → Apply** 如何约束 AI 写操作；
3. Context Engine 如何建立真实业务上下文；
4. Multi Tool Chain Runtime 如何处理 DAG、并行、重试与回滚；
5. Grid / Kanban / Gantt 如何共享一套数据事实；
6. 为什么 Agent 的权限不能高于当前用户；
7. 开源工程里的 CI、SBOM、Provenance 与供应链信任。

如果你也在思考这些问题，欢迎直接阅读 QTable 的代码和文档，或者参与讨论。
