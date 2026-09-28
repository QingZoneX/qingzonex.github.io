---
layout: ../../../layouts/BlogPostLayout.astro
title: "Self-hosted Is More Than docker compose up: How QTable Turns Upgrades, Backup, Recovery, and Observability into System Boundaries"
description: "The difficult part of self-hosting is not starting containers. It is knowing what an upgrade changes, what must be recovered after failure, whether a backup can restore a usable system, and whether production is actually healthy. This article follows QTable's current PostgreSQL / Redis / MinIO / QTable / QTableUI Compose stack, Alembic migrations, health checks, release gates, ChangeSets, and runtime traces to close the series with the operational boundaries an AI-native work system needs for long-term ownership."
date: "2026-09-28"
locale: "en"
slug: "self-hosted-operations-recovery"
series: "Building QTable: Engineering an AI-Native Work System"
seriesIndex: 10
seriesTotal: 10
sourcePath: "src/pages/en/blog/self-hosted-operations-recovery.md"
---

This is the final article in **Building QTable: Engineering an AI-Native Work System**.

The first nine articles focused on how the product behaves:

how to model business data;

how to let AI write safely;

how to build Context;

how to execute Tool Chains;

how multiple Views operate on one source of truth;

how to limit Agent authority;

how to build open-source supply-chain trust;

and how deterministic work belongs in an Automation Engine rather than being reinterpreted by a model every time.

Long-term operation introduces a different class of questions:

**What happens when an upgrade no longer starts?**

**What happens when the database is lost?**

**What happens when attachment objects still exist but their database references are gone?**

**What happens when the database restores but the encryption key does not?**

**What if every container is reported healthy while users cannot complete important workflows?**

**What if an Automation writes the wrong state into hundreds of Records?**

These are not UI features.

They determine whether a self-hosted system is something a team can trust with durable business data.

So the final principle in this series is:

> **The completion criterion for self-hosting is not a successful docker compose up. It is having explicit upgrade, recovery, and observability boundaries.**

## The real self-hosted unit is not one container

QTable's current canonical Compose stack is not only the two application images.

It includes at least:

- PostgreSQL;
- Redis;
- MinIO;
- QTable;
- QTableUI.

QTableUI is the public web edge.

Nginx proxies REST, GraphQL, WebSocket, Auth, and OAuth traffic to the QTable backend.

The backend depends on PostgreSQL, Redis, and S3-compatible object storage.

So when an operator says:

“I need to back up QTable,”

the first question is:

**which state do you mean?**

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/self-hosted-operations-recovery/01-runtime-persistence-topology.svg" alt="QTable self-hosted topology: QTableUI is the public web edge, connecting through a private network to the QTable API; the backend depends on PostgreSQL, Redis, and S3-compatible MinIO storage. The canonical Compose stack gives services health checks and separate persistent volumes." loading="eager" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">The recovery unit is not a container. It is the contract formed by database state, object storage, runtime configuration, stable secrets, and a compatible application revision.</figcaption>
</figure>

PostgreSQL stores:

- Workspaces;
- Tables, Fields, and Records;
- permissions;
- ChangeSets;
- Automation rules, events, and executions;
- attachment registry metadata;
- and many other durable business objects.

MinIO or another S3-compatible provider stores the binary attachment objects.

Redis participates in caching, rate limiting, and other runtime behavior. The canonical Compose stack enables append-only persistence and gives Redis its own volume.

Application images determine which schema and runtime contracts the code understands.

Secrets and environment configuration determine:

how tokens validate;

how encrypted values are decrypted;

where object storage lives;

which database is authoritative.

So the durable system is:

**Code + Schema + Business Data + Binary Objects + Secrets + Deployment Configuration.**

An image tag alone is not system state.

## A named volume is not a backup

The current Compose stack defines named volumes for:

- <code>postgres_data</code>;
- <code>redis_data</code>;
- <code>minio_data</code>.

That solves one problem:

recreating a container should not erase its data.

But persistence and backup are not the same thing.

