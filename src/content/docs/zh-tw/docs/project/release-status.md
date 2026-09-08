---
title: QTable 發佈狀態
description: "QTable 目前 Alpha 狀態、已實作產品基線與公開發佈加固項。"
---

QTable 目前處於 **`v0.1.0-alpha` — Open Source Preview**。

目前發佈以 **QTable 單一產品版本**為單位：Web 前端、API 與領域服務、資料層和物件儲存在同一發佈基線上協同驗證。

## 已實作產品基線

目前 main 分支包括但不限於：

- Grid、Kanban、Gantt、Calendar 與 Gallery；
- Home / My Work 與 Projects Center；
- Dashboard Center / Workbench 與權限安全公開分享；
- Automation Engine / Center 與執行歷史；
- 通知、記錄協作 / Activity 與 Deep Link；
- 權限感知全域搜尋；
- ChangeSet 基礎與 Recycle Bin；
- 持久私有 S3-compatible 附件；
- Goal-to-workspace、Task / Workload / Assignment Planning、Project Steward 與安全 Action Plan；
- Source Inbox、來源脈絡與重複提示；
- OAuth2 + S256 PKCE；
- Web + API + PostgreSQL + Redis + MinIO 的標準自託管堆疊。

## 正在執行的公開 Alpha 加固

活躍發佈項目包括瀏覽器級完整堆疊 E2E、Production 密碼重設 fail-closed、Docker 可移植性、瀏覽器安全 Header、Service Worker 私有資料保護，以及備份 / 還原 / 升級 Runbook。

以上工作統一屬於 **QTable 的 Release / Security / Operations / Full-stack Verification**。

## Alpha 階段適用情境

適合評估、架構審查、本機 / 自託管測試、社群開發、Staging 與受控內部試用。正式環境關鍵資料採用前，請閱讀最新 Release Notes、驗證 Migration / Backup，並確認計畫部署的精確 Tag / Commit。

對外開放自託管執行個體前使用 [正式環境檢查清單](../../getting-started/production-checklist/)。
