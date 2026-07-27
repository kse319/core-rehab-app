'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle2, Circle, ChevronDown, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useProgram } from '@/hooks/use-program'
import { useDailyLog } from '@/hooks/use-daily-log'
import { AppShellWrapper } from '@/components/layout/app-shell-wrapper'
import { formatDisplayDate, calculateProgramWeek } from '@/lib/date-utils'
import type { DailyLog } from '@/types'

export default function LogPage() {
  const router = useRouter()
  const { isLoaded, settings, engine } = useProgram()
  const { allLogs } = useDailyLog()
  const [expandedDate, setExpandedDate] = useState<string | null>(null)

  useEffect(() => {
    if (isLoaded && !settings?.onboardingCompleted) {
      router.replace('/onboarding')
    }
  }, [isLoaded, settings, router])

  if (!isLoaded || !settings?.onboardingCompleted) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
      </div>
    )
  }

  // Sort logs by date descending
  const sortedLogs = [...(allLogs ?? [])].sort(
    (a: DailyLog, b: DailyLog) => (b?.date ?? '').localeCompare(a?.date ?? '')
  )

  // Group by week
  const grouped = sortedLogs.reduce<Record<number, DailyLog[]>>((acc, log: DailyLog) => {
    const week = log?.programWeek ?? calculateProgramWeek(log?.programDay ?? 1)
    if (!acc[week]) acc[week] = []
    acc[week].push(log)
    return acc
  }, {})

  const weeks = Object.keys(grouped)
    .map(Number)
    .sort((a: number, b: number) => b - a)

  return (
    <AppShellWrapper>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Program Log</h1>
          <p className="text-sm text-muted-foreground">Your daily progress history</p>
        </div>

        {sortedLogs.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <FileText className="h-12 w-12 text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground">
              No entries yet. Complete your first day to see it here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {weeks.map((week: number) => (
              <div key={week}>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Week {week}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="space-y-1">
                  {(grouped[week] ?? []).map((log: DailyLog) => {
                    const isExpanded = expandedDate === log?.date
                    const activities = engine?.getActivitiesForDay(log?.programDay ?? 1) ?? []
                    const completedCount = log?.completedActivityIds?.length ?? 0
                    const totalCount = activities?.length ?? 0

                    return (
                      <motion.div
                        key={log?.date ?? ''}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl bg-card overflow-hidden"
                        style={{ boxShadow: 'var(--shadow-sm)' }}
                      >
                        <button
                          onClick={() => setExpandedDate(isExpanded ? null : (log?.date ?? null))}
                          className="flex w-full items-center gap-3 p-3 text-left"
                        >
                          {log?.isComplete ? (
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                          ) : (
                            <Circle className="h-5 w-5 shrink-0 text-muted-foreground/40" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                Day {log?.programDay ?? 0}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatDisplayDate(log?.date ?? '')}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {completedCount}/{totalCount} activities
                              {log?.notes ? ' • Has notes' : ''}
                            </div>
                          </div>
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 text-muted-foreground transition-transform duration-fast',
                              isExpanded && 'rotate-180'
                            )}
                          />
                        </button>

                        {isExpanded && (
                          <div className="border-t border-border px-3 pb-3 pt-2">
                            <div className="space-y-1.5">
                              {activities.map((act: { id?: string; name?: string }) => {
                                const done = (log?.completedActivityIds ?? []).includes(act?.id ?? '')
                                return (
                                  <div key={act?.id ?? ''} className="flex items-center gap-2 text-xs">
                                    {done ? (
                                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                                    ) : (
                                      <Circle className="h-3.5 w-3.5 text-muted-foreground/30 shrink-0" />
                                    )}
                                    <span className={cn(done && 'text-muted-foreground line-through')}>
                                      {act?.name ?? ''}
                                    </span>
                                  </div>
                                )
                              })}
                            </div>
                            {log?.notes ? (
                              <div className="mt-3 rounded-lg bg-muted/50 p-2">
                                <p className="text-xs text-muted-foreground">{log.notes}</p>
                              </div>
                            ) : null}
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShellWrapper>
  )
}
