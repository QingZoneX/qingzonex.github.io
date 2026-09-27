---
layout: ../../../layouts/BlogPostLayout.astro
title: "Grid, Kanban, and Gantt Should Not Store Three Copies of the Data: Why a QTable View Is Only a Projection"
description: "The same task is a row in Grid, a card in Kanban, and a bar in Gantt. The hard part is not rendering three interfaces; it is making all three operate on the same Record. This article follows QTable's current TableRecord, TableView, BoardCardOrder, and QTableUI view implementation to separate business state from view state and identify the consistency boundaries that still need work."
date: "2026-09-27"
locale: "en"
slug: "one-truth-multiple-views"
series: "Building QTable: Engineering an AI-Native Work System"
seriesIndex: 6
seriesTotal: 10
sourcePath: "src/pages/en/blog/one-truth-multiple-views.md"
---

The previous article focused on execution: how an Agent can turn several Tools into one controlled chain.

But once that chain finishes, the result returns to the product.

One person may inspect it in Grid. A project manager may drag it in Kanban. Someone else may change the start date in Gantt. An Automation may update the status in the background. An Agent may modify the same business object directly.

That raises a simple-looking question with a large architectural consequence:

**Are Grid, Kanban, and Gantt three different copies of the data?**

If the answer is yes, synchronization problems arrive almost immediately.

Grid says Done while the Kanban card is still in In Progress. Gantt moves the deadline to next week while the table still shows yesterday. The Agent reads one Record while the user is looking at a second copy cached inside a View.

Every screen may appear functional, but the system no longer has a clear fact to trust.

QTable's goal at this layer is therefore not to build three independent data products. It is:

> **Let different Views share the same business facts, while each View stores only the state that truly belongs to that presentation.**

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/one-truth-multiple-views/01-one-record-three-views.svg" alt="One QTable Record is projected into Grid, Kanban, and Gantt. Editing a cell, moving a card, or changing a task bar ultimately operates on the same business record." loading="eager" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">A View changes how a Record is seen and manipulated. It should not create a second business state for the same task.</figcaption>
</figure>

## One task should have one identity

The current backend model is deliberately straightforward.

<code>TableRecord</code> has a stable <code>id</code>, a <code>table_id</code>, JSON <code>data</code>, and a monotonic <code>version</code> for optimistic concurrency.

Title, status, owner, start date, end date, and progress are all values on that Record.

<code>TableView</code> stores a different kind of information: <code>id</code>, <code>name</code>, <code>type</code>, and <code>config</code>.

The distinction is more important than the classes themselves.

A Record answers:

“What is this business object right now?”

A View answers:

“How do I want to look at this set of business objects?”

If those two questions are mixed, a multi-view product eventually grows a second source of truth.

It is tempting to create a KanbanTask table for Kanban, another GanttTask model for Gantt, and then copy fields among them.

That is convenient while each interface is being developed in isolation.

It becomes much less convenient once the product has Automation, Agents, APIs, realtime collaboration, and audit history, because every write then has to answer a new question:

“Which copy should I update?”

The QTable direction is much simpler:

**Update the business object first. The View only determines how the interaction reaches that object.**

## A View should store how to look, not what is true

QTableUI's current <code>ViewConfig</code> already keeps substantial view-specific state on the View itself.

That includes filters, sorts, grouping, hidden fields, the Gantt start/end/progress field mapping, Calendar date mapping, and Gallery presentation settings.

Kanban also has a board configuration for its group field, optional lane field, card fields, collapsed columns, and related presentation choices.

Those values belong to a View because they change interpretation and presentation, not the underlying task.

The same task table may have a “My work” View that filters by the current member and a “High priority this week” View that shows a different subset.

The visible sets differ.

The tasks should not be duplicated.

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/one-truth-multiple-views/02-business-vs-view-state.svg" alt="QTable separates business state from view state. TableRecord.data stores shared facts such as status, owner, dates, and progress, while TableView.config stores filters, sorts, grouping, hidden fields, Gantt mapping, and Kanban configuration." loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">Status, dates, and ownership belong to the business object. Filters, sorting, grouping, and layout belong to the View.</figcaption>
</figure>

