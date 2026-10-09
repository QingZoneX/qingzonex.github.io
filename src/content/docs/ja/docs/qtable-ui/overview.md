---
title: QTable Web フロントエンド
description: "qtable-web が提供する QTable Web App の製品 UI、技術スタック、セキュリティ境界。"
---

この章は **QTable Web App** を説明します。公開リポジトリ [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) が実装する QTable 製品の Web フロント層で、[`qtable-server`](https://github.com/QingZoneX/qtable-server) と権限・データ・リリースの契約を共有します。

## 現在の製品 UI

- Home / My Work / Projects Center
- Grid / Kanban / Gantt / Calendar / Gallery
- Dashboard Center / Workbench
- Automation Center と実行履歴
- Notification Center、Record Workspace / Collaboration / Activity
- Global Search / Command paths と Recycle Bin
- AI Planning、Project Steward、安全なアクションプラン、Source Inbox

## 技術スタック

- React 19
- TypeScript 7
- Vite / Rolldown
- Ant Design 6
- VTable / VTable Gantt
- Apollo Client
- Zustand
- VChart
- react-grid-layout

## 実行契約

開発サーバーは既定で `9100` を待ち受け、API / GraphQL / WebSocket / Auth / OAuth を既定で `9000` を待ち受ける qtable-server へプロキシします。本番コンテナは Nginx で静的アセット、SPA ルーティング、セキュリティヘッダーを提供します。

## 製品の境界

フロントは qtable-server の権限・ページング・監査・プライベート添付・**Preview → Confirm → Apply** の契約を守る必要があります。大規模テーブル、AI、Dashboard、公開共有はクライアント経由で隠れたデータをダウンロードしたり、サーバーのセキュリティ境界を迂回したりできません。
