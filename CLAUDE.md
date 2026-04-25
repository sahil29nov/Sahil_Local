@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical: Next.js version

This repo uses **Next.js 16.2.4 with React 19.2.4**. APIs, conventions, and file structure differ from older Next.js versions that dominate training data. Before writing Next.js code, consult the bundled docs at `node_modules/next/dist/docs/` (App Router guides live in `01-app/`). Respect any deprecation notices you find there.

## Commands

- `npm run dev` — start the dev server on http://localhost:3000
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint (flat config in `eslint.config.mjs`, extends `eslint-config-next`)

There is no test runner configured yet.

## Architecture

- **App Router only.** All routes live under `app/`. `app/layout.tsx` is the root layout; `app/page.tsx` is the index route. Global styles are in `app/globals.css` (Tailwind v4 via `@tailwindcss/postcss`).
- **Path alias:** `@/*` resolves to the repo root (see `tsconfig.json`).
- **Styling:** Tailwind CSS v4 — configured through PostCSS (`postcss.config.mjs`), not a `tailwind.config.*` file. Theme tokens and directives live inline in `app/globals.css`.
- **TypeScript:** strict mode on, `moduleResolution: bundler`, JSX via `react-jsx`. The Next TS plugin is registered in `tsconfig.json`.
