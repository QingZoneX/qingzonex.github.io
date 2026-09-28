---
layout: ../../../layouts/BlogPostLayout.astro
title: "Self-hosted 不只是 docker compose up：QTable 如何把升級、備份、恢復與可觀測性變成系統邊界"
description: "Self-hosted 真正困難的不是把 Container 啟動起來，而是升級時知道自己改變了什麼、故障時知道遺失了什麼、備份後確認能否恢復、運行中知道系統是否真的健康。本文結合 QTable 目前 PostgreSQL / Redis / MinIO / QTable / QTableUI Compose、Alembic、Health Check、Release Gate、ChangeSet 與 Runtime Trace，整理一個 AI Native 工作系統走向長期營運所需要的邊界。"
date: "2026-09-28"
locale: "zh-tw"
slug: "self-hosted-operations-recovery"
series: "構建 QTable：一個 AI Native 工作系統的設計與實作"
seriesIndex: 10
seriesTotal: 10
sourcePath: "src/pages/zh-tw/blog/self-hosted-operations-recovery.md"
---

這是《構建 QTable：一個 AI Native 工作系統的設計與實作》的最後一篇。

前九篇一直在討論：

怎麼建立 Data Model。

怎麼讓 AI 安全寫 Business Data。

怎麼建立 Context。

怎麼執行 Tool Chain。

怎麼讓不同 View 操作同一份 Fact。

怎麼限制 Agent Permission。

怎麼建立 Open-source Supply-chain Trust。

以及怎麼把 Deterministic Work 留給 Automation Engine，而不是每次都重新交給 Model 推理。

但系統真正進入長期運行之後，問題會突然變成另一類：

**Upgrade 之後起不來怎麼辦？**

**Database 壞了怎麼辦？**

**Attachment Object 還在，但 Database Reference 不見了怎麼辦？**

**Database Restore 了，但 Encryption Key 遺失怎麼辦？**

**Container 全部顯示 Healthy，但使用者實際上已經無法完成重要 Workflow 怎麼辦？**

**一條 Automation 寫錯幾百筆 Record，應該從哪裡開始查？**

這些都不是 UI Feature。

但它們決定一個 Self-hosted 產品，到底是不是可以被長期託付 Business Data 的系統。

所以最後一篇的核心是：

> **Self-hosted 的完成標準，不是 docker compose up 成功，而是系統有清楚的 Upgrade Boundary、Recovery Boundary 和 Observability Boundary。**

## Self-hosted 的真實對象不是一個 Container

QTable 目前 canonical Compose 並不只有兩個 Application Image。

至少包含：

- PostgreSQL；
- Redis；
- MinIO；
- QTable；
- QTableUI。

QTableUI 是 Public Web Edge。

Nginx 會把 REST、GraphQL、WebSocket、Auth、OAuth Proxy 到 QTable Backend。

Backend 再依賴 PostgreSQL、Redis 和 S3-compatible Object Storage。

所以當 Operator 說：

「我要備份 QTable。」

真正要問的是：

**你說的是哪一份 State？**

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/self-hosted-operations-recovery/01-runtime-persistence-topology.svg" alt="QTable Self-hosted Runtime 拓撲：QTableUI 作為公開 Web Edge，透過 Private Network 連到 QTable API；Backend 依賴 PostgreSQL、Redis 與 S3/MinIO，canonical Compose 為服務定義 Health Check，並分別持久化 Database、Redis 與 Object Storage Volume" loading="eager" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">Self-hosted 的 Recovery Unit 不是某個 Container，而是 Database、Object Storage、Runtime Configuration、Stable Secret 與 Compatible Application Revision 共同形成的資料契約。</figcaption>
</figure>

PostgreSQL 裡有：

- Workspace；
- Table / Field / Record；
- Permission；
- ChangeSet；
- Automation Rule / Event / Execution；
- Attachment Registry；
- 以及其他 Business Metadata。

MinIO / S3 裡是 Binary Attachment Object。

Redis 目前參與 Cache、Rate Limit 等 Runtime 能力，canonical Compose 也啟用了 AOF 並使用獨立 Volume。

Application Image 則決定：

目前 Code 能理解什麼 Schema。

Alembic Head 是什麼。

GraphQL / Runtime Contract 是什麼。

