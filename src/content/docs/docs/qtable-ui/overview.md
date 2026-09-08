---
title: QTableUI 概览
description: "QTableUI v0.1.0-alpha 开源预览的前端产品界面与技术栈。"
---

QTableUI 是 QTable 的 React 前端。当前基线已经是围绕多维表格模型构建的完整应用壳层，而不只是表格渲染器。

## 当前产品界面

- 首页 / My Work。
- 基于 Task Profile 与 My Work 语义的 Projects Center。
- Grid / Kanban / Gantt / Calendar / Gallery。
- Dashboard Center 与 Dashboard Workbench。
- 具有真实规则和执行历史的 Automation Center。
- Notification Center 与实时通知路径。
- Record Detail / Collaboration、Activity 与来源上下文。
- 全局 Command / Search。
- 支持 Restore / Purge 的 Recycle Bin。
- Settings 与 Help，不再使用主导航规划占位页。
- AI Planning、Project Steward 与 Action Workflow。
- QNote Source Inbox。

## 技术栈

- React 19
- TypeScript 6
- Vite / Rolldown
- Ant Design 6
- VTable / VTable Gantt
- Apollo Client
- Zustand
- VChart
- react-grid-layout

## 运行时

开发服务器监听 `9100`，并把 API、GraphQL、WebSocket、Auth 与 OAuth 流量代理到 `9000` 端口的 QTable。

生产容器使用 Nginx，并提供 `/healthz`。`PORT`、`QTABLE_HOST` 与 `QTABLE_PORT` 控制运行边界，仓库也保留 Rainbond 部署支持。

前端 CI 覆盖 Build / Contract 检查以及依赖安全与许可证策略，并为测试 Commit 生成依赖、许可证与 SBOM 工件。

## 安全边界

QTableUI 必须保持 QTable 的服务端安全模型：不能为了客户端 AI/分析加载隐藏行，不能绕过 Preview → Confirm → Apply，也不能用本地状态伪装服务端协作结果。大表路径应保持服务端分页与聚合。

当前 Alpha 边界请查看 [功能矩阵](../../project/feature-matrix/)。
