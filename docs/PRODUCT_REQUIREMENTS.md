# Product Requirements Document

## Overview

Core is a progressive web application that guides users through structured rehabilitation programs. This PRD covers the complete product vision, including features implemented in v1 and those planned for future releases.

---

## Module 1: Onboarding (v1 ✓)

### Functional Requirements
- Multi-step wizard with progress indicator
- Welcome screen with app identity
- Two program entry paths: New Program and Resume Existing
- New program: date picker for start date
- Resume program: week/day selectors
- Reminder configuration (morning/afternoon/evening)
- Smooth transitions between steps

---

## Module 2: Daily Dashboard (v1 ✓)

### Functional Requirements
- Display current week, day, program progress
- Large progress ring showing today's completion percentage
- Streak counter
- Activity checklist grouped by category
- Expandable activity details with instructions and tips
- Checkbox completion with animation
- Daily educational tip card
- Daily notes with auto-save
- Celebration animation on day completion
- Time-of-day greeting

---

## Module 3: Program Log (v1 ✓)

### Functional Requirements
- Chronological list of all logged days
- Week-grouped layout
- Color-coded completion status
- Expandable day details
- Display completed activities and notes

---

## Module 4: Settings (v1 ✓)

### Functional Requirements
- Program information display
- Notification toggles with time pickers
- Unit preference (metric/imperial)
- Program reset with confirmation
- App version info

---

## Module 5: Measurements (v1.1 — Planned)

### Functional Requirements
- Configurable measurement fields
- Weekly measurement entry
- Progress charts (line charts via Recharts)
- Historical comparison
- Photo progress support
- Measurement reminders

---

## Module 6: Achievements (v1.2 — Planned)

### Functional Requirements
- Streak milestones (7, 14, 30, 60, 90 days)
- Week completion badges
- Program completion certificate
- First measurement logged
- Consistent practice awards
- Achievement gallery

---

## Module 7: Reports (v1.3 — Planned)

### Functional Requirements
- Weekly summary reports
- Progress trends over time
- Measurement change tracking
- Exportable reports (PDF)
- Shareable progress summaries

---

## Module 8: Authentication & Cloud Sync (v2.0 — Planned)

### Functional Requirements
- Email/password authentication
- Social login (Google, Apple)
- Cloud data sync
- Multi-device support
- Data migration from localStorage
- Account management

---

## Module 9: Clinician Portal (v2.1 — Planned)

### Functional Requirements
- Clinician dashboard
- Patient progress monitoring
- Custom program assignment
- Communication tools
- Outcome reporting

---

## Module 10: AI Coaching (v3.0 — Planned)

### Functional Requirements
- Adaptive program difficulty
- Intelligent reminders
- Natural language coaching
- Predictive insights
- Personalized recommendations

---

## Non-Functional Requirements

- **Performance:** < 3s initial load, < 100ms interaction response
- **Accessibility:** WCAG AA compliance
- **Offline:** Full functionality without network
- **Security:** Data encrypted at rest (future cloud sync)
- **Privacy:** No data leaves the device in v1
