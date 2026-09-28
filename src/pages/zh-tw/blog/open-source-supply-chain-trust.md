---
layout: ../../../layouts/BlogPostLayout.astro
title: "開源不是把倉庫設成 Public：QTable 如何用 CI、SBOM、Provenance 建立供應鏈信任"
description: "程式碼公開只是第一步。使用者真正執行的是 Dependency、Container Image 與 Release Artifact。本文結合 QTable / QTableUI 目前的 CI、Dependency Audit、CycloneDX SBOM、Trivy、BuildKit Provenance、OCI Metadata、Image Digest 與 Full-Stack Release Gate，拆解一份開源 Source 如何變成可以追溯與驗證的發布制品，以及目前仍未完全閉環的地方。"
date: "2026-09-28"
locale: "zh-tw"
slug: "open-source-supply-chain-trust"
series: "構建 QTable：一個 AI Native 工作系統的設計與實作"
seriesIndex: 8
seriesTotal: 10
sourcePath: "src/pages/zh-tw/blog/open-source-supply-chain-trust.md"
---

第一篇寫 QTable 為什麼要開源時，我提過一句：

**開源對 QTable 來說不是發布方式，而是產品約束。**

當時列了幾個很具體的問題。

Docker Image 從哪一個 Commit 建出來？

Dependency 裡有沒有已知漏洞？

Release Artifact 有沒有 SBOM 和 Provenance？

如果今天重新回到這些問題，我會再加一個更直接的問題：

> **你看到的 Source Code，和你真正執行的那個 Image，中間到底發生了什麼？**

這其實就是 Software Supply Chain Trust 最核心的地方。

一個 Repository 公開，不代表 Docker Hub 上的某個 Image 一定來自這個 Repository。

一份 CI Workflow 存在，不代表它真的在這次 Release 對應的 Revision 上成功跑過。

一個 Image Tag 叫 <code>0.1.2-alpha</code>，也不代表它永遠不會指向另一份內容。

甚至有一份 SBOM，也不自動代表 Dependency Resolution 是 Deterministic，更不代表這份 SBOM 對應的就是你現在執行的那個 Artifact。

所以第八篇我不想只從「什麼是 SBOM」開始。

我更在意的是：

**一個使用者能不能從 Release Artifact，一路追溯回 Reviewed Source；一個 Maintainer 又有沒有留下足夠的機器證據，讓這個過程不依賴一句「相信我」。**

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/open-source-supply-chain-trust/01-source-to-artifact-chain.svg" alt="從精確 Source Commit、CI Evidence、Dependency 與 License Audit、Container Vulnerability Scan，到帶有 SBOM、Provenance、OCI Revision 和 Digest 的發布制品，構成供應鏈信任鏈" loading="eager" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">開源讓 Source 可以被閱讀；Supply Chain Evidence 要解決的是另一件事：把「這份 Source」和「你真正執行的 Artifact」可靠地連起來。</figcaption>
</figure>

## CI 最重要的不是「綠了」，而是「哪一個 Revision 綠了」

很多專案會把 CI Badge 放在 README 最上面。

這當然有用。

但對 Release 來說，「目前 main 是綠的」遠遠不夠。

假設：

- Commit A 通過測試；
- Commit B 改了一段 Permission Logic；
- Release Tag 指向 Commit B；
- README Badge 仍然顯示綠色。

這個 Badge 對 Commit B 並沒有提供證據。

所以 QTable 目前的 Release Draft 很強調 **exact-revision evidence**。

正式 Release Record 應該保存：

- QTable 完整 40 字元 Commit SHA；
- QTableUI 完整 40 字元 Commit SHA；
- 對應這兩個 Revision 的 CI Run；
- Full-Stack E2E / Smoke 對應的 Revision Pair；
- 最終 Image Digest；
- Image 裡的 OCI Revision。

這也是為什麼目前 <code>v0.1.2-alpha</code> 的 Release Note 仍然明確標記為 **DRAFT / NOT YET RELEASED**。

Workflow 已經存在，不等於 Release Gate 已經通過。

這個區別我很想保留：