Secret 與 Environment Configuration 決定：

Token 如何驗證。

Sensitive Data 如何解密。

Object Storage 去哪裡找。

因此：

**Container Image 不是系統 State 的全部。**

真正需要被長期維護的是：

**Code + Schema + Business Data + Binary Objects + Secrets + Deployment Configuration。**

## Named Volume 不是 Backup

目前 Compose 為：

- <code>postgres_data</code>；
- <code>redis_data</code>；
- <code>minio_data</code>；

建立 Named Volume。

它解決的是：

Container Recreate 之後，資料不應該跟著 Container Filesystem 一起消失。

但 Persistence 和 Backup 是不同概念。

如果 Disk 整體故障。

如果誤執行 <code>docker compose down -v</code>。

如果 Host 遺失。

如果 Application Logic 寫錯資料。

如果 Administrator 誤刪 Record。

Named Volume 都無法回答：

「我能不能回到昨天 03:00 的狀態？」

所以我會把四個概念分開。

**Persistence**

Process / Container Recreate 後，State 還在。

**Backup**

另一個 Failure Domain 裡存在可恢復副本。

**Restore**

可以把 Backup 重新組成 Running State。

**Restore Drill**

不是等 Incident 發生才第一次 Restore，而是預先證明 Recovery Path 真的可執行。

Self-hosted 只做到 Persistence，還不能叫 Disaster Recovery。

## QTable 目前最核心的 Durable State 是 PostgreSQL + Object Storage

目前 Release Guidance 已經明確建議：

Upgrade 真實 Deployment 之前，先 Backup：

1. PostgreSQL；
2. Object Storage。

這符合 QTable 的 Attachment Model。

Database 保存 Stable Attachment Reference 和 Registry Metadata。

真正 Binary Body 則在 S3-compatible Storage。

一筆 Attachment Registry 可能知道：

- attachment id；
- object key；
- table id；
- record id；
- field id；
- filename；
- size；
- content type；
- status。

但 File Bytes 不在 PostgreSQL 裡。

只備份 Database，會得到一種很危險的 Half Recovery：

UI 還能看到 Attachment Metadata。

但實際 Object 已經不存在。

反過來只 Backup MinIO 也不夠。

你只剩一堆 Object Key。

卻不知道它們屬於哪個 Workspace、Record、Field。

所以：

> **Database Backup 和 Object Backup 必須屬於同一個 Recovery Set。**

## Secret 也屬於 Recovery Boundary

有些關鍵 State 通常不在 Database Dump 裡。

Secret。

目前 Production Registry Compose 明確要求：

- <code>POSTGRES_PASSWORD</code>；
- <code>SECRET_KEY</code>；
- <code>ENCRYPTION_KEY</code>；
- Object Storage Credential。

缺少時會 Fail Closed。

這是正確的 Security Behavior。

其中 <code>ENCRYPTION_KEY</code> 特別重要。

如果某些 Business Data 依賴這個 Key 加密，而 Key 永久遺失，那麼 Database File 還在，也不等於資料可恢復。

所以 Disaster Recovery Plan 還需要回答：

Secret 存在哪裡？

誰能 Recovery？

有沒有 Version History？

Secret Recovery 是否和一般 Data Backup 分開？

Rotation 之後舊資料如何解密？

Production Secret 不應該直接打包進一般 Backup Archive。

但它必須有自己的 Recovery Path。

「安全地無法恢復」仍然是無法恢復。

## Upgrade 不是 pull 新 Image 再 restart

目前 QTable Container 的 <code>docker-entrypoint.sh</code> 很簡單。

當 <code>QTABLE_RUN_MIGRATIONS=true</code> 時：

先執行：

<code>alembic upgrade head</code>

再啟動 Uvicorn。

這對 Deployment Experience 很方便。

但從 Operations 角度，它也代表：

**Application Upgrade 可能同時是 Schema Upgrade。**

只要 Schema 或 Data Representation 已經變化，切回舊 Image 不一定等於完整 Rollback。

Old Code 可能不理解 New Schema。

Migration 也不一定具有安全的 Semantic Downgrade。

Data Migration 甚至可能已經修改 Durable Business State。

所以安全 Upgrade 應該是：

先 Lock Exact Revision。

先 Backup。

