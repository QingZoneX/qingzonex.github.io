---
layout: ../../layouts/BlogPostLayout.astro
title: "Context 不是把更多数据塞进 Prompt：QTable 的 Context Engine 如何建立真实业务上下文"
description: "Agent 真正进入业务系统后，最先要解决的不是模型能记住多少，而是它如何知道当前用户是谁、正在操作哪个 Workspace、哪张表、哪个视图、哪段会话，以及这些信息在什么权限范围内成立。本文结合 QTable 当前 Context Engine 实现，拆解业务上下文如何被构建、压缩、缓存、持久化并注入 Agent Runtime。"
date: "2026-09-27"
locale: "zh-cn"
slug: "context-engine-business-context"
series: "构建 QTable：一个 AI Native 工作系统的设计与实现"
seriesIndex: 4
seriesTotal: 10
sourcePath: "src/pages/blog/context-engine-business-context.md"
---

第三篇写到 Preview → Confirm → Apply 时，我最后留下了一个问题：

> Preview 里的那份计划，到底是建立在什么 Context 上生成的？

这个问题听起来没有“AI 自动执行工作”那么吸引人，但它其实更基础。

用户在 QTable 里说：

> “帮我看看这个项目为什么延期。”

对人来说，“这个项目”通常不难理解。我们知道自己刚刚打开了哪个 Workspace，正在看哪张表，当前是哪个 View，之前讨论过什么，也知道自己是谁。

模型不知道。

如果系统只把这句话发给模型，它面对的不是一个项目管理问题，而是一道指代消解题：

“这个项目”是哪一个？  
应该看哪张表？  
当前用户能看到哪些数据？  
刚才对话里提到的“后端任务”还算不算上下文？  
用户是在看 Kanban、Gantt，还是另一个 View？  
这次请求属于哪一个 Session、Workflow 或 Agent？

所以我越来越不喜欢“给模型更多上下文”这种说法。

真正的问题不是多，而是**上下文有没有边界、身份和坐标。**

QTable 的 Context Engine 想解决的就是这件事：在 Agent 开始推理之前，先把“谁、在哪里、面对什么业务对象、沿着哪段会话、处在哪条执行链路”整理成结构化对象。

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/context-engine-business-context/01-context-build-pipeline.svg" alt="QTable Context Engine 从请求坐标构建 ContextBuildInput，聚合身份、Workspace、Table、View、Conversation、Session、Workflow 和 Agent 信息，生成结构化 AgentContext 并注入 Tool Router" loading="eager" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">Context Engine 的目标不是把数据库内容全部拼进 Prompt，而是先建立一套明确的业务坐标系，再把它交给后续的 Tool Router、Skill Runtime 和 Agent Workflow。</figcaption>
</figure>

## “Context”首先是一组坐标，而不是一段 Prompt

