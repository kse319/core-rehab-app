'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  ArrowRight,
  ArrowLeft,
  PlayCircle,
  RotateCcw,
  Bell,
  Sparkles,
  Calendar,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSettingsStore } from '@/stores/settings-store'
import { toDateString } from '@/lib/date-utils'
import { subDays } from 'date-fns'

const TOTAL_STEPS = 5

export default function OnboardingPage() {
  const router = useRouter()
  const { settings, updateSettings, loadSettings, isLoaded } = useSettingsStore()
  const [step, setStep] = useState(0)
  const [programPath, setProgramPath] = useState<'new' | 'resume' | null>(null)
  const [startDate, setStartDate] = useState('')
  const [resumeWeek, setResumeWeek] = useState(1)
  const [resumeDay, setResumeDay] = useState(1)
  const [morningEnabled, setMorningEnabled] = useState(true)
  const [afternoonEnabled, setAfternoonEnabled] = useState(true)
  const [eveningEnabled, setEveningEnabled] = useState(false)

  useEffect(() => {
    if (!isLoaded) loadSettings()
  }, [isLoaded, loadSettings])

  useEffect(() => {
    if (isLoaded && settings?.onboardingCompleted) {
      router.replace('/dashboard')
    }
  }, [isLoaded, settings, router])

  useEffect(() => {
    setStartDate(toDateString(new Date()))
  }, [])

  const handleComplete = () => {
    let programStartDate = startDate || toDateString(new Date())
    let currentProgramDay = 1

    if (programPath === 'resume') {
      // Calculate start date by working backwards from selected week/day
      const totalDaysSoFar = (resumeWeek - 1) * 7 + resumeDay
      currentProgramDay = totalDaysSoFar
      const adjustedStart = subDays(new Date(), totalDaysSoFar - 1)
      programStartDate = toDateString(adjustedStart)
    }

    updateSettings({
      programId: 'core-rehab-v1',
      programStartDate,
      currentProgramDay,
      notifications: {
        morning: { enabled: morningEnabled, time: '08:00' },
        afternoon: { enabled: afternoonEnabled, time: '13:00' },
        evening: { enabled: eveningEnabled, time: '20:00' },
      },
      onboardingCompleted: true,
    })

    router.replace('/dashboard')
  }

  const canProceed = () => {
    if (step === 1) return programPath !== null
    if (step === 2 && programPath === 'new') return !!startDate
    if (step === 2 && programPath === 'resume') return resumeWeek >= 1 && resumeDay >= 1
    return true
  }

  const nextStep = () => {
    if (step < TOTAL_STEPS - 1 && canProceed()) {
      setStep(step + 1)
    } else if (step === TOTAL_STEPS - 1) {
      handleComplete()
    }
  }

  const prevStep = () => {
    if (step > 0) setStep(step - 1)
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 pt-8 pb-4">
        {Array.from({ length: TOTAL_STEPS }).map((_: unknown, i: number) => (
          <div
            key={i}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              i === step
                ? 'w-8 bg-primary'
                : i < step
                ? 'w-1.5 bg-primary/40'
                : 'w-1.5 bg-muted'
            )}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="flex flex-1 items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-sm"
          >
            {step === 0 && <WelcomeStep />}
            {step === 1 && (
              <PathStep
                selected={programPath}
                onSelect={setProgramPath}
              />
            )}
            {step === 2 && programPath === 'new' && (
              <NewProgramStep
                startDate={startDate}
                onDateChange={setStartDate}
              />
            )}
            {step === 2 && programPath === 'resume' && (
              <ResumeProgramStep
                week={resumeWeek}
                day={resumeDay}
                onWeekChange={setResumeWeek}
                onDayChange={setResumeDay}
              />
            )}
            {step === 3 && (
              <ReminderStep
                morningEnabled={morningEnabled}
                afternoonEnabled={afternoonEnabled}
                eveningEnabled={eveningEnabled}
                onMorningChange={setMorningEnabled}
                onAfternoonChange={setAfternoonEnabled}
                onEveningChange={setEveningEnabled}
              />
            )}
            {step === 4 && <ReadyStep />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between px-6 pb-10 pt-4">
        {step > 0 ? (
          <button
            onClick={prevStep}
            className="flex items-center gap-1.5 rounded-xl px-5 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={nextStep}
          disabled={!canProceed()}
          className={cn(
            'flex items-center gap-1.5 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-fast',
            canProceed()
              ? 'bg-primary text-primary-foreground hover:opacity-90'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          )}
        >
          {step === TOTAL_STEPS - 1 ? "Let's Begin" : 'Continue'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// --- Step Components ---

function WelcomeStep() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
        <Heart className="h-10 w-10 text-primary" fill="currentColor" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Core</h1>
      <p className="text-lg text-muted-foreground mb-4">
        Your daily rehabilitation companion
      </p>
      <p className="text-sm text-muted-foreground/80 max-w-xs">
        A guided 18-week program to help you rebuild strength, confidence, and healthy movement patterns — one day at a time.
      </p>
    </div>
  )
}

function PathStep({
  selected,
  onSelect,
}: {
  selected: 'new' | 'resume' | null
  onSelect: (p: 'new' | 'resume') => void
}) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold tracking-tight mb-2 text-center">
        How would you like to start?
      </h2>
      <p className="text-sm text-muted-foreground mb-8 text-center">
        Choose the option that fits your situation.
      </p>
      <div className="w-full space-y-3">
        <button
          onClick={() => onSelect('new')}
          className={cn(
            'flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all duration-fast border-2',
            selected === 'new'
              ? 'border-primary bg-primary/5'
              : 'border-transparent bg-card hover:bg-muted/50'
          )}
          style={{ boxShadow: 'var(--shadow-sm)' }}
        >
          <div className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
            selected === 'new' ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
          )}>
            <PlayCircle className="h-6 w-6" />
          </div>
          <div>
            <div className="font-semibold">Start New Program</div>
            <div className="text-xs text-muted-foreground">Begin from Day 1</div>
          </div>
        </button>
        <button
          onClick={() => onSelect('resume')}
          className={cn(
            'flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all duration-fast border-2',
            selected === 'resume'
              ? 'border-primary bg-primary/5'
              : 'border-transparent bg-card hover:bg-muted/50'
          )}
          style={{ boxShadow: 'var(--shadow-sm)' }}
        >
          <div className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
            selected === 'resume' ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
          )}>
            <RotateCcw className="h-6 w-6" />
          </div>
          <div>
            <div className="font-semibold">Resume Existing Program</div>
            <div className="text-xs text-muted-foreground">Pick up where you left off</div>
          </div>
        </button>
      </div>
    </div>
  )
}

