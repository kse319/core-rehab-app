'use client'

import { BottomNav } from './bottom-nav'
import { AppHeader } from './app-header'

interface AppShellWrapperProps {
  children: React.ReactNode
}

export function AppShellWrapper({ children }: AppShellWrapperProps) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <AppHeader />
      <main className="flex-1 pb-24">
        <div className="mx-auto max-w-lg px-4 py-4">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