QTable 当前的核心上下文模型定义在 [app/context_engine/models.py](https://github.com/QingZoneX/qtable-server/blob/main/app/context_engine/models.py)。

入口对象叫 <code>ContextBuildInput</code>。

它接收的不是一大段已经拼好的文本，而是一组非常明确的坐标：

- user；
- session / conversation；
- workspace；
- project；
- table；
- view；
- task；
- team；
- organization；
- workflow；
- agent；
- 当前 message；
- locale、timezone 和额外 metadata。

这几个 ID 看起来很普通，但它们解决了一个非常重要的问题：**系统不需要让模型自己猜“现在在哪”。**

在 QTable 当前的 AI Chat 和 Agent 路径里，[app/api/ai.py](https://github.com/QingZoneX/qtable-server/blob/main/app/api/ai.py) 会把这些信息从请求和 Header 中抽出来，构造 <code>ContextBuildInput</code>，再交给 Context Engine。

PM Agent 也走相同方向。[app/api/pm_agent.py](https://github.com/QingZoneX/qtable-server/blob/main/app/api/pm_agent.py) 会把 workspace、project、table、view、task、team、organization 等坐标带进 Context Builder，然后把生成的 <code>AgentContext</code> 交给后续 Workflow。

这意味着 Context 不是某个 Prompt 模板的私有变量。

它开始成为不同 AI 入口共享的一层产品基础设施。

## 先决定“这是谁的上下文”，再决定里面放什么

上下文最危险的一种错误，不是缺少信息，而是把不属于当前请求的信息混进来。

比如：

- A Workspace 的表结构被带进 B Workspace；
- 上一次会话的任务继续影响新会话；
- 管理员看到过的字段，进入普通成员的上下文；
- 同一个浏览器 Session 里，不同用户共用了缓存。

所以 Context Builder 的第一步不是“查询更多数据”，而是建立 <code>scopeKey</code>。

当前实现位于 [app/context_engine/repository.py](https://github.com/QingZoneX/qtable-server/blob/main/app/context_engine/repository.py)，Scope 由 user、workspace 和 session 组合出来。Session 如果没有显式 ID，会退回 conversation；再没有时才使用 anonymous。

也就是说，Context 从一开始就不是一个全局缓存对象。

它属于某个用户、某个 Workspace、某段 Session。

在此基础上，Cache Key 还会继续加入 tableIds、viewId、projectId、taskId、teamId、organizationId、workflowId、agentId，以及当前 message 的一部分，最终生成稳定 Hash。

这套 Key 设计的价值并不在“缓存命中率多高”，而在于防止两个看起来很像的请求，被错误地认为是同一份上下文。

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/context-engine-business-context/02-scope-permission-boundary.svg" alt="QTable Context Engine 先用 user、workspace、session 建立 scopeKey，再检查 Table 有效权限和行级权限，最后生成权限感知的 Table Context" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">上下文必须先有边界，再有内容。Context 可以缩小 Agent 能看到的世界，但不能凭空扩大用户权限。</figcaption>
</figure>

## Table Context 不是“把整张表交给模型”

这是我觉得很容易被误解的一点。

很多人一说“让 AI 理解当前表”，第一反应是把所有字段、所有记录序列化，然后塞进模型。

QTable 当前的 Context Builder 没有这么做。

在数据库后端下，<code>_build_table_context</code> 会先取得当前用户对 Table 的有效权限。没有 read 权限，Context 构建直接失败。

如果表启用了行级权限，它还会根据 Row Permission Policy 计算当前用户可见的 Record ID，从而得到**权限感知的 record count**。如果没有额外限制，才统计全表记录数量。

之后，Table Context 主要保留：

- 当前主 Table ID；
- 请求中的全部 tableIds；
- field count；
- 最多 12 个字段的 id / name / type 样本；
- 最多 6 个 View 样本；
- 当前用户可见范围内的 record count。

这里有一个很重要的边界：**当前 Context Engine 并没有在这一步把所有 Record 内容装进 AgentContext。**

我认为这是对的。

Context Engine 更像“告诉 Runtime 你现在在哪，以及这个地方长什么样”；真正要读取任务、订单或客户记录时，应该由具体 Tool 在明确权限下查询。

这比把整张表一次性变成 Prompt 有几个好处：

一是不会因为表越来越大，Context 无限膨胀。

二是权限边界更清楚。Tool 可以继续复用业务层的 Record / Relation / Row Permission 规则，而不是相信一份提前拼好的数据副本。

三是上下文不会轻易变成第二份事实。真正的业务数据仍然留在 Table / Record 模型里。

当然，当前实现也有一个很明确的限制：请求可以携带多个 tableIds，但详细的字段、View 和 record count 目前主要围绕第一个 Table 构建，其他 Table ID 被保存在 metadata 中。

这是现状，不应该在文章里写成“已经完整理解多表关系”。

## AgentContext 是一份结构化快照，不是一段隐藏的 System Prompt

Context Builder 聚合完成后，会生成 <code>AgentContext</code>。

这个对象目前包含：

- User；
- Project；
- Workspace；
- Table；
- Task；
- Team；
- Organization；
- View；
- Session；
- Conversation；
- Workflow；
- Agent Stack；
- Context Summary；
- Context Window；
- generatedAt。

这种结构有一个很直接的工程价值：**上下文可以被检查。**

如果 Agent 做出了奇怪判断，系统至少可以追问：

它当时认为 Workspace 是什么？  
它拿到的 Table ID 是什么？  
View 是什么？  
Conversation Summary 是什么？  
这个 Snapshot 来自哪个 Session？  
Context Window 当时用了多少预算？

这比“我们应该在某个 Prompt 里拼过这些信息”要可靠得多。

不过这里也需要把现状说清楚。

当前 Workspace、Table、View、Conversation 已经有比较具体的 Builder 逻辑；Project、Task、Team、Organization 在 Context Builder 里目前主要还是 ID 加 metadata，并没有全部从业务模型中深度解析成完整实体。

所以今天的 <code>AgentContext</code> 更像一套已经稳定下来的**上下文契约骨架**。

它把位置留好了，但不是每一种 Context 都已经同样丰富。

这正是结构化模型的好处：缺什么是显式的，后续可以逐层补充，而不是继续往一个巨大 Prompt 里追加字符串。

## 对话记忆不能靠“把历史全带上”

长对话是 Context Engine 另一个很实际的问题。

一个项目讨论十几轮之后，继续把每一条历史消息原样带给模型，成本会越来越高，而且更老的信息并不一定还值得占据相同权重。

QTable 当前的策略很朴素。

Conversation Builder 会读取会话消息，然后使用 <code>tail-window + heuristic-summary</code>：

- 最近最多 20 条消息保留为 recent turns；
- 更早的消息进入压缩区；
- 当前实现会从压缩区靠后的若干条消息生成启发式摘要；
- 摘要与 recent turns 一起进入 <code>ConversationContext</code>；
- 同时记录 original chars、compressed chars、保留数量和压缩数量。

这不是一个“AI 自动总结长期记忆”的复杂系统。

它恰恰相反：简单、可读、可预测。

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/context-engine-business-context/03-conversation-compression.svg" alt="QTable Context Engine 将较早的会话消息压缩成启发式摘要，保留最近最多 20 条消息，并用当前 6000 字符预算估算 Context Window" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">当前压缩策略故意保持简单：老消息形成摘要，最近消息保留原文，再用字符预算估算当前 Context 占用。它还不是 tokenizer 精确的模型窗口管理器。</figcaption>
</figure>

当前配置里的 <code>CONTEXT_MAX_CONVERSATION_MESSAGES</code> 是 20，<code>CONTEXT_COMPRESSION_CHAR_BUDGET</code> 是 6000。

这里我特意用“字符预算”而不是“Token Window”。

因为现在的 <code>ContextWindow</code> 计算的是 summary text 加 recent turns 的字符数量。它适合做一个稳定的内部预算指标，但并不等价于不同模型真实的 tokenizer 消耗。

如果未来 QTable 同时支持越来越多上下文窗口差异明显的模型，这一层应该继续演进成 provider / model aware 的 token budgeting，而不是假装 6000 个字符对所有模型都代表同一个成本。

## Session、Cache 和 Snapshot 解决的是三个不同问题

Context 构建如果每次都重新查所有东西，会变慢。

如果只做缓存，又会失去可追踪性。

所以当前 Context Repository 同时有三层状态：

**Redis Context Cache** 用在热路径。  
当前默认 Snapshot TTL 是 300 秒。相同 Scope 和请求坐标可以直接复用聚合后的 <code>AgentContext</code>。

**Context Session** 用来保留一段交互的连续状态。  
当前默认 Session TTL 是 86400 秒，也就是一天。Session 会保存 workspace、conversation、project、table、view、task、team、organization、workflow、agent，以及 memory summary 和最近一次 context hash。

**Context Snapshot** 用来留下构建过的上下文证据。  
在真正执行一次新的 Context Build 时，系统会把 summary、完整 snapshot、compression metadata、source 和可选 trace id 持久化到数据库。

这三层的职责不一样。

Cache 是为了快。  
Session 是为了连续。  
Snapshot 是为了知道“当时 Agent 看见了什么”。

这也是为什么我认为 Context 不应该只是 Prompt Assembly。

Prompt 发出去之后通常就消失了，而 Context Snapshot 是业务系统可以追踪的一等对象。

## Context Injector 的工作，是把业务坐标传到执行链路

Context 构建完成还不够。

如果它只停留在一个独立 Service 里，Tool Router 和 Skill Runtime 仍然会各自重新猜上下文。

所以 QTable 还有一层 [app/context_engine/injector.py](https://github.com/QingZoneX/qtable-server/blob/main/app/context_engine/injector.py)。

Injector 会把结构化 Context 写回 <code>ToolRouterRequest</code> 和 <code>ToolContextState</code>，包括：

- sessionId；
- workspaceId；
- tableIds；
- conversationId；
- projectId；
- viewId；
- taskId；
- teamId；
- organizationId；
- workflow；
- agentStack；
- contextSummary；
- contextSnapshot。

它还会把 scope、summary highlights 和 context window 放到 variables 中，并把紧凑摘要追加到 notes。

这样一来，后面的 Router、Tool Adapter、Skill Runtime 不需要每一层都重新定义“当前 Workspace 是什么”。

这比“每个 Tool 自己看 Header”更接近一个统一 Runtime。

## 但 Context Snapshot 绝对不能变成写权限

这里必须把第四篇和第三篇连起来。

Context Engine 会缓存。

当前 Snapshot Cache 默认可以存 300 秒。

这意味着一个 AgentContext 在它被构建之后，现实世界可能已经变化：

- 用户权限变了；
- Table Schema 变了；
- Row Permission 变了；
- Record 被别人修改了；
- Workspace 成员关系变了。

所以一份 Context Snapshot 可以回答：

> “这个 Agent 在做判断时，被告知自己处在什么环境里？”

它不能回答：

> “现在这一刻，这个写操作一定被允许。”

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/context-engine-business-context/04-context-not-authority.svg" alt="QTable Context Snapshot 用于推理和追踪，并通过 Redis 与数据库保存；真正写入时，业务服务仍重新检查当前权限、Schema、Relation 和 Record version" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">Context 是推理证据，不是授权凭证。缓存可以帮助 Agent 保持连续，但真正写入仍然必须回到当前业务状态重新校验。</figcaption>
</figure>

这也是上一篇 Preview → Confirm → Apply 中，Apply 一定要重新检查 Permission、Schema、Relation 和 Record version 的原因。

如果写入层直接相信 Context Snapshot，那 300 秒的 Cache 就可能变成 300 秒的越权窗口。

所以我更愿意把两层职责分开：

**Context Engine 负责“理解我现在在哪”。**

**Domain Service 负责“现在是否真的允许这样改”。**

这条边界对 Agent 很重要。

因为 AI 系统最容易犯的架构错误之一，就是把“模型知道什么”和“模型被允许做什么”混成同一个概念。

## 当前 Context Engine 还没有解决完哪些问题

我不想把这一篇写成“QTable 已经有一个完整的企业级 Context Platform”。

还没有。

当前实现已经把骨架搭起来，但仍有几个明显的下一步。

第一，**Project / Task / Team / Organization Context 还比较浅。**  
现在它们主要依赖请求中的 ID 和 metadata。后续应该由对应领域服务解析成真正业务实体，而且仍然经过权限过滤。

第二，**多 Table Context 还需要继续丰富。**  
当前详细 Table Context 主要围绕第一张表构建。真正的跨表 Agent 需要理解 Relation 图，而不是只保存一个 tableIds 列表。

第三，**Conversation Compression 还是启发式。**  
它简单可靠，但无法判断某条很早的消息是不是项目中的关键约束。后续需要更稳定的长期记忆策略，同时不能让模型生成的摘要悄悄取代原始事实。

第四，**Cache Invalidation 目前主要依赖 Key 和 TTL。**  
如果 Schema、权限或关键业务状态变化，未来应该考虑基于版本、事件或领域变更主动失效，而不是只等 300 秒过去。

第五，**Context Window 现在是字符预算。**  
要真正优化不同模型的上下文成本，还需要进入 tokenizer、模型窗口、工具调用预算甚至多阶段上下文分配。

这些不是缺点清单，而是这层架构真正开始工作之后自然暴露出来的工程问题。

至少现在，它们已经有一个明确的位置可以继续演进。

## 好的 Context Engine，不应该让用户感觉到它存在

最终用户不会在意 <code>ContextBuildInput</code>、<code>scopeKey</code> 或 <code>ContextSnapshot</code>。

他们只会感觉：

“我刚才明明在看这个项目，为什么 AI 还要问我是哪一个？”

或者：

“我已经说了三遍后端优先，为什么它突然忘了？”

或者更糟：

“为什么 AI 看到了我不应该看到的数据？”

所以一个好的 Context Engine，最理想的状态其实是没有存在感。

用户继续在 Workspace、Table、View、Conversation 里工作。

Context Engine 默默把这些产品状态转成 Agent 能理解的业务坐标，同时保留权限边界和追踪证据。

Agent 不需要假装“记得一切”。

它只需要在每一次推理开始之前，拿到**这一次真正相关、属于当前用户、可以被解释的 Context。**

这也是我现在对 Context 的核心判断：

> **Context 不是给模型更多信息，而是告诉模型：你是谁、你在哪、你正在处理什么，以及你看到这些东西的边界是什么。**

有了这层坐标，下一步才轮到 Runtime 真正执行工作。

下一篇我会继续写 QTable 的 **Multi Tool Chain Runtime**：当一个请求需要多个 Tool 连成 DAG，出现并行、依赖、重试、失败和回滚时，Agent Runtime 怎么避免退化成一串不可控的函数调用。
