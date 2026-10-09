---
title: コントリビューションガイド
description: qtable-server、qtable-web、ポータルの間で正しいコントリビューション先を選ぶ。
---

QTable は 1 つの製品ですが、コードは実装境界に従って別々のリポジトリで保守されています。Issue や Pull Request を送る前に、その機能を担当するリポジトリを選んでください。

## qtable-server

API、データモデル、権限、自動化、添付、監査、検索、OAuth、AI サービスを変更する場合は [`QingZoneX/qtable-server` の CONTRIBUTING.md](https://github.com/QingZoneX/qtable-server/blob/main/CONTRIBUTING.md) を読んでください。

サーバーの変更は権限・マイグレーション・監査・アトミック書き込み・互換性の契約を保つ必要があります。

## qtable-web

ワークセンター、ビュー、Dashboard、Automation、コラボレーション、検索、アクセシビリティ、i18n、AI 対話を変更する場合は [`QingZoneX/qtable-web` の CONTRIBUTING.md](https://github.com/QingZoneX/qtable-web/blob/main/CONTRIBUTING.md) を読んでください。

フロントリポジトリにはビルド、依存関係、セキュリティ、ライセンス、コンテナ、製品契約のチェックが含まれます。

## ポータルとドキュメント

ポータルの内容は簡体字中国語・繁体字中国語・英語を同時に保守し、公開リポジトリの現在のソース、バージョンファイル、Release 状態、Issues を事実の出典とします。ロードマップの機能を実装済みと書かず、公開ソースの状態を公開済み配布物と同一視しないでください。
