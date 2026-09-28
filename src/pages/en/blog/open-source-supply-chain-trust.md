---
layout: ../../../layouts/BlogPostLayout.astro
title: "Open Source Is More Than Making a Repository Public: How QTable Builds Supply-Chain Trust with CI, SBOMs, and Provenance"
description: "Publishing source code is only the first step. Users actually run dependencies, container images, and release artifacts. This article follows QTable and QTableUI's current CI, dependency audits, CycloneDX SBOMs, Trivy gates, BuildKit provenance, OCI metadata, image digests, and full-stack release checks to show how reviewed source can become a traceable artifact—and where the chain is still incomplete."
date: "2026-09-28"
locale: "en"
slug: "open-source-supply-chain-trust"
series: "Building QTable: Engineering an AI-Native Work System"
seriesIndex: 8
seriesTotal: 10
sourcePath: "src/pages/en/blog/open-source-supply-chain-trust.md"
---

In the first article of this series, I wrote that **open source is not merely a distribution choice for QTable; it is a product constraint**.

That section listed several concrete questions.

Which commit produced a Docker image?

Do the dependencies contain known vulnerabilities?

Do release artifacts carry an SBOM and provenance?

After working through the runtime, permissions, and Agent execution model in the later articles, I would now add one more question:

> **What actually happened between the source code you reviewed and the image you are running?**

That is where software supply-chain trust becomes real.

A public repository does not prove that a Docker Hub image came from it.

The presence of a CI workflow does not prove that the workflow ran successfully against the revision used for a release.

An image tag such as <code>0.1.2-alpha</code> is useful, but a tag by itself is not an immutable artifact identity.

And even an SBOM does not prove that dependency resolution was deterministic, or that the SBOM belongs to the exact artifact you are running.

So this article is not really about introducing the acronym “SBOM.”

The more useful question is:

**Can a user start from a release artifact and trace it back to reviewed source, and has the project left enough machine-generated evidence for that trace not to depend on trusting the maintainer's memory?**

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/open-source-supply-chain-trust/01-source-to-artifact-chain.svg" alt="A release trust chain connects an exact source commit to CI evidence, dependency and license audits, container vulnerability scanning, and finally an artifact with SBOM, provenance, OCI revision metadata, and an immutable digest" loading="eager" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">Open source makes the code inspectable. Supply-chain evidence solves a different problem: connecting that source to the artifact someone actually deploys.</figcaption>
</figure>

## The important part of CI is not that it is green, but which revision is green

README badges are useful.

They are also easy to overread.

Imagine this sequence:

- commit A passes CI;
- commit B changes an authorization path;
- a release tag points at commit B;
- the README badge still happens to be green.

That badge says nothing about commit B.

This is why the current QTable release draft places so much emphasis on **exact-revision evidence**.

A release record is expected to preserve the full QTable commit SHA, the full QTableUI commit SHA, the CI runs for those revisions, the full-stack smoke run for that exact pair, and the resulting image digests plus OCI revision metadata.

It is also why the current <code>v0.1.2-alpha</code> release note still says **DRAFT / NOT YET RELEASED**.

Having the workflow definitions in the repository is not the same thing as having successful evidence for the release revisions.

That distinction is worth making explicit:

> **A CI definition is a rule. A CI run is evidence.**

At the moment, QTable Backend CI and QTableUI Frontend CI are explicit <code>workflow_dispatch</code> gates rather than jobs that automatically consume runner capacity on every pull request and main push.

That means release orchestration is not fully automated yet.

But it also avoids pretending that a YAML file sitting in the repository means every revision has been verified.

For an Alpha project, I would rather make the evidence semantics precise first and automate the orchestration afterward.

## “Dependency security” is at least four separate problems

The phrase is often treated as one topic.

It is not.

There are at least four questions:

**What exact versions were installed?**

**Do those versions have known vulnerabilities?**

**Are their licenses acceptable for the distribution?**

