---
title: QTable 发布状态
description: "QTable 当前 Alpha 状态、已实现产品基线与公开发布加固项。"
---

QTable 当前处于 **`v0.1.0-alpha` — Open Source Preview**。

发布由两个实现仓库共同完成：`QingZoneX/QTable` 负责后端服务，`QingZoneX/QTableUI` 负责 Web 前端。门户把它们视为 **一个 QTable 产品的同一发布面**。

## 已实现产品基线

当前 main 分支包括但不限于：

- Grid、Kanban、Gantt、Calendar 与 Gallery；
- Home / My Work 与 Projects Center；
- Dashboard Center / Workbench 与权限安全公开分享；
- Automation Engine / Center 与执行历史；
- 通知、记录协作 / Activity 与 Deep Link；
- 权限感知全局搜索；
- ChangeSet 基础与 Recycle Bin；
- 持久私有 S3-compatible 附件；
- Goal-to-workspace、Task / Workload / Assignment Planning、Project Steward 与安全 Action Plan；
- QNote / Clipper Source Inbox；
- OAuth2 + S256 PKCE；
- Web + API + PostgreSQL + Redis + MinIO 的标准自托管栈。

## 正在执行的公开 Alpha 加固

活跃发布项包括浏览器级全栈 E2E、Production 密码重置 fail-closed、Docker 可移植性、浏览器安全 Header、Service Worker 私有数据保护以及备份 / 恢复 / 升级 Runbook。

这些工作属于 **QTable 的 Release / Security / Operations / Full-stack Verification**，不意味着另有一个独立前端产品尚未完成。

## Alpha 阶段适用场景

适合评估、架构审查、本地 / 自托管测试、社区开发、Staging 与受控内部试用。生产关键数据采用前，请阅读最新 Release Notes，验证 Migration / Backup，并确认计划部署的精确 Tag / Commit。

对外开放自托管实例前使用 [生产环境检查清单](../../getting-started/production-checklist/)。
