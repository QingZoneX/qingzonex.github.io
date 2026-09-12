---
title: 發佈狀態
description: "QTable 目前公開原始碼狀態、Alpha Tag 與發行成品邊界。"
---

QTable 目前公開版本為 **`v0.1.1-alpha` — Open Source Preview**。

## 公開原始碼與 Tag

兩個實作儲存庫目前都已公開，且都存在 `v0.1.1-alpha` Git tag：

- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server)
- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web)

兩者共同構成一個 QTable 產品版本。Web 前端、API / Domain Services、資料層與物件儲存應在同一相容基線上驗證。

## 發行成品狀態

截至目前，兩個儲存庫都沒有與 `v0.1.1-alpha` 對應的已發佈 GitHub Release。因此，**Git tag 已發佈不應被解讀為已經發佈 GitHub Release、Docker Hub 映像或其他穩定版成品**。映像、Release 或其他發行成品只有在對應儲存庫或 Registry 實際發佈時才視為可用。

## Alpha 預期

目前基線適合原始碼評估、社群開發、Staging 與受控試用。v1.0 之前，公開 API、遷移行為、維運 Runbook 與部分產品契約仍可能調整。

正式部署前，請完成 [正式環境檢查清單](../../getting-started/production-checklist/) 並閱讀 [功能矩陣](../feature-matrix/)。
