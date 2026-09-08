---
title: QTable 文档
description: "QingZoneX 开源产品 QTable 的完整文档，覆盖前端体验、后端服务、自托管、安全与 AI 工作流。"
sidebar:
  order: 1
---

**QTable** 是 QingZoneX 当前对外开源的产品：一个基于多维表格构建的 AI 原生项目与工作管理系统。

QTable 在工程上由两个实现仓库共同组成：

- [`QingZoneX/QTable`](https://github.com/QingZoneX/QTable) — API、领域模型、权限、自动化、审计、附件、搜索与 AI 服务。
- [`QingZoneX/QTableUI`](https://github.com/QingZoneX/QTableUI) — QTable 的 Web 前端实现，负责工作中心、五种视图、仪表盘、协作、自动化与 AI 交互。

这两个仓库是 **同一个 QTable 产品的实现层**，不是两个独立产品。当前开源预览版本为 **`v0.1.0-alpha`**，采用 **Apache License 2.0**。

## 推荐阅读路径

1. 按照 [快速开始](./getting-started/quick-start/) 在本地启动完整 QTable。
2. 阅读 [QTable 架构](./qtable/architecture/) 理解 Web、API、数据与存储边界。
3. 查看 [QTable 产品概览](./qtable/overview/) 了解当前能力基线。
4. 前端实现与本地开发请参考 [前端开发](./qtable-ui/development/)。
5. 在对外开放部署前检查 [安全模型](./qtable/security/) 与 [生产环境检查清单](./getting-started/production-checklist/)。
6. 使用 [功能矩阵](./project/feature-matrix/) 区分已实现、正在加固与未来路线图。

:::caution[Alpha 状态]
当前版本适合评估、社区开发、Staging 与受控试用。v1.0 之前，公开 API、迁移行为与部分产品契约仍可能调整。
:::
