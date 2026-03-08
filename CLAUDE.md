# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Budget/grocery management frontend built with **Next.js 16**, **React 19**, **TypeScript**, and **Material-UI 7**. Uses httpOnly cookie-based authentication with a backend API.

## Commands

```bash
pnpm dev        # Start development server
pnpm build      # Production build
pnpm lint       # ESLint
pnpm start      # Start production server
```

Package manager: **pnpm** (v9.12.1)

## Architecture

### Routing (Next.js App Router)

- `src/app/` — App Router with `[lang]` dynamic segment for i18n
- Protected routes: `/dashboard/*` (middleware checks `accessToken` cookie)
- Auth routes: `/login`, `/register`
- Data routes: `/{lang}/products`, `/{lang}/transactions`, `/{lang}/create-product`
- Root `/` redirects based on auth state

### API Layer

- `src/lib/api.ts` — `apiRequest<T>()` generic fetch wrapper; always sends `credentials: "include"` for cookie auth
- `src/lib/products.ts`, `transactions.ts`, `users.ts` — endpoint-specific functions
- Custom `ApiError` class with status code and response data
- Base URL from `NEXT_PUBLIC_API_URL` env var

### State & Data

- **Auth:** React Context (`src/contexts/AuthContext.tsx`) — login, register, logout, fetchMe; stores only `userId` in localStorage, tokens in httpOnly cookies
- **Data hooks** (`src/hooks/`): `useProducts`, `useTransactions`, `useUsers` — each manages its own state with loading/error, auto-fetches on mount
- **TanStack React Query** is installed but hooks currently use manual state management

### Styling

- **Tailwind CSS 4** via PostCSS + **MUI theme** (defined in `src/app/providers.tsx`)
- SCSS modules for page-specific styles (e.g., `dashboard.module.scss`)
- MUI `sx` prop for component-level styling

### Key Patterns

- All interactive components use `"use client"` directive
- Forms: `react-hook-form` with MUI `TextField` and `Controller`
- Validation: Zod schemas
- Animations: Framer Motion (swipeable product cards with drag gestures)
- Tables: MUI Table with collapsible rows, confirmation dialogs for deletes

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json)

## Environment Variables

- `NEXT_PUBLIC_API_URL` — Backend API base URL
- `STORAGE_KEY` — localStorage key prefix (defaults to "key")
- Contentful CMS keys: `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, etc. (see `src/config/config.ts`)
