---
title: 正式環境檢查清單
description: "評估 QTable v0.1.0-alpha 自託管部署時應執行的實際檢查。"
---

QTable `v0.1.0-alpha` 屬於 Open Source Preview。標準 Compose 可方便用於評估與受控部署，但正式環境維運仍需要明確的安全、備份與升級決策。

## 對外開放執行個體之前

### 應用與身分

- 設定 `APP_ENV=production`。
- 替換範例 `SECRET_KEY`。
- 設定穩定的 Fernet `ENCRYPTION_KEY`；共用同一資料庫的所有執行個體必須使用相同密鑰。
- 公開到網際網路前檢查最新的認證與安全發佈門檻。
- 設定 TLS 與適當的 Reverse Proxy / Gateway。
- 不要在前端環境變數或原始碼中保存真實憑證。

### 資料庫

- 一般多使用者部署使用 PostgreSQL。
- 上線前先在 staging 執行 `alembic upgrade head`。
- 一般多使用者正式環境不要依賴 SQLite 回退。
- 每次 Migration 或升級前都要建立並驗證 PostgreSQL 備份。

### 附件

- 替換開發用 MinIO/S3 憑證。
- 設定持久物件儲存與備份。
- 使用外部 S3 相容儲存時，確保 endpoint、region/TLS 與 Compose endpoint 對應一致。
- 設計備份/還原時，把資料庫與物件儲存視為同一套應用資料。

### AI

- 不設定外部 AI Provider 時，核心表格功能仍可執行。
- AI 憑證應透過 QTable 的加密 AI 設定流程保存。
- 對敏感工作空間啟用 AI 前，先確認所選 Provider 會接收哪些資料。

## 標準啟動方式

將 QTable 與 QTableUI Clone 為同層目錄，再於 QTable 執行：

```bash
cp .env.example .env
docker compose up --build -d
```

標準堆疊包含 QTable API、QTableUI、PostgreSQL、Redis 與 MinIO。

## 發佈驗證

正式環境關鍵用途之前：

1. 閱讀兩個儲存庫最新 Release Notes。
2. 查看 [發佈狀態](../../project/release-status/) 與仍開啟的發佈門檻 Issue。
3. 驗證 Fresh Install、登入、核心表寫入、Hard Refresh 持久化與權限拒絕路徑。
4. 若使用附件，驗證上傳/下載及失去權限後的拒絕行為。
5. 驗證資源回收筒 Restore / Purge。
6. 驗證一條具代表性的 Automation 與 Dashboard 路徑。
7. 在非正式環境副本實際執行一次備份與還原。
8. 記錄部署的 QTable 與 QTableUI 精確 Commit/Tag。

正式備份/還原/升級 Runbook 由 [QTable #173](https://github.com/QingZoneX/QTable/issues/173) 追蹤。在該工作關閉前，維運方應把備份還原驗證當成自己的發佈門檻。
