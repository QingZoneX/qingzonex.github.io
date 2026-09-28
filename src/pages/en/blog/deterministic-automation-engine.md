---
layout: ../../../layouts/BlogPostLayout.astro
title: "An Agent Should Not Run Every Automation: Why QTable Keeps Deterministic Execution in the Automation Engine"
description: "AI-native does not mean every workflow belongs to a model. This article follows QTable's current AutomationRule, AutomationEvent, AutomationExecution, ChangeSet, scheduler, worker, retry, loop guard, and execution-history implementation to explain why known triggers, conditions, and actions should remain deterministic—and how Automation and Agent runtimes should divide responsibility."
date: "2026-09-28"
locale: "en"
slug: "deterministic-automation-engine"
series: "Building QTable: Engineering an AI-Native Work System"
seriesIndex: 9
seriesTotal: 10
sourcePath: "src/pages/en/blog/deterministic-automation-engine.md"
---

By article nine, one question becomes difficult to avoid:

**if QTable already has Agents, Tools, a Context Engine, and Action Plans, why does it still need a separate Automation Engine?**

At first glance, both systems “do work for the user.”

A user can say:

“when a task enters Review, notify the assignee.”

An Agent can understand that sentence.

A Tool Chain can send the notification.

So why not make every automation an Agent task?

My answer is:

> **When a workflow can already be expressed as Trigger → Condition → Action, keep it deterministic.**

Agents are useful when the goal is ambiguous.

Automation is useful when the rule is already known and must execute repeatedly.

They are not competing runtimes.

They are two execution modes inside the same AI-native work system.

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/deterministic-automation-engine/01-agent-vs-automation.svg" alt="Agent Runtime handles ambiguous intent, contextual reasoning and tool choice, while the Automation Engine executes explicit triggers, conditions and predefined actions deterministically" loading="eager" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">An Agent answers “what should happen?” Automation repeats “what we have already decided should happen.”</figcaption>
</figure>

## AI-native does not mean model-everywhere

It is tempting to make a model decide everything.

A model can detect that a status changed to Review.

It can decide that a due date has arrived.

It can compare a number with ten.

It can choose whether to send a notification.

It can choose which fixed value to write into a field.

But if the business rule is already:

“when status changes from todo to review and priority is high, notify assignee,”

calling a model again does not add intelligence.

It turns a deterministic decision back into a probabilistic one.

This is the same principle I mentioned in the Multi Tool Chain article:

> **If deterministic work does not need a model, keep it deterministic.**

QTable's Automation Engine is the product-level expression of that rule.

## The current v1 model is intentionally constrained

The backend model lives in <code>app/models/automation.py</code>.

It is not an arbitrary script host.

The core is three persisted objects.

**AutomationRule**

The user-configured rule definition, including:

- trigger;
- conditions;
- actions;
- timezone;
- max retries;
- version;
- run-as user;
- next run time.

**AutomationEvent**

A durable event waiting for dispatch, including:

- Table and Record identity;
- before and after data;
- changed fields;
- actor and source;
- trace;
- root event;
- parent execution;
- chain depth;
- queue state.

**AutomationExecution**

One execution of one rule version for one event, including:

- rule version;
- trigger event;
- attempt;
- action results;
- ChangeSet IDs;
- error information;
- next retry;
- trace;
- terminal status.

The important part is that Rule, Event, and Execution are not the same object.

If QTable only persisted the rule and executed inline, it would be much harder to answer:

Why did this rule fire?

Which action failed?

How many times did it retry?

Was this execution rule v1 or v2?

Which ChangeSets did it create?

Was it a child of another automation execution?

Persisting these states makes automation a runtime rather than a collection of <code>if</code> statements.

## Trigger semantics are explicit

The current supported trigger types are:

- <code>record.created</code>;
- <code>record.updated</code>;
- <code>scheduled</code>;
- <code>due_date</code>;
- <code>manual</code>.

That constraint matters.

Automation systems can easily become untyped JSON configuration surfaces.

QTable v1 instead narrows semantics.

For <code>record.updated</code>, a rule can specify fields and, for exactly one field, optional <code>from</code> and <code>to</code> values.

So:

“status changed”

and:

“status changed from todo to review”

are different trigger contracts.

Numeric and date values are normalized according to field type.

Malformed date input fails closed rather than falling back to fuzzy string comparison.

## Conditions are typed rather than arbitrary code

Conditions support <code>and</code> / <code>or</code> groups.

Leaf operators depend on field type.

Text-like fields support equality, membership, empty checks, and contains operations.

Numeric and date fields additionally support ordering operators such as:

- gt;
- gte;
- lt;
- lte.

The implementation also imposes hard limits.

Condition nesting depth is capped at 8.