function NewProgramStep({
  startDate,
  onDateChange,
}: {
  startDate: string
  onDateChange: (d: string) => void
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
        <Calendar className="h-7 w-7 text-primary" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-2 text-center">
        When do you want to start?
      </h2>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        Choose today or pick a custom start date.
      </p>
      <input
        type="date"
        value={startDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onDateChange(e?.target?.value ?? '')}
        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  )
}

function ResumeProgramStep({
  week,
  day,
  onWeekChange,
  onDayChange,
}: {
  week: number
  day: number
  onWeekChange: (w: number) => void
  onDayChange: (d: number) => void
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
        <RotateCcw className="h-7 w-7 text-primary" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-2 text-center">
        Where are you in the program?
      </h2>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        Select your current week and day.
      </p>
      <div className="w-full space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5 ml-1">
            Current Week
          </label>
          <select
            value={week}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onWeekChange(parseInt(e?.target?.value ?? '1', 10))
            }
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {Array.from({ length: 18 }).map((_: unknown, i: number) => (
              <option key={i + 1} value={i + 1}>
                Week {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5 ml-1">
            Current Day in Week
          </label>
          <select
            value={day}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onDayChange(parseInt(e?.target?.value ?? '1', 10))
            }
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {Array.from({ length: 7 }).map((_: unknown, i: number) => (
              <option key={i + 1} value={i + 1}>
                Day {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

function ReminderStep({
  morningEnabled,
  afternoonEnabled,
  eveningEnabled,
  onMorningChange,
  onAfternoonChange,
  onEveningChange,
}: {
  morningEnabled: boolean
  afternoonEnabled: boolean
  eveningEnabled: boolean
  onMorningChange: (v: boolean) => void
  onAfternoonChange: (v: boolean) => void
  onEveningChange: (v: boolean) => void
}) {
  const reminders = [
    { label: 'Morning', time: '8:00 AM', enabled: morningEnabled, onChange: onMorningChange },
    { label: 'Afternoon', time: '1:00 PM', enabled: afternoonEnabled, onChange: onAfternoonChange },
    { label: 'Evening', time: '8:00 PM', enabled: eveningEnabled, onChange: onEveningChange },
  ]

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
        <Bell className="h-7 w-7 text-primary" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-2 text-center">
        Set your reminders
      </h2>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        Choose when you’d like to be reminded.
      </p>
      <div className="w-full space-y-3">
        {reminders.map((r: { label: string; time: string; enabled: boolean; onChange: (v: boolean) => void }) => (
          <div
            key={r.label}
            className="flex items-center justify-between rounded-xl bg-card px-4 py-3"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            <div>
              <div className="text-sm font-medium">{r.label}</div>
              <div className="text-xs text-muted-foreground">{r.time}</div>
            </div>
            <button
              onClick={() => r.onChange(!r.enabled)}
              className={cn(
                'h-7 w-12 rounded-full transition-colors duration-fast relative',
                r.enabled ? 'bg-primary' : 'bg-muted'
              )}
              role="switch"
              aria-checked={r.enabled}
            >
              <div
                className={cn(
                  'absolute top-0.5 h-6 w-6 rounded-full bg-white transition-transform duration-fast',
                  r.enabled ? 'translate-x-[22px]' : 'translate-x-0.5'
                )}
                style={{ boxShadow: 'var(--shadow-sm)' }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReadyStep() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
        <Sparkles className="h-10 w-10 text-primary" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight mb-2">You’re all set!</h2>
      <p className="text-sm text-muted-foreground max-w-xs">
        Your program is ready. Let’s take the first step together — one day at a time.
      </p>
    </div>
  )
}
