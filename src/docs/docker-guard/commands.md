---
title: Commands
description: Reference for all Docker Guard CLI commands.
eyebrow: Reference
order: 2
---

Every Docker Guard subcommand, with examples.

```text
Usage: dg [options] [command]

Options:
  -V, --version    output the version number
  -h, --help       display help for command
```

## Subcommands

- `dg guard [--strict]` — Watch containers for security threats.
- `dg ps` — List containers with resource usage and threat status.
- `dg health <container>` — Show health diagnostics.
- `dg events --follow` — Stream live container events.
- `dg audit` — View immutable audit trail.
- `dg help [command]` — Display help for command.