**Can downstream users inspect what ended up in the environment?**

A lockfile, vulnerability audit, license policy, and SBOM solve different parts of that problem.

They do not replace one another.

QTableUI currently has the more complete deterministic installation path.

The repository carries <code>package-lock.json</code>.

CI uses <code>npm ci</code>.

The Docker build also uses <code>npm ci --ignore-scripts</code>, so it does not perform a fresh free-form dependency resolution during image construction.

Frontend CI also runs:

- <code>npm audit</code>;
- dependency license checks;
- <code>npm sbom --sbom-format=cyclonedx</code>;
- upload of the audit JSON and CycloneDX SBOM as CI artifacts.

The responsibilities are separated cleanly.

The lockfile constrains what gets installed.

The audit checks known risk.

The license gate checks distribution policy.

The SBOM records what actually ended up in the resolved environment.

The backend is more interesting because it is still in transition.

<code>requirements.in</code> is the human-maintained direct-dependency policy and most entries still use open version ranges.

<code>requirements.txt</code> is intentionally only a compatibility shim containing:

<code>-r requirements.in</code>

QTable already has a PEP 751 lock policy and a <code>refresh_python_lock.py</code> script whose intended output is <code>pylock.toml</code>.

But **that pylock.toml is not currently materialized in the source tree**.

In other words, the backend already knows what deterministic resolution should look like, and the policy checker knows how to validate it, but the release dependency graph is not fully closed yet.

That is not a problem an SBOM can hide.

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/open-source-supply-chain-trust/02-dependency-evidence.svg" alt="QTableUI uses a committed package lock and npm ci together with vulnerability, license, and CycloneDX SBOM checks, while QTable Backend has pip-audit, pip-licenses, CycloneDX tooling, and a PEP 751 lock policy but no current pylock.toml in the tree" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">SBOM means inventory. Lockfile means constrained resolution. Audit means risk inspection. They answer different questions.</figcaption>
</figure>

Backend CI's current <code>audit_python_dependencies.py</code> performs several useful checks.

It starts with <code>pip check</code> to catch a broken or incompatible installed environment.

It runs <code>pip-audit</code> for known vulnerabilities.

It generates a license inventory with <code>pip-licenses</code> and blocks license markers that require explicit policy review, including AGPL, SSPL, Business Source License, Commons Clause, and related categories.

It then uses <code>cyclonedx-py</code> to emit a CycloneDX SBOM.

Those files are uploaded as CI evidence.

One detail I like here is that the audit tooling itself is not allowed to float freely.

<code>requirements-audit.txt</code> exact-pins <code>pip-audit</code>, <code>cyclonedx-bom</code>, and <code>pip-licenses</code>.

A scanner changing behavior is itself a change to the release evidence pipeline, so the scanner version deserves review too.

## An SBOM is not a proof of safety; it is a queryable cargo manifest

SBOM has become an easy security badge.

Its actual role is more modest and more useful.

If an image contains:

- Python package A;
- Node package B;
- OpenSSL C;
- Nginx D;

the SBOM answers:

**what are these components, and which versions are present?**

That makes later vulnerability matching, license review, and incident response practical.

When a severe vulnerability is announced, the maintainer does not have to answer from memory:

“I don't think we use that package.”

They can inspect the SBOM tied to the release.

But an SBOM does not prove that the artifact came from a specific Git commit.

It does not prove that dependencies were resolved from a deterministic lockfile.

It does not prove that the SBOM itself was not replaced.

This is why supply-chain trust has to continue into artifact identity and provenance.

## QTable's Docker publish path is already more than <code>docker build &amp;&amp; docker push</code>

Both QTable and QTableUI currently have dedicated Docker publication workflows.

Several controls in those workflows matter.

The first is **release identity validation**.

The workflow reads the repository <code>VERSION</code>.

For tag publication, the Git tag <code>vX.Y.Z</code> must match the VERSION exactly.

