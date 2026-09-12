---
title: 自託管
description: 使用 qtable-server Docker Compose 執行 qtable-web、API、PostgreSQL、Redis 與物件儲存。
---

QTable 的標準原始碼自託管路徑使用兩個同層儲存庫：`qtable-server` 與 `qtable-web`。

```text
qingzone/
├── qtable-server/
└── qtable-web/
```

在 `qtable-server` 中：

```bash
cp .env.example .env
```

將 `.env` 的 Web Build Context 改為目前儲存庫目錄：

```dotenv
QTABLE_UI_CONTEXT=../qtable-web
```

接著執行：

```bash
docker compose up --build -d
```

預設連接埠：Web `9100`、API `9000`、PostgreSQL `5432`、Redis `6379`、MinIO API `9001`、MinIO Console `9002`。除了面向使用者的 Web 服務外，標準 Compose 預設將資料面與管理端點綁定到 `127.0.0.1`。

## 正式環境

- 將 `APP_ENV` 設為 `production`；
- 使用高強度 `SECRET_KEY` 與穩定有效的 Fernet `ENCRYPTION_KEY`；
- 更換 PostgreSQL 與物件儲存憑證；
- 在反向代理設定 TLS、HTTPS 重新導向與 HSTS；
- 保持 OAuth plain PKCE、動態 Client 註冊與密碼重設 Debug Token 關閉；
- 對 PostgreSQL、物件儲存與關鍵設定執行真實備份 / 還原演練；
- 記錄實際部署的 qtable-server 與 qtable-web commit / tag。

公開原始碼不代表特定容器 Tag 已經發佈。使用預建映像前，請先確認目標 Registry 中確實存在該精確版本，且與計畫部署的原始碼基線一致。
