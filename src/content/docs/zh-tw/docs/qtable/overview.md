---
title: QTable 產品概覽
description: "QTable v0.1.0-alpha 的完整產品能力：Web 前端、伺服器端、多檢視工作模型、自動化、協作、安全、附件與 AI。"
---

QTable 是一個完整的 AI 原生開源專案與工作管理產品。**Web 前端與後端服務共同組成 QTable**，共用同一套 Table / Record / View / Dashboard / Permission 產品模型。

## 產品實作層

### QTable Web App

前端實作維護在 [`QingZoneX/QTableUI`](https://github.com/QingZoneX/QTableUI)，目前提供：

- Home / My Work / Projects Center；
- Grid / Kanban / Gantt / Calendar / Gallery；
- Dashboard Center / Workbench；
- Automation Center 與執行歷史；
- Notification Center、記錄工作區、Activity 與即時路徑；
- 權限感知全域搜尋與 Recycle Bin；
- AI Planning、Project Steward、Action Plan 與 QNote / Clipper Source Inbox。

### QTable API & Domain Services

後端實作維護在 [`QingZoneX/QTable`](https://github.com/QingZoneX/QTable)，負責：

- 欄位、記錄、篩選、排序、分組、命名檢視與 Task Profile；
- Workspace、物件與列級權限；
- 自動化、Dashboard 聚合、ChangeSet 與回收生命週期；
- OAuth2 + S256 PKCE；
- PostgreSQL + Redis 執行堆疊，以及 SQLite 明確輕量回退；
- 私有 S3-compatible 附件生命週期；
- 權限感知 AI 服務與安全 Preview → Confirm → Apply 寫入路徑。

## 一個產品契約

Web 與 API 透過 REST / GraphQL / WebSocket / Auth / OAuth 契約組合成一個自託管 QTable。前端不能繞過伺服器端權限、分頁、稽核或附件安全規則。

核心表格功能 **不要求** 設定外部 AI Provider。

## Alpha 邊界

`v0.1.0-alpha` 是 Open Source Preview。目前產品基線已覆蓋主要工作面，但公開發佈仍在加強瀏覽器級完整堆疊 E2E、安全預設值、維運 Runbook 與大型表格效能。請查看 [功能矩陣](../../project/feature-matrix/) 與 [發佈狀態](../../project/release-status/)。
