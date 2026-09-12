---
title: QTable 說明文件
description: "QingZoneX 開源產品 QTable 的完整說明文件，涵蓋 Web 體驗、API 服務、自託管、安全、附件與 AI 工作流程。"
sidebar:
  order: 1
---

**QTable** 是 QingZoneX 的開源 AI 原生專案與工作管理產品，以多維表格模型承載結構化工作。

從使用者角度看，QTable 是一個完整產品；工程實作則分布於兩個公開儲存庫。兩個實作層共用 Table / Record / View / Dashboard / Permission 模型，並透過 REST / GraphQL / WebSocket / Auth / OAuth 契約協同運作。

- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) — FastAPI / Strawberry GraphQL 後端、資料模型、權限、自動化、稽核、附件、搜尋、OAuth 與 AI 服務。
- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) — React Web 應用、工作中心、Grid / Kanban / Gantt / Calendar / Gallery、儀表板、協作、自動化與 AI 互動。

兩個儲存庫目前都採用 **`v0.1.0-alpha` / Open Source Preview** 原始碼基線，並以 **Apache License 2.0** 開源。公開原始碼並不等於已發佈 GitHub Release、容器映像或其他發行成品；請參考 [發佈狀態](./project/release-status/) 區分兩者。

## 建議閱讀路徑

1. 依照 [快速開始](./getting-started/quick-start/) 在本機啟動完整 QTable。
2. 閱讀 [系統架構](./qtable/architecture/) 理解 Web、API、資料與儲存邊界。
3. 查看 [QTable 產品概覽](./qtable/overview/) 了解目前能力基線。
4. 前端實作與本機開發請參考 [Web 前端開發](./qtable-ui/development/)。
5. 對外開放部署前，檢查 [安全模型](./qtable/security/) 與 [正式環境檢查清單](./getting-started/production-checklist/)。
6. 使用 [功能矩陣](./project/feature-matrix/) 區分已實作、正在加固與未來路線圖。

:::caution[Alpha 狀態]
目前基線適合評估、社群開發、Staging 與受控試用。v1.0 之前，公開 API、遷移行為與部分產品契約仍可能調整。
:::
