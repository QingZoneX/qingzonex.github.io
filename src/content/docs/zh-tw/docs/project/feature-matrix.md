---
title: 功能矩陣
description: 區分 QTable v0.1.1-alpha 已實作能力與未來產品方向。
---

本頁以目前 `qtable-server` 與 `qtable-web` 的 `v0.1.1-alpha` Tag / 主幹能力為基線，避免把規劃方向描述成已交付。

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

## 未來產品規劃

接下來的工作以產品方向持續推進，而不是在入口網站綁定具體 GitHub Issue 編號：

- **發佈品質與規模化**：持續強化端到端驗證、大表效能、即時穩定性、前端響應式、可及性、國際化，以及自託管備份、還原與升級體驗。
- **開放接入與整合**：逐步擴展表單/公開收集、API、Webhook、Connector 與來源接入能力，讓 QTable 更容易接入既有業務系統。
- **AI 與自動化平台化**：擴展 BYO / Self-hosted AI、權限感知 Agent 與自動化編排，同時維持 Preview → Confirm → Apply 的安全寫入路徑。
- **QingZoneX 產品生態**：未來更高層的工作體驗將共用 QTable 的結構化資料、權限、協作與自動化能力，而不是重複建立第二套資料模型。

這些內容屬於方向性規劃，不代表承諾發佈日期，也不應被描述為已經交付。目前可用能力始終以 `v0.1.1-alpha` Tag、目前原始碼與實際發佈成品為準。
