---
layout: ../../../layouts/BlogPostLayout.astro
title: "An Agent Is Not a Sequence of Function Calls: How QTable Turns Tools into a Runtime"
description: "Useful agents rarely stop after one tool call. Task decomposition, effort estimation, schema inspection, Gantt generation, and record creation form an execution chain with dependencies and failure boundaries. This article walks through QTable's current Multi Tool Chain Runtime: ToolChainPlan, context passing, retries, confirmation, rollback, observability, and the DAG scheduler work that is still incomplete."
date: "2026-09-27"
locale: "en"
slug: "multi-tool-chain-runtime"
series: "Building QTable: Engineering an AI-Native Work System"
seriesIndex: 5
seriesTotal: 10
sourcePath: "src/pages/en/blog/multi-tool-chain-runtime.md"
---

The previous article ended with a simple transition:

> Once the agent has the right business coordinates, Runtime can begin doing real work.

“Doing work” sounds straightforward.

The model chooses a tool.  
The backend runs it.  
The result comes back.

That mental model lasts until the request looks anything like actual work.

Imagine a user says:

> “Plan an approval system, estimate the effort, build a timeline, and put the tasks into the current table.”

That request already implies several operations.

Break the work down.  
Estimate workload.  
Generate a Gantt timeline.  
Inspect the destination Table Schema before writing.  
Create Records only after the upstream information is ready.

And those operations are not necessarily a simple 1 → 2 → 3 → 4 sequence.

Both estimation and Gantt generation may depend on the task split. Schema inspection can happen independently. The final write should wait for the task structure, timeline, and schema.

That is an execution graph.

If an agent runtime still works as:

“the model asked for a function, so call it immediately,”

then dependencies, retries, confirmation, timeouts, rollback, progress, and audit state eventually leak into prompts and ad hoc conditionals.

QTable's Multi Tool Chain Runtime is trying to establish a stronger boundary: **turn a complex request into an explicit execution contract first, then let the runtime own execution semantics.**

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/multi-tool-chain-runtime/01-goal-to-chain.svg" alt="QTable turns a user goal into a structured ToolChainPlan with skills, dependencies, argument templates, retries, timeouts and rollback policies before executing it through the Tool Adapter, Tool Executor and Skill Runtime" loading="eager" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">The thing being executed should be an inspectable, persistent plan—not an improvised stream of side-effectful function calls.</figcaption>
</figure>

## ToolChainPlan turns “what next?” into explicit data

