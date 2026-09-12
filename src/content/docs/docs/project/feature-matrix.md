---
title: 功能矩阵
description: 区分 QTable v0.1.1-alpha 已实现能力与未来产品方向。
---

本页以 `qtable-server` 与 `qtable-web` 当前 `v0.1.1-alpha` Tag / 主干能力为基线，避免把规划方向描述成已经交付。

## 已实现基线

| 能力 | 当前状态 | 主要实现仓库 |
| --- | --- | --- |
| Home / My Work / Projects Center | 已实现 | qtable-web + qtable-server |
| Grid / Kanban / Gantt / Calendar / Gallery | 已实现 | qtable-web + qtable-server |
| Dashboard Center / Workbench / 服务端聚合 | 已实现 | 两者 |
| Automation Center / 规则执行 / 历史 | 已实现 | 两者 |
| Notification / Record Collaboration / Activity | 已实现 | 两者 |
| 权限感知全局搜索 / Recycle Bin | 已实现 | 两者 |
| 私有 S3-compatible 附件生命周期 | 已实现 | qtable-server + qtable-web |
| Goal / Task / Workload / Project Steward AI 工作流 | 已实现基线 | 两者 |
| Source Inbox | 已实现基线 | 两者 |
| OAuth2 + S256 PKCE | 已实现 | qtable-server + qtable-web |

## 未来产品规划

接下来的工作按产品方向持续推进，而不是在门户中绑定具体 GitHub Issue 编号：

- **发布质量与规模化**：继续强化端到端验证、大表性能、实时稳定性、前端响应式、可访问性、国际化，以及自托管备份、恢复和升级体验。
- **开放接入与集成**：逐步扩展表单/公开采集、API、Webhook、Connector 与来源接入能力，让 QTable 更容易接入现有业务系统。
- **AI 与自动化平台化**：扩展 BYO / Self-hosted AI、权限感知 Agent 与自动化编排，同时坚持 Preview → Confirm → Apply 的安全写入路径。
- **QingZoneX 产品生态**：未来更高层的工作体验将复用 QTable 的结构化数据、权限、协作与自动化能力，而不是重复建设第二套数据模型。

这些内容是方向性规划，不代表承诺发布日期，也不应被描述为已经交付。当前可用能力始终以 `v0.1.1-alpha` Tag、当前源码和实际发布制品为准。
