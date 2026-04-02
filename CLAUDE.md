# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

- **Package manager**: pnpm (v9.12.1)
- `pnpm dev` — Start dev server (Next.js)
- `pnpm build` — Production build
- `pnpm lint` — Run ESLint

## Architecture

**Next.js 16 App Router** budget management app with React 19, TypeScript strict mode.

### Routing

- `/login`, `/register` — Auth pages
- `/dashboard` — Protected main page
- `/profile` — User profile
- `/[lang]/products`, `/[lang]/transactions`, `/[lang]/create-product` — Language-prefixed domain routes
- Middleware (`middleware.ts`) protects routes by checking `accessToken` cookie, redirects to `/login`

### Auth Flow

Cookie-based authentication with httpOnly tokens set by the backend:
- `AuthContext` (`/src/contexts/AuthContext.tsx`) manages auth state via React Context
- Login/register POST to backend → httpOnly cookie set server-side, userId stored in localStorage
- `fetchMe()` restores session on mount via `GET /auth/me`
- `useAuth()` hook provides `user`, `isAuthenticated`, `login`, `register`, `logout`

### API Layer

- Base request handler in `/src/lib/api.ts` — `apiRequest<T>()` with `credentials: "include"` for cookie auth
- Domain-specific API modules: `/src/lib/products.ts`, `/src/lib/transactions.ts`, `/src/lib/users.ts`
- Backend URL configured via `NEXT_PUBLIC_API_URL` (default: `http://localhost:8080/api/v1`)
- Custom `ApiError` class for typed error handling

### State Management

- **Auth**: React Context (`AuthContext`)
- **Domain data**: Custom hooks (`useTransactions`, `useProducts`, `useUsers`) wrapping API calls with local state
- `@tanstack/react-query` and `graphql-request` are dependencies but domain hooks currently use direct fetch patterns

### UI & Styling

- **Components**: MUI v7 (Material UI) — forms use `react-hook-form` + `Controller` with MUI inputs
- **Styling**: Mix of MUI `sx` prop, Tailwind CSS v4 utility classes, and SCSS modules (`.module.scss`)
- **Theme**: Custom MUI theme defined in `/src/app/providers.tsx` (primary: `#1976d2`)
- **Forms**: react-hook-form with Zod validation schemas

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json)
