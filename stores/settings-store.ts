'use client'

import { create } from 'zustand'
import type { AppSettings } from '@/types'
import { createDefaultSettings } from '@/types'
import { getStorage } from '@/lib/storage'

interface SettingsState {
  settings: AppSettings
  isLoaded: boolean
  loadSettings: () => void
  updateSettings: (partial: Partial<AppSettings>) => void
  resetSettings: () => void
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: createDefaultSettings(),
  isLoaded: false,

  loadSettings: () => {
    const storage = getStorage()
    const saved = storage.getSettings()
    if (saved) {
      set({ settings: saved, isLoaded: true })
    } else {
      set({ isLoaded: true })
    }
  },

  updateSettings: (partial: Partial<AppSettings>) => {
    const current = get().settings
    const updated = { ...current, ...(partial ?? {}) }
    set({ settings: updated })
    const storage = getStorage()
    storage.saveSettings(updated)
  },

  resetSettings: () => {
    const storage = getStorage()
    storage.clearSettings()
    set({ settings: createDefaultSettings(), isLoaded: true })
  },
}))