QTableUI also checks that <code>package.json</code>, the root <code>package-lock.json</code> version, and VERSION all agree.

A mismatch stops the workflow.

The second is **publication authorization**.

Creating a <code>v*</code> tag does not automatically authorize a public image push.

The workflow also requires:

<code>DOCKERHUB_PUBLISH_ENABLED=true</code>

Without that repository variable, tag publication remains blocked.

The Docker Hub token enters through a secret rather than source control.

This separates “we created a release tag” from “we authorize public distribution.”

The third control is a **pre-publication vulnerability gate on a locally built image**.

Both backend and frontend workflows build the exact revision locally first.

Trivy then scans OS and library packages.

The current policy blocks HIGH or CRITICAL findings.

Only after that gate passes does the multi-architecture publish build proceed.

The fourth detail is unusual but important for QTable: **release builds explicitly restore official upstream sources**.

The project also needs plain source builds to work on restricted networks and on environments such as Rainbond where build arguments may be difficult to pass.

For that reason, the Dockerfiles default to reachable mirrors.

But the Docker Hub release workflows explicitly override those defaults.

For QTable Backend they restore:

- <code>python:3.11-slim</code>;
- the official PyPI index.

For QTableUI they restore:

- <code>node:22-alpine</code>;
- <code>nginx:alpine</code>;
- the official npm registry.

That creates an intentional distinction between “a source build that works in a constrained network” and “the upstream sources used for an official distribution artifact.”

That is much more meaningful than merely stating in documentation that the project “uses official images.”

## Provenance answers a different question: who built this, and under what conditions?

An SBOM describes the contents.

Provenance gets closer to describing how an artifact came into existence.

The current QTable and QTableUI publication workflows configure <code>docker/build-push-action</code> with:

<code>sbom: true</code>

and:

<code>provenance: mode=max</code>

They also attach OCI metadata for:

- source;
- license;
- version;
- revision;
- creation time.

The most important field is <code>org.opencontainers.image.revision</code>.

That connects the image metadata to <code>github.sha</code>.

Together with the build output digest, the release path can establish a relationship of the form:

**Source Commit → Build Evidence → Image Digest**

But there is an important boundary here.

**Provenance is not the same thing as a signature.**

BuildKit provenance can describe the build process and materials.

The current QTable release path does not yet expose a separate, explicit consumer verification policy that says which identity, signing key, or keyless trust mechanism should be accepted as proof that an artifact was officially authorized by QingZoneX.

I also do not see Cosign or Sigstore signing enforced as a release gate yet.

So the accurate statement today is:

> QTable's release path already requests SBOM and provenance evidence, but artifact signing and consumer-side verification are not yet a closed loop.

That is more useful than turning <code>provenance: mode=max</code> into a claim that the supply-chain problem has been solved.

## Tags are readable names; digests are closer to durable artifact identity

Docker tags are convenient.

<code>0.1.2-alpha</code> is readable.

<code>alpha</code> is convenient for a channel.

A stable release may eventually use <code>latest</code>.

But a tag is a name.

Some tags are moving pointers.

If a production audit record only says:

“we deployed <code>qingzonex/qtable:alpha</code>,”

that may not be enough to reconstruct the exact manifest months later.

The durable artifact identity is the digest.

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/open-source-supply-chain-trust/03-tags-digests-release-record.svg" alt="Git tags and Docker tags are readable release labels, while the image digest, full source commits, OCI revision metadata, SBOM, provenance, and exact CI evidence together form an auditable release identity" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">Tags solve readability. Digests solve immutable identity. A release record should keep both rather than relying on a moving tag alone.</figcaption>
</figure>

The current QTable release draft explicitly asks the release record to preserve both application image digests and their OCI revision labels.

It also requires the full backend and frontend commit SHAs.

That is significantly more useful than merely saying “the release is called 0.1.2-alpha.”

I would like deployment documentation to go one step further over time.

