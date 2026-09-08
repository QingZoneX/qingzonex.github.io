---
title: QTable 概覽
description: "QTable v0.1.0-alpha 開源預覽的產品能力與目前範圍。"
---

QTable 是以多維表格建構的 AI 原生開源專案與工作管理後端，為 QTableUI 提供產品模型與伺服器端契約。

## 目前基線

### 表格與工作模型

- Grid / Kanban / Gantt / Calendar / Gallery 檢視模型。
- 篩選、多欄位排序、分組與命名檢視。
- Formula、Relation、Auto Number、Workspace Member、Select、Date、Attachment 等欄位類型。
- Task Profile 業務語意，以及伺服器端 My Work / 專案聚合。
- 工作空間成員、物件權限與列級權限。
- 權限感知全域搜尋。

### 執行與生命週期

- 自動化引擎：規則驗證、排程/執行與執行歷史。
- Dashboard 元件、伺服器端聚合與權限安全的公開分享。
- 以 ChangeSet 為基礎的稽核/Undo 與回收生命週期。
- OAuth 2.0 Authorization Code Flow + S256 PKCE。
- 建議 PostgreSQL + Redis；SQLite 作為明確輕量回退。

### 私有附件

附件採用 S3 相容儲存契約。表格記錄保存穩定的 `attachmentId` / `objectKey` 中繼資料，而不是暫時 presigned URL。上傳、下載與刪除會重新檢查目前表格與列權限；Recycle/Restore 保留物件身分，Purge 進入持久清理流程，Upload Intent 讓異常中斷的物件寫入可被發現並清理。

標準 Compose 包含 MinIO，也可不修改 Compose 檔案直接設定外部 S3 相容 endpoint。

### AI 工作流程

- 目標驅動 Workspace 產生。
- 任務規劃。
- 工作量 / 排程估算。
- 工作空間成員分派建議。
- AI Project Steward 診斷與問答。
- 支援差異預覽、部分接受及權限/狀態重新驗證的 AI Action Plan。
- 使用既有模型產生 View 與 Dashboard。
- 帶來源脈絡與重複提示的 QNote / Clipper Source Inbox。

核心表格功能 **不需要** 外部 AI 服務。

## Alpha 邊界

`v0.1.0-alpha` 是 Open Source Preview。目前產品基線已相當完整，但公開發佈仍在加強全端瀏覽器 E2E、維運指南、安全預設值與大型表格效能。請查看 [功能矩陣](../../project/feature-matrix/) 與 [發佈狀態](../../project/release-status/)。
