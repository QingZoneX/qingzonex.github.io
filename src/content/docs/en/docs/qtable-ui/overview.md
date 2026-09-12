---
title: QTable Web frontend
description: "The QTable Web App product surface, stack and security boundary implemented by qtable-web."
---

This section documents the **QTable Web App**, implemented by the public [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) repository. It is QTable's web frontend layer and shares permission, data and release contracts with [`qtable-server`](https://github.com/QingZoneX/qtable-server).

## Current product surface

- Home / My Work / Projects Center;
- Grid / Kanban / Gantt / Calendar / Gallery;
- Dashboard Center / Workbench;
- Automation Center and execution history;
- Notification Center, Record Workspace / Collaboration / Activity;
- Global Search / command paths and Recycle Bin;
- AI Planning, Project Steward, safe action plans and Source Inbox.

## Stack

- React 19
- TypeScript 7
- Vite / Rolldown
- Ant Design 6
- VTable / VTable Gantt
- Apollo Client
- Zustand
- VChart
- react-grid-layout

## Runtime contract

The development server listens on `9100` by default and proxies API / GraphQL / WebSocket / Auth / OAuth traffic to qtable-server on `9000`. The production container uses Nginx for static assets, SPA routing and security response headers.

## Product boundary

The frontend must respect qtable-server permissions, pagination, audit, private attachments and the **Preview → Confirm → Apply** contract. Large-table analytics, AI, dashboards and public sharing must not download hidden data or bypass the server security boundary.
