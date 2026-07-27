'use client'

import { create } from 'zustand'
import type { DailyLog } from '@/types'
import { getStorage } from '@/lib/storage'
import { todayString } from '@/lib/date-utils'

interface TrackingState {
  todayLog: DailyLog | null
  allLogs: DailyLog[]
  isLoaded: boolean
  loadLogs: () => void
  loadTodayLog: () => void
  toggleActivity: (activityId: string, programDay: number, programWeek: number, programId: string, totalActivities: number) => void
  updateNotes: (notes: string) => void
  getLogForDate: (date: string) => DailyLog | null
}

function createEmptyLog(programId: string, programDay: number, programWeek: number): DailyLog {
  return {
    id: `${todayString()}-${programDay}`,
    programId,
    date: todayString(),
    programDay,
    programWeek,
    completedActivityIds: [],
    notes: '',
    mood: null,
    completedAt: null,
    isComplete: false,
  }
}

export const useTrackingStore = create<TrackingState>((set, get) => ({
  todayLog: null,
  allLogs: [],
  isLoaded: false,

  loadLogs: () => {
    const storage = getStorage()
    const logs = storage.getAllLogs()
    set({ allLogs: logs ?? [], isLoaded: true })
  },

  loadTodayLog: () => {
    const storage = getStorage()
    const today = todayString()
    const log = storage.getDailyLog(today)
    set({ todayLog: log })
  },

  toggleActivity: (activityId: string, programDay: number, programWeek: number, programId: string, totalActivities: number) => {
    const storage = getStorage()
    const today = todayString()
    let log = get().todayLog

    if (!log) {
      log = createEmptyLog(programId, programDay, programWeek)
    }

    const ids = [...(log?.completedActivityIds ?? [])]
    const idx = ids.indexOf(activityId)
    if (idx >= 0) {
      ids.splice(idx, 1)
    } else {
      ids.push(activityId)
    }

    const isComplete = ids.length >= totalActivities
    const updated: DailyLog = {
      ...(log ?? createEmptyLog(programId, programDay, programWeek)),
      date: today,
      completedActivityIds: ids,
      isComplete,
      completedAt: isComplete ? new Date().toISOString() : null,
    }

    storage.saveDailyLog(updated)
    const allLogs = storage.getAllLogs()
    set({ todayLog: updated, allLogs: allLogs ?? [] })
  },

  updateNotes: (notes: string) => {
    const storage = getStorage()
    const log = get().todayLog
    if (!log) return
    const updated: DailyLog = { ...log, notes }
    storage.saveDailyLog(updated)
    set({ todayLog: updated })
  },

  getLogForDate: (date: string) => {
    const storage = getStorage()
    return storage.getDailyLog(date)
  },
}))
