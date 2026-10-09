---
title: クイックスタート
description: 公開リポジトリ qtable-server と qtable-web を使って完全な QTable をローカルで起動する。
---

## 1. 2 つの実装リポジトリをクローン

2 つのリポジトリを同じ親ディレクトリに置きます。

```bash
git clone https://github.com/QingZoneX/qtable-server.git
git clone https://github.com/QingZoneX/qtable-web.git
```

ディレクトリは次のようになります。

```text
qingzone/
├── qtable-server/
└── qtable-web/
```

## 2. サーバーの Compose を設定

```bash
cd qtable-server
cp .env.example .env
```

現在のサーバー Compose は旧ディレクトリ構成向けの互換デフォルトを保つため、現在の公開リポジトリ名を使う場合は `.env` に明示的に設定します。

```dotenv
QTABLE_UI_CONTEXT=../qtable-web
```

ローカル開発では `.env.example` の開発用資格情報をそのまま使えます。共有環境や公開環境では `SECRET_KEY` と添付ストレージの資格情報を変更し、安定した `ENCRYPTION_KEY` を設定してください。

## 3. 完全なスタックを起動

```bash
docker compose up --build -d
```

`http://localhost:9100` を開きます。Web がユーザー向け入口で、API、PostgreSQL、Redis、MinIO は既定でローカルループバックにのみバインドされます。

## 4. 検証

```bash
docker compose ps
curl -fsS http://localhost:9100/healthz
```

中核のテーブル機能は外部 AI プロバイダーの設定を必要としません。AI が必要な場合は QTable の暗号化 AI 設定フローでプロバイダー資格情報を設定し、実際の API キーをフロントの環境変数やリポジトリファイルに書かないでください。

デプロイの詳細は [セルフホスト](../self-hosting/) と [本番チェックリスト](../production-checklist/) をご覧ください。
