/**
 * Program data types — describes the structure of a rehabilitation program.
 * Programs are loaded from JSON data files, never hardcoded.
 */

/** Categories of activities within the program */
export type ActivityCategory =
  | 'core_exercise'
  | 'breathing'
  | 'walking'
  | 'body_mechanics'
  | 'splint_reminder'
  | 'education'
  | 'custom'

/** Guidance tips and modifications for an activity */
export interface ActivityGuidance {
  tips: string[]
  modifications: string[]
}

/** A single activity within a program week */
export interface ActivityDefinition {
  id: string
  name: string
  category: ActivityCategory
  description: string
  instructions: string
  sets?: number | null
  reps?: number | null
  duration?: number | null
  unit?: string | null
  isRequired: boolean
  order: number
  guidance?: ActivityGuidance | null
}

/** A week within the program */
export interface WeekDefinition {
  weekNumber: number
  theme: string
  educationalContent: string
  weeklyGoal: string
  activities: ActivityDefinition[]
}

/** Top-level program definition — loaded from JSON */
export interface ProgramDefinition {
  id: string
  name: string
  version: string
  totalWeeks: number
  description: string
  weeks: WeekDefinition[]
}