A named volume does not answer what happens if:

the host disk dies;

someone runs <code>docker compose down -v</code>;

the host disappears;

bad application logic mutates data;

or an administrator deletes the wrong records.

I find it useful to keep four terms separate.

**Persistence**

State survives process or container recreation.

**Backup**

A recoverable copy exists in another failure domain.

**Restore**

The backup can be turned back into running state.

**Restore drill**

The restore path is exercised before a real incident proves whether it works.

A self-hosted product that only achieves the first item does not yet have disaster recovery.

## QTable's most important durable state is PostgreSQL plus object storage

The current release guidance already says that before upgrading a real deployment, operators should back up:

1. PostgreSQL;
2. object storage.

That matches QTable's attachment model.

The database stores stable attachment references and registry metadata.

The actual binary body lives in S3-compatible storage.

An attachment registry row can know:

- attachment id;
- object key;
- table id;
- record id;
- field id;
- filename;
- size;
- content type;
- status.

But the file bytes are not in PostgreSQL.

Backing up only the database creates a dangerous half-recovery:

the UI may still show attachment metadata while the underlying object is gone.

Backing up only MinIO is equally incomplete.

You would have a collection of object keys with no durable business relationship telling you which Workspace, Record, or Field owns them.

So:

> **Database backup and object backup must belong to the same recovery set.**

## Secrets are part of the recovery boundary too

Some critical state usually does not belong in the database dump.

Secrets.

The production registry Compose file explicitly requires values such as:

- <code>POSTGRES_PASSWORD</code>;
- <code>SECRET_KEY</code>;
- <code>ENCRYPTION_KEY</code>;
- object-storage credentials.

Missing values fail closed.

That is the correct security behavior.

The encryption key is especially important.

If business data depends on a stable encryption key and the key is permanently lost, then keeping the database file is not equivalent to keeping recoverable data.

A disaster-recovery plan therefore also needs answers for:

Where are secrets stored?

Who can recover them?

Is there version history?

Is secret recovery kept separate from ordinary data backups?

How does rotation preserve access to existing encrypted data?

Production secrets should not simply be copied into a normal backup archive.

But they need their own recovery path.

“Securely unrecoverable” is still unrecoverable.

## Upgrade is not “pull a newer image and restart”

QTable's current container entrypoint is intentionally simple.

When <code>QTABLE_RUN_MIGRATIONS=true</code>, it runs:

<code>alembic upgrade head</code>

before starting Uvicorn.

That improves deployment ergonomics.

Operationally, it also means:

**an application upgrade can be a schema upgrade.**

Once schema or data representation changes, switching back to the old image may no longer be a complete rollback.

Older code may not understand the new schema.

A migration may not have a safe semantic downgrade.

A data migration may already have transformed durable business state.

So a safer upgrade model is:

lock exact revisions;

back up first;

restore a representative copy in staging;

run the migration there;

run health and critical-flow verification there;

only then roll out the exact verified pair to production.

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/self-hosted-operations-recovery/02-safe-upgrade-path.svg" alt="QTable safe upgrade path: identify exact QTable and QTableUI revisions, back up PostgreSQL, object storage, and configuration, restore a copy in staging, run Alembic migration and smoke checks, deploy the verified pair to production, and make an explicit decision between forward fix, application rollback, or data restore if the upgrade fails." loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">Deploying the old image only rolls back code. Once schema or data changed, recovery must explicitly distinguish forward fix, application rollback, and data restore.</figcaption>
</figure>

This is also where the supply-chain work from article eight becomes operationally useful.

If production breaks, important questions include:

Which exact backend revision is running?

Which exact frontend revision?

Which image digest?

Did this exact pair pass the full-stack release gate?

Knowing only that “we are on alpha” is not enough.

Moving tags are not recovery identities.

Exact revisions and digests are.

## Migration risk is not only “the command failed”

QTable already has a real Alembic history.

It begins with the open-source baseline and continues through schema changes for areas such as:

OAuth sessions;

task profile;

