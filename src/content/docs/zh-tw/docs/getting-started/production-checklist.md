---
title: 正式環境檢查清單
description: "評估 QTable v0.1.1-alpha 自託管部署時應執行的實際檢查。"
---

`v0.1.1-alpha` 是 Open Source Preview。將 QTable 提供給真實使用者前，應在與正式環境拓撲一致的環境完成以下檢查。

## 版本與來源

- [ ] `qtable-server` 與 `qtable-web` 使用已共同驗證的 `v0.1.1-alpha` 標籤或精確 commit。
- [ ] 使用原始碼 Compose 時，兩個儲存庫為同層目錄，且 `.env` 包含 `QTABLE_UI_CONTEXT=../qtable-web`。
- [ ] 使用預建映像時，已確認 Registry 中確實存在目標 Tag，並記錄 digest。
- [ ] 未把「公開原始碼 / Git Tag」誤認為「已發佈 GitHub Release / 穩定版成品」。

## 設定與秘密

- [ ] `APP_ENV=production`。
- [ ] 已更換預設 `SECRET_KEY`、資料庫密碼與物件儲存憑證。
- [ ] 已設定穩定且格式正確的 Fernet `ENCRYPTION_KEY`，所有執行個體共用同一密鑰。
- [ ] OAuth plain PKCE、動態 Client 註冊與密碼重設 Debug Token 保持關閉。
- [ ] Provider API Key 不進入前端環境變數、一般表格欄位或 Log。

## 網路與瀏覽器安全

- [ ] 只公開 Web / Reverse Proxy 入口；API、PostgreSQL、Redis 與 MinIO 管理端保持私網或 Loopback-only。
- [ ] 已設定 TLS、HTTP → HTTPS 與 HSTS。
- [ ] qtable-web 的 CSP、X-Content-Type-Options、Referrer-Policy、Frame 防護與 Permissions-Policy 未被外層 Proxy 弱化。

## 產品閉環

1. 登入並驗證 Workspace / 物件 / 列級權限。
2. 實際執行 Grid、Kanban、Gantt、Calendar、Gallery 中代表性的讀寫路徑。
3. 驗證 Dashboard 聚合、公開分享及權限變更後的存取行為。
4. 驗證附件上傳 / 下載，以及失去權限後的拒絕行為。
5. 驗證 Recycle Bin Restore / Purge。
6. 驗證至少一條 Automation 規則與執行歷史。
7. 若啟用 AI，驗證 Preview → Confirm → Apply 與權限重新檢查。
8. 在非正式環境副本上實際執行一次 PostgreSQL + 物件儲存備份與還原。

正式備份 / 還原 / 升級 Runbook 由 [`qtable-server #173`](https://github.com/QingZoneX/qtable-server/issues/173) 追蹤。在該工作完成前，應把真實還原演練視為上線前置條件，而不是只確認「存在備份檔」。
