---
title: 發佈狀態
description: "QTable 與 QTableUI 目前 Alpha 狀態、已實作基線與公開發佈加固項。"
---

QTable 與 QTableUI 目前標記為 **`v0.1.0-alpha` — Alpha / Open Source Preview**。

理解目前版本時應區分兩層：已實作的產品基線，以及仍在執行的發佈加固門檻。

## 已實作基線

目前 main 分支包括但不限於：

- Grid、Kanban、Gantt、Calendar 與 Gallery；
- Home / My Work 與 Projects Center；
- Dashboard Center / Workbench 及權限安全的公開分享；
- Automation Engine 與 Automation Center；
- 通知、記錄協作 / Activity 與 Deep Link；
- 權限感知全域搜尋；
- ChangeSet 基礎與真實 Recycle Bin；
- 持久私有 S3 相容附件；
- Goal-to-workspace AI、Task/Workload/Assignment Planning、Project Steward 與安全 Action Plan；
- QNote / Clipper Source Inbox；
- OAuth2 + S256 PKCE；
- 可重現 QTableUI 容器與標準完整堆疊 Compose。

可透過 [功能矩陣](../feature-matrix/) 快速查看能力邊界。

## 正在執行的公開 Alpha 加固

儲存庫刻意把發佈工作保留在 GitHub Issues。重要活躍項目包括：

- [QTable #139 — 開源就緒總門檻](https://github.com/QingZoneX/QTable/issues/139)
- [QTable #170 — Fresh Compose + 真實瀏覽器全端 Release E2E](https://github.com/QingZoneX/QTable/issues/170)
- [QTableUI #102 — 私有業務資料不得進入通用 Service Worker Cache](https://github.com/QingZoneX/QTableUI/issues/102)
- [QTable #168 — Production 密碼重設 fail-closed](https://github.com/QingZoneX/QTable/issues/168)
- [QTable #169 — 後端 Docker 可移植性](https://github.com/QingZoneX/QTable/issues/169)
- [QTableUI #103 — Production 瀏覽器安全 Header](https://github.com/QingZoneX/QTableUI/issues/103)
- [QTable #173 — 備份 / 還原 / 升級 Runbook](https://github.com/QingZoneX/QTable/issues/173)

這些工作不代表核心產品介面不存在，而是面向更安全公開 Alpha 的 Release、Security、Operations 或 Full-stack Verification。

## Alpha 階段適用情境

適合：

- 評估與架構審查；
- 本機 / 自託管測試；
- 社群開發；
- Staging 與受控內部試用；
- 明確執行升級驗證的早期整合實驗。

把 Alpha 用於正式環境關鍵資料前，請閱讀最新 Release Notes 與活躍發佈門檻，在自己的環境驗證 Migration / Backup，並確認計畫部署的精確 Tag / Commit。

## 正式環境準備

對外開放自託管執行個體前使用 [正式環境檢查清單](../../getting-started/production-checklist/)。若儲存庫 Release Notes 或 GitHub Issues 更新得較晚，以它們為準。
