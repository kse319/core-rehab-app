'use client'

import { useMemo } from 'react'
import { useTrackingStore } from '@/stores/tracking-store'
import { toDateString } from '@/lib/date-utils'
import { subDays } from 'date-fns'

/** Calculate current streak from completed logs */
export function useStreak() {
  const { allLogs, todayLog } = useTrackingStore()

  const streak = useMemo(() => {
    let count = 0
    const today = new Date()

    // If today is complete, count it
    if (todayLog?.isComplete) {
      count = 1
    }

    // Walk backwards from yesterday
    let checkDate = subDays(today, todayLog?.isComplete ? 1 : 0)
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (count > 200) break // safety
      const dateStr = toDateString(checkDate)
      const log = (allLogs ?? []).find((l: { date?: string; isComplete?: boolean }) => l?.date === dateStr)
      if (log?.isComplete) {
        count++
        checkDate = subDays(checkDate, 1)
      } else {
        break
      }
    }

    return count
  }, [allLogs, todayLog])

  return streak
}
