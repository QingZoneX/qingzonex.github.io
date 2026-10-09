---
title: セキュリティモデル
description: QTable の権限、認証、公開共有、AI、プライベート添付のセキュリティ境界。
---

QTable は `qtable-server` をデータセキュリティの最終境界とし、`qtable-web` は現在のユーザーに許可された内容だけを表示・実行します。

## 中核の不変条件

- Workspace・オブジェクト・行レベルの権限はサーバーで実行します。
- 検索、Dashboard 集約、AI コンテキスト、添付アクセスは同じ権限モデルを迂回できません。
- AI の書き込みは Preview → Confirm → Apply に従い、Apply 時に権限と現在の状態を再検証します。
- Public Dashboard のデータは公開者がなお読み取れる範囲で計算されます。
- OAuth Public Client は S256 PKCE を使います。
- シークレットを通常のテーブルフィールド・フロントの環境変数・ログに書いてはいけません。
- プライベート添付のアップロード・読み取り・削除・復元は必ず認可を再確認します。

## Web コンテナ

`qtable-web` の本番 Nginx イメージは CSP、`X-Content-Type-Options`、`Referrer-Policy`、クリックジャッキング対策、制限付き `Permissions-Policy` を設定します。公開入口では TLS、HTTP → HTTPS、HSTS をリバースプロキシが担うべきです。

## 本番環境の推奨

公開デプロイの前に [`qtable-server/SECURITY.md`](https://github.com/QingZoneX/qtable-server/blob/main/SECURITY.md)、[`qtable-web/SECURITY.md`](https://github.com/QingZoneX/qtable-web/blob/main/SECURITY.md)、デプロイ予定バージョンのリリースノートを読み、[本番チェックリスト](../../getting-started/production-checklist/) を完了してください。