先在 Staging Restore 一份 Representative Data Copy。

在 Staging 執行 Migration。

跑 Health / Critical Flow。

確認以後才 Rollout Production。

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/self-hosted-operations-recovery/02-safe-upgrade-path.svg" alt="QTable 安全升級流程：鎖定 QTable 與 QTableUI 精確 Revision，備份 PostgreSQL、Object Storage 與 Configuration，在 Staging 恢復副本並執行 Alembic Migration，完成 Health 與 Critical Flow 驗證後才部署 Production；若升級後異常，要明確判斷 Forward Fix、Application Rollback 或 Data Restore，而不是假設換回舊 Image 就完成回滾" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">部署 Old Image 只 Rollback Code。只要 Schema 或 Data 已經改變，Recovery Strategy 就必須明確區分 Forward Fix、Application Rollback 與 Data Restore。</figcaption>
</figure>

這也是第八篇 Release Provenance 在 Operations 中真正派上用場的地方。

Production 發生問題時，需要知道：

Backend 的 Exact Revision。

Frontend 的 Exact Revision。

Image Digest。

這個 Exact Pair 是否通過 Full-stack Gate。

只知道：

「現在是 alpha。」

遠遠不夠。

Moving Tag 不是 Recovery Identity。

Exact Revision / Digest 才是。

## Migration 最危險的不只是命令失敗

QTable 現在已經有正式 Alembic History。

從 Open-source Baseline 開始，後面還包含：

OAuth Session。

Task Profile。

Board Order。

Collaboration。

Automation。

Attachment。

Activation State。

這代表 Schema Evolution 已經是一個 Long-lived Contract。

目前 Release Guidance 也明確建議：

先 Staging。

執行 <code>alembic upgrade head</code>。

再跑 Application Smoke。

最後才 Production。

這裡還應該持續強化幾個原則。

### Migration 必須和 Application Revision 綁定

不要拿不確定 Version 的 Migration Script 直接對 Production 執行。

Migration 應該來自準備部署的 Backend Revision。

### Migration 前後要記錄 Revision

不要只記：

「Command Success。」

還應該記：

From Revision。

To Revision。

Application Revision。

Execution Time。

### 不要假設 downgrade 自動安全

Alembic 支援 Downgrade Mechanism。

不表示每一個 Business Migration 都應該依賴 Reverse Migration。

某些 Failure 更適合 Forward Fix。

某些則應該 Restore Pre-upgrade Backup。

可升級不代表每一個 Data Transformation 都天然可逆。

## Full-stack Release Gate 不能取代 Production Monitoring

QTableUI 現在已經有 Full-stack Release Smoke。

它會：

Checkout Exact QTableUI Revision。

Checkout 使用者指定的 Exact QTable Backend Revision。

啟動 canonical Compose Stack。

檢查 Frontend、Backend、Redis、MinIO 的 Health。

保存 Revision Pair Evidence。

更完整的 Release E2E 還會實際測試：

Register / Login。

Record Persistence。

Filter / Sort。

Permission。

Realtime。

Collaboration。

Notification Redaction。

Access Loss。

Automation。

Dashboard。

Offline Fail Closed。

Recycle Lifecycle。

並且保存 Screenshot、Console Log 和 Browser DevTools Trace。

這些 Evidence 很重要。

但它回答的是：

> **這個 Exact Revision Pair 在 Release Environment 裡，有沒有通過我們定義的 Critical Flow？**

它不回答：

> **你的 Production 今天 14:37 是否健康？**

Release Verification 發生在發布之前。

Runtime Observability 發生在服務使用者期間。

兩個都需要。

## Health Check 只是第一層

目前 canonical Compose 已經定義 Health Check。

PostgreSQL 用 <code>pg_isready</code>。

Redis 用 <code>redis-cli ping</code>。

MinIO 有 Live Health Endpoint。

QTable 檢查 API Root。

QTableUI 有 <code>/healthz</code>。

Compose Dependency Order 也會利用這些 Health State。

Backend 等 PostgreSQL / Redis / MinIO Healthy。

Frontend 等 QTable Healthy。

這是很重要的 Operational Foundation。

但需要明確區分：

**Liveness 不等於 Readiness。**

QTable Root 能回應 Welcome Message，只代表 Process 可以回答 HTTP。

