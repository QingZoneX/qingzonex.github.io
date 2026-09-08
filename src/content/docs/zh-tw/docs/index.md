---
title: QTable 說明文件
description: "QingZoneX 開源產品 QTable 的完整文件，涵蓋 Web 體驗、API 服務、自託管、安全、附件與 AI 工作流程。"
sidebar:
  order: 1
---

**QTable** 是 QingZoneX 目前對外開源的產品：一個以多維表格為核心的 AI 原生專案與工作管理系統。

從使用者視角看，QTable 是一個完整產品；從工程視角看，它包含 Web 前端與 API / Domain Services 兩個實作層。兩個實作層共用同一套 Table / Record / View / Dashboard / Permission 模型，並透過 REST / GraphQL / WebSocket / Auth / OAuth 契約協同運作。

- [後端與領域服務原始碼](https://github.com/QingZoneX/QTable) — 資料模型、權限、自動化、稽核、附件、搜尋與 AI 服務。
- [Web 前端實作原始碼](https://github.com/QingZoneX/QTableUI) — 工作中心、五種檢視、儀表板、協作、自動化與 AI 互動。

目前開源預覽版本為 **`v0.1.0-alpha`**，採用 **Apache License 2.0**。

## 建議閱讀路徑

1. 依照 [快速開始](./getting-started/quick-start/) 在本機啟動完整 QTable。
2. 閱讀 [QTable 架構](./qtable/architecture/) 理解 Web、API、資料與儲存邊界。
3. 查看 [QTable 產品概覽](./qtable/overview/) 了解目前能力基線。
4. 前端實作與本機開發請參考 [前端開發](./qtable-ui/development/)。
5. 對外開放部署前，檢查 [安全模型](./qtable/security/) 與 [正式環境檢查清單](./getting-started/production-checklist/)。
6. 使用 [功能矩陣](./project/feature-matrix/) 區分已實作、正在加固與未來路線圖。

:::caution[Alpha 狀態]
目前版本適合評估、社群開發、Staging 與受控試用。v1.0 之前，公開 API、Migration 行為與部分產品契約仍可能調整。
:::
