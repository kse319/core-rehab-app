# Architecture

## Overview

Core follows a clean architecture pattern with strong separation of concerns. The app is designed for progressive enhancement — every layer can be extended or swapped without affecting others.

## Data Flow

```
UI Components
    ↓ (read)
Custom Hooks (useProgram, useTodayActivities, useDailyLog, useStreak)
    ↓ (read/write)
Zustand Stores (programStore, trackingStore, settingsStore)
    ↓ (persist)
Storage Repository (IStorageRepository → LocalStorageRepository)
    ↓
localStorage (v1) → Cloud API (v2+)
```

## Component Hierarchy

```
RootLayout
  ├─ ThemeProvider
  ├─ OnboardingPage (wizard steps)
  └─ AppShellWrapper
       ├─ AppHeader
       ├─ PageContent (Dashboard / Log / Settings)
       └─ BottomNav
```

## Storage Layer

All data access goes through the `IStorageRepository` interface:

```typescript
interface IStorageRepository {
  getSettings(): AppSettings | null
  saveSettings(settings: AppSettings): void
  getDailyLog(date: string): DailyLog | null
  saveDailyLog(log: DailyLog): void
  getAllLogs(): DailyLog[]
  // ... measurements (stub)
}
```

Currently implemented: `LocalStorageRepository`

### Cloud Sync Migration Plan

1. Implement `CloudStorageRepository` with same interface
2. Add sync manager that reconciles local and cloud
3. Swap repository in dependency injection
4. Existing code requires zero changes

## Program Engine

The `ProgramEngine` class encapsulates all program logic:
- Calculates current day/week from start date
- Retrieves activities for any day
- Computes progress percentages
- Checks program completion

Programs are loaded from JSON files, making the system extensible to multiple programs.

## State Management

Zustand stores provide lightweight, performant state:
- `programStore`: Loaded program definition
- `settingsStore`: User settings with persistence
- `trackingStore`: Daily logs and completion data

## Performance Considerations

- All computations are memoized via `useMemo`
- Notes auto-save is debounced (600ms)
- Animations use Framer Motion with GPU-accelerated transforms
- Program data loaded once and cached
