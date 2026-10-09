---
title: نظرة عامة على منتج QTable
description: "قدرات QTable v0.1.1-alpha الكاملة، وحدود التنفيذ بين qtable-web وqtable-server."
---

QTable منتج مفتوح المصدر أصيل للذكاء الاصطناعي لإدارة المشاريع والعمل. **تشكّل الواجهة والخادم معًا QTable واحدًا** يتشارك نموذج Table / Record / View / Dashboard / Permission.

يُصان الكود الحالي في مستودعين عامين:

- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) — تطبيق QTable Web؛
- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) — واجهة API وخدمات النطاق وحدود أمان البيانات.

## QTable Web App

يوفّر `qtable-web` حاليًا:

- Home / My Work / Projects Center؛
- Grid / Kanban / Gantt / Calendar / Gallery؛
- Dashboard Center / Workbench؛
- Automation Center وسجل التنفيذ؛
- Notification Center ومساحة عمل السجل وActivity والمسارات المباشرة؛
- بحث شامل واعٍ بالصلاحيات وRecycle Bin؛
- AI Planning وProject Steward وخطة إجراء آمنة وSource Inbox.

## QTable API & Domain Services

يتولّى `qtable-server`:

- الحقول والسجلات والتصفية والترتيب والتجميع والعروض المسمّاة وTask Profile؛
- صلاحيات مساحة العمل والكائن والصف؛
- الأتمتة وتجميع Dashboard وChangeSet والتدقيق ودورة حياة السلة؛
- OAuth2 + S256 PKCE؛
- حزمة PostgreSQL + Redis، مع رجوع خفيف صريح إلى SQLite؛
- دورة حياة مرفقات خاصة متوافقة مع S3؛
- خدمات ذكاء اصطناعي واعية بالصلاحيات ومسار كتابة Preview → Confirm → Apply.

## عقد منتج واحد

تُدمج الواجهة وAPI عبر عقود REST / GraphQL / WebSocket / Auth / OAuth في QTable واحد بالاستضافة الذاتية. ولا يمكن للواجهة تجاوز صلاحيات الخادم أو الترقيم أو التدقيق أو قواعد أمان المرفقات. ولا تتطلب قدرات الجدول الأساسية إعداد مزوّد ذكاء اصطناعي خارجي.

## حدود Alpha

يستخدم المستودعان حاليًا خط أساس `v0.1.1-alpha` / Open Source Preview. المستودعان عامان، لكن لا يوجد GitHub Release منشور حاليًا؛ ويجب فهم حالة المصدر وحالة منتجات الإصدار بشكل منفصل. راجع [مصفوفة الميزات](../../project/feature-matrix/) و[حالة الإصدار](../../project/release-status/).
