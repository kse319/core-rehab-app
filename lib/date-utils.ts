/**
 * Date utility functions built on date-fns.
 */
import {
  format,
  differenceInDays,
  addDays,
  startOfDay,
  parseISO,
  isValid,
  isBefore,
  isAfter,
  isSameDay,
} from 'date-fns'

/** Format a Date to ISO date string (YYYY-MM-DD) */
export function toDateString(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

/** Get today's date as ISO date string */
export function todayString(): string {
  return toDateString(new Date())
}

/** Parse an ISO date string to Date safely */
export function parseDateString(dateStr: string): Date | null {
  try {
    const d = parseISO(dateStr)
    return isValid(d) ? d : null
  } catch {
    return null
  }
}

/** Calculate program day number (1-based) from start date */
export function calculateProgramDay(startDate: string, today?: Date): number {
  const start = parseDateString(startDate)
  if (!start) return 1
  const now = startOfDay(today ?? new Date())
  const startDay = startOfDay(start)
  const diff = differenceInDays(now, startDay)
  return Math.max(1, diff + 1)
}

/** Calculate program week number (1-based) from program day */
export function calculateProgramWeek(programDay: number): number {
  return Math.max(1, Math.ceil(programDay / 7))
}

/** Calculate day within current week (1-7) */
export function dayWithinWeek(programDay: number): number {
  const mod = programDay % 7
  return mod === 0 ? 7 : mod
}

/** Get a date N days from a start date */
export function getDateFromStart(startDate: string, dayOffset: number): string {
  const start = parseDateString(startDate)
  if (!start) return startDate
  return toDateString(addDays(start, dayOffset))
}

/** Format a date string for display (e.g. "Mon, Jul 27") */
export function formatDisplayDate(dateStr: string): string {
  const d = parseDateString(dateStr)
  if (!d) return dateStr
  return format(d, 'EEE, MMM d')
}

/** Format a date string for full display (e.g. "Monday, July 27, 2026") */
export function formatFullDate(dateStr: string): string {
  const d = parseDateString(dateStr)
  if (!d) return dateStr
  return format(d, 'EEEE, MMMM d, yyyy')
}

/** Check if a date is before today */
export function isBeforeToday(dateStr: string): boolean {
  const d = parseDateString(dateStr)
  if (!d) return false
  return isBefore(startOfDay(d), startOfDay(new Date()))
}

/** Check if a date is today */
export function isToday(dateStr: string): boolean {
  const d = parseDateString(dateStr)
  if (!d) return false
  return isSameDay(d, new Date())
}

/** Check if a date is after today */
export function isAfterToday(dateStr: string): boolean {
  const d = parseDateString(dateStr)
  if (!d) return false
  return isAfter(startOfDay(d), startOfDay(new Date()))
}

export { differenceInDays, addDays, startOfDay, isSameDay, format, parseISO }
