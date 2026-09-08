---
title: QTable 前端实现
description: "QTable Web App 的产品界面与前端技术栈。"
---

本章节描述 **QTable 的 Web 前端实现**。它是 QTable 产品的一部分，与 QTable API 共享权限、数据与发布契约。

[查看 Web 前端实现源码](https://github.com/QingZoneX/QTableUI)。

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
- Source Inbox。

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
