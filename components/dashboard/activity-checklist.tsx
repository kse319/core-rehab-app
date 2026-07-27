'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  ChevronDown,
  Dumbbell,
  Wind,
  Footprints,
  ShieldCheck,
  GraduationCap,
  Activity,
  Grip,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ActivityDefinition, ActivityCategory } from '@/types'

const categoryConfig: Record<ActivityCategory, { label: string; icon: React.ElementType; color: string }> = {
  core_exercise: { label: 'Core Exercises', icon: Dumbbell, color: 'text-primary' },
  breathing: { label: 'Breathing', icon: Wind, color: 'text-blue-500' },
  walking: { label: 'Walking', icon: Footprints, color: 'text-emerald-500' },
  body_mechanics: { label: 'Body Mechanics', icon: Activity, color: 'text-amber-500' },
  splint_reminder: { label: 'Support Check', icon: ShieldCheck, color: 'text-purple-500' },
  education: { label: 'Education', icon: GraduationCap, color: 'text-blue-500' },
  custom: { label: 'Custom', icon: Grip, color: 'text-gray-500' },
}

interface ActivityChecklistProps {
  activities: ActivityDefinition[]
  completedIds: string[]
  onToggle: (id: string) => void
}

export function ActivityChecklist({ activities, completedIds, onToggle }: ActivityChecklistProps) {
  const safeActivities = activities ?? []
  const safeCompleted = completedIds ?? []

  // Group by category
  const grouped = safeActivities.reduce<Record<string, ActivityDefinition[]>>((acc, act) => {
    const cat = act?.category ?? 'custom'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(act)
    return acc
  }, {})

  const categories = Object.keys(grouped)

  return (
    <div className="space-y-4">
      {categories.map((cat: string) => {
        const config = categoryConfig[cat as ActivityCategory] ?? categoryConfig.custom
        const items = grouped[cat] ?? []
        const Icon = config.icon
        const completedInGroup = items.filter(
          (a: ActivityDefinition) => safeCompleted.includes(a?.id ?? '')
        ).length

        return (
          <div key={cat} className="rounded-xl bg-card p-4" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <div className="mb-3 flex items-center gap-2">
              <Icon className={cn('h-4 w-4', config.color)} />
              <span className="text-sm font-semibold">{config.label}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {completedInGroup}/{items.length}
              </span>
            </div>
            <div className="space-y-1">
              {items.map((activity: ActivityDefinition) => (
                <ActivityItem
                  key={activity?.id ?? ''}
                  activity={activity}
                  isCompleted={safeCompleted.includes(activity?.id ?? '')}
                  onToggle={onToggle}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

interface ActivityItemProps {
  activity: ActivityDefinition
  isCompleted: boolean
  onToggle: (id: string) => void
}

function ActivityItem({ activity, isCompleted, onToggle }: ActivityItemProps) {
  const [expanded, setExpanded] = useState(false)

  const durationLabel = activity?.duration
    ? `${Math.round((activity.duration ?? 0) / 60)} min`
    : activity?.sets && activity?.reps
    ? `${activity.sets} × ${activity.reps}`
    : null

  return (
    <div className="rounded-lg">
      <div
        className={cn(
          'flex items-start gap-3 rounded-lg px-3 py-3 transition-colors duration-fast cursor-pointer',
          isCompleted ? 'bg-primary/5' : 'hover:bg-muted/50'
        )}
        onClick={() => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setExpanded(!expanded)
          }
        }}
      >
        {/* Checkbox */}
        <button
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation()
            onToggle(activity?.id ?? '')
          }}
          className={cn(
            'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-fast',
            isCompleted
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border hover:border-primary/50'
          )}
          aria-label={`Mark ${activity?.name ?? 'activity'} as ${isCompleted ? 'incomplete' : 'complete'}`}
        >
          {isCompleted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <Check className="h-3.5 w-3.5" />
            </motion.div>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'text-sm font-medium transition-all duration-fast',
                isCompleted && 'line-through text-muted-foreground'
              )}
            >
              {activity?.name ?? ''}
            </span>
            {durationLabel && (
              <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {durationLabel}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
            {activity?.description ?? ''}
          </p>
        </div>

        {/* Expand chevron */}
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-fast mt-1',
            expanded && 'rotate-180'
          )}
        />
      </div>

      {/* Expanded instructions */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-1 ml-9">
              <p className="text-xs text-foreground/80 leading-relaxed mb-2">
                {activity?.instructions ?? ''}
              </p>
              {(activity?.guidance?.tips?.length ?? 0) > 0 && (
                <div className="mt-2">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Tips</p>
                  <ul className="space-y-0.5">
                    {(activity?.guidance?.tips ?? []).map((tip: string, i: number) => (
                      <li key={i} className="text-xs text-muted-foreground flex gap-1.5">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
