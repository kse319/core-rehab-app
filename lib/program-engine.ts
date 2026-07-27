/**
 * ProgramEngine — core business logic for program navigation.
 * Calculates current day, week, retrieves activities, computes progress.
 */
import type { ProgramDefinition, WeekDefinition, ActivityDefinition, AppSettings, DailyLog } from '@/types'
import { calculateProgramDay, calculateProgramWeek, dayWithinWeek } from './date-utils'

export class ProgramEngine {
  constructor(
    private programDef: ProgramDefinition,
    private settings: AppSettings
  ) {}

  /** Get the current program day (1-based) */
  getCurrentDay(): number {
    if (!this.settings?.programStartDate) return 1
    const calculatedDay = calculateProgramDay(this.settings.programStartDate)
    // If user resumed mid-program, offset is already baked into startDate
    return Math.min(calculatedDay, this.getTotalDays())
  }

  /** Get the current program week (1-based) */
  getCurrentWeek(): number {
    return calculateProgramWeek(this.getCurrentDay())
  }

  /** Total number of days in the program */
  getTotalDays(): number {
    return (this.programDef?.totalWeeks ?? 18) * 7
  }

  /** Get the week definition for a given week number */
  getWeekDefinition(weekNumber: number): WeekDefinition | null {
    return (
      this.programDef?.weeks?.find(
        (w: WeekDefinition) => w?.weekNumber === weekNumber
      ) ?? null
    )
  }

  /** Get all activities for a specific program day */
  getActivitiesForDay(programDay: number): ActivityDefinition[] {
    const week = calculateProgramWeek(programDay)
    const weekDef = this.getWeekDefinition(week)
    return weekDef?.activities ?? []
  }

  /** Get activities for today */
  getTodayActivities(): ActivityDefinition[] {
    return this.getActivitiesForDay(this.getCurrentDay())
  }

  /** Get educational content for a week */
  getWeekEducationalContent(weekNumber: number): string {
    return this.getWeekDefinition(weekNumber)?.educationalContent ?? ''
  }

  /** Get the weekly goal */
  getWeeklyGoal(weekNumber: number): string {
    return this.getWeekDefinition(weekNumber)?.weeklyGoal ?? ''
  }

  /** Get week theme */
  getWeekTheme(weekNumber: number): string {
    return this.getWeekDefinition(weekNumber)?.theme ?? ''
  }

  /** Calculate completion percentage for a day given a log */
  getDayCompletionPercent(log: DailyLog | null, activities: ActivityDefinition[]): number {
    if (!activities?.length) return 0
    const completedCount = log?.completedActivityIds?.length ?? 0
    return Math.round((completedCount / activities.length) * 100)
  }

  /** Check if the program is complete */
  isProgramComplete(): boolean {
    return this.getCurrentDay() >= this.getTotalDays()
  }

  /** Get overall program progress percentage */
  getProgramProgressPercent(): number {
    const total = this.getTotalDays()
    if (total <= 0) return 0
    return Math.round((this.getCurrentDay() / total) * 100)
  }
}
