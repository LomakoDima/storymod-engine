---
title: Common issues
description: Diagnosing problems and reporting issues.
order: 1
---

## Check the Minecraft version

StoryModEngine supports only Minecraft Java Edition **1.20.1**. Confirm the version shown in your launcher profile before investigating further.

## Locate the game log

Minecraft writes its log to `logs/latest.log` inside the game directory. Default game directory locations:

| OS | Path |
| --- | --- |
| Windows | `%APPDATA%\.minecraft` |
| macOS | `~/Library/Application Support/minecraft` |
| Linux | `~/.minecraft` |

## Reporting an issue

1. Reproduce the problem and note the exact steps.
2. Copy `logs/latest.log` from the session where the problem occurred.
3. Open an issue on the StoryModEngine GitHub repository with the steps, the log, and your StoryModEngine version.

> [!PENDING]
> Specific known issues and their fixes will be listed here as they are confirmed.
