'use client'

import { BookOpen } from 'lucide-react'

interface EducationCardProps {
  content: string
  weeklyGoal: string
}

export function EducationCard({ content, weeklyGoal }: EducationCardProps) {
  if (!content && !weeklyGoal) return null

  return (
    <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 p-4" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="h-4 w-4 text-blue-500" />
        <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">This Week</span>
      </div>
      {content ? (
        <p className="text-xs text-blue-600/80 dark:text-blue-300/80 leading-relaxed mb-2">
          {content}
        </p>
      ) : null}
      {weeklyGoal ? (
        <div className="mt-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/20 px-3 py-2">
          <p className="text-[10px] font-semibold text-blue-500 uppercase tracking-wider mb-0.5">Weekly Goal</p>
          <p className="text-xs text-blue-700 dark:text-blue-300">{weeklyGoal}</p>
        </div>
      ) : null}
    </div>
  )
}