> **CI Definition 是規則；CI Run 才是證據。**

QTable 目前 Backend CI 和 QTableUI Frontend CI 都還是顯式的 <code>workflow_dispatch</code> Gate，而不是每個 PR / main push 都自動消耗 Runner。

這代表 Release Orchestration 還沒有完全自動化。

但至少不會把「Repository 裡有一份 YAML」誤寫成「所有 Revision 都已驗證」。

對 Alpha 階段，我更願意先把 Evidence 語意寫清楚，再一步一步把整個 Release Flow 自動化。

## Dependency 問題其實至少有四個不同問題

「Dependency Security」常被說成一件事。

其實至少是四件事。

第一，**最後到底安裝了什麼版本？**

第二，**這些版本有沒有已知漏洞？**

第三，**這些套件的 License 能不能進入你的 Distribution？**

第四，**你能不能把最後安裝結果交給別人檢查？**

Lockfile、Vulnerability Audit、License Policy、SBOM 分別回答不同問題。

它們不能互相取代。

QTableUI 目前這一側的 Deterministic Installation Path 比較完整。

Repository 裡有 <code>package-lock.json</code>。

CI 使用 <code>npm ci</code>。

Docker Build 也使用 <code>npm ci --ignore-scripts</code>，不會在建 Image 時重新自由解析一輪 Dependency Version。

Frontend CI 同時執行：

- <code>npm audit</code>；
- Dependency License Gate；
- <code>npm sbom --sbom-format=cyclonedx</code>；
- 把 Audit JSON 與 CycloneDX SBOM 當作 CI Artifact 上傳。

這幾件事的分工很清楚。

Lockfile 約束「裝什麼」。

Audit 檢查「已知風險」。

License Gate 檢查「能不能合法分發」。

SBOM 則記錄「這次環境最後解析出了什麼」。

Backend 的狀態更值得寫，因為它正處在遷移階段。

<code>requirements.in</code> 是人工維護的 Direct Dependency Policy，目前大多數 Dependency 仍使用開放 Version Range。

<code>requirements.txt</code> 只是一個 Compatibility Shim，內容只有：

<code>-r requirements.in</code>

同時專案已經有 PEP 751 Lock Policy 和 <code>refresh_python_lock.py</code>，目標輸出是 <code>pylock.toml</code>。

但目前 Source Tree 裡 **還沒有 materialize 這份 pylock.toml**。

也就是說，Backend 已經知道 Deterministic Resolution 應該怎麼做，Policy Checker 也已經能驗證它，但目前 Release Dependency Graph 還沒有完全鎖定。

這件事不能因為有 SBOM 就忽略。

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/open-source-supply-chain-trust/02-dependency-evidence.svg" alt="QTableUI 使用 package-lock 與 npm ci，並執行 Vulnerability、License 與 CycloneDX SBOM；QTable Backend 已有 pip-audit、pip-licenses、CycloneDX 與 PEP 751 Lock Policy，但目前 pylock.toml 尚未進入 Source Tree" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">SBOM 是 Inventory，Lockfile 是 Resolution Constraint，Audit 是 Risk Check。它們回答的是不同問題。</figcaption>
</figure>

Backend CI 目前的 <code>audit_python_dependencies.py</code> 會做幾件事。

先執行 <code>pip check</code>，確認 Installed Distribution 沒有破損或 Dependency Conflict。

再用 <code>pip-audit</code> 做 Vulnerability Audit。

接著用 <code>pip-licenses</code> 產生 License Inventory，並對 AGPL、SSPL、Business Source License、Commons Clause 等需要顯式 Policy Review 的 License 做阻擋。

最後用 <code>cyclonedx-py</code> 產生 CycloneDX SBOM。

這些 Evidence 會被上傳成 CI Artifact。

我很喜歡的一個細節是，Audit Tool 自己也沒有完全 Floating。

<code>requirements-audit.txt</code> 裡的 <code>pip-audit</code>、<code>cyclonedx-bom</code>、<code>pip-licenses</code> 都是 Exact Pin。

因為 Scanner 本身升級之後改變判斷邏輯，也會改變 Release Evidence。

