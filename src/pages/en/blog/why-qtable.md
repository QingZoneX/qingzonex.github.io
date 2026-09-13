---
layout: ../../../layouts/BlogPostLayout.astro
title: "Why Build Another Open-Source Multidimensional Table? QTable Is Not Really About Tables"
description: "Airtable, Notion, and modern multidimensional-table products are already mature. Why build QTable? This article explains the product thesis behind an AI-native structured work foundation."
date: "2026-09-13"
locale: "en"
slug: "why-qtable"
series: "Building QTable: Engineering an AI-Native Work System"
seriesIndex: 1
seriesTotal: 10
sourcePath: "src/pages/en/blog/why-qtable.md"
---

If you decide to build a multidimensional-table product today, the first difficult question is probably not technical. It is much simpler: **why?**

Airtable has already demonstrated the enormous product space between spreadsheets and databases. Notion embedded structured databases inside documents and knowledge work. Feishu/Lark has pushed multidimensional tables deeply into collaboration, automation, and enterprise workflows.

In that market, if QTable were merely “another open-source table with Grid, Kanban, and Gantt views,” it would be hard to justify.

While building QTable, my answer became clearer:

> **QTable is not really trying to solve the table problem. It is trying to solve how AI can understand, organize, and safely execute real work.**

A multidimensional table is the foundation because I currently believe it is one of the most useful data models for that problem.

## From configuring software to describing an outcome

The normal path through a project-management or multidimensional-table product often looks like this:

```text
Create Workspace
      ↓
Create Table
      ↓
Design fields
      ↓
Configure Views
      ↓
Enter tasks
      ↓
Build Dashboards
      ↓
Configure automation
      ↓
Start working
```

There is nothing inherently wrong with this model. It is powerful.

But it asks the user to translate their business into software configuration before the real work begins.

A product lead is thinking:

> “We need to ship 1.0 next month. Break the scope into tasks, assign owners, estimate workload, identify risks, and tell me early if the launch is slipping.”

The software usually asks a different set of questions first: How many tables? Which fields are Select or Relation? What should Kanban group by? Where do Gantt dates come from? Which metrics belong on a dashboard? Which event should trigger an automation?

That gap is a **translation cost between intent and structure**.

Large language models give us a chance to redesign that path:

```text
Describe a goal
      ↓
Understand business context
      ↓
Generate Workspace / Table / View
      ↓
Break down tasks and dependencies
      ↓
Estimate workload and schedule
      ↓
Suggest assignees
      ↓
Generate Dashboards
      ↓
Diagnose project risk
      ↓
Preview Changes
      ↓
Human Confirm
      ↓
Apply
```

The important change is not that “AI created a table.”

It is that **the user can begin with an outcome instead of beginning with software configuration**.

## AI-native does not mean adding a chat box

The easiest AI assistant to build is a side panel. Gather some page data, turn it into a prompt, send it to a model, and render the response.

That can be useful, but I do not think it makes a product AI-native.

If the assistant can answer “What are the risks in this project?” but cannot, after the user approves the plan, actually create missing tasks, adjust owners, move dates, create a view, generate a dashboard, or update status, then it still sits beside the operational system rather than participating in it.

The hard question is not whether a model can generate text. It is:

> **Can AI become a constrained actor inside the business system?**

That distinction shapes a large part of QTable's architecture.

## Why multidimensional tables are a useful business substrate for agents

An agent that performs real work needs a reasonably explicit model of the world.

Documents are flexible, but concepts such as “task,” “assignee,” “status,” and “deadline” often remain natural-language fragments. Traditional databases are structured, but normal users should not have to think in schemas, joins, constraints, and queries.

A multidimensional table sits in the middle. To users, it still looks like a familiar table and a set of views. To software, it provides explicit structure:

```text
Workspace
  └─ Table
      ├─ Field
      ├─ Record
      ├─ Relation
      ├─ Formula
      └─ View
          ├─ Grid
          ├─ Kanban
          ├─ Gantt
          ├─ Calendar
          └─ Gallery
```

Once a task has structured `status`, `assignee`, `priority`, `startDate`, `dueDate`, and relation fields, AI is no longer reasoning only over ambiguous prose. It can work with business objects that can be queried, validated, and changed.

From an agent's perspective:

```text
Natural Language
      ↓
Structured Intent
      ↓
Structured Business Model
      ↓
Validated Action
```

is much closer to actual work than:

```text
Natural Language
      ↓
More Natural Language
```

## A View should not become a second copy of the data

Grid, Kanban, Gantt, Calendar, and Gallery look like different product experiences, but they should not own separate copies of task data.

