---
title: QTable 前端实现
description: "QTable Web App 的产品界面与前端技术栈；实现仓库名为 QingZoneX/QTableUI。"
---

本章节描述 **QTable 的前端实现**。代码仓库名为 [`QingZoneX/QTableUI`](https://github.com/QingZoneX/QTableUI)，但它在门户产品层级中不是独立产品；它是 QTable Web App 的工程实现。

## 当前产品界面

- Home / My Work；
- Projects Center；
- Grid / Kanban / Gantt / Calendar / Gallery；
- Dashboard Center / Workbench；
- Automation Center；
- Notification Center；
- Record Workspace / Collaboration / Activity；
- Global Search / Command paths；
- Recycle Bin；
- AI Planning、Project Steward 与安全 Action Plan；
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

## 产品边界

前端必须遵守 QTable 服务端的权限、分页、审计、私有附件与 Preview → Confirm → Apply 契约。大型表格、AI、Dashboard 与公开分享不能通过客户端绕过服务端安全边界。
