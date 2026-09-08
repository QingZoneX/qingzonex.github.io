---
title: QTable frontend implementation
description: "The QTable Web App product interface and frontend stack; the implementation repository is named QingZoneX/QTableUI."
---

This section documents **QTable’s frontend implementation**. The code repository is named [`QingZoneX/QTableUI`](https://github.com/QingZoneX/QTableUI), but it is not a separate product in the portal hierarchy; it implements the QTable Web App.

## Current product surfaces

- Home / My Work;
- Projects Center;
- Grid / Kanban / Gantt / Calendar / Gallery;
- Dashboard Center / Workbench;
- Automation Center;
- Notification Center;
- Record Workspace / Collaboration / Activity;
- Global Search / Command paths;
- Recycle Bin;
- AI Planning, Project Steward and safe Action Plans;
- QNote Source Inbox.

## Stack

- React 19
- TypeScript 6
- Vite / Rolldown
- Ant Design 6
- VTable / VTable Gantt
- Apollo Client
- Zustand
- VChart
- react-grid-layout

## Product boundary

The frontend must preserve QTable’s server-side permission, paging, auditability, private attachment and Preview → Confirm → Apply contracts. Large-table, AI, Dashboard and public-sharing paths must not bypass server-side safety boundaries.
