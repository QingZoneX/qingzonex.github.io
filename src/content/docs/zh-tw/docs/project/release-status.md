---
title: 發佈狀態
description: "QTable 目前公開原始碼狀態、Alpha 基線與發行成品邊界。"
---

QTable 目前處於 **`v0.1.0-alpha` — Open Source Preview**。

## 公開原始碼

兩個實作儲存庫目前都已公開：

- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server)
- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web)

兩者共同構成一個 QTable 產品版本。Web 前端、API / Domain Services、資料層與物件儲存應在同一相容基線上驗證。

## 發行成品狀態

目前兩個儲存庫都沒有已發佈的 GitHub Release。因此「Open Source Preview」描述的是公開 Alpha 原始碼基線，**不應被解讀為已經發佈正式 GitHub Release、Docker Hub 映像或其他穩定版成品**。映像、Tag 或 Release 只有在對應儲存庫或 Registry 實際發佈時才視為可用。

## Alpha 預期

目前基線適合原始碼評估、社群開發、Staging 與受控試用。v1.0 之前，公開 API、遷移行為、維運 Runbook 與部分產品契約仍可能調整。

正式部署前，請完成 [正式環境檢查清單](../../getting-started/production-checklist/) 並閱讀 [功能矩陣](../feature-matrix/)。
