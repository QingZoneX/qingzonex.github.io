---
title: 功能矩阵
description: 区分 QTable v0.1.1-alpha 已实现能力、发布加固项与未来路线图。
---

本页以 `qtable-server` 与 `qtable-web` 的 `v0.1.1-alpha` 标签及当前源码为基线，避免把计划能力描述成已经交付。

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

## 正在加固

这些工作属于 Alpha 发布质量提升，不代表上述产品面不存在：

- 全栈浏览器 Release E2E — [`qtable-server #170`](https://github.com/QingZoneX/qtable-server/issues/170)
- 大表性能与实时链路 — [`qtable-server #104`](https://github.com/QingZoneX/qtable-server/issues/104)
- 自托管备份 / 恢复 / 升级 Runbook — [`qtable-server #173`](https://github.com/QingZoneX/qtable-server/issues/173)
- 前端响应式、可访问性、国际化与一致状态 — [`qtable-web #56`](https://github.com/QingZoneX/qtable-web/issues/56)

## 下一阶段

以下能力 **不应** 描述为已交付：

- Form View / Public Form — [`qtable-server #148`](https://github.com/QingZoneX/qtable-server/issues/148)
- Table-as-API / Token / Webhook 平台 — [`qtable-server #116`](https://github.com/QingZoneX/qtable-server/issues/116)
- Skill / Connector 平台 — [`qtable-server #117`](https://github.com/QingZoneX/qtable-server/issues/117)
- Self-hosted / BYO AI 标准化 — [`qtable-server #120`](https://github.com/QingZoneX/qtable-server/issues/120)
- Source Inbox 语义重复识别 — [`qtable-server #119`](https://github.com/QingZoneX/qtable-server/issues/119)

具体状态始终以对应 GitHub Issue、`v0.1.1-alpha` 标签和当前源码为准。
