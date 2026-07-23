# Bug Fix Plan

## Bug 1 — Wrong file extension for AI page
- [x] Rename `app/ai/page.tsk` → `app/ai/page.tsx` ✅

## Bug 2 — Nested `<main>` elements
- [x] Remove `<main>` wrapper from `app/page.tsx` since `layout.tsx` already provides a `<main>` container ✅

## Bug 3 — Broken footer link to `/contact`
- [x] Change `/contact` to `/consultation` in `components/site-footer.tsx` ✅

## Bug 4 — Missing dynamic route for case studies
- [x] Create `app/case-studies/[slug]/page.tsx` ✅

## Bug 5 — Missing dynamic route for insights
- [x] Create `app/insights/[slug]/page.tsx` ✅

