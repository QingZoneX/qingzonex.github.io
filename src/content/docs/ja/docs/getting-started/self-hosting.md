---
title: セルフホスト
description: qtable-server の Docker Compose で qtable-web、API、PostgreSQL、Redis、オブジェクトストレージを実行する。
---

QTable の標準的なソースからのセルフホスト経路は、隣り合う 2 つのリポジトリ `qtable-server` と `qtable-web` を使います。

```text
qingzone/
├── qtable-server/
└── qtable-web/
```

`qtable-server` 内で:

```bash
cp .env.example .env
```

`.env` の Web ビルドコンテキストを現在のリポジトリディレクトリに変更します。

```dotenv
QTABLE_UI_CONTEXT=../qtable-web
```

その後、実行します。

```bash
docker compose up --build -d
```

既定ポート: Web `9100`、API `9000`、PostgreSQL `5432`、Redis `6379`、MinIO API `9001`、MinIO Console `9002`。Web 以外は、標準 Compose がデータ面と管理ポートを `127.0.0.1` にバインドします。

## 本番環境

- `APP_ENV` を `production` に設定
- 強力な `SECRET_KEY` と安定した有効な Fernet `ENCRYPTION_KEY` を使用
- PostgreSQL とオブジェクトストレージの資格情報を変更
- リバースプロキシで TLS、HTTPS リダイレクト、HSTS を設定
- OAuth plain PKCE、動的クライアント登録、パスワードリセットのデバッグトークンを無効のまま維持
- PostgreSQL、オブジェクトストレージ、重要設定の実バックアップ／リストア訓練を実施
- 実際にデプロイした qtable-server と qtable-web の commit / tag を記録

ソースの公開は特定のコンテナタグの公開を意味しません。ビルド済みイメージを使う前に、その正確なバージョンが対応するレジストリに存在し、デプロイ予定のソースと一致することを確認してください。