A definition can contain at most 64 condition items.

These limits are not “smart.”

They make rule complexity predictable.

For a system that must be validated, retried, audited, and operated for months, predictable complexity is a feature.

## Action v1 is deliberately small

The current action types are:

- <code>update_record</code>;
- <code>create_record</code>;
- <code>notify</code>.

Actions are validated before they are persisted.

Formula, Auto Number, Created Time, Modified Time, Created By, Modified By, and other non-writable field types cannot be written by an automation action.

Notification recipients can come from explicit user IDs or a Member field.

At runtime they are still restricted to real members of the Workspace.

This shows the current priority clearly.

The goal is not yet “connect every SaaS product.”

The goal is to make internal QTable automation semantics reliable first.

Webhook, Connector, and external actions can be added later, but they should not bypass the current action contract.

## Record writes do not synchronously execute automation in the request path

This is one of the most important implementation choices.

QTable Record writes already produce ChangeSets and ChangeItems.

Automation does not require every write API to remember to call a separate “run rules” hook.

Instead, the worker materializes durable <code>AutomationEvent</code> rows from already-applied ChangeItems.

The business write becomes fact first.

The ChangeSet becomes audit fact first.

Automation then reacts to that committed fact.

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/deterministic-automation-engine/02-event-runtime-pipeline.svg" alt="A QTable record write first creates ChangeSet and ChangeItem evidence, which is materialized into durable AutomationEvents. Scheduled and due-date scans create synthetic events. The worker claims events, matches rules, checks permissions and conditions, executes actions, and stores execution history." loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">Automation is decoupled from the request that changed the Record. Business state commits first; durable events drive follow-up work.</figcaption>
</figure>

That gives several benefits.

The user request does not need to wait for downstream actions.

A worker crash does not erase the event.

Each ChangeItem can be materialized idempotently through a unique source identity.

Future mutation entry points do not all need custom automation integration code.

As long as business writes enter the same ChangeSet model, automation can derive events from a shared audit source.

This is similar to the multi-view principle from article six:

**do not make every entry point maintain its own copy of the side-effect chain.**

## Scheduled and due-date rules use durable cursors, not temporary timers

A periodic job based only on in-memory sleep state forgets its position after restart.

QTable rules carry <code>next_run_at</code>.

The scheduler scans due rules.

A <code>scheduled</code> rule produces a synthetic event from its interval.

A <code>due_date</code> rule scans Records visible to the run-as user and computes target time using:

- the configured date field;
- rule timezone;
- offset minutes;
- scan interval.

The date handling includes an important edge case.

A timestamp without timezone information is interpreted in the rule's configured timezone and then converted to UTC.

It is not silently treated as UTC.

Due-date event IDs are deterministic from the rule, version, record, field, due instant, and offset.

If the same reminder window is scanned twice, it should still converge on one execution identity rather than creating duplicate notifications.

This is not an AI feature.

It is the kind of detail that determines whether real automation is trustworthy.

## Idempotency does not mean “never fail”

Automation will fail.

Databases can fail temporarily.

A notification recipient can become invalid.

Permission can change between actions.

A rule can be edited while a retry is waiting.

The important design question is:

**what happens when the system tries again?**

QTable's <code>AutomationExecution</code> has a uniqueness contract over:

**automation_id + automation_version + trigger_event_id**

The same event under the same rule version converges on one execution identity.

That is still not enough for multi-action rules.

Imagine:

1. create_record;
2. notify.

If step one succeeds and step two fails, replaying everything could create a duplicate Record.

The executor therefore persists each action result.

A retry skips actions already marked succeeded.

It continues from the unfinished part.

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/deterministic-automation-engine/03-idempotency-retry-loop-guard.svg" alt="Automation execution identity is unique per rule id, rule version, and trigger event. Successful actions are checkpointed, failed actions use bounded exponential backoff, retries skip completed steps, version changes fail closed, and automation chains beyond depth eight are skipped." loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">Reliability is not the absence of failure. It is making failure, retry, and partial success bounded and inspectable.</figcaption>
</figure>

Retry delay starts at five seconds and grows exponentially, capped at 300 seconds.

A rule configures <code>maxRetries</code>, currently limited to ten.

An execution may end as:

- succeeded;
- skipped;
- failed;
- partially_failed.

One semantic boundary deserves to be explicit:

**the current action list is not one global transaction across every action.**

An earlier action may already have committed before a later action fails.

QTable does not pretend that every external side effect can be rolled back.

It instead records what happened through action checkpoints, retries, ChangeSets, and partial-failure state.

That is a more realistic operational model.

## Rule version is part of execution identity

Consider this sequence.

Rule v1 says:

“create a Record, then notify A.”

The create succeeds.