There is still some history visible in the implementation.

The backend retains table-level <code>TableFilter</code>, <code>TableSort</code>, and <code>TableGroup</code> models, and the full-store path still returns them.

At the same time, the current QTableUI path primarily persists filters, sorts, and grouping into each <code>TableView.config</code>.

So this layer is still in a compatibility and consolidation phase.

I would not describe QTable as having completely removed table-level view configuration.

A more accurate description is:

**the current product path is clearly moving toward per-view configuration, while legacy table-level contracts still exist.**

That distinction matters. If the same filter can ambiguously belong to either a Table or a View, the model can become unclear again even when the records themselves remain canonical.

## Grid is the most direct projection

Grid is the easiest case to reason about.

<code>GridView.tsx</code> reads fields, records, filters, sorts, and grouping from the shared <code>useSmartTableStore</code>.

It passes the records through <code>useTableRecords(...)</code> to apply the current projection, then renders the result.

The important part is editing.

Changing a Grid cell does not update “Grid data.”

The cell-change event ends up calling <code>updateRecord(recordId, fieldId, value)</code> in the shared store.

That write targets the same Record used elsewhere.

Grid is therefore the View that looks closest to the underlying record model. It can hide fields, group rows, and sort them without changing record identity.

Kanban and Gantt are more interesting because their interactions make it much easier for presentation state to turn into accidental business state.

## Kanban is where a second task database is most tempting

Kanban seems to invite its own data model.

Cards have columns, swimlanes, and manual order. It is easy to think: “store the card state separately.”

QTable's current Board backend deliberately avoids that.

The business object inside a Board card is still a <code>TableRecord</code>.

A Kanban column is derived from a real Field, such as Status. A swimlane can be derived from another real Field, such as Owner. The View configuration tells the backend which fields have those roles and which fields should appear on the card.

That means “this card is in Done” is not a separate Kanban fact.

It means:

**the Record's configured grouping field has the value Done.**

This is why a drag cannot be only a pixel-level movement.

The current <code>move_board_card</code> implementation locks the Record, checks <code>expectedRecordVersion</code>, resolves the destination column and lane back into real field values, and writes them to <code>TableRecord.data</code>.

When business fields change, the Record version increments and a normal ChangeSet is written with the source identified as Kanban.

After that transaction, Grid naturally sees the new status when it refreshes the same Record. Gantt sees it too if that field is part of the projection.

There is no separate “sync Kanban state to Grid” job.

There is no second status to synchronize.

## Manual card order really can belong to a View

Now consider a different question.

Two cards are both in Done. Should A appear before B, or B before A?

That is often not a business fact.

A team might maintain two Kanban Views.

A product View may rank work by customer impact.  
An engineering View may use a hand-maintained execution order.

Both can be valid at the same time.

QTable therefore does not put manual card rank into <code>TableRecord.data</code>.

The backend has a separate <code>BoardCardOrder</code> keyed by <code>(table_id, view_id, record_id)</code>, with a high-precision rank and its own revision.

The intent is explicit in the model: business state remains in the Record, while this table stores presentation order so Kanban does not become another task database.

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/one-truth-multiple-views/03-kanban-two-layer-move.svg" alt="A QTable Kanban drag updates two layers: the business layer writes the target column or lane back to TableRecord.data and increments the record version, while the presentation layer stores only the current board's manual order in BoardCardOrder rank and order revision." loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">Status belongs to the task. Manual card order belongs to a particular Kanban View. Keeping them separate allows shared truth without forcing identical presentation.</figcaption>
</figure>

This split also creates a useful concurrency model.

A Board move can carry both <code>expectedRecordVersion</code> and <code>expectedOrderRevision</code>.

The first protects business state from stale writes.

The second protects the manual order of that particular View.

They should not be collapsed into one number because they protect different layers of state.

The current isolation tests make this concrete: the same two Records can appear A → B in one Board and B → A in another, while both Views still reference the same Record versions.

That is exactly the kind of difference a shared-truth design should permit:

**one task may occupy different visual positions in two Views, but it should not have two different business statuses.**

## Kanban is already a server-side projection