board ordering;

collaboration;

Automation;

attachments;

activation state.

That means schema evolution is a long-lived compatibility contract.

The current release guidance already recommends:

deploy to staging;

run <code>alembic upgrade head</code>;

run application smoke tests;

then roll out production.

Several operational rules follow from that.

### Migration must come from the application revision being deployed

Do not run an arbitrary migration checkout against production.

The migration files should be the ones shipped with the backend revision you intend to run.

### Record both source and target migration revision

“Migration succeeded” is useful but incomplete.

Operational evidence should record:

from revision;

to revision;

application revision;

execution time.

### Do not assume downgrade is automatically safe

Alembic supports downgrade mechanics.

That does not mean every business migration should rely on reverse migration as the default recovery path.

Some failures are safer to handle with a forward fix.

Others require restoring the pre-upgrade backup.

Upgradeability does not imply every data transformation is perfectly reversible.

## Full-stack release gates do not replace production monitoring

QTableUI currently has a full-stack release smoke workflow.

It checks out an exact QTableUI revision.

It checks out an explicitly supplied exact QTable backend revision.

It starts the canonical Compose stack.

It verifies health for the frontend, backend, Redis, and MinIO.

It records the exact revision pair.

The broader release E2E exercises real flows such as:

registration and login;

record persistence;

filter and sort;

permissions;

realtime collaboration;

notification redaction;

access loss;

Automation;

Dashboard data;

offline fail-closed behavior;

recycle lifecycle.

It also retains screenshots, console logs, and browser DevTools traces.

That is valuable evidence.

But it answers this question:

> **Did this exact revision pair pass the defined release flows in the release environment?**

It does not answer:

> **Is your production deployment healthy at 14:37 today?**

Release verification happens before shipping.

Runtime observability happens while serving users.

A serious system needs both.

## Health checks are the first layer, not the last

The canonical Compose stack already defines health checks.

PostgreSQL uses <code>pg_isready</code>.

Redis uses <code>redis-cli ping</code>.

MinIO exposes its live health endpoint.

QTable checks the API root.

QTableUI exposes <code>/healthz</code>.

Compose dependency ordering uses these health states.

The backend waits for PostgreSQL, Redis, and MinIO.

The frontend waits for QTable.

That is an important operational foundation.

But there is a critical distinction:

**liveness is not readiness.**

The QTable root returning a welcome response proves that the process can answer HTTP.

It does not prove that:

database queries are succeeding;

Redis is available for every required operation;

object storage is writable;

the Automation queue is keeping up;

migration state is correct;

critical user workflows work.

QTableUI's <code>/healthz</code> is even more deliberately a liveness probe.

The Nginx configuration explicitly keeps it independent from the backend so a backend restart does not cause the frontend container itself to be replaced.

That is sensible liveness behavior.

It also shows why future operations should distinguish:

**Liveness**

from:

**Readiness / Dependency Health.**

## A page loading is not business health

Imagine:

QTableUI returns 200.

The QTable root returns 200.

PostgreSQL accepts connections.

But permission queries return many 500s.

Attachment uploads all fail.

The Automation worker is stuck.

Realtime subscriptions are broken.

The orchestrator can consider every container healthy while users consider the product unavailable.

Production observability therefore needs to climb from:

process health

to:

dependency health;

request health;

queue and worker health;

business-flow health;

recovery health.

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/self-hosted-operations-recovery/04-observability-layers.svg" alt="QTable operational observability layers: today the product has container liveness, release-smoke evidence, application logs, Automation traces, and ChangeSet business audit. A mature operations plane adds dependency-aware readiness, request and queue telemetry, metrics, alerting, SLOs, backup freshness, and restore-drill status." loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">Health checks answer whether a process responds. Operability asks whether the product is serving correctly, durably, and recoverably.</figcaption>
</figure>

QTable already has useful evidence beyond infrastructure liveness.

Automation executions include:

trace IDs;

per-action results;

ChangeSet IDs;

error codes;

attempt counts.