## SBOM 不是「安全證明」，比較像一張可查詢的貨物清單

SBOM 這幾年很容易被做成 Security Badge。

但它真正的角色更樸素，也更有用。

如果一個 Image 裡有：

- Python Package A；
- Node Package B；
- OpenSSL C；
- Nginx D；

SBOM 解決的是：

**這些東西到底是什麼，版本是多少。**

之後出現新的 CVE 時，Maintainer 不需要靠記憶回答：

「我們應該沒有用到吧？」

而是可以直接查 Release 對應的 SBOM。

但 SBOM 本身不會證明：

這份 Artifact 一定來自某個 Git Commit。

它也不會證明：

Dependency 一定按照固定 Lockfile 解析。

更不會自動證明：

這份 SBOM 本身沒有被替換。

所以真正的 Supply Chain Trust 還必須繼續往 Artifact Identity 和 Provenance 走。

## QTable 的 Docker Publish 已經不只是 <code>docker build &amp;&amp; docker push</code>

目前 Backend 和 QTableUI 都有自己的 Docker Publication Workflow。

裡面已經有幾個很重要的約束。

第一是 **Release Identity Validation**。

Workflow 會讀 Repository 裡的 <code>VERSION</code>。

Tag Publish 要求 Git Tag <code>vX.Y.Z</code> 和 VERSION 完全一致。

QTableUI 還會額外檢查 <code>package.json</code>、Root <code>package-lock.json</code> Version 和 VERSION 是否一致。

只要不一致就直接失敗。

第二是 **Publication Authorization**。

即使 Push 了 <code>v*</code> Tag，也不是自動就可以把 Image 公開發布。

目前 Workflow 還要求：

<code>DOCKERHUB_PUBLISH_ENABLED=true</code>

否則 Tag Run 會被阻擋。

Docker Hub Token 也透過 Secret 注入，不會寫進 Source。

這讓「建立 Tag」和「授權公開發布」成為兩個不同動作。

第三是 **正式 Publish 前先 Build Local Image 做 Vulnerability Gate**。

Backend 和 QTableUI Release Workflow 都先 Build 當前 Exact Revision 的 Local Image。

接著用 Trivy 掃 OS / Library Vulnerability。

目前 HIGH 或 CRITICAL 會讓 Workflow Fail。

通過後才進 Multi-Architecture Build。

第四是 **正式 Release Build 會重新指定 Official Upstream Source**。

這是 QTable 比較特殊的一個工程條件。

為了讓 Rainbond 和部分受限網路的無參數 Source Build 可以工作，兩個 Dockerfile 的 Default Base Image / Registry 都比較偏向可直接存取的 Mirror。

但正式 Docker Hub Release Workflow 會顯式改回：

Backend：

- <code>python:3.11-slim</code>；
- Official PyPI。

QTableUI：

- <code>node:22-alpine</code>；
- <code>nginx:alpine</code>；
- Official npm Registry。

也就是說：

**「受限網路下可以 Build」和「官方 Release Artifact 使用哪一條 Upstream Supply Chain」是刻意分開的。**

這比 README 寫一句「使用官方 Image」更可信，因為 Release Workflow 自己重新宣告了 Build Input。

## Provenance 想回答的是：誰，在什麼條件下，把這個 Artifact 建出來

SBOM 比較像在回答「裡面有什麼」。

Provenance 更接近回答：

「這個 Artifact 是怎麼來的？」

QTable / QTableUI 目前的 Publish Workflow 都在 <code>docker/build-push-action</code> 上設定：

<code>sbom: true</code>

以及：

<code>provenance: mode=max</code>

同時 Image 也會寫入 OCI Metadata：

- source；
- license；
- version；
- revision；
- created time。

其中最重要的是 <code>org.opencontainers.image.revision</code>。

它把 Build Artifact 和 <code>github.sha</code> 連起來。

再加上 Build Output Digest，就可以形成：

**Source Commit → Build Evidence → Image Digest**

不過這裡有一個很容易混淆的地方。

**Provenance 不等於 Signature。**

