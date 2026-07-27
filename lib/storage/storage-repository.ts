/**
 * Storage repository interface — all app code depends on this abstraction.
 * Swap LocalStorageRepository for CloudStorageRepository when ready.
 */
import type { AppSettings, DailyLog, MeasurementEntry } from '@/types'

export interface IStorageRepository {
  // Settings
  getSettings(): AppSettings | null
  saveSettings(settings: AppSettings): void
  clearSettings(): void

  // Daily logs
  getDailyLog(date: string): DailyLog | null
  saveDailyLog(log: DailyLog): void
  getAllLogs(): DailyLog[]
  getLogsByDateRange(startDate: string, endDate: string): DailyLog[]

  // Measurements (stub — ready for implementation)
  getMeasurements(): MeasurementEntry[]
  saveMeasurement(entry: MeasurementEntry): void
}
