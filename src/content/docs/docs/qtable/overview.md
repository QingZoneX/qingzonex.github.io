---
title: QTable 产品概览
description: "QTable v0.1.1-alpha 的完整产品能力，以及 qtable-web 与 qtable-server 的实现边界。"
---

QTable 是一个完整的 AI 原生开源项目与工作管理产品。**Web 前端与服务端共同组成同一个 QTable**，共享 Table / Record / View / Dashboard / Permission 产品模型。

当前代码由两个公开仓库维护：

- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) — QTable Web App；
- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) — API、领域服务与数据安全边界。

## QTable Web App

`qtable-web` 当前提供：

- Home / My Work / Projects Center；
- Grid / Kanban / Gantt / Calendar / Gallery；
- Dashboard Center / Workbench；
- Automation Center 与执行历史；
- Notification Center、记录工作区、Activity 与实时路径；
- 权限感知全局搜索与 Recycle Bin；
- AI Planning、Project Steward、安全 Action Plan 与 Source Inbox。

## QTable API & Domain Services

`qtable-server` 负责：

- 字段、记录、过滤、排序、分组、命名视图与 Task Profile；
- Workspace、对象与行级权限；
- 自动化、Dashboard 聚合、ChangeSet、审计与回收生命周期；
- OAuth2 + S256 PKCE；
- PostgreSQL + Redis 运行栈，以及 SQLite 显式轻量回退；
- 私有 S3-compatible 附件生命周期；
- 权限感知 AI 服务与 Preview → Confirm → Apply 写入路径。

## 一个产品契约

Web 与 API 通过 REST / GraphQL / WebSocket / Auth / OAuth 契约组合成一个自托管 QTable。前端不能绕过服务端权限、分页、审计或附件安全规则。核心表格能力不要求配置外部 AI Provider。

## Alpha 边界

两个仓库当前都已发布 `v0.1.1-alpha` / Open Source Preview Git tag。源码仓库已经公开，但当前没有已发布的 GitHub Release；Git tag 状态与发行制品状态必须分开理解。请查看 [功能矩阵](../../project/feature-matrix/) 与 [发布状态](../../project/release-status/)。