For audit-sensitive environments, Compose, Helm, or GitOps examples should make digest pinning a first-class option.

Knowing the digest at publication time and actually deploying by digest are two different maturity levels.

## Full-stack release evidence answers the question “do these two verified components still work together?”

QTable is not a single-repository binary.

The backend and QTableUI each have independent CI.

Both repositories passing independently still does not prove that the combined product works.

API contracts, migrations, Nginx routing, WebSockets, Redis, PostgreSQL, object storage, and runtime configuration can fail only when the pieces are assembled.

QTableUI therefore also has a <code>Full-Stack Release Smoke</code> workflow.

It requires an **exact QTable backend revision** as input.

The workflow itself runs on an exact QTableUI revision.

It checks out the requested backend revision and records:

- QTableUI SHA;
- QTable SHA;
- the requested backend revision;
- event and ref metadata.

It then starts the canonical Compose stack and verifies:

- frontend health;
- backend health;
- MinIO health;
- Redis;
- service state.

Finally it uploads the revision and smoke evidence.

This protects against a supply-chain mistake that is easy to overlook:

**a release is not only about each component being valid in isolation; it is also about knowing which exact component revisions were validated together.**

As QTable gains more connectors, workers, and Agent services, the “revision pair” will likely become a larger revision set.

## Dependabot handles change detection, not trust decisions

Both backend and frontend repositories currently use Dependabot.

The backend watches:

- pip;
- GitHub Actions;
- Docker.

The frontend watches:

- npm;
- GitHub Actions;
- Docker.

That matters because supply-chain security cannot be a one-time audit.

A clean dependency today may have a new advisory next week.

But automated update pull requests are only an entry point.

They should not imply:

“the bot created it, therefore it is safe to merge.”

GitHub Actions and Docker base images deserve the same review discipline as application dependencies because they are part of the build system itself.

An Action update may change permissions, artifact behavior, caching, or external access.

A base image update may change OS packages and runtime behavior.

Dependabot should create a consistent review surface, not remove the need for review.

## The chain is meaningful today, but it is not fully closed

Looking at the current workflows, QTable's supply-chain work is no longer just a roadmap item.

There are real controls in place.

There are also several clear gaps.

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/open-source-supply-chain-trust/04-supply-chain-maturity.svg" alt="QTable already has dependency vulnerability and license gates, secret scanning, Trivy, SBOM, provenance, OCI metadata, image digests, and exact-revision full-stack smoke tests, while Python locking, immutable Action and base-image pins, signing verification, and long-term release evidence still need closure" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">Supply-chain trust is not a checkbox. The current work is increasingly about making the chain more deterministic, immutable, durable, and independently verifiable.</figcaption>
</figure>

### 1. The backend Python lock still needs to be materialized

The PEP 751 generation script, validation logic, and “require a lock for release” policy already exist.

But <code>pylock.toml</code> is not in the current tree.

That means the same <code>requirements.in</code> may still resolve to different transitive versions at different points in time.

If one source revision is supposed to imply one reviewable dependency graph, that loop needs to close.

### 2. GitHub Actions and base images still use many mutable version tags

Current workflows contain references such as:

<code>actions/checkout@v7</code>

<code>actions/setup-python@v7</code>

<code>docker/build-push-action@v7</code>

and base-image tags such as:

<code>python:3.11-slim</code>

<code>node:22-alpine</code>

<code>nginx:alpine</code>

These are practical and Dependabot tracks them.

They are not full Action commit SHAs or container image digests.

From a strict reproducibility point of view, rebuilding the same QTable commit on a later date may still consume different external build inputs.

The project can tighten this incrementally by pinning critical Actions to full commits and release base images to digests while retaining readable version comments.

### 3. Provenance exists, but signing and verification policy is not complete

BuildKit SBOM and provenance are an important foundation.

The next layer is to state explicitly:

what identity signs official artifacts;

how consumers verify that identity;

what verification command appears in the release documentation;

