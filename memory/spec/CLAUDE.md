# HookHub — MVP Product Spec

> Last updated: 25 April 2026  
> Status: MVP — browse and display only

---

## Problem

Open-source Claude hooks are scattered across individual GitHub repositories and social posts. There is no focused, browsable hub where developers can discover high-signal hooks quickly.

---

## Goal

Provide a simple, fast place to browse useful open-source Claude hooks. MVP scope is limited to **display and discovery only**.

---

## MVP Scope

### In scope
- Main page displays hooks in a responsive grid.
- Each hook card shows: **name**, **category**, **description**, **repository link**.
- Category filter on the browse page.
- Curated dataset — approved entries only shown publicly.
- Loading, empty, and error states on the browse page.
- Outbound click tracking (repo link clicks).

### Out of scope (post-MVP)
- User accounts, profiles, or authentication.
- Public hook submissions workflow.
- Comments, ratings, upvotes, or recommendations.
- Automated large-scale GitHub crawling.
- Advanced search or relevance ranking.
- Full-text search.

---

## Personas

| Persona | Need |
|---|---|
| **Builder** | Find a ready-to-use hook and open the repo fast. |
| **Explorer** | Browse categories and discover interesting projects. |
| **Curator / Admin** | Maintain data quality; approve hook entries before they go live. |

---

## User Stories

1. As a builder, I can scan hook cards and open the GitHub repo in one click.
2. As an explorer, I can filter hooks by category to narrow my browse.
3. As a curator, I can ensure only valid, high-quality entries are shown.

---

## Data Model

```
Hook {
  id          string      — unique identifier
  name        string      — required, max 80 chars
  category    string      — required, must be a value from the fixed category enum
  description string      — required, max 300 chars
  repoUrl     string      — required, must match https://github.com/* pattern
  status      enum        — approved | pending | rejected (default: approved for curated seed)
  createdAt   datetime
  updatedAt   datetime
}
```

### Validation rules (ingestion)
- All required fields must be present and non-empty after trimming.
- `repoUrl` must match `https://github.com/<owner>/<repo>` pattern exactly.
- `category` must be a member of the fixed allowed list (see below).
- `name` ≤ 80 characters; `description` ≤ 300 characters.

### Initial category taxonomy (fixed enum — MVP)
```
security
file-management
git
testing
notifications
session
permissions
utilities
```

> The category list is owned by maintainers and is not user-editable in MVP.

---

## API Contracts

### `GET /hooks`
Returns a paginated list of approved hooks.

**Query params**
| Param | Type | Default | Description |
|---|---|---|---|
| `category` | string | — | Filter by exact category value |
| `page` | number | 1 | Page number (1-based) |
| `pageSize` | number | 20 | Records per page (max 50) |

**Response**
```json
{
  "items": [
    {
      "id": "string",
      "name": "string",
      "category": "string",
      "description": "string",
      "repoUrl": "string",
      "createdAt": "ISO8601"
    }
  ],
  "total": 42,
  "page": 1,
  "pageSize": 20
}
```

- Only `status: approved` records are returned.
- Default sort: newest first (`createdAt` descending). Sort is stable.

### `GET /categories`
Returns the list of categories that have at least one approved hook.

**Response**
```json
{
  "categories": ["security", "git", "testing"]
}
```

---

## UX Specification

### Main browse page layout
1. Page header: product name and tagline.
2. Category filter: horizontal scrollable chip list; "All" selected by default.
3. Hook grid: responsive, 1 column on mobile → 2 columns on tablet → 3 columns on desktop.

### Hook card content hierarchy
1. Hook **name** (prominent)
2. **Category** badge (coloured chip)
3. **Description** (2–3 line clamp, no overflow)
4. **Open repo** button / link — opens `repoUrl` in a new tab with `rel="noopener noreferrer"`

### Required UI states
| State | Behaviour |
|---|---|
| Loading | Skeleton cards replace the grid while data loads |
| Empty | Friendly message: "No hooks found for this category yet." |
| Error | Non-blocking inline message with retry option |

---

## Security Considerations

- All outbound links must use `rel="noopener noreferrer"` and `target="_blank"`.
- `repoUrl` must be validated against the `https://github.com/*` pattern at **ingestion time** and never constructed from user input client-side.
- Text fields are sanitised and length-limited at ingestion to prevent excessive content.
- Public read API returns only `approved` records; status field is never exposed in the API response.
- No user input is accepted on the public-facing MVP UI (browse only).

---

## Analytics Events

| Event | Trigger |
|---|---|
| `browse_page_view` | User loads the main browse page |
| `category_filter_applied` | User selects a category chip |
| `repo_link_clicked` | User clicks the "Open repo" link on a card |

Track counts and click-through rate (repo clicks ÷ page views) as the primary engagement signal.

---

## Operations and Monitoring

- Log all API errors with request ID and status code.
- Track p50/p95 API response latency.
- Alert on error rate exceeding 1% over a 5-minute window.
- Ingestion runs as a controlled admin operation (no automated crawling in MVP).
- Database backups and retention policy defined before public launch.

---

## Delivery Phases

### Phase 0 — Scope lock (1–2 days)
- Finalise category list.
- Confirm curated-only decision for launch.
- Define minimum approved hook count before public release.

### Phase 1 — Data and ingestion (2–3 days)
- Create Hook schema and database table.
- Build minimal admin ingestion script with validation.
- Seed initial approved dataset.

### Phase 2 — Read API (2–3 days)
- Implement `GET /hooks` with pagination and category filter.
- Implement `GET /categories`.
- Add stable sort, input validation, and error handling.

### Phase 3 — Browse UI (3–5 days)
- Build responsive browse page and hook card component.
- Add category filter, loading skeleton, empty, and error states.
- Add outbound repo link behaviour.

### Phase 4 — Safety and observability (2–3 days)
- Enforce approved-only reads.
- Add analytics event tracking.
- Add API error logging and latency monitoring.

### Phase 5 — Launch (1–2 days)
- Internal QA on desktop and mobile.
- Soft launch and metric review.
- Define post-MVP priorities based on real usage data.

---

## Open Questions

1. **Submission model** — curated-only at launch, or allow public submissions with a manual approval queue from day one?
2. **Default sort** — newest first, curated priority order, or alphabetical?
3. **Minimum dataset size** — what hook count is required before public launch (e.g. 30, 50, 100)?
4. **Analytics stack** — which tool for MVP to avoid extra integration overhead?
5. **Category evolution** — who owns updates to the fixed category list post-launch?
