---
title: 自託管
description: 使用 Docker Compose 執行標準 QTable 與 QTableUI 完整堆疊。
---

標準的一鍵啟動堆疊由 **QTable 後端儲存庫**維護。

將 QTable 與 QTableUI 作為同層目錄 Clone：

```text
qingzone/
├── QTable/
└── QTableUI/
```

然後執行：

```bash
cd QTable
cp .env.example .env
docker compose up --build -d
```

開啟 `http://localhost:9100`。

## 包含的服務

目前 Compose 堆疊包含：

- QTable API
- QTableUI
- PostgreSQL 16
- Redis 7
- MinIO S3 相容私有附件儲存

## 正式環境檢查

- 資料庫使用 PostgreSQL。
- 設定 `APP_ENV=production`。
- 替換範例 `SECRET_KEY`。
- 使用穩定的 `ENCRYPTION_KEY`。
- 替換範例附件儲存憑證，或設定託管 S3 相容服務。
- 為 PostgreSQL 與物件儲存設定持久備份。
- 設定 TLS 與適當的 Reverse Proxy。
- 多使用者正式環境不要使用 SQLite 回退模板。

:::caution[密鑰]
不要把真實憑證、API Key 或正式環境 `.env` 檔案提交到原始碼儲存庫。
:::