whether deployment automation verifies that signature before rollout.

Without a consumer verification path, an attestation is evidence that exists, but not yet a verification process everyone knows how to use.

### 4. CI evidence retention is still short for a durable release record

Several dependency and full-stack evidence artifacts currently use a 14-day retention period.

That is reasonable for normal engineering feedback.

It is not ideal for a release that may need to be audited six months later.

Release evidence should eventually be attached to a durable release record or copied into another immutable long-term location.

Otherwise the tag and image survive while important supporting evidence expires.

### 5. Release gating still requires human orchestration

Backend CI, Frontend CI, Full-Stack Smoke, tagging, and Docker publication are clear but separate gates.

That means a maintainer still has to make sure:

“the revisions I am publishing are exactly the revisions covered by those successful runs.”

A stronger next step would be a release orchestrator that receives a revision pair, verifies all required evidence automatically, and only then authorizes tagging and publication.

That removes another class of “the human remembered the wrong SHA” failure.

## AI-native systems have more reason, not less, to care about this

It is reasonable to ask whether a project-management product really needs this much release engineering.

I think AI-native systems increase the need.

QTable may eventually:

- store AI provider credentials;
- read project and member information;
- call external Tools;
- execute automations;
- generate and apply Action Plans;
- access attachments and object storage;
- run persistently inside enterprise networks.

Users are deploying a runtime with meaningful business authority.

At that point, “the source code looks fine” is only the first layer of trust.

The second question is:

**Is the thing I am running actually the thing produced from that reviewed source through a build process I can inspect?**

This is closely related to the previous article.

Article seven constrained the Agent's business authority.

This article constrains the origin of the software artifact that enforces those rules.

Both are trying to reduce the amount of the system that must be trusted without verification.

## I care less about collecting supply-chain acronyms than answering concrete questions

Supply-chain security can become a stack of standards names:

SLSA.

SBOM.

SPDX.

CycloneDX.

Sigstore.

Cosign.

Provenance.

All of them can be useful.

A more practical starting point for a project is whether it can answer a small set of questions.

Which commit produced this image?

Did CI run for that exact commit?

Was it this revision or another one?

Where is the dependency inventory?

Were high-risk vulnerabilities checked?

Were licenses checked?

Were these backend and frontend revisions tested together?

What immutable digest identifies the artifact?

What build does the provenance describe?

How does a consumer verify that the artifact is official?

Will the evidence still exist six months from now?

If most of those answers can be produced directly from machine-generated records, supply-chain trust is becoming concrete.

If the answers are mostly:

“probably.”

“I remember running it.”

“that tag normally does not move.”

then the security badges are not doing much.

## Open source changes the burden of proof

Once source code is available for inspection, maintainers lose one convenient answer:

“just trust us.”

If users can inspect the source, they can reasonably continue asking:

Why should I trust this binary?

Why should I trust this container?

Why should I trust this dependency graph?

Why should I trust this tag?

That is not an unfair burden on open-source maintainers.

It is one of the most valuable properties of open source.

Trust can gradually move from a brand relationship toward a verifiable engineering relationship.

So the conclusion I want to keep from this article is not:

“QTable supports SBOMs.”

It is this:

> **A useful open-source supply chain lets source, build, dependencies, artifacts, and release records verify one another.**

QTable today already has dependency audits, license policy, secret scanning, container CVE gates, CycloneDX SBOMs, BuildKit provenance, OCI revision metadata, image digests, and exact-revision full-stack smoke testing.

Python locking, immutable build inputs, artifact signing, consumer verification, durable evidence retention, and release orchestration still need more work.

That is the current state without turning roadmap items into completed claims.

With article eight, the series has now covered all seven engineering questions originally listed at the end of article one.

The remaining articles will continue with the same rule: **not a feature-menu tour of QTable, but a closer look at the engineering boundaries that determine whether an AI-native work system can be deployed, operated, and trusted over time.**
