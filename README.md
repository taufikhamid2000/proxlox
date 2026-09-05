# Proxlox

A marketplace connecting buyers with personal shoppers and resellers for limited-edition drops.

**Live demo:** https://proxlox.vercel.app

## Overview
Proxlox connects buyers with trusted resellers and personal shoppers for limited-edition drops — items that are hard to get through normal retail channels. Buyers browse a marketplace and can also request a personal shopper to source specific items, with a community area and dashboard/profile/settings for managing their account.

## Tech Stack
- **Framework:** Next.js 15 (Pages Router), React 19, TypeScript
- **Styling:** Tailwind CSS 3
- **Backend/DB:** Supabase (`src/lib/supabase.ts`)
- **Icons:** react-icons

## Features
- Marketplace listing and item detail pages (`src/pages/marketplace.tsx`, `src/pages/marketplace/[id].tsx`)
- Personal shopper request flow (`src/pages/personal-shopper.tsx`)
- Community page (`src/pages/community.tsx`)
- Buyer dashboard, profile, and settings (`src/pages/dashboard.tsx`, `src/pages/profile.tsx`, `src/pages/settings.tsx`)
- Split-screen auth pages with a shared branding panel (`src/pages/sign-in.tsx`, `src/pages/sign-up.tsx`, using `AuthBrandingPanel` and a shared `PasswordInput` component), backed by `src/lib/auth.ts`
- Payments handling (`src/lib/payments.ts`)
- About, contact, resources, privacy, and terms pages

## Getting Started
```bash
npm install
cp .env.example .env.local   # no .env.example is committed — see Supabase docs for the required keys below
npm run dev
```

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous/public key |

## Scripts
| Script | Description |
|---|---|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint with auto-fix (`next lint --fix`) |

## Deployment
Deployed on Vercel at the live demo URL above, with the Supabase env vars set in the Vercel project.

---
Built by [Muhammad Taufik](https://taufik.vercel.app)