Record writes produce ChangeSets.

Release tests retain browser traces.

Containers emit logs.

That matters because many production incidents are not:

“CPU reached 100%.”

They are:

**the system remained healthy while correctly executing the wrong business action.**

Infrastructure metrics can stay green in that scenario.

You need to know:

who initiated the change;

whether it came from a user, Agent, or Automation;

which rule version ran;

which Records changed;

which ChangeSets were created.

AI-native observability therefore needs business audit in addition to infrastructure telemetry.

## A backup is not proven by the existence of an archive

Backup systems can create false confidence.

A daily job exits successfully.

There is an archive every day.

Retention works.

Everyone assumes disaster recovery is complete.

The harder question is:

**Can that backup recreate a usable QTable deployment?**

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/self-hosted-operations-recovery/03-backup-restore-contract.svg" alt="QTable backup and restore contract: a recovery set covers PostgreSQL, object storage, a stable-secret recovery path, exact application release identity, and deployment configuration. A restore drill rebuilds an isolated environment, restores database and objects, starts a compatible revision, then verifies Records, permissions, attachments, and critical workflows before traffic can return." loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">Backup proves that bytes exist. A restore drill proves that those bytes can become the same business system again.</figcaption>
</figure>

A meaningful restore drill should validate at least:

the database imports successfully;

the Alembic revision is recognized;

the application starts on a compatible revision;

Workspace, Table, and Record counts are plausible;

permissions still behave correctly;

attachment registry references point to real objects;

users can download attachments;

critical workflows run.

Testing only that a PostgreSQL dump imports is not enough.

## Backup consistency matters across storage systems

Suppose you restore:

yesterday's database backup;

today's object-storage snapshot.

That can create references that never belonged to the same logical moment.

The database may reference an object that had not yet been copied into yesterday's snapshot.

Or object storage may contain data whose registry row no longer exists in the database state you restored.

As QTable moves into stricter production use, backup policy therefore needs concepts such as:

backup timestamp;

consistency window;

database and object snapshot relationship;

RPO;

RTO.

### RPO

How much recent data loss is acceptable?

Fifteen minutes?

One hour?

One day?

### RTO

How long may recovery take?

Thirty minutes?

Four hours?

A day?

The self-hosted product does not need to choose those numbers for every operator.

But it should provide a deployment contract clear enough for operators to choose them intentionally.

## QTable does not yet have a complete backup and restore product

It is important to separate the current implementation from the target operating model.

The repository already has:

- named-volume persistence;
- PostgreSQL;
- S3-compatible object storage;
- release guidance that explicitly requires backups;
- Alembic migrations;
- full-stack release smoke;
- runtime health checks;
- ChangeSet and trace foundations.

That does **not** mean it already has:

one-click backup;

one-click restore;

scheduled backup management;

a backup catalog;

retention-policy UI;

point-in-time recovery;

automatic restore drills;

backup-freshness alerts.

This article is about the recovery foundations that already exist and the operational contracts that should be productized next.

It is not presenting future capabilities as completed work.

## Object-storage recovery has an extra registry-consistency problem

QTable's attachment model intentionally stores stable references rather than persisting temporary presigned URLs in record data.

The database contains attachment registry entries.

At access time, the backend revalidates that the attachment belongs to the expected:

Table;

Record;

Field.

That matters for security.

It also matters for recovery.

A restore cannot simply count bucket objects and declare success.

It should validate:

**database registry entry → object-storage key**

still resolves.

Otherwise “100% of objects restored” can still produce a broken attachment experience.

Future operational reconciliation could surface signals such as:

registry entries pointing to missing objects;

objects with no registry entry;

uploads stuck in pending state;

cleanup tasks repeatedly failing.

Storage integrity is another form of observability.

## Automation workers need operational signals too

Article nine described the current database-backed Automation runtime.

Workers:

materialize record events;

scan scheduled rules;

process retries;

claim events;

dispatch rules.

The runtime already has:

event leases;

retry leases;

<code>skip_locked</code>;

