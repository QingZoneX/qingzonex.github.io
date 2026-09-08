---
title: AI workflows
description: How QTable structures AI planning and action flows around existing product models and user control.
---

QTable's AI direction is designed around the same Table / View / Dashboard / Permission models used by manual work.

A typical path is:

```text
Describe a goal
      ↓
Generate workspace / tables
      ↓
Plan tasks
      ↓
Estimate workload and schedule
      ↓
Suggest assignees
      ↓
Diagnose project risks
      ↓
Preview and apply actions
```

## Preview → Confirm → Apply

AI action plans are intended to keep mutation explicit:

1. AI reads only context the current user is allowed to see.
2. A proposed action plan is generated.
3. Preview operations do not mutate business data.
4. The user can inspect or partially accept the plan.
5. Apply operations re-check permission and optimistic/concurrent state.

## Provider configuration

The current codebase supports OpenAI-compatible and DeepSeek-compatible paths. API keys are stored through the application's encrypted AI configuration flow rather than committed to source control.

Core table functionality can be used without an external AI provider.
