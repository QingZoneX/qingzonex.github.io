---
title: QTable 概览
description: "QTable v0.1.0-alpha 开源预览的产品能力与当前范围。"
---

QTable 是基于多维表格构建的 AI 原生开源项目与工作管理后端，为 QTableUI 提供产品模型和服务端契约。

## 当前基线

### 表格与工作模型

- Grid / Kanban / Gantt / Calendar / Gallery 视图模型。
- 过滤、多字段排序、分组与命名视图。
- Formula、Relation、Auto Number、Workspace Member、Select、Date、Attachment 等字段类型。
- Task Profile 业务语义，以及服务端 My Work / 项目聚合。
- 工作空间成员、对象权限与行级权限。
- 权限感知全局搜索。

### 运行与生命周期

- 自动化引擎：规则校验、调度/执行与执行历史。
- Dashboard 组件、服务端聚合与权限安全的公开分享。
- 基于 ChangeSet 的审计/Undo 基础与回收生命周期。
- OAuth 2.0 Authorization Code Flow + S256 PKCE。
- 推荐 PostgreSQL + Redis；SQLite 作为显式轻量回退。

### 私有附件

附件采用 S3 兼容存储契约。表记录保存稳定的 `attachmentId` / `objectKey` 元数据，而不是临时 presigned URL。上传、下载和删除会重新检查当前表与行权限；Recycle/Restore 保留对象身份，Purge 进入持久清理流程，Upload Intent 让异常中断的对象写入可被发现并清理。

标准 Compose 包含 MinIO，也可以不修改 Compose 文件直接配置外部 S3 兼容 endpoint。

### AI 工作流

- 目标驱动的 Workspace 生成。
- 任务规划。
- 工作量 / 排期估算。
- 工作空间成员分配建议。
- AI Project Steward 诊断与问答。
- 支持差异预览、部分接受及权限/状态重新校验的 AI Action Plan。
- 使用现有模型生成 View 与 Dashboard。
- 带来源上下文和重复提示的 QNote / Clipper Source Inbox。

核心表格功能 **不需要** 外部 AI 服务。

## Alpha 边界

`v0.1.0-alpha` 是 Open Source Preview。当前产品基线已经较完整，但公开发布仍在加强全栈浏览器 E2E、运维指南、安全默认值与大表性能。请查看 [功能矩阵](../../project/feature-matrix/) 与 [发布状态](../../project/release-status/)。
