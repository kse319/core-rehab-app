/**
 * LocalStorage implementation of the IStorageRepository interface.
 * Uses JSON serialization with safe parsing throughout.
 */
import type { AppSettings, DailyLog, MeasurementEntry } from '@/types'
import type { IStorageRepository } from './storage-repository'

const KEYS = {
  SETTINGS: 'core_settings',
  DAILY_LOGS: 'core_daily_logs',
  MEASUREMENTS: 'core_measurements',
} as const

/** Safely parse JSON from localStorage */
function safeGet<T>(key: string): T | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

/** Safely write JSON to localStorage */
function safeSet(key: string, value: unknown): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage full or unavailable — silently degrade
  }
}

export class LocalStorageRepository implements IStorageRepository {
  // ---- Settings ----
  getSettings(): AppSettings | null {
    return safeGet<AppSettings>(KEYS.SETTINGS)
  }

  saveSettings(settings: AppSettings): void {
    safeSet(KEYS.SETTINGS, settings)
  }

  clearSettings(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(KEYS.SETTINGS)
    localStorage.removeItem(KEYS.DAILY_LOGS)
    localStorage.removeItem(KEYS.MEASUREMENTS)
  }

  // ---- Daily Logs ----
  getDailyLog(date: string): DailyLog | null {
    const logs = this.getAllLogs()
    return logs?.find((l: DailyLog) => l?.date === date) ?? null
  }

  saveDailyLog(log: DailyLog): void {
    const logs = this.getAllLogs()
    const idx = logs.findIndex((l: DailyLog) => l?.date === log?.date)
    if (idx >= 0) {
      logs[idx] = log
    } else {
      logs.push(log)
    }
    safeSet(KEYS.DAILY_LOGS, logs)
  }

  getAllLogs(): DailyLog[] {
    return safeGet<DailyLog[]>(KEYS.DAILY_LOGS) ?? []
  }

  getLogsByDateRange(startDate: string, endDate: string): DailyLog[] {
    return this.getAllLogs().filter(
      (l: DailyLog) => (l?.date ?? '') >= startDate && (l?.date ?? '') <= endDate
    )
  }

  // ---- Measurements (stub) ----
  getMeasurements(): MeasurementEntry[] {
    return safeGet<MeasurementEntry[]>(KEYS.MEASUREMENTS) ?? []
  }

  saveMeasurement(entry: MeasurementEntry): void {
    const entries = this.getMeasurements()
    const idx = entries.findIndex((e: MeasurementEntry) => e?.id === entry?.id)
    if (idx >= 0) {
      entries[idx] = entry
    } else {
      entries.push(entry)
    }
    safeSet(KEYS.MEASUREMENTS, entries)
  }
}
