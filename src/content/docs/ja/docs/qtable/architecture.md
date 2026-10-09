---
title: システムアーキテクチャ
description: qtable-web と qtable-server で構成される QTable のアーキテクチャ、実行サービス、ストレージ境界。
---

QTable はフロント／バックエンドを別リポジトリに分けつつ製品モデルを統一するアーキテクチャを採用します。

```text
qtable-web / QTable Web App
React 19 + TypeScript 7 + VTable + Apollo
                 │
      REST / GraphQL / WebSocket / OAuth
                 │
qtable-server / QTable API & Domain Services
FastAPI + Strawberry GraphQL
                 │
      ┌──────────┼──────────┐
      │          │          │
 PostgreSQL    Redis    S3-compatible
                         object storage
```

## Web 層: qtable-web

[`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) は最終ユーザー体験、ルーティング、ビュー描画、コラボレーション、AI ワークフロー UI を担当します。開発サーバーは既定で `9100` を待ち受け、本番イメージは Nginx で SPA・プロキシ・セキュリティヘッダーを提供します。

## サービス層: qtable-server

[`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) は既定で `9000` を待ち受け、データモデル、権限、自動化、監査、検索、添付、OAuth、AI サービスを担当します。サーバーは権限と書き込み規則の最終的な信頼境界です。

## データとランタイム

標準のセルフホストスタックは PostgreSQL 16、Redis 7、MinIO または外部の S3 互換オブジェクトストレージを使います。SQLite は明示的な軽量フォールバックのみで、本番デプロイの既定経路ではありません。

## セキュリティ境界

すべての詳細表示・検索・Dashboard 集約・添付アクセス・AI コンテキストはサーバー側の権限検証を通す必要があります。クライアントは分析や AI のために現在のユーザーに見えないデータをダウンロードできません。
