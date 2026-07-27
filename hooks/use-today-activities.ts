'use client'

import { useMemo } from 'react'
import { useProgram } from './use-program'
import type { ActivityDefinition } from '@/types'

/** Hook returning today's activities from the program engine */
export function useTodayActivities() {
  const { engine, isLoaded } = useProgram()

  const activities: ActivityDefinition[] = useMemo(() => {
    if (!engine) return []
    return engine.getTodayActivities()
  }, [engine])

  const currentDay = engine?.getCurrentDay() ?? 1
  const currentWeek = engine?.getCurrentWeek() ?? 1
  const totalDays = engine?.getTotalDays() ?? 126
  const weekTheme = engine?.getWeekTheme(currentWeek) ?? ''
  const weeklyGoal = engine?.getWeeklyGoal(currentWeek) ?? ''
  const educationalContent = engine?.getWeekEducationalContent(currentWeek) ?? ''
  const programProgress = engine?.getProgramProgressPercent() ?? 0

  return {
    activities,
    currentDay,
    currentWeek,
    totalDays,
    weekTheme,
    weeklyGoal,
    educationalContent,
    programProgress,
    isLoaded,
  }
}