不代表：

Database Query 正常。

Redis 每一個重要操作都正常。

Object Storage 可寫。

Automation Queue 沒有 Lag。

Migration State 正確。

Critical User Flow 正常。

QTableUI 的 <code>/healthz</code> 更明確是 Liveness Probe。

Nginx Config 裡的註解甚至刻意讓它不依賴 Backend，避免 Backend 短暫 Restart 造成 Frontend Container 被一起重建。

這個 Liveness Semantic 是合理的。

但也表示未來要把：

**Liveness**

和：

**Readiness / Dependency Health**

真正拆開。

## Page 能開不等於 Business Healthy

假設：

QTableUI 200。

QTable Root 200。

PostgreSQL 也能 Connect。

但 Permission Query 大量 500。

Attachment Upload 全部 Failure。

Automation Worker 卡住。

Realtime Subscription 斷掉。

Orchestrator 可能認為所有 Container 都 Healthy。

使用者卻認為產品已經無法使用。

所以 Production Observability 最終要從：

Process Health

繼續往上：

Dependency Health。

Request Health。

Queue / Worker Health。

Business Flow Health。

Recovery Health。

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/self-hosted-operations-recovery/04-observability-layers.svg" alt="QTable 可營運性分層：目前已有 Container Liveness、Release Smoke Evidence、Application Log、Automation Trace 與 ChangeSet Business Audit；成熟 Operations Plane 還需要 Dependency-aware Readiness、Request/Queue/Database Telemetry、Metrics、Alerting、SLO、Backup Freshness 與 Restore Drill Status" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">Health Check 回答 Process 有沒有回應；真正的 Operability 還要回答產品是否正確服務、State 是否可持續、發生問題時能不能恢復。</figcaption>
</figure>

QTable 已經有一些重要的第二層 Evidence。

Automation Execution 有：

traceId。

Action Results。

ChangeSet IDs。

Error Code。

Attempt。

Record Write 有 ChangeSet。

Release Gate 有 Browser Trace。

Container 有 Log。

這些 Evidence 很重要。

因為很多 Production Incident 不是：

CPU 100%。

而是：

**系統很健康地執行了一個錯誤的 Business Action。**

Infrastructure Metrics 可能全部 Green。

真正需要知道的是：

誰 Trigger。

是不是 Agent / Automation。

哪個 Rule Version。

改了哪些 Record。

產生哪些 ChangeSet。

所以 AI Native Observability 一定不能只做 Infrastructure Metrics。

還需要 Business Audit。

## Backup 不能只問 Archive 存不存在

Backup 很容易帶來 False Confidence。

Daily Job 成功。

每天都有 Archive。

Retention 也正常。

大家就以為 Disaster Recovery 已經完成。

但真正問題應該是：

**這個 Backup 能不能恢復出可用的 QTable？**

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/self-hosted-operations-recovery/03-backup-restore-contract.svg" alt="QTable Backup / Restore Contract：Recovery Set 需要涵蓋 PostgreSQL、Object Storage、Stable Secret Recovery Path、精確 Application Release Identity 和 Deployment Configuration；Restore Drill 要在隔離環境恢復 Database 和 Object、使用 Compatible Revision 啟動系統，並驗證 Record、Permission、Attachment 和 Critical Workflow 才能證明備份可用" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">Backup 證明 Byte 存在；Restore Drill 才證明這些 Byte 可以重新組成同一套 Business System。</figcaption>
</figure>

一個有意義的 Restore Drill 至少應該驗證：

Database 可以 Import。

Alembic Revision 能辨識。

Application 能在 Compatible Revision 上 Start。

Workspace / Table / Record 數量合理。

Permission 仍然正確。

Attachment Registry 對應 Object 存在。

使用者能下載 Attachment。

Critical Flow 可以執行。

只驗證 PostgreSQL Dump 能 Import 還遠遠不夠。

## 跨 Storage 的 Backup Consistency 也很重要

假設 Restore：

昨天的 Database Backup。

今天的 Object Storage Snapshot。

兩者不一定屬於同一個 Logical Moment。

Database 可能引用某個 Snapshot 裡沒有的 Object。

Object Storage 也可能有 Database 已經不存在的 Registry 對象。

因此後面更嚴格的 Production Backup 需要概念：

