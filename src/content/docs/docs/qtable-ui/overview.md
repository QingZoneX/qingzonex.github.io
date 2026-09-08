---
title: QTableUI overview
description: Frontend scope and technology stack for the QTableUI v0.1.0-alpha open-source preview.
---

QTableUI is the React frontend for QTable.

It currently provides the interactive experience for:

- Grid
- Kanban
- Gantt
- Calendar
- Gallery
- Dashboards
- AI planning workflows
- QNote Source Inbox

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

The frontend is expected to preserve QTable's server-side security model rather than reproducing or bypassing it on the client.