BuildKit Provenance 可以描述 Build Process 和 Material。

但目前 QTable Release Path 還沒有一套獨立而清楚的 Consumer Verification Policy，去定義：

哪一個 Identity、Signing Key 或 Keyless Mechanism 才算 QingZoneX 官方授權的 Artifact。

目前也還沒有看到 Cosign / Sigstore Signing 成為 Release Gate。

所以現在更準確的說法應該是：

> QTable 的 Release Path 已經開始生成 SBOM 與 Provenance Evidence，但 Artifact Signing 和 Consumer-side Verification 還沒有完整閉環。

這比把 <code>provenance: mode=max</code> 寫成「Supply Chain Security 已完成」更準確。

## Tag 適合人讀，Digest 才更接近穩定的 Artifact Identity

Docker Tag 很方便。

<code>0.1.2-alpha</code> 很容易理解。

<code>alpha</code> 適合 Channel。

穩定版以後也可能有 <code>latest</code>。

但 Tag 本質上是一個名字。

有些 Tag 是 Moving Pointer。

如果一份 Production Audit Record 只寫：

「我們部署的是 <code>qingzonex/qtable:alpha</code>。」

幾個月後可能已經無法還原當時真正使用的是哪一個 Manifest。

真正穩定的 Artifact Identity 應該是 Digest。

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/open-source-supply-chain-trust/03-tags-digests-release-record.svg" alt="Git Tag 和 Docker Tag 是人類友善的 Release Label，而 Image Digest、完整 Source Commit、OCI Revision、SBOM、Provenance 與 CI Run 一起構成可審計的 Release Record" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">Tag 解決可讀性，Digest 解決不可變身份。正式 Release Record 應該同時保留兩者，而不是只記一個 Moving Tag。</figcaption>
</figure>

QTable 目前 Release Draft 也明確要求：

正式發布後，記錄 Backend / Frontend 兩個 Application Image 的 Digest 和 OCI Revision Label。

同時保存完整 Source SHA。

這比「Release 名字叫 0.1.2-alpha」多了非常多可以驗證的資訊。

我希望之後 Deployment Documentation 還可以再往前一步。

對需要 Audit 的環境，Compose / Helm / GitOps Example 應該優先支援 Digest Pin。

因為「發布時知道 Digest」和「部署時真正用 Digest」是兩個不同成熟度。

## Full-Stack Release Gate 解決的是「兩個正確元件放在一起還正不正確」

QTable 不是單 Repository、單 Binary 的產品。

Backend 和 QTableUI 有各自獨立的 CI。

但兩個 Repository 分別通過，不代表組合之後一定通過。

API Contract、Migration、Nginx Proxy、WebSocket、Redis、PostgreSQL、Object Storage、Runtime Environment 都可能只在組合以後出問題。

所以 QTableUI 目前還有一個 <code>Full-Stack Release Smoke</code>。

它要求顯式輸入一個 **exact QTable revision**。

Workflow 本身則執行在 Exact QTableUI Revision。

接著 Checkout 指定 Backend Revision，並記錄：

- QTableUI SHA；
- QTable SHA；
- Requested Backend Revision；
- Event / Ref。

然後拉起 Canonical Compose Stack。

檢查：

- QTableUI Health；
- Backend Health；
- MinIO Health；
- Redis；
- Compose Service State。

最後上傳 Revision Evidence 和 Smoke Artifact。

這解決了 Supply Chain 裡一個很容易被忽略的問題：

**Release 不只是每一個 Component 各自正確，還要知道哪一組 Component Revision 曾經一起被驗證。**

未來如果再增加 Connector、Worker、Agent Runtime Service，現在的 Revision Pair 可能會變成 Revision Set。

## Dependabot 解決的是「Dependency 會變」，不是「變更可以自動信任」

Backend 和 Frontend 現在都有 Dependabot。

Backend 追蹤：

- pip；
- GitHub Actions；
- Docker。

Frontend 追蹤：

- npm；
- GitHub Actions；
- Docker。

這很重要，因為 Supply Chain Security 不可能只做一次。

