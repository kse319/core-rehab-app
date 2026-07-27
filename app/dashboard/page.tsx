'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProgram } from '@/hooks/use-program'
import { useTodayActivities } from '@/hooks/use-today-activities'
import { useDailyLog } from '@/hooks/use-daily-log'
import { useStreak } from '@/hooks/use-streak'
import { AppShellWrapper } from '@/components/layout/app-shell-wrapper'
import { Greeting } from '@/components/dashboard/greeting'
import { WeekBadge } from '@/components/dashboard/week-badge'
import { StreakCard } from '@/components/dashboard/streak-card'
import { ProgressRing } from '@/components/ui/progress-ring'
import { ActivityChecklist } from '@/components/dashboard/activity-checklist'
import { DailyNotes } from '@/components/dashboard/daily-notes'
import { EducationCard } from '@/components/dashboard/education-card'
import { Celebration } from '@/components/ui/celebration'

export default function DashboardPage() {
  const router = useRouter()
  const { engine, isLoaded, settings, program } = useProgram()
  const {
    activities,
    currentDay,
    currentWeek,
    totalDays,
    weekTheme,
    weeklyGoal,
    educationalContent,
    programProgress,
  } = useTodayActivities()
  const { todayLog, toggleActivity, updateNotes } = useDailyLog()
  const streak = useStreak()
  const [showCelebration, setShowCelebration] = useState(false)
  const [prevComplete, setPrevComplete] = useState(false)

  // Redirect to onboarding if not completed
  useEffect(() => {
    if (isLoaded && !settings?.onboardingCompleted) {
      router.replace('/onboarding')
    }
  }, [isLoaded, settings, router])

  // Track completion for celebration
  useEffect(() => {
    const completedCount = todayLog?.completedActivityIds?.length ?? 0
    const totalCount = activities?.length ?? 0
    const isNowComplete = totalCount > 0 && completedCount >= totalCount

    if (isNowComplete && !prevComplete) {
      setShowCelebration(true)
    }
    setPrevComplete(isNowComplete)
  }, [todayLog?.completedActivityIds, activities, prevComplete])

  if (!isLoaded || !settings?.onboardingCompleted) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
      </div>
    )
  }

  const completedIds = todayLog?.completedActivityIds ?? []
  const completionPercent =
    (activities?.length ?? 0) > 0
      ? Math.round((completedIds.length / (activities?.length ?? 1)) * 100)
      : 0

  const handleToggle = (activityId: string) => {
    toggleActivity(
      activityId,
      currentDay,
      currentWeek,
      settings?.programId ?? 'core-rehab-v1',
      activities?.length ?? 0
    )
  }

  return (
    <AppShellWrapper>
      <div className="space-y-4">
        <Greeting />

        <WeekBadge
          week={currentWeek}
          day={currentDay}
          totalDays={totalDays}
          progress={programProgress}
          weekTheme={weekTheme}
        />

        {/* Progress Ring */}
        <div className="flex flex-col items-center py-4">
          <ProgressRing progress={completionPercent} size={160} strokeWidth={10}>
            <div className="text-3xl font-bold">{completionPercent}%</div>
            <div className="text-xs text-muted-foreground">
              {completedIds.length} of {activities?.length ?? 0} complete
            </div>
          </ProgressRing>
        </div>

        <StreakCard streak={streak} />

        <ActivityChecklist
          activities={activities}
          completedIds={completedIds}
          onToggle={handleToggle}
        />

        <EducationCard
          content={educationalContent}
          weeklyGoal={weeklyGoal}
        />

        <DailyNotes
          notes={todayLog?.notes ?? ''}
          onUpdate={updateNotes}
        />
      </div>

      <Celebration
        show={showCelebration}
        dayNumber={currentDay}
        onClose={() => setShowCelebration(false)}
      />
    </AppShellWrapper>
  )
}
