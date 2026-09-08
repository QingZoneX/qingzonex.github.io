---
title: 发布状态
description: "QTable 与 QTableUI 当前 Alpha 状态、已实现基线与公开发布加固项。"
---

QTable 与 QTableUI 当前标记为 **`v0.1.0-alpha` — Alpha / Open Source Preview**。

理解当前版本时应区分两层：已经实现的产品基线，以及仍在执行的发布加固门禁。

## 已实现基线

当前 main 分支包括但不限于：

- Grid、Kanban、Gantt、Calendar 与 Gallery；
- Home / My Work 与 Projects Center；
- Dashboard Center / Workbench 及权限安全的公开分享；
- Automation Engine 与 Automation Center；
- 通知、记录协作 / Activity 与 Deep Link；
- 权限感知全局搜索；
- ChangeSet 基础与真实 Recycle Bin；
- 持久私有 S3 兼容附件；
- Goal-to-workspace AI、Task/Workload/Assignment Planning、Project Steward 与安全 Action Plan；
- QNote / Clipper Source Inbox；
- OAuth2 + S256 PKCE；
- 可复现 QTableUI 容器以及标准全栈 Compose。

可通过 [功能矩阵](../feature-matrix/) 快速查看能力边界。

## 正在执行的公开 Alpha 加固

仓库刻意把发布工作保留在 GitHub Issues 中。重要活跃项包括：

- [QTable #139 — 开源就绪总门禁](https://github.com/QingZoneX/QTable/issues/139)
- [QTable #170 — Fresh Compose + 真实浏览器全栈 Release E2E](https://github.com/QingZoneX/QTable/issues/170)
- [QTableUI #102 — 私有业务数据不得进入通用 Service Worker Cache](https://github.com/QingZoneX/QTableUI/issues/102)
- [QTable #168 — Production 密码重置 fail-closed](https://github.com/QingZoneX/QTable/issues/168)
- [QTable #169 — 后端 Docker 可移植性](https://github.com/QingZoneX/QTable/issues/169)
- [QTableUI #103 — Production 浏览器安全 Header](https://github.com/QingZoneX/QTableUI/issues/103)
- [QTable #173 — 备份 / 恢复 / 升级 Runbook](https://github.com/QingZoneX/QTable/issues/173)

这些工作不等于核心产品界面不存在，而是面向更安全公开 Alpha 的 Release、Security、Operations 或 Full-stack Verification。

## Alpha 阶段适用场景

适合：

- 评估与架构审查；
- 本地 / 自托管测试；
- 社区开发；
- Staging 与受控内部试用；
- 明确进行升级验证的早期集成实验。

在把 Alpha 用于生产关键数据之前，请阅读最新 Release Notes 和活跃发布门禁，在自己的环境验证 Migration / Backup，并确认计划部署的精确 Tag / Commit。

## 生产准备

对外开放自托管实例前使用 [生产环境检查清单](../../getting-started/production-checklist/)。如果仓库 Release Notes 或 GitHub Issues 更新得更晚，以它们为准。