The notification fails.

Before the retry runs, a user edits the rule into v2:

“do not create the Record; notify B instead.”

If the old retry simply reloads the newest rule and continues, the execution history becomes impossible to explain.

QTable stores <code>automation_version</code> on each execution.

Changes to trigger, conditions, actions, timezone, or retry semantics increment the rule version.

Before retry, the runtime compares the current rule version with the execution's version.

If they differ, the old execution terminates with:

<code>automation_version_changed</code>

A new event or manual run must start a new execution.

The principle is simple:

> **Retry the execution that actually failed; do not silently reinterpret it as a newer rule.**

## Automation can trigger automation, so chain depth is tracked

Rule A may update field X.

That update can trigger Rule B.

Rule B may update field Y.

That can trigger Rule A again.

QTable events and executions therefore carry:

- <code>root_event_id</code>;
- <code>parent_execution_id</code>;
- <code>depth</code>.

Automation writes use the execution trace ID.

When those writes later materialize new events, the runtime can recover the parent execution and increment depth.

The current maximum automation-chain depth is eight.

Beyond that, execution is skipped with <code>loop_guard</code>.

This is not sophisticated graph-cycle detection.

It is a hard safety ceiling, which is a sensible v1 boundary.

## Workers claim events before executing them

The current worker is an application-internal asynchronous polling worker.

Each cycle:

- materializes record events from ChangeSets;
- scans scheduled and due rules;
- processes due retries;
- claims events;
- dispatches matched rules.

Event claims use database row locking with <code>skip_locked</code>.

After claim, an event enters <code>processing</code> and its <code>available_at</code> becomes a lease deadline.

The current event lease is 300 seconds.

If a worker dies after claim, another worker can reclaim the event once the lease expires.

Retry claims use the same general idea.

There is no Kafka or RabbitMQ in the current automation path.

The database is the durable queue.

That reduces deployment complexity for the current Alpha.

It also means the runtime is polling-based, so latency and throughput depend on poll interval, batch size, database scans, and worker count.

At larger scale, QTable may eventually need a more independent worker or queue plane.

That is a scaling boundary, not evidence that the current implementation lacks durable events.

## An enabled automation is not a permanent authorization token

Article seven established that Agent authority must stay inside the current user's authority.

Long-lived automation has the same problem.

A rule can remain enabled for months.

That is why it stores <code>run_as_user_id</code>.

At creation, it runs as the creator.

When executable semantics are edited, the run-as identity becomes the user making that change.

But the identity is not a permanent grant.

At every execution, the runtime rechecks whether that user still has the permission required by the action set.

Notification-only rules require read access.

Record create/update rules require update access.

Record-triggered execution also checks row visibility.

And <code>update_record</code> rechecks row access immediately before every write.

That matters because an earlier action might modify the very Member field that controls row visibility.

Permission at the beginning of the execution is not assumed to remain valid for action three.

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/deterministic-automation-engine/04-permission-audit-boundary.svg" alt="Automation rules store a run-as user, but definition changes require table edit permission and every execution rechecks current table and row access. Update actions recheck row access immediately before writes, notifications restrict recipients to Workspace members, and execution history stores trace and ChangeSet evidence." loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">A rule may outlive the editing session. Its authority must not outlive the run-as user's current permissions.</figcaption>
</figure>

Existing tests specifically cover permission loss.

If the run-as user loses access, the automation does not continue writing the Record.

**Enabling a rule is not permanent authorization.**

## Audit must say more than “automation succeeded”

Automation writes reuse QTable's ChangeSet system.

Record mutations use:

- <code>actor_type = automation</code>;
- <code>source = automation</code>;
- the execution's <code>trace_id</code>.

After actions run, the execution collects ChangeSet IDs linked to that trace.

Execution History can therefore answer more than “success.”

It can preserve:

- rule version;
- attempt number;
- per-action result;
- Record identity;
- trace ID;
- ChangeSet IDs.

That link matters because automation observability should not stop at worker logs.

The business question is:

**which durable business facts did this rule actually change?**

ChangeSet is the bridge between Automation Runtime and business audit.

## QTableUI is already a real Automation operations surface

The current QTableUI has a real Automation Center, not a placeholder.

There is even an explicit UI contract test preventing that surface from regressing into planned-copy scaffolding.

The editor exposes the supported backend trigger and action families.

Before save, it calls <code>validateAutomation</code>.

After save, it fetches the rule back from the server to verify persisted state.

For saved rules, the UI can call <code>automationPreview</code> and show:

- whether conditions match;
- whether the rule would execute;
- required permission;
- action summaries.

There is an important distinction here.

**Preview is preview.**

**Manual Run is real execution.**

