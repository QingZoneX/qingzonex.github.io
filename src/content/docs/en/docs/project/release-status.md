---
title: Release status
description: "QTable public-source status, Alpha tag baseline and distribution-artifact boundary."
---

QTable is currently **`v0.1.1-alpha` — Open Source Preview**.

## Public source and tags

Both implementation repositories are public and both publish the `v0.1.1-alpha` tag:

- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server)
- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web)

Together they form one QTable product version. The web frontend, API / domain services, data layer and object storage should be validated on one compatible baseline.

## Distribution status

Neither repository currently has a published GitHub Release. The `v0.1.1-alpha` tag therefore identifies the current public Alpha source baseline; it **must not be interpreted as a published stable GitHub Release, Docker Hub image or other distribution artifact**. Treat an image or Release as available only when the corresponding repository or registry actually publishes it.

## Alpha expectations

The current baseline is appropriate for source evaluation, community development, staging and controlled trials. Before v1.0, public APIs, migration behavior, operations runbooks and some product contracts may still change.

Before production deployment, complete the [Production checklist](../../getting-started/production-checklist/) and review the [Feature matrix](../feature-matrix/).
