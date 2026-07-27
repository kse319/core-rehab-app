# Core — Your Daily Rehabilitation Companion

A beautiful, calm rehabilitation companion that guides users through a structured 18-week program to rebuild core strength, stability, and healthy movement patterns.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS with custom design tokens
- **State Management:** Zustand
- **Date Handling:** date-fns
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Data Visualization:** Recharts (installed, deferred)
- **PWA:** manifest.json + service worker

## Project Structure

```
app/                 # Next.js App Router pages
  onboarding/        # Multi-step onboarding wizard
  dashboard/         # Primary daily view
  log/               # Program history
  settings/          # User preferences

components/
  layout/            # AppShellWrapper, BottomNav, AppHeader
  dashboard/         # Greeting, WeekBadge, StreakCard, etc.
  ui/                # ProgressRing, Celebration, primitives

data/
  programs/          # JSON program definitions

hooks/               # Custom React hooks
stores/              # Zustand state stores
lib/
  storage/           # Repository pattern (localStorage)
  program-engine.ts  # Core program logic
  date-utils.ts      # Date utilities

types/               # Complete TypeScript definitions
docs/                # Project documentation
```

## Getting Started

```bash
yarn install
yarn dev
```

Open http://localhost:3000 to start the onboarding wizard.

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed system design.

## Contributing

1. Follow the existing folder structure and naming conventions
2. Use TypeScript strict mode — no `any` types
3. Keep components under 150 lines
4. Use custom hooks for business logic
5. All interactive elements must meet 44px minimum touch target
6. Follow the design system in [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