今天沒有 CVE，不代表下週還沒有。

但自動開 Update PR 只代表：

「有一個可 Review 的變更入口。」

不能變成：

「Bot 開的，所以可以直接 Merge。」

尤其 GitHub Actions 和 Docker Base Image，本身就是 Build System 的一部分。

Action Upgrade 可能改變 Permission、Artifact Behavior、Cache 或 External Access。

Base Image Upgrade 可能改變 OS Package 和 Runtime Behavior。

所以 Dependabot 的價值是建立穩定 Review Surface，不是取消 Review。

## 現在的鏈已經有內容，但還沒有完全閉環

從目前 Workflow 來看，QTable 的 Supply Chain Engineering 已經不是空白。

但距離「任何人都可以獨立驗證 Release」還有幾個很明確的缺口。

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/open-source-supply-chain-trust/04-supply-chain-maturity.svg" alt="QTable 目前已有 Dependency Vulnerability 與 License Gate、Secret Scan、Trivy、SBOM、Provenance、OCI Metadata、Image Digest 與 Exact-Revision Full-Stack Smoke；仍需要補齊 Python Lock、Action 與 Base Image 不可變 Pin、Artifact Signing Verification，以及長期 Release Evidence" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">Supply Chain Trust 不是一個 Checkbox。現在更重要的是讓整條鏈變得更 Deterministic、更 Immutable、更 Durable，也更容易被別人獨立驗證。</figcaption>
</figure>

### 1. Backend Python Lock 還沒有真正落地

PEP 751 Lock Generation、Validation Logic 和 Release Require-Lock Policy 都已經存在。

但 <code>pylock.toml</code> 不在目前 Source Tree。

這代表同一份 <code>requirements.in</code> 在不同時間解析，仍然可能得到不同的 Transitive Version。

如果希望「一個 Source Revision」更接近「一份可以 Review 的 Dependency Graph」，這件事必須閉環。

### 2. GitHub Actions 與 Base Image 還大量使用可移動 Version Tag

目前 Workflow 裡可以看到：

<code>actions/checkout@v7</code>

<code>actions/setup-python@v7</code>

<code>docker/build-push-action@v7</code>

以及：

<code>python:3.11-slim</code>

<code>node:22-alpine</code>

<code>nginx:alpine</code>

這些 Version Tag 很實用，也有 Dependabot 追蹤。

但它們不是 Full Action Commit SHA / Image Digest。

從 Strict Reproducibility 角度，同一個 QTable Commit 在不同時間重新 Build，外部 Build Input 還是可能變。

下一步可以逐步把 Critical Action Pin 到 Full Commit，把 Release Base Image Pin 到 Digest，同時保留 Readable Version Comment。

### 3. Provenance 已經有，但 Signing / Verification Policy 還不完整

現在已經有 BuildKit SBOM 和 Provenance。

下一步應該進一步定義：

官方 Artifact 用什麼 Identity 簽。

Consumer 用什麼指令驗證。

Release Page 要提供什麼 Verification Instruction。

Deployment Automation 是否在 Rollout 前強制 Verify。

如果沒有 Consumer Verification Path，Attestation 還比較像「證據存在」，而不是「每個使用者都知道怎麼驗證」。

### 4. CI Evidence Retention 對正式 Release 仍然偏短

Backend Dependency Evidence、Frontend Dependency Audit、Full-Stack Release Smoke Artifact 目前多處使用 14 天 Retention。

對一般 PR 很合理。

對正式 Release 不夠長。

Release Evidence 最好和 Release Record 長期綁定，或複製到 Immutable Long-Term Storage。

不然半年以後，Tag 和 Image 還在，但支撐 Release Claim 的 Artifact 已經過期。

### 5. Release Gate 目前還需要人工編排

Backend CI、Frontend CI、Full-Stack Smoke、Tag、Publish Authorization 現在都是清楚但分散的 Gate。

這代表 Maintainer 還需要自己確認：

「現在要發布的這一對 SHA，就是剛才那些 Successful Run 驗證過的 SHA。」