In QTable, I prefer to think of them as **different projections of the same structured facts**:

```text
                 ┌─ Grid
                 ├─ Kanban
Table / Records ─┼─ Gantt
                 ├─ Calendar
                 └─ Gallery
```

Dragging a card in Kanban is therefore a structured field update. Moving a bar in Gantt updates the same Record. When AI creates a task, it should not have to synchronize separate Grid and Kanban datasets. Dashboards should aggregate through the same permission and data model rather than reading from a side channel.

Once AI starts participating in a product, this “one set of facts, many views” rule matters even more. Every extra source of truth becomes another consistency problem for humans and agents alike.

## I do not want AI to bypass the product model

A tempting implementation is to give the model a shortcut:

```text
LLM
 ↓
AI-specific mutation
 ↓
Direct database write
```

It is fast to build. It also creates two systems: one set of business rules for human operations and another for AI operations.

That eventually creates permission mismatches, missing audit history, different validation behavior, stale concurrency state, and inconsistent automation triggers.

QTable instead aims to let AI reuse the same Table, View, Dashboard, Permission, and ChangeSet models used by people.

> **AI should not receive a super-admin shortcut around the rules of the product.**

It is simply another way to initiate a business operation.

## Why Preview → Confirm → Apply matters

When AI only generates text, a mistake may cost one bad answer. When AI can mutate business data, the cost changes completely.

“Clean up this project” might mean dozens of record updates, task reordering, ownership changes, or new objects.

QTable therefore treats the write path as:

```text
Understand
   ↓
Plan
   ↓
Preview
   ↓
Human Confirm
   ↓
Revalidate Permission / State
   ↓
Apply
   ↓
Audit
```

Preview is not a cosmetic animation. It is a system boundary.

Users should be able to see what AI **intends to do**, rather than discovering the result after the AI has already acted and hoping Undo can recover it.

Confirmation also cannot mean “the user clicked once, so everything is permanently authorized.” At Apply time, the system must re-check current permissions and current state because data may have changed between Preview and Apply.

This deserves a full article of its own, and it will get one later in the series.

## Agents often need better Context more than a bigger model

Consider the request:

> “Why is this project late?”

What is “this project”?

A useful agent may need to know the current user, workspace, table and view, active project and task, team membership, row visibility, recent events, and relevant conversation history.

That led QTable toward a Context Engine that brings User, Project, Table, Task, Team, Organization, View, and Session / Conversation context into a common flow.

The more I work on this, the more I believe:

> **A durable advantage in agent products may come less from prompt engineering and more from context engineering.**

We will go deeper into that in a later article.

## Open source is a product constraint, not just a distribution channel

For an AI work system that may eventually read projects, members, files, tasks, and external skills, trust is part of the product.

Users should be able to understand where data lives, what AI can see, where permissions are enforced, how keys are stored, which commit produced a Docker image, whether dependencies have known vulnerabilities, whether artifacts carry SBOM and provenance information, and which business rules an AI write passed through.

Open source therefore pushes QTable to turn a number of “good enough on my machine” concerns into explicit contracts: dependency audits, license policy, container scanning, SBOMs, provenance, CI contracts, and full-stack release gates.

Those are not badges for the README. They are part of the trust model.

## What QTable is today—and what it is not

QTable is still Alpha software.

The repositories are public and open source, but I do not want to pretend that making a repository public means the product is mature. Large-table performance, incremental realtime, template quality, agent runtime behavior, context freshness, permission boundaries, and ecosystem integrations all need more work.

Nor is QTable trying to replace every mature multidimensional-table product on day one.

The more important goal is to validate an architectural thesis:

> **If structured work data, permissions, context, and an auditable agent runtime share the same product model, can AI move from “telling you what to do” toward “getting the work done under your control”?**

That is the main reason I keep building QTable.

## What comes next in this series

“Building QTable: Engineering an AI-Native Work System” will stay close to real code and real architectural trade-offs rather than becoming a stream of feature announcements.

Upcoming topics include the multidimensional-table data model for agents, Preview → Confirm → Apply, the Context Engine, the Multi Tool Chain Runtime, shared data across Grid/Kanban/Gantt, agent permissions, private attachment storage, the QingZone identity contract, and the engineering work required to make a side project genuinely open source.

The code is public today:

- [QingZoneX/qtable-server](https://github.com/QingZoneX/qtable-server)
- [QingZoneX/qtable-web](https://github.com/QingZoneX/qtable-web)

Code usually reveals what a product truly believes more clearly than marketing copy does.
