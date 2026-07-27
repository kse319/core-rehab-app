/**
 * Achievement types — full type definitions for future implementation.
 */

/** Condition types for unlocking achievements */
export type AchievementConditionType =
  | 'streak_days'
  | 'total_days'
  | 'week_complete'
  | 'program_complete'
  | 'measurements_logged'
  | 'custom'

/** Condition to unlock an achievement */
export interface AchievementCondition {
  type: AchievementConditionType
  value: number
  metadata?: Record<string, string> | null
}

/** A single achievement */
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: string | null
  condition: AchievementCondition
}
