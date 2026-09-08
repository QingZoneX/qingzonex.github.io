---
title: QTable 功能矩陣
description: "QTable 目前已實作能力、公開 Alpha 加固項與未來路線圖邊界。"
sidebar:
  order: 2
---

本矩陣以 **QTable** 作為唯一產品邊界。Web 前端、API 與領域服務、資料層和物件儲存共同交付這些能力。

**已實作基線** 表示能力已存在於目前產品 / main 分支，不代表 v1.0 API 穩定性。

| 產品範圍 | 目前基線 | 狀態 |
| --- | --- | --- |
| 表格模型 | 欄位、記錄、篩選、多欄位排序、分組、命名檢視 | 已實作基線 |
| 工作檢視 | Grid、Kanban、Gantt、Calendar、Gallery | 已實作基線 |
| 工作入口 | Home / My Work、Projects Center | 已實作基線 |
| Dashboard | Center / Workbench、元件、伺服器端聚合、公開分享 | 已實作；體驗持續增強 |
| Automation | 伺服器端引擎 + Automation Center + 執行歷史 | 已實作基線 |
| 協作 | 通知、即時生命週期、記錄協作 / Activity | 已實作；協作深度持續增強 |
| 搜尋 | 權限感知全域搜尋 / Command Discovery | 已實作基線 |
| 刪除安全 | ChangeSet / Undo 基礎 + Recycle Bin Restore / Purge | 已實作基線 |
| 私有附件 | 穩定 S3-compatible 引用、權限存取、生命週期清理、Upload Intent Recovery | 已實作；發佈驗證持續 |
| AI 規劃 | Goal-to-workspace、Task Planning、Workload、Assignment、Project Steward | 已實作基線 |
| AI 動作 | Preview → Confirm → Apply、部分接受、權限 / 狀態重新驗證 | 已實作基線 |
| AI 視覺化 | 使用既有模型產生 View 與 Dashboard | 已實作基線 |
| Source Inbox | 來源脈絡、擷取入口與重複提示 | 已實作基線 |
| Identity | OAuth2 Authorization Code + S256 PKCE | 已實作；Session / Security 持續加固 |
| Self-host | Web App + API + PostgreSQL + Redis + MinIO Compose | 已實作；維運 Runbook 持續完善 |
| 輕量資料庫 | 明確 SQLite 回退 | 適用評估 / 受限單一執行個體 |

## 正在加固

公開 Alpha 仍在推進瀏覽器級完整堆疊 E2E、認證與安全預設值、Service Worker 私有資料保護、瀏覽器安全 Header、維運 Runbook 與大型表格效能。以上均屬於 **QTable 發佈品質工作**。

## 規劃中的能力

以下能力 **不應** 描述為已交付：

- Form View / Public Form — [QTable #148](https://github.com/QingZoneX/QTable/issues/148)
- Table-as-API / Token / Webhook 平台 — [QTable #116](https://github.com/QingZoneX/QTable/issues/116)
- Skill / Connector 平台 — [QTable #117](https://github.com/QingZoneX/QTable/issues/117)
- 更完整的 Self-hosted / BYO AI Provider 平台 — [QTable #120](https://github.com/QingZoneX/QTable/issues/120)
- 語意重複偵測 — [QTable #119](https://github.com/QingZoneX/QTable/issues/119)
- 完整百萬列效能目標 — [QTable #104](https://github.com/QingZoneX/QTable/issues/104)

若 Release Notes 或 GitHub Issues 更新得較晚，以它們為準。
