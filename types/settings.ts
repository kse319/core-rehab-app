/**
 * App settings types.
 */

/** Time-based notification setting */
export interface NotificationSetting {
  enabled: boolean
  time: string
}

/** All notification settings */
export interface NotificationSettings {
  morning: NotificationSetting
  afternoon: NotificationSetting
  evening: NotificationSetting
}

/** Theme preference */
export type ThemePreference = 'light' | 'dark' | 'system'

/** Units preference */
export type UnitPreference = 'metric' | 'imperial'

/** Complete app settings */
export interface AppSettings {
  programId: string
  programStartDate: string
  currentProgramDay: number
  notifications: NotificationSettings
  theme: ThemePreference
  units: UnitPreference
  onboardingCompleted: boolean
}

/** Default settings factory */
export function createDefaultSettings(): AppSettings {
  return {
    programId: 'core-rehab-v1',
    programStartDate: '',
    currentProgramDay: 1,
    notifications: {
      morning: { enabled: true, time: '08:00' },
      afternoon: { enabled: true, time: '13:00' },
      evening: { enabled: false, time: '20:00' },
    },
    theme: 'light',
    units: 'metric',
    onboardingCompleted: false,
  }
}
