---
title: Writing documentation
description: How to add and edit pages in this documentation.
order: 1
---

Every page on this site is a Markdown file. Adding a file adds a page; no other changes are needed.

## File location

```text
src/content/docs/<version>/<section>/<page>.md
```

| Segment | Example | Meaning |
| --- | --- | --- |
| `version` | `latest` | Documentation version shown in the version selector |
| `section` | `editors` | Sidebar section |
| `page` | `npc-editor` | URL slug of the page |

Valid section folders: `getting-started`, `editors`, `sme-scripting`, `guides`, `api-reference`, `troubleshooting`.

## Front matter

Each file starts with a front matter block:

```yaml
---
title: NPC Editor
description: One-sentence summary shown under the title and in search.
order: 2
status: pending
---
```

- `order` controls position within the section.
- `status: pending` adds a marker next to the page in the sidebar. Remove it once the page is complete.

## Callouts

```markdown
> [!NOTE]
> Supplementary information.
```

Supported types: `NOTE`, `TIP`, `WARNING`, `PENDING`.

## Code blocks

Fenced code blocks with a language name are highlighted and get a copy button:

````markdown
```bash
java -version
```
````

## Adding a new version

1. Copy `src/content/docs/latest` to a new folder, for example `src/content/docs/1.0`.
2. Add a label for it in `VERSION_LABELS` in `src/lib/docs.ts`.
3. Edit pages in the new folder. The version selector picks it up automatically.