更理想的下一步，是讓一個 Release Orchestrator 接收 Revision Pair，自己驗證全部 Required Evidence，通過之後才允許 Tag / Release / Publish。

這樣可以再少一種「人記錯 SHA」的風險。

## AI Native 系統反而更需要把這件事做好

有人可能會問：

一個 Project Management Tool，真的需要做這麼多 Supply Chain Engineering 嗎？

我認為 AI Native 反而讓它更重要。

未來 QTable 可能：

- 保存 AI Provider Credential；
- 讀取 Project 和 Member 資訊；
- 呼叫 External Tool；
- 執行 Automation；
- Generate / Apply Action Plan；
- 存取 Attachment 和 Object Storage；
- 長期運行在 Enterprise Network。

使用者部署的是一個具有真實 Business Authority 的 Runtime。

這時候「Source 看起來沒問題」只是第一層信任。

第二層必須是：

**我正在執行的東西，真的是那份 Reviewed Source 經過一條我可以理解與檢查的 Build Process 產生的嗎？**

這和上一篇「Agent 權限不能高於目前使用者」其實是同一方向。

上一篇約束 Runtime 的 Business Authority。

這一篇約束執行這些規則的 Release Artifact 從哪裡來。

兩者都在做同一件事：

**減少系統裡只能靠相信、不能靠驗證的部分。**

## 我更在意能不能回答問題，而不是收集多少 Supply Chain 名詞

Supply Chain Security 很容易變成一串名詞：

SLSA。

SBOM。

SPDX。

CycloneDX。

Sigstore。

Cosign。

Provenance。

這些標準都有價值。

但對一個專案來說，更實際的起點是能不能回答幾個問題。

這個 Image 是哪一個 Commit Build 的？

那個 Commit 的 CI 跑過嗎？

跑的是這一個 Revision，還是另一個 Revision？

Dependency Inventory 在哪裡？

High-Risk Vulnerability 掃過嗎？

License 檢查過嗎？

Backend / Frontend 這兩個 Revision 一起跑過嗎？

Artifact 的 Immutable Digest 是什麼？

Provenance 描述的是哪一個 Build？

Consumer 要怎麼驗證這是官方 Artifact？

六個月以後，這些 Evidence 還在嗎？

如果大部分問題都可以直接由 Machine-generated Evidence 回答，Supply Chain Trust 就在變得具體。

如果答案大多是：

「應該是。」

「我記得跑過。」

「這個 Tag 一般不會動。」

那再漂亮的 Security Badge 都幫不了太多。

## 開源真正改變的是 Trust 的責任邊界

Source Code 開放之後，Maintainer 少了一種很方便的說法：

「相信我們就好。」

因為既然使用者已經可以檢查 Source，他自然會繼續問：

那為什麼我要相信這個 Binary？

為什麼我要相信這個 Container？

為什麼我要相信這棵 Dependency Tree？

為什麼我要相信這個 Tag？

這不是對 Open Source Maintainer 更苛刻。

反而是 Open Source 最有價值的地方之一。

Trust 可以慢慢從 Brand Relationship，變成 Verifiable Engineering Relationship。

所以這一篇最想留下的結論，不是：

「QTable 支援 SBOM。」

而是：

> **真正有價值的 Open Source Supply Chain，是讓 Source、Build、Dependency、Artifact 和 Release Record 可以彼此驗證。**

QTable 目前已經有 Dependency Audit、License Policy、Secret Scan、Container CVE Gate、CycloneDX SBOM、BuildKit Provenance、OCI Revision Metadata、Image Digest 和 Exact-Revision Full-Stack Smoke。

同時，Python Lock、Immutable Build Input、Artifact Signing、Consumer Verification、Durable Evidence Retention 和 Release Orchestration 還需要繼續補齊。

這才是目前比較準確的狀態。

到第八篇為止，第一篇最後最初列出的七個工程問題也已經全部走過一遍。

後面的文章我會繼續沿著同一個原則寫：**不按照 Feature Menu 介紹 QTable，而是繼續追蹤那些真正決定一個 AI Native 工作系統能不能被長期部署、運行與信任的工程邊界。**