Backup Timestamp。

Consistency Window。

Database Snapshot 和 Object Snapshot 的關係。

RPO。

RTO。

### RPO

最多能接受遺失多少最近資料。

15 分鐘？

1 小時？

1 天？

### RTO

故障後多久必須恢復 Service。

30 分鐘？

4 小時？

1 天？

Self-hosted Product 不需要替每個 Team 決定數字。

但應該給出清楚 Deployment Contract，讓 Operator 能有意識地設定。

## QTable 目前還沒有完整 Backup / Restore Product

這裡一定要分清楚 Current Implementation 和 Target Operating Model。

目前 Repository 已經有：

- Named Volume Persistence；
- PostgreSQL；
- S3-compatible Object Storage；
- Release Guidance 裡明確 Backup 要求；
- Alembic Migration；
- Full-stack Release Smoke；
- Runtime Health Check；
- ChangeSet / Trace Foundation。

這不等於已經有：

One-click Backup。

One-click Restore。

Scheduled Backup Manager。

Backup Catalog。

Retention Policy UI。

Point-in-time Recovery。

Automatic Restore Drill。

Backup Freshness Alert。

這篇討論的是：

**目前已經有哪些 Recovery Foundation，以及下一階段哪些 Operational Contract 應該產品化。**

不是把 Future Capability 寫成已完成。

## Object Storage Recovery 還有 Registry Consistency

QTable 的 Attachment Model 刻意保存 Stable Reference，而不是把 Temporary Presigned URL 存進 Record。

Database 裡有 Attachment Registry。

Access 時 Backend 會重新確認 Attachment 是否真的屬於預期的：

Table。

Record。

Field。

這對 Security 很重要。

Recovery 時也同樣重要。

不能只看 Bucket Object Count 就說 Restore Success。

還需要驗證：

**Database Registry Entry → Object Storage Key**

仍然成立。

未來甚至可以做 Periodic Reconciliation，找出：

Registry 指向 Missing Object。

Object 沒有 Registry 的 Orphan。

Upload Pending 超時。

Cleanup Pending 長期失敗。

Storage Integrity Signal 本身就是 Observability。

## Automation Worker 也需要 Operational Signal

上一篇介紹了目前 Database-backed Automation Runtime。

Worker 會：

Materialize Record Event。

Scan Scheduled Rule。

Process Retry。

Claim Event。

Dispatch Rule。

Runtime 已經有：

Event Lease。

Retry Lease。

<code>skip_locked</code>。

Retry State。

Execution History。

這是很好的 Reliability Foundation。

長期營運還會問：

最老 Queued Event 多久？

Waiting Retry 有多少？

過去一小時 Failed Execution Ratio？

某一條 Rule 是否持續 Failure？

Worker 最後一次 Successful Cycle 是什麼時候？

Scheduler Lag 多大？

這些 Signal 目前還沒有形成完整統一 Platform Metrics Contract。

但 Runtime State 已經足夠結構化，後面可以導出。

這也是前面幾篇一直強調：

不要只靠 Log。

先把 Runtime State Modeling 做出來。

只有 State 有結構，Metrics 才能穩定。

## AI Runtime 還需要不同於 Traditional Web 的指標

AI Native Product 會增加另一組 Operational Cost。

Traditional API 常看：

Request Rate。

Latency。

Error Rate。

CPU。

Memory。

Database Connection。

AI Runtime 還應該關心：

Model Request Latency。

Provider Failure。

Token / Cost。

Tool Failure。

Context Build Time。

Action Plan Preview / Apply Failure。

Confirmation Abandonment。

Agent Permission Denial。

Tool Chain Retry。

目前 QTable 已經有 AI Logging 和 Runtime Trace Foundation。

但不代表已經存在完整 Unified AI Telemetry Platform。

後續應該把：

Provider。

Model。

Conversation。

Tool Call。

Action Plan。

Trace。

Cost。

Latency。

Error。

連成 Operator 可以理解的 Signal。

目的不是「監控 Model」。

而是回答：

**為什麼這次 Agent Experience 變差？**

## Production Configuration 必須 Fail Closed

Self-hosted 常見問題之一，是把 Development Default 直接複製進 Production。

目前 Registry Compose 已經收緊不少地方。

