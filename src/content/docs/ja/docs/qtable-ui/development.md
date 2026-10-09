---
title: Web フロント開発
description: qtable-web のローカル開発、プロキシ規約、品質ゲート。
---

QTable の Web フロント実装リポジトリは [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) です。

## ローカル開発

要件: Node.js 22 と、`http://localhost:9000` で動く qtable-server。

```bash
git clone https://github.com/QingZoneX/qtable-web.git
cd qtable-web
npm ci
npm run dev
```

開発サーバーは既定で `http://localhost:9100` を待ち受け、API / GraphQL / WebSocket / Auth / OAuth のトラフィックを qtable-server へプロキシします。

実際の資格情報をフロントの環境変数に入れないでください。npm とルートの `package-lock.json` が再現可能なインストール経路です。

## 主な品質ゲート

```bash
node scripts/check-secrets.mjs --history
node scripts/check-open-source-readiness.mjs
npm run check:dependencies
npm run check:licenses
npm run test:license-policy
npm run test:xlsx-export
npm run build
```

リポジトリには OAuth、検索、AI、Member フィールド、Source Inbox、Dashboard、Automation、添付、Service Worker の契約チェックも含まれます。コミット前はリポジトリの現在の `package.json` と CI を最終的なコマンドの出典にしてください。

## サーバーとの連携

完全なスタックが必要なら [クイックスタート](../../getting-started/quick-start/) に従って `qtable-server` と `qtable-web` を並べてクローンし、Compose の `QTABLE_UI_CONTEXT` が `../qtable-web` を指すようにします。
