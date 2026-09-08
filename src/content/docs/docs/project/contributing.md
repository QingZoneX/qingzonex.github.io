---
title: Contributing
description: Contribution entry points for QTable, QTableUI and the QingZoneX open-source roadmap.
---

Contribution details should remain close to each codebase so commands and quality gates cannot drift from implementation.

## QTable

Read the repository's [`CONTRIBUTING.md`](https://github.com/QingZoneX/QTable/blob/main/CONTRIBUTING.md) before opening a pull request.

The backend README currently documents these high-level checks:

```bash
pytest -q
python scripts/check_secrets.py --history
python scripts/check_open_source_readiness.py
```

## QTableUI

Read the frontend [`CONTRIBUTING.md`](https://github.com/QingZoneX/QTableUI/blob/main/CONTRIBUTING.md).

The frontend repository documents build, dependency, license and product-contract checks as part of its quality gates.

## Roadmap discussion

Use GitHub Issues for concrete roadmap proposals, defects and implementation discussion. The portal roadmap is deliberately a summary rather than a second issue tracker.