The UI contract explicitly requires manual execution to disclose that it is not a simulation, because <code>runAutomation</code> can create or update real data.

Manual execution bypasses trigger matching only.

It does not bypass validation or runtime permission checks.

That follows the same product principle as Preview → Confirm → Apply:

the user should know whether the system is showing a consequence or causing it.

## Execution History is part of the product, not merely a debug console

While open, the current Execution History drawer polls every five seconds.

It exposes:

- execution status;
- attempt;
- rule version;
- error code and message;
- per-action results;
- record reference;
- trace ID;
- ChangeSet IDs.

Failed and partially failed executions can be retried when the user has edit permission.

This is why Automation Center should not be thought of only as a rule editor.

Half of the product is an operations console.

Creating a rule is the beginning.

Months later, the important questions become:

Which rules are failing?

Are they failing for the same reason?

Did retry recover?

Were duplicate side effects avoided?

Which business changes came from this rule?

Operational history may eventually matter more than the editor itself.

## The current implementation has clear boundaries

The v1 runtime is meaningful, but it is not an unlimited workflow platform.

### 1. The action family is still narrow

Today it is only:

- update_record;
- create_record;
- notify.

There is no generic webhook, HTTP request, Connector action, or Skill action.

Those should be added carefully.

Every new action type needs answers for permission, secrets, retry safety, idempotency, audit, and duplicate external side effects.

### 2. Trigger coverage is still internal and time-based

There is no Record Delete trigger, Webhook trigger, or generic external event trigger yet.

The current system focuses on QTable record changes, schedules, due dates, and manual execution.

That connects directly to the roadmap for Table-as-API, webhooks, and the Connector platform.

### 3. Actions are linear, not a DAG

A rule has an ordered action list.

There is no branching graph, parallel node, or explicit compensation graph.

That is different from the Multi Tool Chain Runtime in article five.

If Automation later evolves toward DAG execution, QTable should be careful about which capabilities are reused and which deterministic rule semantics must remain distinct.

### 4. Automation requires the database backend

The GraphQL layer explicitly fails with:

**Automations require database backend.**

The legacy file backend does not pretend to provide the same durable queue, locking, retry, and execution semantics.

That is the right failure mode.

Reliable automation should not claim parity on a backend that cannot provide equivalent durability.

### 5. The worker is still an application polling worker

QTable already has durable events, leases, <code>skip_locked</code>, batches, and retries.

But worker lifecycle is still close to the application runtime.

Higher throughput, isolation, independent scaling, queue metrics, and dead-letter handling may eventually justify a separate worker plane.

That is future hardening, not current functionality.

## Agent and Automation should collaborate rather than replace one another

The more interesting future is not:

Agent replaces Automation.

It is:

**Agent helps users author, explain, and diagnose Automation; Automation performs the long-lived deterministic execution.**

A user might say:

“when a high-priority task enters Review, notify the assignee, then remind them again if it remains incomplete for three days.”

An Agent can interpret intent.

It can identify which field means Priority.

Which one means Status.

Which one is Assignee.

Which one is Due Date.

It can generate an Automation draft and explain when it will fire.

Once the user accepts the rule, however, every future execution should not need another model call.

It should become:

Trigger → Condition → Action.

That suggests a useful product split:

**AI is a rule-authoring interface.**

**Automation Engine is the rule-execution runtime.**

An AI-native work system needs both.

## Automation should eliminate repeated interpretation

Traditional automation can feel mechanical.

AI products can overcorrect by reinterpreting everything every time.

The better middle path is:

use AI once to turn intent into a structured rule;

use a deterministic runtime for repeated execution;

use AI again when the business rule needs to change.

Do not ask a model on every Record update:

“should I send the notification this time?”

That is not only cheaper.

It is easier to explain, test, retry, and audit.

You can know why the system acted.

So the conclusion I want to keep from article nine is:

> **AI-native does not mean giving deterministic work to a model. A mature AI-native system knows when to stop reasoning and start executing rules.**

QTable's current Automation Engine already has a Rule / Event / Execution model, ChangeSet event materialization, scheduled and due triggers, typed conditions, run-as permission checks, action checkpoints, retry, rule versions, loop guards, trace IDs, ChangeSet audit, and real execution history.

It is still clearly a v1.

Trigger and action families are limited.

The worker is still database-backed polling.

Actions are still linear.

Connector, webhook, and external-side-effect contracts still need design.

Those boundaries make the next stage easier to reason about.

Article ten will close the series by moving from **correct execution** to **long-term operation**:

**how does a QTable deployment become a system that can be upgraded, backed up, restored, observed, and operated over time?**

Once software reaches production, the final engineering question is usually not:

“does the feature exist?”

It is:

**when something goes wrong, can we understand what happened—and can we recover?**