Production 明確要求 Secret。

Legacy JWT Acceptance 預設關閉。

Password Reset Debug Token 關閉。

Dynamic OAuth Client Registration 關閉。

Plain PKCE 關閉。

背後原則是：

> **Production Configuration 缺失時，不應該默默退回 Insecure Development Behavior。**

Self-hosted Friendly 不等於：

所有東西都給 Default，Service 先跑起來再說。

有些條件最安全的行為就是：

拒絕啟動。

明顯 Failure

比：

在 Weak Configuration 下靜默運行三個月

安全得多。

## Public Exposure 應該預設最小化

目前 Docker Hub Deployment Guidance 已經建議：

Public 只 Exposure QTableUI。

PostgreSQL、Redis、MinIO、QTable API 預設都 Bind 到 Loopback / Private Network。

QTableUI 再 Proxy 必要 Backend Path。

這是一個很好的 Self-host Contract。

Public Service 越少：

TLS Boundary 越簡單。

Firewall 越簡單。

Credential Exposure 風險越低。

Attack Surface 越小。

好的 Self-hosted Product 應該讓 Safe Topology 成為 Default。

而不是要求每個 Operator 都自己成為 Security Engineer。

## Long-term Self-hosting 需要 Upgrade Compatibility Window

真實 Operator 不會每一版都 Upgrade。

可能跳過：

3 個 Minor Version。

6 個月。

1 年。

這會產生：

Migration Chain 還能不能走？

Old Config Key 有沒有被移除？

OAuth / Token Contract 是否變動？

Attachment Schema 是否改變？

Frontend / Backend 可以跨幾個 Version 搭配？

所以 Long-term Release Management 不能只維護 <code>VERSION</code>。

還需要逐步建立：

Upgrade Path。

Minimum Supported Source Version。

Breaking Change Note。

Migration Note。

Configuration Change。

Recovery Note。

AI Native Product 變化通常很快。

如果沒有 Upgrade Contract，Self-hosted User 最後很容易把 Version 永久 Pin 住。

因為 Upgrade 變成 Gamble。

## Release Artifact 和 Backup Artifact 是兩條 Trust Chain

第八篇談的是 Release Trust：

這個 Image 是不是來自被 Review 的 Source？

有沒有 Revision、Digest、SBOM、Provenance？

Recovery 談的是另一件事：

Business State 能不能回來？

兩者分別是：

**Software Supply-chain Trust**

和：

**Data Continuity Trust。**

成熟 Self-hosted System 兩條都需要。

Release Artifact 應該有：

Version。

Revision。

Digest。

SBOM。

Provenance。

Backup Artifact 未來應該有：

Timestamp。

Source Deployment Identity。

Database Revision。

Object Snapshot Identity。

Retention。

Encryption。

Verification Result。

甚至 Restore Drill Report 可以記：

用了哪個 QTable Image Digest。

Restore 哪個 Backup Set。

最後 Verify 哪些 Business Flow。

Incident Response 不應該靠人的記憶去拼出這些關係。

## Recoverability 應該進入 Release Engineering

QTable 接下來很重要的一條工程線，是：

**Recovery Gate。**

今天 Release Gate 主要證明：

New Revision 在 Clean Test Environment 能不能工作。

未來更強的 Gate 可以：

從 Previous Release Data Snapshot 開始。

執行 Upgrade Migration。

驗證 Business Data 還在。

驗證 Attachment 還在。

驗證 Permission 還在。

驗證 Automation History 還在。

驗證 Critical UI Flow。

甚至：

把 Backup Restore 到 Fresh Environment。

再跑同一套 Release Smoke。

到那時：

「Upgrade 安全」

就不只是 Documentation Advice。

而是 Release Engineering 真正產生的 Evidence。

## Observability 最後應該接到 Runbook

Metrics 本身不會處理 Incident。

Alert 也不會。

真正有用的是：

**Signal → Decision → Runbook。**

例如：

Database Connection Saturation。

Runbook 要告訴 Operator：

先看哪個 Dashboard。

怎麼區分 Load 和 Connection Leak。

是否可以 Safe Restart。

Automation Queue Lag。

Runbook 要告訴：

怎麼看 Worker State。

怎麼找 Oldest Event。

要不要 Disable 某條 Rule。

Attachment Storage Error。

