---
title: 功能矩陣
description: 區分 QTable v0.1.0-alpha 已實作能力、發佈加固項目與未來路線圖。
---

本頁以目前 `qtable-server` 與 `qtable-web` 主幹為基線，避免把規劃能力描述成已交付。

## 已實作基線

| 能力 | 狀態 | 主要實作 |
| --- | --- | --- |
| Home / My Work / Projects Center | 已實作 | qtable-web + qtable-server |
| Grid / Kanban / Gantt / Calendar / Gallery | 已實作 | qtable-web + qtable-server |
| Dashboard Center / Workbench / 伺服器端聚合 | 已實作 | 兩者 |
| Automation Center / 規則執行 / 歷史 | 已實作 | 兩者 |
| Notification / Record Collaboration / Activity | 已實作 | 兩者 |
| 權限感知全域搜尋 / Recycle Bin | 已實作 | 兩者 |
| 私有 S3-compatible 附件生命週期 | 已實作 | qtable-server + qtable-web |
| Goal / Task / Workload / Project Steward AI 工作流程 | 已實作基線 | 兩者 |
| Source Inbox | 已實作基線 | 兩者 |
| OAuth2 + S256 PKCE | 已實作 | qtable-server + qtable-web |

## 正在加固

這些工作屬於 Alpha 發佈品質提升，不代表上述產品介面不存在：

- 完整堆疊瀏覽器 Release E2E — [`qtable-server #170`](https://github.com/QingZoneX/qtable-server/issues/170)
- 大表效能與即時鏈路 — [`qtable-server #104`](https://github.com/QingZoneX/qtable-server/issues/104)
- 自託管備份 / 還原 / 升級 Runbook — [`qtable-server #173`](https://github.com/QingZoneX/qtable-server/issues/173)
- 前端響應式、可及性、國際化與一致狀態 — [`qtable-web #56`](https://github.com/QingZoneX/qtable-web/issues/56)

## 下一階段

以下能力 **不應** 描述為已交付：

- Form View / Public Form — [`qtable-server #148`](https://github.com/QingZoneX/qtable-server/issues/148)
- Table-as-API / Token / Webhook 平台 — [`qtable-server #116`](https://github.com/QingZoneX/qtable-server/issues/116)
- Skill / Connector 平台 — [`qtable-server #117`](https://github.com/QingZoneX/qtable-server/issues/117)
- Self-hosted / BYO AI 標準化 — [`qtable-server #120`](https://github.com/QingZoneX/qtable-server/issues/120)
- Source Inbox 語意重複辨識 — [`qtable-server #119`](https://github.com/QingZoneX/qtable-server/issues/119)

具體狀態始終以目前原始碼與對應 GitHub Issue 為準。
