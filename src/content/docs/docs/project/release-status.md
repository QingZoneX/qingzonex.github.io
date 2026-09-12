---
title: 发布状态
description: "QTable 当前公开源码状态、Alpha 基线与发行制品边界。"
---

QTable 当前处于 **`v0.1.0-alpha` — Open Source Preview**。

## 公开源码

两个实现仓库目前都已公开：

- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server)
- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web)

它们共同构成一个 QTable 产品版本。Web 前端、API / Domain Services、数据层与对象存储需要在同一兼容基线上验证。

## 发行制品状态

当前两个仓库都没有已发布的 GitHub Release。因此，“Open Source Preview”表示公开源码 Alpha 基线，**不应被解读为已经发布了正式 GitHub Release、Docker Hub 镜像或稳定版发行物**。任何镜像、Tag 或 Release 的存在都应以对应仓库的实际发布记录为准。

## Alpha 预期

当前基线适合源码评估、社区开发、Staging 和受控试用。v1.0 之前，公开 API、迁移行为、部署 Runbook 与部分产品契约仍可能调整。

在生产部署前，请完成 [生产环境检查清单](../../getting-started/production-checklist/) 并阅读 [功能矩阵](../feature-matrix/)。