The current contract lives in [app/schemas/tool_chain.py](https://github.com/QingZoneX/qtable-server/blob/main/app/schemas/tool_chain.py).

Its central types are <code>ToolChainPlan</code> and <code>ToolChainStepDefinition</code>.

A Step can currently declare:

- <code>stepId</code>;
- the <code>skillName</code> to invoke;
- <code>dependsOn</code>;
- arguments;
- <code>saveResultAs</code>;
- a per-step retry policy;
- rollback behavior;
- a timeout.

These fields matter because they move execution rules out of natural-language planning and into something the runtime can inspect.

“Read the destination Schema before creating Records” should not remain a suggestion buried in a planner prompt.

It should become an explicit dependency from the write step to the schema-inspection step.

“Retry this operation at most twice” should not rely on the model remembering what it said earlier.

It belongs in a retry policy.

“If a later step fails, remove the Records this step created” should become a rollback contract rather than a sentence in a plan description.

This is one of the clearest differences between basic tool calling and an agent runtime.

**Tool calling is about one invocation. Runtime is about the relationships between invocations.**

## The model may plan the chain, but it should not invent execution semantics on the fly

The current [app/services/tool_chain.py](https://github.com/QingZoneX/qtable-server/blob/main/app/services/tool_chain.py) accepts two sources of plans.

A caller may provide a complete Plan directly.

Or, with <code>autoPlan=true</code>, the service loads the Skills available in the current Workspace and asks the model to produce a structured <code>ToolChainPlan</code>.

If model setup or planning fails, there is a fallback path. The current fallback prefers a chain roughly shaped like:

task split;  
effort estimation;  
Gantt generation;  
destination Schema inspection;  
task Record creation.

The part I care about is not that an LLM can produce this plan.

It is that **the planner may be probabilistic while the execution contract remains explicit.**

The model can help decide which steps are useful.

The runtime still executes registered Skills with structured arguments, dependencies, retry rules, timeouts, and rollback metadata.

An LLM is one implementation of the Planner.

It is not the Runtime.

That distinction makes it much easier to change models, restrict Workspace Skills, or introduce deterministic plans without rewriting the execution layer.

## Step output should flow through runtime state, not through another round of model paraphrasing

A multi-tool chain immediately creates a second problem:

How does Tool B consume Tool A's output?

QTable's current argument resolver can read from three places:

- Context;
- previous Step outputs;
- Chain Memory.

After a Step completes, the runtime stores its result in <code>steps_output</code> and <code>memory</code>. A Step with <code>saveResultAs</code> also gives the output a stable semantic key.

That allows later Steps to ask for:

the task-split result;  
the current target Table from Context;  
the saved Gantt data.

The runtime resolves those values directly.

It does not have to hand the previous result back to the model and ask the model to reconstruct the next payload.

That difference looks small until reliability matters.

Model paraphrasing introduces another probabilistic transformation.

Structured value passing is just data flow.

In an agent system, **deterministic work that does not require a model should stay deterministic.**

## dependsOn can describe a DAG today; that does not mean the scheduler fully executes one yet

This is the most important implementation detail in this article.

The QTable Tool Chain schema already has <code>dependsOn</code>.

The planner also builds a <code>langGraphSpec</code> with nodes and edges.

So the data model can represent a graph in which:

task splitting finishes first;  
estimation, Gantt generation, and Schema inspection fan out;  
Record creation waits for the required upstream branches.

That is a DAG.

I would still not describe the current dedicated Tool Chain Runtime as a completed parallel DAG scheduler.

The code has not reached that point yet.

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/multi-tool-chain-runtime/02-dag-contract-vs-scheduler.svg" alt="QTable ToolChainPlan can express a DAG with dependsOn and parallel branches, while the current dedicated ToolChainRuntimeService still walks plan.steps in declaration order and checks whether dependencies have already completed" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">A contract that can describe a graph and a scheduler that can correctly execute that graph are two separate capabilities. QTable is further along on the first than the second.</figcaption>
</figure>

The current dedicated <code>ToolChainRuntimeService._run_internal</code> iterates through <code>plan.steps</code> in declaration order.

Before each Step starts, it checks whether the IDs in <code>dependsOn</code> have reached completed or rolled-back states.

If they have not, that Step is marked skipped.

The runtime then waits for the current Tool call to finish before moving to the next declared Step.

In practice, that means the Plan should already be topologically ordered.

The architecture document [docs/multi-tool-chain-runtime-architecture.md](https://github.com/QingZoneX/qtable-server/blob/main/docs/multi-tool-chain-runtime-architecture.md) describes a stronger target: a ready queue, topological release of successors, and concurrent execution of independent Steps.

That is the architecture direction, not something the dedicated service should currently claim as complete.

There is another path in [app/agent_runtime/executor.py](https://github.com/QingZoneX/qtable-server/blob/main/app/agent_runtime/executor.py) that already uses <code>asyncio.gather</code> for batches.

That path has the shape of parallel execution, but its current <code>ToolPlanEngine.get_execution_order</code> still precomputes batches using runtime completion state before those dependency Steps have actually executed.

So I would not call that a finished general-purpose DAG scheduler either.

What is still needed is a scheduling core with clearer semantics:

validate the graph before execution;  
reject unknown dependencies;  
detect cycles;  
compute indegree;  
build a ready queue;  
run truly independent Steps concurrently under a limit;  
release successors only after dependencies finish;  
decide how failures propagate to downstream branches.

This is a good example of why “we have a DAG model” and “we have a DAG runtime” are not the same statement.

## Parallelism is not just “put more coroutines in gather”

Suppose both estimation and Gantt generation depend only on task splitting.

They look parallelizable.

But what if two independent branches both mutate the same Table?

What if they share the same external provider rate limit?

What if one reads state while another modifies the state that read is supposed to describe?

A real scheduler needs more than dependency edges.

Dependency is the first constraint.

Side effects are the second. Two write operations with no graph edge are not automatically safe to run at the same time.

Resource limits are the third. Even safe parallel business operations may need a concurrency cap because of external APIs or model providers.

Context consistency is the fourth. Two branches may begin from the same snapshot and then converge after the world has changed.

This is why I do not think “parallel tool execution” is equivalent to “use <code>asyncio.gather</code>.”

Concurrency is an output of scheduling rules.

It is not the scheduling policy itself.

## Retry is really a question about repeatability

Each Tool Chain Step has its own Retry Policy.

The current defaults allow two attempts with a fixed backoff.

Actual retries are handled by [app/tool_adapter/executor.py](https://github.com/QingZoneX/qtable-server/blob/main/app/tool_adapter/executor.py).

The executor does not retry every failure blindly.

Today, automatic retry is limited to error classes such as <code>INVALID_INPUT</code> and <code>EXECUTION_FAILED</code>, subject to the remaining attempt budget.

There is also a more important brake:

if the Tool was confirmed, has side effects, and the Skill is not declared idempotent, automatic retry is disabled.

That rule is easy to miss and extremely important.

A failed Schema read is usually safe to try again.

A request that created 100 tasks may have succeeded on the server and only lost its response on the way back. Repeating it automatically could create another 100 tasks.

So Retry does not mean “run it again after failure.”

It means:

**decide whether repeating the operation is safe before deciding to retry it.**

That is one of the differences between an impressive demo and a runtime that can survive real business operations.

## Confirmation is an execution suspension point, not just a dialog

When a Skill returns <code>requires_confirmation</code>, the Tool Chain Runtime moves the Step to <code>waiting_confirmation</code>.

It persists information including:

- stepId;
- skillName;
- resolved arguments;
- preview metadata;
- current Memory and Context.

That is already the beginning of a real suspension model.

But the dedicated Tool Chain API currently exposes only:

<code>POST /api/tool-chains/run</code>;  
<code>POST /api/tool-chains/stream</code>;  
<code>GET /api/tool-chains/runs/{run_id}</code>.

There is not yet a same-run confirm / resume endpoint in [app/api/tool_chain.py](https://github.com/QingZoneX/qtable-server/blob/main/app/api/tool_chain.py).

So the runtime can detect the confirmation boundary and persist pending state, but this API path does not yet complete the “approve later and continue from the same checkpoint” lifecycle.

That is an important next step.

For long-running work, confirmation should not be a UI event.

It should become a **durable suspend / resume primitive.**

Otherwise a process that crosses a request boundary tends to fall back to “start again and pretend it resumed.”

## Rollback is compensation, not a magical cross-system transaction

Rollback is another word that can make a runtime sound more complete than it is.

If a chain touches PostgreSQL, an external API, and a third-party SaaS, there is no natural ACID transaction spanning all of them.

QTable's current rollback model is closer to Saga-style compensation.

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/multi-tool-chain-runtime/03-retry-confirm-rollback.svg" alt="QTable Multi Tool Chain Runtime handles safe retries through Retry Policy, pauses side-effectful steps in waiting_confirmation, and compensates completed steps in reverse order when a later step fails" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">Retry, confirmation, and rollback should be runtime semantics, not polite suggestions written into a prompt.</figcaption>
</figure>

A Step rollback declaration currently supports:

<code>none</code>;  
<code>delete_created_records</code>;  
a dedicated rollback Skill.

For <code>qtable.task.records.create</code>, the runtime will attempt <code>delete_created_records</code> even when the Step did not explicitly specify a rollback kind.

If a later Step fails, completed Steps are compensated in reverse completion order.

That is a useful foundation.

It is not the same as guaranteeing that the whole world returns to a state in which the chain never happened.

Deleting created Records can compensate database state.

But if an earlier Step sent a notification, triggered a webhook, or produced an irreversible effect in another service, the Skill itself needs a meaningful compensation contract.

The schema also exposes <code>best_effort</code> and <code>strict</code> rollback modes.

The current service does not yet branch into two fully distinct runtime behaviors based on those modes. Today it attempts reverse compensation for completed Steps and derives final status from whether those compensations failed.

So the mode field is better described as part of the intended contract than as completely implemented semantics.

That distinction matters more than an impressive “supports strict rollback” bullet point.

## A chain that cannot explain its own timeline will be difficult to operate

Multi-step runtime complexity becomes especially visible when runs take time.

One execution may cross multiple Skills, retry one of them, pause for confirmation, and eventually trigger rollback.

Returning only:

“Execution failed.”

at the end is almost useless.

QTable currently persists three levels of execution state.

<code>tool_chain_runs</code> stores the Plan, Context, Memory, final Result, status, trace id, and pending-confirmation state for the whole Run.

<code>tool_chain_step_runs</code> stores per-Step dependencies, input, output, attempt count, error state, rollback information, and a context snapshot.

<code>tool_chain_event_logs</code> stores lifecycle events.

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/multi-tool-chain-runtime/04-observable-run.svg" alt="QTable persists Tool Chain Run, Step and Event state in PostgreSQL, emits planning, step, retry, rollback and completion events over SSE, and caches the current Run snapshot in Redis" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">A long-running chain becomes operable only when the system can answer which Step ran, with what input, how many attempts it made, and why it stopped.</figcaption>
</figure>

The event stream includes states such as:

planning started / completed;  
step started / completed;  
step retrying;  
step waiting confirmation;  
step failed;  
rollback started / completed;  
run completed / failed.

The <code>/stream</code> endpoint emits them through SSE.

After each event, the current Run response is also cached in Redis. The current cache TTL in this service is 3,600 seconds.

What matters to me here is not simply that the UI can show a progress indicator.

It is that the backend has evidence when someone asks:

“Why did the run stop here?”

If one Skill repeatedly retries on Step 2, the system can see it.

If rollback compensates only some Steps, there is state for that too.

Observability is not an optional UI feature around a runtime.

It is part of what makes multi-step execution supportable.

## QTable currently has three runtime layers that are easy to confuse

There is another source of complexity in the codebase.

QTable does not have only one thing called Runtime.

At least three related execution paths exist today.

**Multi Tool Chain Runtime**  
This path centers on <code>ToolChainPlan</code>, Step dependencies, Memory, retry, rollback, SSE, and Run persistence.

**Agent Runtime**  
This path centers on Intent → Plan → Preview / Confirm → Tool Execution → Observation, and has begun executing batches concurrently.

**Agent Workflow / LangGraph**  
This path already defines a real StateGraph with Planner, Tool Executor, Observer, Retry, Human Approval, and Finalize nodes, with checkpoint / resume concepts around workflow execution.

The concepts overlap, but they are not yet one unified execution kernel.

That is probably the most important architecture cleanup ahead.

I do not want a future where:

Tool Chain has one retry system.  
Agent Runtime has another.  
LangGraph Workflow has a third.

The long-term direction should be shared semantics:

one Tool contract;  
one Context model;  
one Confirmation model;  
one Step-state vocabulary;  
one observability path;  
the same permission and side-effect rules.

Then “a dynamic agent request,” “a predefined workflow,” and “an AI-generated Tool Chain” become different orchestration surfaces over the same execution core.

## What I would build next

Looking at the code as it exists today, I would prioritize four improvements.

First, **a real DAG Scheduler.**

Not declaration-order execution, but graph validation, cycle detection, indegree, a ready queue, concurrency limits, and explicit successor release.

Second, **checkpoint / resume.**

Confirmation and long-running work need to continue from persisted Step state rather than creating a new Run.

Third, **consolidate Retry, Rollback, and Confirmation into one execution layer.**

The same semantics should not be reimplemented independently across Tool Chain, Agent Runtime, and LangGraph Workflow.

Fourth, **make side-effect constraints part of Tool metadata.**

Idempotency, parallel-safety, compensation support, and perhaps a serial key should become machine-readable runtime contracts rather than planner guesses.

Once those pieces are in place, Multi Tool Chain stops being only a strong plan representation and becomes a runtime that can carry complex business work for a long time.

## Agents do not become stronger just because they have more tools

Tool catalogs grow quickly.

Read a table.  
Search.  
Generate a Gantt.  
Send a notification.  
Create tasks.  
Reassign owners.  
Call an external system.

More tools do not automatically create a better agent.

Without execution semantics, more tools simply create more failure modes.

The questions I care about are these:

Which Step depends on which?  
What can actually run in parallel?  
Which failure may be retried?  
Which operation must never be automatically repeated?  
Where must execution pause for a human?  
What can be compensated after failure?  
How does the Run resume?  
What evidence remains afterward?

Those are not model-parameter questions.

They belong to Runtime.

That leads to the core idea behind this article:

> **An agent's capability is not just how many tools it can call. It is whether the system can organize those tools into an execution chain that is explainable, pausable, retryable, recoverable, and auditable.**

This article focused on how QTable executes work.

The next one returns to the product model itself: **why Grid, Kanban, and Gantt should not become three different copies of the data.**

If the same Record is shown through multiple Views, those Views should project and organize one underlying fact—not manufacture separate business state. That decision is what allows people, AI, and automation to keep working against the same source of truth.
