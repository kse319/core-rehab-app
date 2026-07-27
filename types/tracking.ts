/**
 * Tracking types — daily logs and completion data.
 */

/** Mood levels for daily check-in (future use) */
export type MoodLevel = 1 | 2 | 3 | 4 | 5

/** A single day's tracking log */
export interface DailyLog {
  id: string
  programId: string
  date: string
  programDay: number
  programWeek: number
  completedActivityIds: string[]
  notes: string
  mood?: MoodLevel | null
  completedAt?: string | null
  isComplete: boolean
}
