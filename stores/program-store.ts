'use client'

import { create } from 'zustand'
import type { ProgramDefinition } from '@/types'

interface ProgramState {
  program: ProgramDefinition | null
  isLoaded: boolean
  loadProgram: () => Promise<void>
}

export const useProgramStore = create<ProgramState>((set) => ({
  program: null,
  isLoaded: false,

  loadProgram: async () => {
    try {
      const data = await import('@/data/programs/core-rehab-v1.json')
      set({ program: data.default as ProgramDefinition, isLoaded: true })
    } catch {
      set({ isLoaded: true })
    }
  },
}))
