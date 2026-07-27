'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Calendar,
  Bell,
  Ruler,
  Info,
  RotateCcw,
  Heart,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSettings } from '@/hooks/use-settings'
import { AppShellWrapper } from '@/components/layout/app-shell-wrapper'
import { formatFullDate } from '@/lib/date-utils'
import type { UnitPreference, NotificationSettings } from '@/types'

export default function SettingsPage() {
  const router = useRouter()
  const { settings, isLoaded, updateSettings, resetSettings, loadSettings } = useSettings()
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  useEffect(() => {
    if (!isLoaded) loadSettings()
  }, [isLoaded, loadSettings])

  useEffect(() => {
    if (isLoaded && !settings?.onboardingCompleted) {
      router.replace('/onboarding')
    }
  }, [isLoaded, settings, router])

  if (!isLoaded || !settings?.onboardingCompleted) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
      </div>
    )
  }

  const handleToggleNotification = (key: keyof NotificationSettings) => {
    const current = settings?.notifications?.[key]
    updateSettings({
      notifications: {
        ...(settings?.notifications ?? {
          morning: { enabled: true, time: '08:00' },
          afternoon: { enabled: true, time: '13:00' },
          evening: { enabled: false, time: '20:00' },
        }),
        [key]: { ...(current ?? { enabled: false, time: '08:00' }), enabled: !(current?.enabled ?? false) },
      },
    })
  }

  const handleTimeChange = (key: keyof NotificationSettings, time: string) => {
    const current = settings?.notifications?.[key]
    updateSettings({
      notifications: {
        ...(settings?.notifications ?? {
          morning: { enabled: true, time: '08:00' },
          afternoon: { enabled: true, time: '13:00' },
          evening: { enabled: false, time: '20:00' },
        }),
        [key]: { ...(current ?? { enabled: false, time: '08:00' }), time },
      },
    })
  }

  const handleUnitsChange = (units: UnitPreference) => {
    updateSettings({ units })
  }

  const handleReset = () => {
    resetSettings()
    router.replace('/onboarding')
  }

  return (
    <AppShellWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your preferences</p>
        </div>

        {/* Program Info */}
        <section>
          <SectionLabel icon={Calendar} label="Program" />
          <div className="rounded-xl bg-card p-4 space-y-3" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <InfoRow label="Program" value="Core Rehabilitation" />
            <InfoRow label="Start Date" value={formatFullDate(settings?.programStartDate ?? '')} />
            <InfoRow label="Status" value="Active" />
          </div>
        </section>

        {/* Notifications */}
        <section>
          <SectionLabel icon={Bell} label="Reminders" />
          <div className="rounded-xl bg-card divide-y divide-border" style={{ boxShadow: 'var(--shadow-sm)' }}>
            {(['morning', 'afternoon', 'evening'] as const).map((key: 'morning' | 'afternoon' | 'evening') => {
              const notif = settings?.notifications?.[key]
              const enabled = notif?.enabled ?? false
              const time = notif?.time ?? '08:00'
              const label = key.charAt(0).toUpperCase() + key.slice(1)

              return (
                <div key={key} className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <div className="text-sm font-medium">{label}</div>
                    {enabled && (
                      <input
                        type="time"
                        value={time}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleTimeChange(key, e?.target?.value ?? '08:00')
                        }
                        className="mt-1 text-xs text-muted-foreground bg-transparent border-none p-0 focus:outline-none"
                      />
                    )}
                  </div>
                  <button
                    onClick={() => handleToggleNotification(key)}
                    className={cn(
                      'h-7 w-12 rounded-full transition-colors duration-fast relative',
                      enabled ? 'bg-primary' : 'bg-muted'
                    )}
                    role="switch"
                    aria-checked={enabled}
                  >
                    <div
                      className={cn(
                        'absolute top-0.5 h-6 w-6 rounded-full bg-white transition-transform duration-fast',
                        enabled ? 'translate-x-[22px]' : 'translate-x-0.5'
                      )}
                      style={{ boxShadow: 'var(--shadow-sm)' }}
                    />
                  </button>
                </div>
              )
            })}
          </div>
        </section>

        {/* Preferences */}
        <section>
          <SectionLabel icon={Ruler} label="Preferences" />
          <div className="rounded-xl bg-card p-4" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <div className="text-sm font-medium mb-2">Units</div>
            <div className="flex gap-2">
              {(['metric', 'imperial'] as const).map((u: UnitPreference) => (
                <button
                  key={u}
                  onClick={() => handleUnitsChange(u)}
                  className={cn(
                    'flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-fast',
                    settings?.units === u
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  )}
                >
                  {u.charAt(0).toUpperCase() + u.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section>
          <SectionLabel icon={Info} label="About" />
          <div className="rounded-xl bg-card p-4 space-y-2" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" fill="currentColor" />
              <span className="text-sm font-semibold">Core</span>
            </div>
            <p className="text-xs text-muted-foreground">Your daily rehabilitation companion</p>
            <p className="text-xs text-muted-foreground">Version 1.0.0</p>
          </div>
        </section>

        {/* Reset */}
        <section>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/20 px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Program
          </button>
        </section>

        {/* Reset confirmation dialog */}
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-6">
            <div
              className="w-full max-w-sm rounded-2xl bg-card p-6 space-y-4"
              style={{ boxShadow: 'var(--shadow-lg)' }}
            >
              <h3 className="text-lg font-semibold">Reset Program?</h3>
              <p className="text-sm text-muted-foreground">
                This will clear all your progress, logs, and settings. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 rounded-xl bg-muted px-4 py-2.5 text-sm font-medium hover:bg-muted/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 rounded-xl bg-destructive px-4 py-2.5 text-sm font-medium text-destructive-foreground hover:opacity-90 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="h-4" />
      </div>
    </AppShellWrapper>
  )
}

// --- Helper components ---

function SectionLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}
