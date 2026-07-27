'use client'

import { Flame } from 'lucide-react'

interface StreakCardProps {
  streak: number
}

export function StreakCard({ streak }: StreakCardProps) {
  const safeStreak = streak ?? 0
  if (safeStreak <= 0) return null

  return (
    <div className="flex items-center gap-3 rounded-xl bg-card p-4" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
        <Flame className="h-5 w-5 text-orange-500" />
      </div>
      <div>
        <div className="text-lg font-bold">{safeStreak}-day streak</div>
        <div className="text-xs text-muted-foreground">Keep it going!</div>
      </div>
    </div>
  )
}
