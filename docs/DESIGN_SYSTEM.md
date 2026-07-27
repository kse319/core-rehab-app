# Design System

## Color System

| Token | Value | Usage |
|-------|-------|-------|
| Primary Green | `#2D9B6F` | Progress, completion, success, CTAs |
| Accent Blue | `#3B82F6` | Guidance, navigation, information |
| Background | `#F8FAFB` | Page background |
| Surface | `#FFFFFF` | Cards, inputs |
| Destructive | `#EF4444` | Delete actions only |
| Warning | `#F59E0B` | Caution states |

## Typography

- **Font:** Inter (Google Fonts)
- **Scale:** xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px), 3xl (30px)
- **Weights:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Tracking:** `tracking-tight` on headings 2xl+

## Spacing

Based on 8px grid: 4px, 8px, 16px, 24px, 32px, 48px, 64px

## Border Radius

| Context | Value |
|---------|-------|
| Small elements (badges) | 8px |
| Buttons, inputs | 12px |
| Cards | 12px |
| Large containers | 16px |
| Pills, avatars | 9999px |

## Shadows

- **sm:** Subtle card lift
- **md:** Cards, dropdowns
- **lg:** Modals, elevated panels

All shadows use soft, translucent values. No harsh borders.

## Touch Targets

Minimum 44px × 44px for all interactive elements.

## Animation

| Duration | Usage |
|----------|-------|
| 150ms | Hover states, toggles |
| 250ms | Transitions, reveals |
| 350ms | Complex animations |

All animations use ease-out timing. Framer Motion for component-level animation.

## Accessibility

- WCAG AA color contrast minimum
- Focus-visible outlines on all interactive elements
- Semantic HTML (nav, main, button, etc.)
- aria-label on icon-only buttons
- role="switch" on toggles
