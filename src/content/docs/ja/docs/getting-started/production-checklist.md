---
title: 本番チェックリスト
description: "QTable v0.1.1-alpha のセルフホストデプロイを評価する際に実行すべき実地チェック。"
---

`v0.1.1-alpha` はオープンソースプレビューの Git タグです。QTable を実際のユーザーに公開する前に、本番トポロジーと一致する環境で以下のチェックを完了してください。

## バージョンと出所

- [ ] `qtable-server` と `qtable-web` が共同検証済みの `v0.1.1-alpha` タグ、またはより明示的な正確な commit を使う。
- [ ] ソースからの Compose の場合、2 つのリポジトリが隣り合い、`.env` に `QTABLE_UI_CONTEXT=../qtable-web` を設定。
- [ ] ビルド済みイメージの場合、対象タグがレジストリに実在することを確認し、digest を記録。
- [ ] 「Git タグ公開」を「GitHub Release / 安定版成果物の公開」と誤解しない。

## 設定とシークレット

- [ ] `APP_ENV=production`
- [ ] デフォルトの `SECRET_KEY`、DB パスワード、オブジェクトストレージ資格情報を変更。
- [ ] 安定した正しい形式の Fernet `ENCRYPTION_KEY` を設定し、複数インスタンスで同じキーを共有。
- [ ] OAuth plain PKCE、動的クライアント登録、パスワードリセットのデバッグトークンを無効に維持。
- [ ] プロバイダー API キーをフロント環境変数・通常のテーブルフィールド・ログに入れない。

## ネットワークとブラウザセキュリティ

- [ ] Web / リバースプロキシ入口のみ公開し、API、PostgreSQL、Redis、MinIO 管理面はプライベートネットワークまたはループバックに維持。
- [ ] TLS、HTTP → HTTPS、HSTS を設定。
- [ ] qtable-web の CSP、X-Content-Type-Options、Referrer-Policy、フレーム対策、Permissions-Policy が外部プロキシで弱められていないことを確認。

## 製品の一巡

1. ログインして Workspace / オブジェクト / 行レベルの権限を検証。
2. Grid、Kanban、Gantt、Calendar、Gallery で代表的な読み書き経路を実際に実行。
3. Dashboard 集約、公開共有、権限変更後のアクセス挙動を検証。
4. 添付のアップロード／ダウンロードと、権限喪失後の拒否を検証。
5. Recycle Bin の Restore / Purge を検証。
6. 少なくとも 1 つの自動化ルールと実行履歴を検証。
7. AI を有効化した場合、Preview → Confirm → Apply と権限の再検証を確認。
8. 非本番コピーで PostgreSQL + オブジェクトストレージのバックアップとリストアを 1 回実際に実行。

Alpha 期のバックアップ・リストア・アップグレードの Runbook は継続的に整備されます。本番デプロイでは実リストア訓練、バージョン固定、アップグレードロールバック検証を公開の前提条件とし、「バックアップファイルが存在する」ことの確認だけでは不十分です。
