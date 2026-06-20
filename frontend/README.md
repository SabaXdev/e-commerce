# E-Commerce Frontend

Next.js 15 storefront aligned with the NestJS API in the parent repository.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- TanStack Query
- Axios
- Zustand
- React Hook Form + Zod

## Getting started

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

The app runs on [http://localhost:3001](http://localhost:3001). Ensure the NestJS API is running on port 3000 with matching `JWT_SECRET`.

## Architecture

- `src/app/` — routes and layouts only
- `src/features/` — domain modules (auth, products, orders, cart, admin)
- `src/shared/` — API client, design system, enums, config
- `src/middleware.ts` — route protection

Import features through their public `index.ts` barrels. Server-only auth helpers live in `features/auth/server.ts`.