Runbook 要告訴：

怎麼驗證 Bucket。

怎麼檢查 Credential。

怎麼看 Pending Cleanup。

Backup Stale。

Runbook 要告訴：

最後一次 Successful Backup 是什麼時候。

上一次 Restore Drill 有沒有通過。

沒有 Runbook，Alert 只是更快地告訴你：

「系統壞了。」

卻不知道下一步要做什麼。

## Self-hosted Quality 也包含「如何安全失敗」

做產品時，我們常優化 Happy Path。

Install 更簡單。

Step 更少。

Startup 更快。

但 Self-hosted 的長期價值，很大一部分其實在 Failure Path。

Migration Fail 怎麼辦。

Storage Full 怎麼辦。

Secret Wrong 怎麼辦。

Backup Incomplete 怎麼辦。

AI Provider 不可用怎麼辦。

Tool Timeout 怎麼辦。

Automation Rule 持續失敗怎麼辦。

使用者信任系統，不是因為它永遠不 Failure。

而是因為：

**Failure State 是可理解的。**

**Recovery Path 是可執行的。**

這和前九篇其實是同一條主線。

Preview → Confirm → Apply，讓 AI Write Failure 有 Control Boundary。

Tool Chain Runtime，讓 Multi-step Failure 可追蹤。

Permission Boundary，讓 Unauthorized Action 安全失敗。

Automation Retry，讓 Deterministic Execution 可恢復。

最後這篇只是把同一個思想拉到整個 Deployment：

> **System Maturity 很大一部分由它如何 Failure 決定。**

## 回頭看這十篇，QTable 真正在做什麼

第一篇問：

為什麼還要再做一個 Multidimensional Table。

第二篇回答：

Structured Field / Record / Relation 是 Agent 很好的 Business Data Foundation。

第三篇：

AI Write 不能直接成為 Fact，需要 Preview → Confirm → Apply。

第四篇：

Context 不應該只是更大的 Prompt，而要成為 System Boundary。

第五篇：

Multi Tool Call 需要 Runtime，而不是 Function List。

第六篇：

Grid、Kanban、Gantt 應該投影同一份 Business Truth。

第七篇：

Agent 不是 Administrator，Authority 不能超過 Current User。

第八篇：

Open Source 不只是 Repository Visibility，而是可驗證的 Software Supply Chain。

第九篇：

AI Native 不代表所有 Work 都交給 Model，Deterministic Rule 應該進入 Automation Runtime。

最後這篇補上：

**Self-hosted 不只是 Container Running，而是一套可以長期 Upgrade、Recover、Explain 和 Operate 的 System。**

十篇合在一起，我認為 QTable 真正想做的不是：

「有 AI 的多維表格。」

更精確一點是：

> **一個讓 Business Fact 保持 Structured，讓 AI 在 Clear Boundary 內理解與行動，讓每一次 Change 都可追蹤，而且可以被 Team 自己長期持有與營運的 Work System。**

AI Native 的重點不應該只是：

更強的 Model。

更長的 Prompt。

多一個 Copilot Button。

真正決定這類 System 能不能進入 Business Core 的，是：

Data Model。

Authorization。

Execution Boundary。

Audit。

Deterministic Runtime。

Release Trust。

Recovery。

Operability。

這些沒有 AI Demo 那麼華麗。

但它們才決定：

AI 能不能從「告訴你應該怎麼做」

走到：

「安全地真的幫你做」。

也決定 Open-source Product 能不能從：

「我能在 Laptop 跑起來」

走到：

「我敢把 Team 的長期 Business Data 放進去」。

QTable 現在還沒有完整答案。

Backup / Restore 還沒有完全 Productize。

Readiness / Metrics / Alerting 還需要補齊。

Dedicated Worker Plane 還需要演進。

Upgrade Compatibility 需要一版一版累積。

External Connector / Webhook 也還在後面。

我更願意把這些 Boundary 寫清楚。

因為真正的 Engineering Progress 不是：

把 Future Capability 提前說成完成。

而是：

**清楚知道現在站在哪裡，下一個 Boundary 還缺什麼。**

這個系列到這裡結束。

但 QTable 的 Engineering Story，才正從「把 System 做出來」，進入「讓 System 值得被運行很多年」的階段。
