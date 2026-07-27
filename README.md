# Core — Your daily rehabilitation companion

A beautiful, data-driven **18-week rehabilitation tracking Progressive Web App** built with Next.js, TypeScript, and Tailwind CSS. Core replaces paper-based rehabilitation workbooks with a calm, encouraging daily companion that answers one question immediately: **"What do I need to do today?"**

> This application is an independent, original product. It does not include any trademarked terminology, proprietary workbook content, or copyrighted material. It is not a substitute for medical advice.

---

## ✨ Features (v1.0.0)

- **Onboarding wizard** — Start a new program or resume an existing one mid-way
- **Today Dashboard** — Progress ring, categorized activity checklist, streak counter, daily notes with auto-save, and educational tips
- **Program Log** — Historical view of every day, grouped by week with completion status
- **Settings** — Notification preferences, unit toggles, and program management
- **Progressive Web App** — Installable, offline-capable
- **Fully data-driven** — The 18-week program is defined in JSON and can be edited or expanded without touching application code

## 🏗️ Architecture

Core is built as the permanent foundation of a long-term product. Every architectural decision assumes future modules (measurements, achievements, reports, cloud sync, clinician portal, AI coaching) will be added without redesign.

- **Repository pattern** — All data access flows through the `IStorageRepository` interface (`lib/storage/`). The current `LocalStorageRepository` can be swapped for a cloud adapter with zero application-code changes.
- **Program engine** — `ProgramEngine` (`lib/program-engine.ts`) computes the current day, week, and progress from any JSON program definition.
- **State management** — Lightweight Zustand stores (`stores/`) for program, tracking, and settings state.
- **Type system** — Complete TypeScript definitions (`types/`) covering all current and planned features.

## 🧱 Tech Stack

- Next.js 14 (App Router)
- React 18 + TypeScript (strict mode)
- Tailwind CSS
- Zustand
- date-fns
- Lucide icons

## 📁 Project Structure

```
app/            Next.js routes (dashboard, onboarding, log, settings)
components/     UI, layout, and dashboard components
data/programs/  18-week program definition (JSON)
docs/           Full documentation suite
hooks/          Business-logic hooks
lib/            Storage layer, program engine, date utilities
stores/         Zustand state stores
types/          TypeScript type definitions
public/         PWA manifest and service worker
```

## 📚 Documentation

Complete documentation lives in [`/docs`](./docs):

| Document | Description |
|----------|-------------|
| [Product Vision](./docs/PRODUCT_VISION.md) | Mission, principles, and long-term vision |
| [Product Requirements](./docs/PRODUCT_REQUIREMENTS.md) | Full PRD for the finished application |
| [User Stories](./docs/USER_STORIES.md) | Complete user story set |
| [Architecture](./docs/ARCHITECTURE.md) | System design and cloud-sync migration plan |
| [Design System](./docs/DESIGN_SYSTEM.md) | Colors, typography, spacing, accessibility |
| [Roadmap](./docs/ROADMAP.md) | v1.0 → v3.0 feature roadmap |
| [Changelog](./docs/CHANGELOG.md) | Version history |
| [Prompt Library](./docs/PROMPT_LIBRARY.md) | Prompts for continued AI-assisted development |

## 🚀 Getting Started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to begin the onboarding flow.

## 🗺️ Roadmap

- **v1.1** — Measurements & progress charts
- **v1.2** — Achievements & milestones
- **v1.3** — Reports & weekly summaries
- **v2.0** — Authentication & cloud sync
- **v2.1** — Clinician portal
- **v3.0** — AI coaching

---

Built with care as the foundation for a long-term rehabilitation software product.
