'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getStorage } from '@/lib/storage'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    const storage = getStorage()
    const settings = storage.getSettings()
    if (settings?.onboardingCompleted) {
      router.replace('/dashboard')
    } else {
      router.replace('/onboarding')
    }
  }, [router])

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-muted border-t-primary" />
      </div>
    </div>
  )
}
