/**
 * Measurement types — full type definitions for future implementation.
 */

/** A single measurement entry */
export interface MeasurementEntry {
  id: string
  date: string
  programWeek: number
  measurements: {
    weight?: number | null
    waist?: number | null
    upperAbdomen?: number | null
    navel?: number | null
    lowerAbdomen?: number | null
    hip?: number | null
    custom?: Record<string, number> | null
  }
  photoUri?: string | null
  notes?: string | null
}

/** Measurement field metadata for configurable UI */
export interface MeasurementFieldConfig {
  key: string
  label: string
  unit: string
  min: number
  max: number
  step: number
}
