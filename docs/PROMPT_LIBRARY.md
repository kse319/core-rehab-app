# Prompt Library

Curated prompts for continuing development with AI assistance.

## Measurements Module (v1.1)

```
Implement the measurements module for Core:
- Create a /measurements page accessible from bottom nav
- Add MeasurementEntry form with configurable fields (weight, waist, upper abdomen, navel, lower abdomen, hip)
- Use the existing MeasurementEntry type from types/measurements.ts
- Store via the existing IStorageRepository.saveMeasurement method
- Add Recharts line charts showing progress over time
- Support metric/imperial unit switching using settings.units
- Weekly measurement reminder logic
```

## Achievements Module (v1.2)

```
Implement the achievements module for Core:
- Create an achievements gallery page
- Use the existing Achievement and AchievementCondition types
- Implement streak-based achievements (7, 14, 30, 60, 90 days)
- Week completion badges
- Program completion certificate
- Achievement unlock notifications via toast
- Store unlocked achievements in localStorage via repository pattern
```

## Cloud Sync (v2.0)

```
Migrate Core from localStorage to cloud sync:
- Implement CloudStorageRepository using the same IStorageRepository interface
- Add NextAuth authentication (email/password)
- Create API routes for CRUD operations on settings, logs, measurements
- Add Prisma schema matching existing TypeScript types
- Implement sync manager for offline-first with cloud backup
- Data migration utility for existing localStorage users
```

## Dark Mode Enhancement

```
Enhance Core's dark mode:
- Review all components for dark mode compatibility
- Ensure celebration animation looks good in dark mode
- Test progress ring colors in dark mode
- Verify all text contrast meets WCAG AA in dark mode
```

## Performance Optimization

```
Optimize Core's performance:
- Add React.memo to frequently re-rendered components
- Implement virtual scrolling in Program Log for large datasets
- Add loading skeletons to all pages
- Optimize Zustand store selectors to prevent unnecessary re-renders
- Add performance monitoring
```
