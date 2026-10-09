---
title: وثائق QTable
description: "وثائق كاملة لمنتج QTable مفتوح المصدر من QingZoneX، تغطي تجربة الويب وخدمات API والاستضافة الذاتية والأمان والمرفقات وسير عمل الذكاء الاصطناعي."
sidebar:
  order: 1
---

**QTable** هو المنتج الذي تقدّمه QingZoneX حاليًا كمصدر مفتوح: نظام أصيل للذكاء الاصطناعي لإدارة المشاريع والعمل مبني على جداول متعددة الأبعاد.

من منظور المستخدم، QTable منتج متكامل؛ ومن منظور هندسي، يتكوّن من مستودعين عامين للتنفيذ. يتشارك الطبقان نموذج Table / Record / View / Dashboard / Permission نفسه، ويعملان معًا عبر عقود REST / GraphQL / WebSocket / Auth / OAuth.

- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) — خادم FastAPI / Strawberry GraphQL ونموذج البيانات والصلاحيات والأتمتة والتدقيق والمرفقات والبحث وOAuth وخدمات الذكاء الاصطناعي.
- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) — تطبيق React ومراكز العمل وGrid / Kanban / Gantt / Calendar / Gallery ولوحات المعلومات والتعاون والأتمتة وتفاعلات الذكاء الاصطناعي.

يعتمد المستودعان حاليًا على خط أساس **`v0.1.1-alpha` / Open Source Preview**، ويُصانان تحت **Apache License 2.0**. ولا يعني نشر المستودع وجود GitHub Release أو صورة Docker أو أي منتج إصدار آخر؛ ويجب الرجوع إلى [حالة الإصدار](./project/release-status/) وسجلات Releases في كل مستودع.

## مسارات القراءة المقترحة

1. شغّل QTable كاملًا محليًا وفق [بدء سريع](./getting-started/quick-start/).
2. اقرأ [معمارية QTable](./qtable/architecture/) لفهم حدود الويب وAPI والبيانات والتخزين.
3. راجع [نظرة عامة على منتج QTable](./qtable/overview/) لمعرفة خط الأساس الحالي.
4. للتنفيذ الأمامي والتطوير المحلي راجع [تطوير الواجهة](./qtable-ui/development/).
5. قبل النشر العام راجع [نموذج الأمان](./qtable/security/) و[قائمة فحص بيئة الإنتاج](./getting-started/production-checklist/).
6. استخدم [مصفوفة الميزات](./project/feature-matrix/) للتمييز بين المنفَّذ وما يجري تقويته وما هو مخطَّط.

:::caution[حالة Alpha]
الإصدار الحالي مناسب للتقييم وتطوير المجتمع وبيئات Staging والتجربة المضبوطة. وقبل v1.0 قد تتغير واجهات API العامة وسلوك الترحيل وبعض عقود المنتج.
:::
