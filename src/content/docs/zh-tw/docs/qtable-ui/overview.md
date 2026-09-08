---
title: QTable 前端實作
description: "QTable Web App 的產品介面與前端技術堆疊；實作儲存庫名為 QingZoneX/QTableUI。"
---

本章節描述 **QTable 的前端實作**。程式碼儲存庫名為 [`QingZoneX/QTableUI`](https://github.com/QingZoneX/QTableUI)，但它在入口網站產品層級中不是獨立產品；它是 QTable Web App 的工程實作。

## 目前產品介面

- Home / My Work；
- Projects Center；
- Grid / Kanban / Gantt / Calendar / Gallery；
- Dashboard Center / Workbench；
- Automation Center；
- Notification Center；
- Record Workspace / Collaboration / Activity；
- Global Search / Command paths；
- Recycle Bin；
- AI Planning、Project Steward 與安全 Action Plan；
- QNote Source Inbox。

## 技術堆疊

- React 19
- TypeScript 6
- Vite / Rolldown
- Ant Design 6
- VTable / VTable Gantt
- Apollo Client
- Zustand
- VChart
- react-grid-layout

## 產品邊界

前端必須遵守 QTable 伺服器端的權限、分頁、稽核、私有附件與 Preview → Confirm → Apply 契約。大型表格、AI、Dashboard 與公開分享不能透過用戶端繞過伺服器端安全邊界。
