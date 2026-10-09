---
title: واجهة QTable Web
description: "واجهة منتج QTable Web App التي يوفّرها qtable-web، والحزمة التقنية وحدود الأمان."
---

يصف هذا الفصل **QTable Web App**. ينفّذه المستودع العام [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web)، وهو طبقة الواجهة في منتج QTable، ويتشارك مع [`qtable-server`](https://github.com/QingZoneX/qtable-server) عقود الصلاحيات والبيانات والإصدار.

## واجهة المنتج الحالية

- Home / My Work / Projects Center؛
- Grid / Kanban / Gantt / Calendar / Gallery؛
- Dashboard Center / Workbench؛
- Automation Center وسجل التنفيذ؛
- Notification Center وRecord Workspace / Collaboration / Activity؛
- Global Search / Command paths وRecycle Bin؛
- AI Planning وProject Steward وخطة إجراء آمنة وSource Inbox.

## الحزمة التقنية

- React 19
- TypeScript 7
- Vite / Rolldown
- Ant Design 6
- VTable / VTable Gantt
- Apollo Client
- Zustand
- VChart
- react-grid-layout

## عقد التشغيل

يستمع خادم التطوير افتراضيًا إلى `9100`، ويوكّل طلبات API / GraphQL / WebSocket / Auth / OAuth إلى qtable-server الذي يستمع افتراضيًا إلى `9000`. وتقدّم حاوية الإنتاج عبر Nginx الأصول الثابتة وتوجيه SPA ورؤوس الاستجابة الأمنية.

## حدود المنتج

يجب أن تحترم الواجهة عقود qtable-server للصلاحيات والترقيم والتدقيق والمرفقات الخاصة و**Preview → Confirm → Apply**. ولا يجوز للجداول الكبيرة أو الذكاء الاصطناعي أو Dashboard أو المشاركة العامة تنزيل بيانات مخفية عبر العميل أو تجاوز حدود أمان الخادم.
