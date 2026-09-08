---
title: QTableUI 概覽
description: "QTableUI v0.1.0-alpha 開源預覽的前端產品介面與技術堆疊。"
---

QTableUI 是 QTable 的 React 前端。目前基線已經是圍繞多維表格模型建立的完整應用殼層，而不只是表格 renderer。

## 目前產品介面

- 首頁 / My Work。
- 以 Task Profile 與 My Work 語意為基礎的 Projects Center。
- Grid / Kanban / Gantt / Calendar / Gallery。
- Dashboard Center 與 Dashboard Workbench。
- 具有真實規則與執行歷史的 Automation Center。
- Notification Center 與即時通知路徑。
- Record Detail / Collaboration、Activity 與來源脈絡。
- 全域 Command / Search。
- 支援 Restore / Purge 的 Recycle Bin。
- Settings 與 Help，不再使用主要導覽規劃占位頁。
- AI Planning、Project Steward 與 Action Workflow。
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

## 執行環境

開發伺服器監聽 `9100`，並把 API、GraphQL、WebSocket、Auth 與 OAuth 流量代理到 `9000` 連接埠的 QTable。

正式環境容器使用 Nginx，並提供 `/healthz`。`PORT`、`QTABLE_HOST` 與 `QTABLE_PORT` 控制執行邊界，儲存庫也保留 Rainbond 部署支援。

前端 CI 涵蓋 Build / Contract 檢查以及相依性安全與授權政策，並為測試 Commit 產生相依性、授權與 SBOM 工件。

## 安全邊界

QTableUI 必須維持 QTable 的伺服器端安全模型：不能為用戶端 AI/分析載入隱藏列、不能繞過 Preview → Confirm → Apply，也不能用本機狀態假裝伺服器端協作結果。大型表格路徑應維持伺服器端分頁與聚合。

目前 Alpha 邊界請查看 [功能矩陣](../../project/feature-matrix/)。
