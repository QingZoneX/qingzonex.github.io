---
title: Release status
description: "QTable public-source status, Alpha tag and distribution-artifact boundary."
---

QTable's current public version is **`v0.1.1-alpha` — Open Source Preview**.

## Public source and tag

Both implementation repositories are public and both publish the `v0.1.1-alpha` Git tag:

- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server)
- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web)

Together they form one QTable product version. The web frontend, API / domain services, data layer and object storage should be validated on one compatible baseline.

## Distribution status

As of this update, neither repository has a published GitHub Release for `v0.1.1-alpha`. A published Git tag therefore **must not be interpreted as a published GitHub Release, Docker Hub image or stable distribution artifact**. Treat an image, Release or other distribution artifact as available only when the corresponding repository or registry actually publishes it.

## Alpha expectations

The current baseline is appropriate for source evaluation, community development, staging and controlled trials. Before v1.0, public APIs, migration behavior, operations runbooks and some product contracts may still change.

Before production deployment, complete the [Production checklist](../../getting-started/production-checklist/) and review the [Feature matrix](../feature-matrix/).
