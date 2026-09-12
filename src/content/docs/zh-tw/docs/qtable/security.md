---
title: 安全模型
description: QTable 的權限、驗證、公開分享、AI 與私有附件安全邊界。
---

QTable 將 `qtable-server` 視為最終資料安全邊界，`qtable-web` 只呈現目前使用者已被授權查看與執行的能力。

## 核心不變條件

- Workspace、物件與列級權限必須在伺服器端執行。
- 搜尋、Dashboard 聚合、AI 脈絡與附件存取不能繞過相同權限模型。
- AI 寫入遵循 Preview → Confirm → Apply；Apply 時重新檢查權限與目前狀態。
- Public Dashboard 資料依發佈者目前仍可讀取的資料範圍計算。
- OAuth Public Client 使用 S256 PKCE。
- Secret 不得寫入一般表格欄位、前端環境變數或 Log。
- 私有附件的上傳、讀取、刪除與還原都必須重新檢查授權。

## Web 容器

`qtable-web` 的正式 Nginx 映像設定 CSP、`X-Content-Type-Options`、`Referrer-Policy`、點擊劫持防護與受限的 `Permissions-Policy`。網際網路入口的反向代理仍應負責 TLS、HTTP → HTTPS 與 HSTS。

## 正式環境建議

對網際網路開放 QTable 前，請閱讀 [`qtable-server/SECURITY.md`](https://github.com/QingZoneX/qtable-server/blob/main/SECURITY.md)、[`qtable-web/SECURITY.md`](https://github.com/QingZoneX/qtable-web/blob/main/SECURITY.md)、計畫部署版本的發佈證據，以及 [正式環境檢查清單](../../getting-started/production-checklist/)。
