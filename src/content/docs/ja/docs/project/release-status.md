---
title: リリース状況
description: "QTable の現在の公開ソースの状態、Alpha タグ、配布物の境界。"
---

QTable の現在の公開バージョンは **`v0.1.1-alpha` — Open Source Preview** です。

## 公開ソースとタグ

2 つの実装リポジトリはどちらも公開されており、両方に `v0.1.1-alpha` の Git タグがあります。

- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server)
- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web)

両者は 1 つの QTable 製品バージョンを構成します。Web フロント、API / Domain Services、データ層、オブジェクトストレージは同じ互換基盤で検証する必要があります。

## 配布物の状態

現時点で、どちらのリポジトリにも `v0.1.1-alpha` に対応する公開済み GitHub Release はありません。したがって **「Git タグの公開」を「GitHub Release・Docker Hub イメージ・安定版配布物の公開」と解釈してはいけません**。イメージ・Release・その他の配布物の有無は、対応するリポジトリの実際の公開記録に依ります。

## Alpha への期待

現在の基盤はソース評価、コミュニティ開発、ステージング、制御された試用に向きます。v1.0 以前は公開 API、マイグレーション挙動、デプロイ Runbook、一部の製品契約が変わる可能性があります。

本番デプロイの前に [本番チェックリスト](../../getting-started/production-checklist/) を完了し、[機能マトリクス](../feature-matrix/) を読んでください。
