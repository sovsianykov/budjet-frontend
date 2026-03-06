# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Budget/grocery management web app built with Next.js 16 (App Router), TypeScript, Material-UI, and Tailwind CSS v4.

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint (flat config, ESLint 9)
```

Package manager is **pnpm** (v9.12.1). No test framework is configured.

## Architecture

**Routing:** Next.js App Router (`src/app/`). Some routes use a `[lang]` dynamic segment for i18n (products, transactions, create-product).

**Authentication:** Custom `useAuth()` hook manages auth state. Tokens are stored as HTTP-only cookies (server-set); only `userId` is persisted in localStorage. The API wrapper (`src/lib/api.ts`) sends `credentials: "include"` on all requests.

**API Layer:** `apiRequest<T>()` in `src/lib/api.ts` is the central fetch wrapper. Domain-specific API functions live in `src/lib/products.ts`, `src/lib/transactions.ts`, `src/lib/users.ts`. Backend base URL comes from `NEXT_PUBLIC_API_URL` env var (default: `http://localhost:8080/api/v1`).

**State Management:** Custom hooks (`useAuth`, `useProducts`, `useTransactions`) using `useState`/`useCallback`. TanStack React Query is installed but not yet actively used. React Hook Form with Zod handles form state and validation.

**Styling:** Three systems coexist — Material-UI components (primary UI), Tailwind CSS v4 (utility classes), and Sass modules (component-scoped styles like `dashboard.module.scss`). MUI theme is configured in `src/app/providers.tsx`.

## Key Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json).

## Types

- `src/types/auth.ts` — User, Tokens, LoginRequest, RegisterPayload, Role
- `src/types/types.ts` — Product, Transaction, TransactionItem, PageParamsWithLang

## Environment Variables

Defined in `.env`: `NEXT_PUBLIC_API_URL`, `STORAGE_KEY`, and several `NEXT_PUBLIC_CONTENTFUL_*` variables for Contentful CMS integration.
