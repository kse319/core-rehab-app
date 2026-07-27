'use client'

import { Heart } from 'lucide-react'

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Heart className="h-4 w-4 text-primary-foreground" fill="currentColor" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Core</span>
        </div>
      </div>
    </header>
  )
}
