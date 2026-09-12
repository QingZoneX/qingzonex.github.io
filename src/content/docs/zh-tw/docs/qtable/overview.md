---
title: QTable 產品概覽
description: "QTable v0.1.0-alpha 的產品能力，以及 qtable-web 與 qtable-server 的實作邊界。"
---

QTable 是一個完整的 AI 原生開源專案與工作管理產品。**Web 前端與伺服器端服務共同組成同一個 QTable**，共用 Table / Record / View / Dashboard / Permission 產品模型。

目前程式碼由兩個公開儲存庫維護：

- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) — QTable Web App；
- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) — API、領域服務與可信任資料安全邊界。

## QTable Web App

`qtable-web` 目前提供：

- Home / My Work / Projects Center；
- Grid / Kanban / Gantt / Calendar / Gallery；
- Dashboard Center / Workbench；
- Automation Center 與執行歷史；
- Notification Center、記錄工作區、Activity 與即時路徑；
- 權限感知全域搜尋與 Recycle Bin；
- AI Planning、Project Steward、安全 Action Plan 與 Source Inbox。

## QTable API & Domain Services

`qtable-server` 負責：

- 欄位、記錄、篩選、排序、分組、命名檢視與 Task Profile；
- Workspace、物件與列級權限；
- 自動化、Dashboard 聚合、ChangeSet、稽核與回收生命週期；
- OAuth2 + S256 PKCE；
- PostgreSQL + Redis 執行堆疊，以及 SQLite 明確輕量回退；
- 私有 S3-compatible 附件生命週期；
- 權限感知 AI 服務與 Preview → Confirm → Apply 寫入路徑。

## 一個產品契約

Web 與 API 透過 REST / GraphQL / WebSocket / Auth / OAuth 契約組合成一個自託管 QTable。前端不能繞過伺服器端權限、分頁、稽核或附件安全規則。核心表格能力不要求外部 AI Provider。

## Alpha 邊界

兩個儲存庫目前都使用 `v0.1.0-alpha` / Open Source Preview 原始碼基線。原始碼已公開，但目前兩個儲存庫都沒有已發佈的 GitHub Release；原始碼狀態與發行成品狀態應分開理解。請查看 [功能矩陣](../../project/feature-matrix/) 與 [發佈狀態](../../project/release-status/)。
