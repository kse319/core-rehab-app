'use client'

import { useEffect } from 'react'
import { useTrackingStore } from '@/stores/tracking-store'

/** Hook for interacting with today's daily log */
export function useDailyLog() {
  const {
    todayLog,
    allLogs,
    isLoaded,
    loadLogs,
    loadTodayLog,
    toggleActivity,
    updateNotes,
    getLogForDate,
  } = useTrackingStore()

  useEffect(() => {
    if (!isLoaded) {
      loadLogs()
    }
    loadTodayLog()
  }, [isLoaded, loadLogs, loadTodayLog])

  return {
    todayLog,
    allLogs,
    isLoaded,
    toggleActivity,
    updateNotes,
    getLogForDate,
  }
}
