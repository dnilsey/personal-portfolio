# Personal Portfolio

A modern, responsive **frontend portfolio** built with **Next.js (App Router)** to showcase my projects, skills, and experience as a Frontend Engineer.

The site focuses on:
- Clean component architecture
- Performance & accessibility best practices
- Real-world React and TypeScript patterns

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI:** React
- **Styling:** Tailwind CSS
- **Fonts:** `next/font` (optimized, self-hosted)
- **Deployment:** Vercel

---

## ✨ Features

- Responsive layout (mobile-first)
- Accessible, semantic HTML
- Reusable and composable React components
- Optimized fonts and assets
- Fast page loads with Next.js optimizations

---

## 📁 Project Structure

This is a [pnpm](https://pnpm.io) + [Turborepo](https://turborepo.com) monorepo:

```
apps/
  web/        Next.js portfolio site
packages/     Shared packages (coming soon: shared types)
```

---

## 🚀 Getting Started

Install dependencies (pnpm only):

```bash
pnpm install
```

Run the site in development:

```bash
pnpm dev
```

Other commands, run from the repo root across every app:

```bash
pnpm build       # production build
pnpm lint        # ESLint
pnpm typecheck   # TypeScript
```

To run a command in one app only, filter by package name:

```bash
pnpm --filter @portfolio/web dev
```

---

## ☁️ Deployment

Deployed on Vercel with the project's **Root Directory** set to `apps/web`.
