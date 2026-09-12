---
title: QTable Web 前端
description: "qtable-web 實作的 QTable Web App 產品介面、技術堆疊與安全邊界。"
---

本章節描述 **QTable Web App**。它由公開儲存庫 [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) 實作，是 QTable 的 Web 前端層，並與 [`qtable-server`](https://github.com/QingZoneX/qtable-server) 共用權限、資料與發佈契約。

## 目前產品介面

- Home / My Work / Projects Center；
- Grid / Kanban / Gantt / Calendar / Gallery；
- Dashboard Center / Workbench；
- Automation Center 與執行歷史；
- Notification Center、Record Workspace / Collaboration / Activity；
- Global Search / Command paths 與 Recycle Bin；
- AI Planning、Project Steward、安全 Action Plan 與 Source Inbox。

## 技術堆疊

- React 19
- TypeScript 7
- Vite / Rolldown
- Ant Design 6
- VTable / VTable Gantt
- Apollo Client
- Zustand
- VChart
- react-grid-layout

## 執行契約

開發伺服器預設監聽 `9100`，並將 API / GraphQL / WebSocket / Auth / OAuth 流量代理到預設監聽 `9000` 的 qtable-server。正式容器使用 Nginx 提供靜態資源、SPA 路由與安全回應標頭。

## 產品邊界

前端必須遵守 qtable-server 的權限、分頁、稽核、私有附件與 **Preview → Confirm → Apply** 契約。大型表格、AI、Dashboard 與公開分享不能從用戶端下載隱藏資料或繞過伺服器端安全邊界。
