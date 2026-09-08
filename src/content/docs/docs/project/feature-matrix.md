---
title: QTable 功能矩阵
description: "QTable 当前已实现能力、公开 Alpha 加固项与未来路线图边界。"
sidebar:
  order: 2
---

本矩阵以 **QTable 单一产品** 为单位描述能力。前端实现仓库 `QingZoneX/QTableUI` 与后端实现仓库 `QingZoneX/QTable` 共同交付这些产品能力。

**已实现基线** 表示能力已存在于当前产品 / main 分支，不代表 v1.0 API 稳定性。

| 产品范围 | 当前基线 | 状态 |
| --- | --- | --- |
| 表格模型 | 字段、记录、过滤、多字段排序、分组、命名视图 | 已实现基线 |
| 工作视图 | Grid、Kanban、Gantt、Calendar、Gallery | 已实现基线 |
| 工作入口 | Home / My Work、Projects Center | 已实现基线 |
| Dashboard | Center / Workbench、组件、服务端聚合、公开分享 | 已实现；体验继续增强 |
| Automation | 服务端引擎 + Automation Center + 执行历史 | 已实现基线 |
| 协作 | 通知、实时生命周期、记录协作 / Activity | 已实现；协作深度继续增强 |
| 搜索 | 权限感知全局搜索 / Command Discovery | 已实现基线 |
| 删除安全 | ChangeSet / Undo 基础 + Recycle Bin Restore / Purge | 已实现基线 |
| 私有附件 | 稳定 S3-compatible 引用、权限访问、生命周期清理、Upload Intent Recovery | 已实现；发布验证继续 |
| AI 规划 | Goal-to-workspace、Task Planning、Workload、Assignment、Project Steward | 已实现基线 |
| AI 动作 | Preview → Confirm → Apply、部分接受、权限 / 状态重新校验 | 已实现基线 |
| AI 可视化 | 使用现有模型生成 View 与 Dashboard | 已实现基线 |
| Source Inbox | QNote / Clipper、来源上下文与重复提示 | 已实现基线 |
| Identity | OAuth2 Authorization Code + S256 PKCE | 已实现；Session / Security 继续加固 |
| Self-host | Web App + API + PostgreSQL + Redis + MinIO Compose | 已实现；运维 Runbook 继续完善 |
| 轻量数据库 | 显式 SQLite 回退 | 适用于评估 / 受限单实例 |

## 正在加固

公开 Alpha 仍在推进浏览器级全栈 E2E、认证与安全默认值、Service Worker 私有数据保护、浏览器安全 Header、运维 Runbook 与大表性能。这些是 **QTable 发布质量工作**，不是第二个产品的独立路线图。

## 规划中的能力

以下能力 **不应** 描述为已交付：

- Form View / Public Form — [QTable #148](https://github.com/QingZoneX/QTable/issues/148)
- Table-as-API / Token / Webhook 平台 — [QTable #116](https://github.com/QingZoneX/QTable/issues/116)
- Skill / Connector 平台 — [QTable #117](https://github.com/QingZoneX/QTable/issues/117)
- 更完整的 Self-hosted / BYO AI Provider 平台 — [QTable #120](https://github.com/QingZoneX/QTable/issues/120)
- 语义重复检测 — [QTable #119](https://github.com/QingZoneX/QTable/issues/119)
- 完整百万行性能目标 — [QTable #104](https://github.com/QingZoneX/QTable/issues/104)

若 Release Notes 或 GitHub Issues 更新得更晚，以它们为准。
