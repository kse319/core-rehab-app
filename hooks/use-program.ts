'use client'

import { useEffect, useMemo } from 'react'
import { useProgramStore } from '@/stores/program-store'
import { useSettingsStore } from '@/stores/settings-store'
import { ProgramEngine } from '@/lib/program-engine'

/** Hook providing the program engine and computed state */
export function useProgram() {
  const { program, isLoaded: programLoaded, loadProgram } = useProgramStore()
  const { settings, isLoaded: settingsLoaded, loadSettings } = useSettingsStore()

  useEffect(() => {
    if (!programLoaded) {
      loadProgram()
    }
  }, [programLoaded, loadProgram])

  useEffect(() => {
    if (!settingsLoaded) {
      loadSettings()
    }
  }, [settingsLoaded, loadSettings])

  const engine = useMemo(() => {
    if (!program || !settings) return null
    return new ProgramEngine(program, settings)
  }, [program, settings])

  return {
    program,
    settings,
    engine,
    isLoaded: programLoaded && settingsLoaded,
  }
}
