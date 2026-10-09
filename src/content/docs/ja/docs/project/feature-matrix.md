---
title: 機能マトリクス
description: QTable v0.1.1-alpha の実装済み機能と将来の製品方向を区別する。
---

このページは `qtable-server` と `qtable-web` の現在の `v0.1.1-alpha` タグ／main の能力を基盤とし、計画中の方向を実装済みと扱わないようにします。

## 実装済み基盤

| 機能 | 現状 | 主な実装リポジトリ |
| --- | --- | --- |
| Home / My Work / Projects Center | 実装済み | qtable-web + qtable-server |
| Grid / Kanban / Gantt / Calendar / Gallery | 実装済み | qtable-web + qtable-server |
| Dashboard Center / Workbench / サーバー集約 | 実装済み | 両方 |
| Automation Center / ルール実行 / 履歴 | 実装済み | 両方 |
| Notification / Record Collaboration / Activity | 実装済み | 両方 |
| 権限を考慮した全体検索 / Recycle Bin | 実装済み | 両方 |
| プライベートな S3 互換添付のライフサイクル | 実装済み | qtable-server + qtable-web |
| Goal / Task / Workload / Project Steward の AI ワークフロー | 実装済み基盤 | 両方 |
| Source Inbox | 実装済み基盤 | 両方 |
| OAuth2 + S256 PKCE | 実装済み | qtable-server + qtable-web |

## 将来の製品計画

以降の作業はポータルを特定の GitHub Issue 番号に縛らず、製品方向として進みます。

- **リリース品質とスケール**: エンドツーエンド検証、大規模テーブル性能、リアルタイム安定性、フロントのレスポンシブ、アクセシビリティ、国際化、およびセルフホストのバックアップ・復元・アップグレード体験を継続強化。
- **開放性と統合**: フォーム／公開収集、API、Webhook、Connector、ソース取り込みを段階的に拡張し、既存の業務システムへの組み込みを容易に。
- **AI と自動化のプラットフォーム化**: BYO / Self-hosted AI、権限を考慮したエージェント、自動化オーケストレーションを拡張しつつ、Preview → Confirm → Apply の安全な書き込み経路を維持。
- **QingZoneX 製品エコシステム**: 将来の上位の仕事体験は 2 つ目のデータモデルを再構築せず、QTable の構造化データ・権限・コラボレーション・自動化を再利用。

これらは方向性の記述であり、公開日のコミットメントではなく、実装済みと説明してはいけません。利用可能な能力は常に `v0.1.1-alpha` タグ、現在のソース、実際の配布物が基準です。