Grid and Gantt currently work primarily from the Record set held in the SmartTable store.

Kanban has moved further toward a server-side projection.

The Board query can page one column/lane cell independently. Counts, filtering, sorting, and row-permission constraints are applied on the server. QTableUI's <code>useServerBoard</code> performs network-only Board queries, lazily loads cells, and listens for board updates.

That does not mean Kanban owns another source of truth.

It means a large table should not require the browser to load every Record and locally reconstruct an entire board.

The backend still reads <code>TableRecord</code> and projects it into Kanban structures.

It is a Projection Service, not another business database.

There is a current limitation worth stating: the GraphQL Board contract requires the database backend for this paged Kanban path.

The File backend does not currently offer the same server-paged Board capability.

That is an implementation boundary, not something to hide behind the abstraction.

## Gantt is closer to a field-mapping projection

Gantt has a different shape.

It needs to know which Record field represents start, which represents end, and which represents progress.

QTableUI stores those mappings in the current View's <code>ganttConfig</code>.

That means the business dates remain on the Record.

The View only declares:

“For this Gantt, interpret these field IDs as start, end, and progress.”

During rendering, <code>GanttView.tsx</code> maps Records into temporary rendering fields such as <code>__gantt_start</code>, <code>__gantt_end</code>, and <code>__gantt_progress</code>.

Those are adapter fields for the visualization library.

They are not new business fields.

That gives us another important rule:

**A projection may derive temporary rendering data, but that data should not quietly become a new source of truth.**

<figure style="margin:2.5rem 0 3rem">
  <img src="/blog-assets/one-truth-multiple-views/04-gantt-projection-writeback.svg" alt="QTable Gantt uses ganttConfig to map Record start, end, and progress fields into task bars, then writes user edits back to the same Record. Synthetic dates used when data is missing remain rendering-only values." loading="lazy" decoding="async" style="display:block;width:100%;height:auto;border-radius:22px;box-shadow:0 18px 48px rgba(15,23,42,.14)" />
  <figcaption style="margin-top:.85rem;text-align:center;color:var(--text-muted);font-size:.9rem;line-height:1.6">Gantt may derive rendering fields, but real edits should return to the configured Record fields.</figcaption>
</figure>

There is a subtle example of this boundary in the current implementation.

When Start or End is missing, Gantt synthesizes a temporary date so the task bar can still be rendered.

When both are missing, it produces a default visual range based on the current date and row position.

Those values are not automatically persisted back to the Record.

That is the right distinction.

“A value needed so the UI can draw something” is not the same statement as “the business has decided this task starts on this date.”

If synthetic values ever become real dates, that should happen through an explicit action or rule, not as a side effect of rendering.

## Gantt writes back to the same Record, but date-range editing is not atomic yet

The direction of Gantt editing is already consistent with the shared model.

Editing a Task List cell calls the same <code>updateRecord</code>. Moving a task bar writes the new Start and End values into the configured Date fields. Updating progress writes the actual progress field.

So Gantt is not a separate task store.

There is still an engineering gap.

The current <code>change_date_range</code> handler performs two consecutive <code>updateRecord</code> calls: one for Start and one for End.

From the user's perspective, moving a bar is one operation.

At the data layer, it is currently two writes.

If the first succeeds and the second fails, a partially updated range can exist temporarily.

QTableUI already has an <code>updateCalendarRange</code> path that handles two date fields through one range mutation for Calendar behavior.

A sensible convergence path is to give Gantt the same kind of atomic range update rather than keeping two independent mutations indefinitely.

Sharing one Record solves data duplication.

It does not automatically solve the question of **how many atomic business changes one interaction should represent.**

## Realtime collaboration should converge on the same server fact

A multi-view application has another common failure mode: each View develops its own cache and then tries to synchronize those caches over WebSockets.

That quickly turns into Grid Cache, Kanban Cache, and Gantt Cache—three copies again, just in a different layer.

QTableUI's normal table path instead has a shared <code>useSmartTableStore</code> for the current Records. Grid and Gantt both read it.

Local Record patches can flow through Yjs for collaboration.

