# KK Computers – Technical Stack & Setup Guide

---

## 🧠 Tech Overview

| Layer            | Tool/Tech                       |
|------------------|---------------------------------|
| Frontend         | Next.js (App Router)            |
| Styling          | Tailwind CSS                    |
| UI Components    | ShadCN UI (Radix + Tailwind)    |
| Animations       | Framer Motion                   |
| Backend-as-a-Service | Supabase (DB, storage, realtime) |
| Authentication   | Clerk (Email, Social, Role-based) |
| Deployment       | Vercel                          |
| Icons            | Lucide or Phosphor Icons        |
| State Mgmt       | React Context / SWR             |
| Form Handling    | React Hook Form + Zod           |
| SEO              | Next.js Head + Meta Tags        |

---

## 🏗️ Folder Structure (Recommended)

/app
/(routes)
/courses
/projects
/events
/dashboard
/components
/ui (custom + ShadCN)
/shared
/lib
/supabase
/auth
/utils
/styles
globals.css
tailwind.config.js
/schemas
zodSchemas.ts
/supabase
schema.sql


---

## 🔐 Clerk Auth Configuration

- Create project on [Clerk.dev](https://clerk.dev)
- Enable:
  - Email/password login
  - OAuth (Google recommended)
- Protect routes using `<ClerkProvider>` and `<SignedIn />` components
- Add role metadata: `admin`, `student`

---

## 🧰 Supabase Setup

- Tables:
  - `courses`, `projects`, `events`, `enrollments`, `messages`, `testimonials`, `partners`
- Enable:
  - Row-level security (RLS)
  - Realtime (on `events` and `announcements`)
- Supabase Storage:
  - Upload user profile images, certificate PDFs

---

## ✨ UI/UX Guidelines

- Use ShadCN components for:
  - Buttons, Modals, Tabs, Cards, Accordion, Forms
- Framer Motion effects:
  - Page transitions
  - On-scroll fade/slide/zoom
  - Interactive hover animations

---

## 🧪 Testing Tools

- Unit Testing: Vitest / Jest
- Linting: ESLint + Prettier
- CI/CD: GitHub Actions (Optional)

---

## 🚀 Deployment

- Use [Vercel](https://vercel.com)
  - Auto-deploy from GitHub
  - Set ENV variables for Supabase + Clerk

---

## 🔐 ENV Configuration (.env.local)

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=


---

## 🔄 GitHub Integration

- Setup Project Board: Backlog, In Progress, Done
- Use Conventional Commits: `feat:`, `fix:`, `refactor:`, `chore:`

---

