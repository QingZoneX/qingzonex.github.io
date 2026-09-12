---
title: QTable Web 前端
description: "qtable-web 提供的 QTable Web App 产品界面、技术栈与安全边界。"
---

本章节描述 **QTable Web App**。它由公开仓库 [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) 实现，是 QTable 产品的 Web 前端层，与 [`qtable-server`](https://github.com/QingZoneX/qtable-server) 共享权限、数据与发布契约。

## 当前产品界面

- Home / My Work / Projects Center；
- Grid / Kanban / Gantt / Calendar / Gallery；
- Dashboard Center / Workbench；
- Automation Center 与执行历史；
- Notification Center、Record Workspace / Collaboration / Activity；
- Global Search / Command paths 与 Recycle Bin；
- AI Planning、Project Steward、安全 Action Plan 与 Source Inbox。

## 技术栈

- React 19
- TypeScript 7
- Vite / Rolldown
- Ant Design 6
- VTable / VTable Gantt
- Apollo Client
- Zustand
- VChart
- react-grid-layout

## 运行契约

开发服务器默认监听 `9100`，并将 API / GraphQL / WebSocket / Auth / OAuth 请求代理到默认监听 `9000` 的 qtable-server。生产容器由 Nginx 提供静态资源、SPA 路由和安全响应头。

## 产品边界

前端必须遵守 qtable-server 的权限、分页、审计、私有附件与 **Preview → Confirm → Apply** 契约。大型表格、AI、Dashboard 与公开分享不能通过客户端下载隐藏数据或绕过服务端安全边界。
