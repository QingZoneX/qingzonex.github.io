---
title: QTable 說明文件
description: "QingZoneX 開源產品 QTable 的完整文件，涵蓋前端體驗、後端服務、自託管、安全與 AI 工作流程。"
sidebar:
  order: 1
---

**QTable** 是 QingZoneX 目前對外開源的產品：一個基於多維表格建構的 AI 原生專案與工作管理系統。

QTable 在工程上由兩個實作儲存庫共同組成：

- [`QingZoneX/QTable`](https://github.com/QingZoneX/QTable) — API、領域模型、權限、自動化、稽核、附件、搜尋與 AI 服務。
- [`QingZoneX/QTableUI`](https://github.com/QingZoneX/QTableUI) — QTable 的 Web 前端實作，負責工作中心、五種檢視、儀表板、協作、自動化與 AI 互動。

這兩個儲存庫是 **同一個 QTable 產品的實作層**，不是兩個獨立產品。目前開源預覽版本為 **`v0.1.0-alpha`**，採用 **Apache License 2.0**。

## 建議閱讀路徑

1. 按照 [快速開始](./getting-started/quick-start/) 在本機啟動完整 QTable。
2. 閱讀 [QTable 架構](./qtable/architecture/) 理解 Web、API、資料與儲存邊界。
3. 查看 [QTable 產品概覽](./qtable/overview/) 了解目前能力基線。
4. 前端實作與本機開發請參考 [前端開發](./qtable-ui/development/)。
5. 對外開放部署前檢查 [安全模型](./qtable/security/) 與 [正式環境檢查清單](./getting-started/production-checklist/)。
6. 使用 [功能矩陣](./project/feature-matrix/) 區分已實作、正在加固與未來路線圖。

:::caution[Alpha 狀態]
目前版本適合評估、社群開發、Staging 與受控試用。v1.0 之前，公開 API、遷移行為與部分產品契約仍可能調整。
:::