But the current implementation contains an important safety choice: it does not use a merged Yjs snapshot as the authoritative replacement for the store. A CRDT merge does not automatically understand the application's delete semantics, so an older snapshot could otherwise reintroduce a deleted Record.

Instead, lightweight table-update invalidation triggers a refresh from the server for metadata and the currently loaded Record window.

That is the right direction:

**Realtime transport can carry notifications and patches; canonical business data remains authoritative on the server.**

Kanban follows the same principle in a more specialized form.

Board updates refresh Board metadata and loaded cells. Board mutations also publish a compatible table update.

Other Views do not need to understand the UI concept of “a Kanban card moved.”

They only need to know:

the Table's business data changed.

That is especially important for Agents and Automation.

If an Agent updates Status, Grid, Kanban, and Gantt should converge around the Record change. The Agent should not have to publish three different view-specific events.

## One source of truth does not mean one copy of every possible state

“Single source of truth” can be taken too literally.

Not every state belongs on the Record.

Some state is inherently view-specific:

a View's Filter;  
hidden fields;  
collapsed Kanban columns;  
manual Kanban rank;  
which date fields a Gantt maps to the timeline;  
which Attachment a Gallery uses as the cover.

Putting those values on the Record would pollute business state.

The boundary I find more useful is:

**shared business facts, isolated view interpretation.**

A Record should have one Status.

Two Views can organize that Status differently.

A Record can have one set of date fields while different Gantt Views choose different field mappings, as long as the mapping is explicit.

A Record can rank first in Kanban A and seventh in Kanban B because rank is presentation state, not the task's identity.

That is more precise than saying “all Views share the same JSON.”

## The architecture has not fully converged yet

Looking at the current code, I would still push this layer in several directions.

First, **continue removing ambiguity around legacy table-level filter/sort/group contracts.** If the product model is moving to per-view configuration, the same configuration should not indefinitely have two possible homes.

Second, **make Gantt range updates atomic.** Start and End form one user operation and should not remain two independent writes.

Third, **move more projection work server-side as tables grow.** Kanban already has permission-aware paging. Grid and Gantt will also need clearer boundaries between server query and browser projection at scale.

Fourth, **define a stronger shared View Projection contract.** Filter, sort, grouping, field mapping, pagination, and permission semantics should not drift into slightly different implementations for every View.

So “one truth” does not mean this layer is finished.

It means QTable has the most important boundary in the right place: Record is the business object; View is the projection. Query behavior, realtime convergence, atomic updates, and compatibility still need consolidation around that boundary.

## This boundary matters even more to an Agent

A person looking at a Kanban card usually understands that it is still the same task that appeared as a table row.

An Agent only understands what the system models.

If the API exposes GridRow, KanbanCard, and GanttTask as three independent business resources, the model can reasonably treat them as three objects.

Then “mark this task Done” may turn into three writes:

update GridRow.status;  
move KanbanCard.column;  
update GanttTask.status.

That is a poor Tool contract.

The better model is:

the Agent always operates on <code>TableRecord</code>.

View becomes Context. It can tell the Agent which projection the user is looking at, what the current filters are, which Field defines Kanban columns, or which fields a Gantt maps to dates.

Changing the UI does not change the identity of the business object.

That allows people, APIs, Automation, and Agents to share the same execution semantics.

## A View should not become another source of truth

The appeal of multi-view software is obvious.

Grid is excellent for dense editing.  
Kanban makes flow visible.  
Gantt makes time and scheduling visible.

The difficult part is that richer interfaces require more disciplined data semantics underneath.

If every View begins storing its own version of business state, the product may look flexible while the architecture becomes fragile.

That leads to the core idea behind this article:

> **A View should not own a second copy of business truth. It should own a way to observe, organize, and operate on the same truth.**

Grid, Kanban, and Gantt are valuable not because they copy the same task three times, but because different people can work with one fact through different projections.

This article focused on how one business object appears through multiple Views.

The next article will move to an even harder boundary: **why an Agent's permissions must never exceed the permissions of the current user.**

When the same Record can be touched by Grid, Kanban, Gantt, Automation, and an Agent, changing the View must not change the authorization boundary—and being “AI” must never grant the Agent more data or write capability than the person it is acting for.
