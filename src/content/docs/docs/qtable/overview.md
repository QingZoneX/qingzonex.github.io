---
title: QTable 产品概览
description: "QTable v0.1.0-alpha 的完整产品能力：Web 前端、服务端、多视图工作模型、自动化、协作、安全、附件与 AI。"
---

QTable 是一个完整的 AI 原生开源项目与工作管理产品。**Web 前端与后端服务共同组成 QTable**，共享同一套 Table / Record / View / Dashboard / Permission 产品模型。

## 产品实现层

### QTable Web App

[Web 前端实现源码](https://github.com/QingZoneX/QTableUI) 当前提供：

- Home / My Work / Projects Center；
- Grid / Kanban / Gantt / Calendar / Gallery；
- Dashboard Center / Workbench；
- Automation Center 与执行历史；
- Notification Center、记录工作区、Activity 与实时路径；
- 权限感知全局搜索与 Recycle Bin；
- AI Planning、Project Steward、Action Plan 与 Source Inbox。

### QTable API & Domain Services

[后端与领域服务源码](https://github.com/QingZoneX/QTable) 负责：

- 字段、记录、过滤、排序、分组、命名视图与 Task Profile；
- Workspace、对象与行级权限；
- 自动化、Dashboard 聚合、ChangeSet 与回收生命周期；
- OAuth2 + S256 PKCE；
- PostgreSQL + Redis 运行栈，以及 SQLite 显式轻量回退；
- 私有 S3-compatible 附件生命周期；
- 权限感知 AI 服务与安全 Preview → Confirm → Apply 写入路径。

## 一个产品契约

Web 与 API 通过 REST / GraphQL / WebSocket / Auth / OAuth 契约组合成一个自托管 QTable。前端不能绕过服务端权限、分页、审计或附件安全规则。

核心表格功能 **不要求** 配置外部 AI Provider。

## Alpha 边界

`v0.1.0-alpha` 是 Open Source Preview。当前产品基线已经覆盖主要工作面，但公开发布仍在加强浏览器级全栈 E2E、安全默认值、运维 Runbook 与大表性能。请查看 [功能矩阵](../../project/feature-matrix/) 与 [发布状态](../../project/release-status/)。
