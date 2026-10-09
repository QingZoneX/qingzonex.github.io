---
title: QTable ドキュメント
description: "QingZoneX のオープンソース製品 QTable の完全なドキュメント。Web 体験、API サービス、セルフホスト、セキュリティ、添付ファイル、AI ワークフローを網羅します。"
sidebar:
  order: 1
---

**QTable** は QingZoneX が現在オープンソースで公開している製品です。多次元テーブルを土台にした AI ネイティブなプロジェクト／作業管理システムです。

ユーザーから見れば QTable は 1 つの完成した製品であり、エンジニアリングから見れば 2 つの公開実装リポジトリで構成されます。2 つの実装レイヤーは同じ Table / Record / View / Dashboard / Permission モデルを共有し、REST / GraphQL / WebSocket / Auth / OAuth の契約で連携します。

- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) — FastAPI / Strawberry GraphQL バックエンド、データモデル、権限、自動化、監査、添付、検索、OAuth、AI サービス。
- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) — React Web アプリ、ワークセンター、Grid / Kanban / Gantt / Calendar / Gallery、ダッシュボード、コラボレーション、自動化、AI 対話。

両リポジトリは現在 **`v0.1.1-alpha` / Open Source Preview** をソース基盤とし、**Apache License 2.0** で公開されています。リポジトリの公開は GitHub Release・Docker イメージ・その他の配布物の公開を意味しません。[リリース状況](./project/release-status/) と各リポジトリの Releases をご確認ください。

## おすすめの読み方

1. [クイックスタート](./getting-started/quick-start/) に従い、完全な QTable をローカルで起動します。
2. [QTable アーキテクチャ](./qtable/architecture/) で Web・API・データ・ストレージの境界を理解します。
3. [QTable 製品概要](./qtable/overview/) で現在の機能基盤を確認します。
4. フロント実装とローカル開発は [フロント開発](./qtable-ui/development/) を参照します。
5. 公開デプロイ前に [セキュリティモデル](./qtable/security/) と [本番チェックリスト](./getting-started/production-checklist/) を確認します。
6. [機能マトリクス](./project/feature-matrix/) で実装済み・強化中・将来計画を区別します。

:::caution[Alpha ステータス]
現在のバージョンは評価、コミュニティ開発、ステージング、制御された試用に向いています。v1.0 以前は公開 API・マイグレーション挙動・一部の製品契約が変わる可能性があります。
:::
