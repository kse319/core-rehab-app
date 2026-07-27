'use client'

import { Calendar } from 'lucide-react'

interface WeekBadgeProps {
  week: number
  day: number
  totalDays: number
  progress: number
  weekTheme: string
}

export function WeekBadge({ week, day, totalDays, progress, weekTheme }: WeekBadgeProps) {
  return (
    <div className="rounded-xl bg-card p-4" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Calendar className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold">Week {week ?? 0}</div>
            <div className="text-xs text-muted-foreground">Day {day ?? 0} of {totalDays ?? 126}</div>
          </div>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {progress ?? 0}%
        </span>
      </div>
      {weekTheme ? (
        <p className="text-xs text-muted-foreground italic">{weekTheme}</p>
      ) : null}
      {/* Program progress bar */}
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
          style={{ width: `${Math.min(100, progress ?? 0)}%` }}
        />
      </div>
    </div>
  )
}
