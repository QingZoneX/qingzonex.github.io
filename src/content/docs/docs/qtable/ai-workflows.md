---
title: AI 工作流
description: QTable 如何基于现有产品模型与用户控制组织 AI 规划和执行流程。
---

QTable 的 AI 能力与手工操作共用 Table / View / Dashboard / Permission 模型。

典型路径：

```text
描述目标
   ↓
生成 Workspace / Tables
   ↓
规划任务
   ↓
估算工作量与排期
   ↓
建议负责人
   ↓
诊断项目风险
   ↓
预览并应用动作
```

## Preview → Confirm → Apply

AI Action Plan 保持变更过程显式可控：

1. AI 只能读取当前用户有权看到的上下文。
2. 生成结构化 Action Plan。
3. Preview 不修改业务数据。
4. 用户可以检查并只接受部分计划。
5. Apply 会重新校验权限以及乐观/并发状态。

## Provider 配置

当前代码支持 OpenAI-compatible 与 DeepSeek-compatible 路径。API Key 通过应用内加密 AI 配置流程保存，而不是提交到源码。

不配置外部 AI Provider 时，核心表格功能仍可使用。