retry state;

execution history.

That is a good reliability foundation.

Long-term operation raises additional questions:

How old is the oldest queued event?

How many retries are waiting?

What percentage of executions failed in the last hour?

Is one rule failing continuously?

When did the worker last complete a successful cycle?

How far behind is scheduled execution?

Those signals are not yet a unified platform metrics contract.

But the runtime state is structured enough to derive them later.

That is one reason earlier articles kept emphasizing modeled runtime state instead of log-only behavior.

You can build dependable metrics only after the execution model itself is explicit.

## AI runtime needs more than traditional web metrics

AI-native systems add another set of operational costs.

Traditional API monitoring often focuses on:

request rate;

latency;

error rate;

CPU;

memory;

database connections.

An AI runtime also benefits from observing:

model request latency;

provider failure;

token and cost usage;

tool failure;

context-build time;

Action Plan preview/apply failure;

confirmation abandonment;

Agent permission denial;

Tool Chain retries.

QTable already contains AI logging and runtime trace foundations.

That does not mean a complete unified AI telemetry platform exists today.

The future goal should be to connect:

provider;

model;

conversation;

tool call;

Action Plan;

trace;

cost;

latency;

error

into signals an operator can understand.

Not to “monitor the model,” but to answer:

**why did the Agent experience become worse?**

## Production configuration should fail closed

Self-hosted systems often fail because development defaults are copied directly into production.

The registry Compose path already tightens several settings.

Production requires explicit secrets.

Legacy JWT acceptance is disabled by default.

Password-reset debug token behavior is disabled.

Dynamic OAuth client registration is disabled.

Plain PKCE is disabled.

This follows an important rule:

> **Missing production configuration should not silently fall back to insecure development behavior.**

Self-hosted friendliness does not mean assigning a default to every value and starting anyway.

Some conditions should prevent startup.

Visible failure is safer than running for months under an accidentally weak configuration.

## Public exposure should be minimal by default

The current Docker Hub deployment guidance recommends exposing QTableUI publicly while keeping PostgreSQL, Redis, MinIO, and the QTable API bound to loopback or a private application network by default.

QTableUI proxies the required paths to the backend.

That creates a simpler public boundary.

Fewer public services mean:

a simpler TLS boundary;

a simpler firewall model;

less credential exposure;

a smaller attack surface.

A good self-hosted product should make the safe topology the default rather than assuming every operator is also a security engineer.

## Long-term self-hosting requires an upgrade compatibility window

Real operators do not upgrade every release.

They may skip:

three minor versions;

six months;

a year.

That creates compatibility questions:

Can the migration chain still upgrade from that source version?

Were configuration keys removed?

Did OAuth or token contracts change?

Did attachment schemas change?

Which frontend and backend versions can safely pair?

Long-term release management therefore needs more than a <code>VERSION</code> file.

It eventually needs:

upgrade paths;

minimum supported source versions;

breaking-change notes;

migration notes;

configuration changes;

recovery notes.

AI-native products can evolve quickly.

Without an upgrade contract, self-hosted users eventually pin an old version because upgrading feels like gambling.

## Release artifacts and backup artifacts form different trust chains

Article eight focused on release trust:

Was this image built from the reviewed source?

Does it carry the expected revision, digest, SBOM, and provenance?

Recovery adds a second question:

Can my business state return?

These are different trust chains.

**Software supply-chain trust**

and:

**data continuity trust.**

A mature self-hosted system needs both.

A release artifact should identify:

version;

revision;

digest;

SBOM;

provenance.

A backup artifact should eventually identify:

timestamp;

source deployment identity;

database revision;

object snapshot identity;

retention;

encryption;

verification result.

A restore-drill report could even record:

which QTable image digest was used;

which backup set was restored;

which business flows were verified.

Incident response should not depend on reconstructing these facts from memory.

## Recoverability should become part of release engineering

One of the next important engineering lines for QTable is a **recovery gate**.

Today's release gates primarily prove that a new revision works in a clean test environment.

