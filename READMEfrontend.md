# 🎨 Frontend Architecture & Conventions

**Owner:** Pramila (Frontend / UI/UX Developer)  
**Project:** MergeBoost Platform

---

## 📌 Tech Stack
* **Framework:** Next.js 16 (App Router)
* **Styling:** Tailwind CSS & Lucide Icons
* **UI Components:** Modular React Components (`src/components/ui/`)

---

## 🛠️ Page Structure & Layout Guidelines

### 1. App Router Structure (`src/app/`)
* `/dashboard`: Main role-based metrics view.
* `/create-post`: Post creation form with platform selections and hashtag inputs.
* `/drafts`: Workspace for saved draft items.
* `/campaigns`: Campaign management interface.
* `/analytics`: Real-time performance chart visualizations.

### 2. State & Data Fetching
* Use Client Components (`"use client"`) only where interactive state hooks (`useState`, `useEffect`) or authentication context from `@clerk/nextjs` are required.
* Handle dynamic loading and empty fallback states cleanly across dashboard cards.

### ⚠️ Critical Conventions
* Ensure mobile-first responsive grid layouts across all viewport sizes.
* Maintain strict TypeScript interface definitions for props passed into UI components.
