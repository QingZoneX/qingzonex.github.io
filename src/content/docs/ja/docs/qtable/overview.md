---
title: QTable 製品概要
description: "QTable v0.1.1-alpha の全機能と、qtable-web と qtable-server の実装境界。"
---

QTable は完全な AI ネイティブのオープンソースのプロジェクト／作業管理製品です。**Web フロントとサーバーが一体となって 1 つの QTable を構成し**、Table / Record / View / Dashboard / Permission モデルを共有します。

現在のコードは 2 つの公開リポジトリで管理されています。

- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) — QTable Web App
- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) — API、ドメインサービス、データセキュリティ境界

## QTable Web App

`qtable-web` は現在以下を提供します。

- Home / My Work / Projects Center
- Grid / Kanban / Gantt / Calendar / Gallery
- Dashboard Center / Workbench
- Automation Center と実行履歴
- Notification Center、レコードワークスペース、Activity、リアルタイム経路
- 権限を考慮した全体検索と Recycle Bin
- AI Planning、Project Steward、安全なアクションプラン、Source Inbox

## QTable API & Domain Services

`qtable-server` は以下を担当します。

- フィールド、レコード、フィルター、並べ替え、グループ、名前付きビュー、Task Profile
- Workspace・オブジェクト・行レベルの権限
- 自動化、Dashboard 集約、ChangeSet、監査、ごみ箱のライフサイクル
- OAuth2 + S256 PKCE
- PostgreSQL + Redis スタックと、明示的な SQLite の軽量フォールバック
- プライベートな S3 互換の添付ライフサイクル
- 権限を考慮した AI サービスと Preview → Confirm → Apply の書き込み経路

## 1 つの製品契約

Web と API は REST / GraphQL / WebSocket / Auth / OAuth の契約で 1 つのセルフホスト QTable に結合します。フロントはサーバーの権限・ページング・監査・添付セキュリティ規則を迂回できません。中核のテーブル機能は外部 AI プロバイダーの設定を必要としません。

## Alpha の境界

両リポジトリは現在 `v0.1.1-alpha` / Open Source Preview を基盤とします。リポジトリは公開されていますが、公開済みの GitHub Release はまだありません。ソースの状態と配布物の状態は分けて理解してください。[機能マトリクス](../../project/feature-matrix/) と [リリース状況](../../project/release-status/) をご覧ください。
