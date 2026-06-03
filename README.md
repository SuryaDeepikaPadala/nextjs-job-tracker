# 📋 Job Tracker Dashboard

A powerful, modern Kanban-style job application tracker designed to help job seekers stay organized, manage progress, and streamline their interview pipelines. Built using **Next.js**, **Mongoose/MongoDB**, **Better Auth**, and **@dnd-kit** for a highly interactive, responsive user experience.

---

## ✨ Features

* **Interactive Kanban Board:** Drag-and-drop workflow pipeline managed via a secure, single-intent visual handle icon (Grip indicator).
* **Pipeline Micro-Controls:** Skip dragging entirely with an intuitive inline popover dropdown layout to jump apps across pipeline phases effortlessly.
* **Fully Server-Validated Actions:** Built leveraging Next.js Server Actions for resilient tracking data manipulations (`deleteJobApplication`, `moveJob`).
* **Secure Authentication Gateways:** Better Auth integration routes incoming traffic seamlessly between public onboarding views and private dashboards based on live session states.
* **Smart Board Initialization:** Automatically provisions a fresh, fully-configured default board layout for newly registered users on their first sign-up.
* **Zero-Jank React Rendering Architecture:** Hardened against SSR/Hydration tree count mismatches and dynamic React Hook runtime constraint anomalies.

---

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router, React Server Components)
* **Authentication:** Better Auth (Stateful session management & crisp TypeScript handling)
* **Database:** MongoDB via Mongoose Object Modeling Layer
* **Drag & Drop Architecture:** `@dnd-kit/core`
* **Styling:** Tailwind CSS (Modern linear gradients, backdrop blurs, responsive design)
* **Icons:** Lucide React
* **Notifications:** React Hot Toast

---

## 📂 Project Architecture

```text
├── app/
│   ├── page.tsx                 # Responsive landing page with session-based routing
│   ├── auth/
│   │   ├── sign-in/
│   │   │   └── page.tsx         # Sign In authentication page
│   │   └── sign-up/
│   │       └── page.tsx         # Sign Up authentication page
│   └── dashboard/
│       └── page.tsx             # Primary workspace fetching board metrics
├── components/
│   ├── Navbar.tsx               # Global navigation controller
│   ├── Logout.tsx               # Session destruction handling button
│   ├── ImageSwitching.tsx       # Dynamic landing page product presentation showcase
│   ├── FeatureTabs.tsx          # Interactive product benefit selector for home page
│   ├── KanbanBoard.tsx          # Hydration-safe parent workspace controller
│   ├── JobCard.tsx              # Isolated, single-click accessible tracking node
│   └── JobApplicationDialog.tsx # Centralized record mutation form shell
├── lib/
│   ├── auth.ts                  # Better Auth server configuration setup
│   ├── auth-client.ts           # Better Auth client-side hook utilities
│   ├── utils/                   # Foundational utility folders
│   │   └── initializeDefaultBoard.ts # Automatic pipeline generator for new signups
│   ├── actions/
│   │   └── job-application.ts   # Next.js Server Actions modifying records securely
│   ├── models/
│   │   ├── board.ts             # Mongoose board schema
│   │   ├── column.ts            # Mongoose column schema
│   │   └── jobApplication.ts    # Hardened, index-optimized job data schemas
│   └── db.ts                    # Safe singleton Mongoose orchestrator to prevent connection leaks