A stronger future gate can also:

start from a previous-release data snapshot;

run the upgrade migration;

verify business data remains present;

verify attachments remain accessible;

verify permissions remain correct;

verify Automation history remains coherent;

run critical UI flows;

restore a backup into a fresh environment;

then execute the same release smoke suite.

At that point, “upgrade safety” is no longer only a documentation recommendation.

It becomes evidence produced by release engineering.

## Observability should eventually connect to runbooks

Metrics alone do not solve incidents.

Alerts do not solve them either.

The useful chain is:

**Signal → Decision → Runbook.**

For example:

Database connection saturation should point to a runbook that explains which dashboard to inspect and how to distinguish load from connection leaks.

Automation queue lag should explain how to inspect worker state, the oldest event, and repeatedly failing rules.

Attachment-storage errors should explain how to validate bucket health, credentials, and pending cleanup.

A stale backup alert should explain the last successful backup and the last successful restore drill.

Without a runbook, alerts only tell you faster that something is broken.

They do not tell you what to do next.

## Self-hosted quality includes how safely the system fails

Product work often optimizes the happy path.

Installation gets simpler.

There are fewer steps.

Startup is faster.

But much of the long-term value of self-hosting lives in failure paths.

What happens when migration fails?

When storage fills?

When a secret is wrong?

When the backup is incomplete?

When an AI provider is unavailable?

When a Tool call times out?

When an Automation rule fails repeatedly?

Users trust systems not because failure never occurs.

They trust systems when:

**failure state is understandable;**

**recovery paths are executable.**

That is actually the same theme as the previous nine articles.

Preview → Confirm → Apply makes AI writes fail within a controlled boundary.

Tool Chain Runtime makes multi-step execution traceable when it fails.

Permission boundaries make unauthorized work fail safely.

Automation retry makes deterministic execution recoverable.

This final article extends that principle to the whole deployment:

> **A large part of system maturity is defined by how it fails.**

## Looking back, what is QTable actually building?

Article one asked why another multidimensional table should exist.

Article two argued that structured Fields, Records, and Relations form a useful business substrate for Agents.

Article three established that AI writes need Preview → Confirm → Apply.

Article four argued that Context should be a real system boundary rather than a larger prompt.

Article five turned multiple tool calls into an execution runtime.

Article six kept Grid, Kanban, and Gantt as projections over one business truth.

Article seven kept Agent authority inside the current user's authority.

Article eight treated open source as a verifiable software supply chain rather than repository visibility.

Article nine separated probabilistic reasoning from deterministic automation.

The final article adds:

**Self-hosted is not a running container. It is a system that can be upgraded, recovered, explained, and operated over time.**

Taken together, the product QTable is trying to build is not simply:

“a multidimensional table with AI.”

A more accurate description is:

> **A work system that keeps business facts structured, lets AI understand and act inside explicit boundaries, makes changes traceable, and remains something a team can own and operate for the long term.**

AI-native should not only mean:

a stronger model;

a longer prompt;

a Copilot button.

What determines whether AI can enter the core of real work is:

Data Model.

Authorization.

Execution Boundaries.

Audit.

Deterministic Runtime.

Release Trust.

Recovery.

Operability.

Those ideas are less flashy than an AI demo.

But they determine whether AI can move from:

“suggest what I should do”

to:

“safely help me do it.”

They also determine whether an open-source project can move from:

“I can run this on my laptop”

to:

“I trust this system with my team's durable work.”

QTable is not finished.

Backup and restore are not yet fully productized.

Readiness, metrics, and alerting still need to mature.

A dedicated worker plane remains future work.

Upgrade compatibility needs to be accumulated release after release.

External connectors and webhook contracts are still ahead.

I would rather make those boundaries explicit than describe future capabilities as completed work.

Because engineering progress is not pretending the destination has already been reached.

It is:

**knowing exactly where the system stands, and what boundary must be built next.**

This series ends here.

QTable's engineering story is only moving from **building the system** to **making the system worth running for years**.
