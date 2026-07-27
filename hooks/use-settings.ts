'use client'

import { useSettingsStore } from '@/stores/settings-store'

/** Convenience hook for settings */
export function useSettings() {
  const { settings, isLoaded, updateSettings, resetSettings, loadSettings } =
    useSettingsStore()

  return {
    settings,
    isLoaded,
    updateSettings,
    resetSettings,
    loadSettings,
  }
}
