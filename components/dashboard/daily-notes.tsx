'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { FileText } from 'lucide-react'

interface DailyNotesProps {
  notes: string
  onUpdate: (notes: string) => void
}

export function DailyNotes({ notes, onUpdate }: DailyNotesProps) {
  const [value, setValue] = useState(notes ?? '')
  const [expanded, setExpanded] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setValue(notes ?? '')
  }, [notes])

  const debouncedUpdate = useCallback(
    (text: string) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        onUpdate?.(text)
      }, 600)
    },
    [onUpdate]
  )

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e?.target?.value ?? ''
    setValue(text)
    debouncedUpdate(text)
  }

  return (
    <div className="rounded-xl bg-card p-4" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2 text-left"
      >
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-semibold">Daily Notes</span>
        <span className="ml-auto text-xs text-muted-foreground">
          {(value?.length ?? 0)} chars
        </span>
      </button>
      {expanded && (
        <div className="mt-3">
          <textarea
            value={value}
            onChange={handleChange}
            placeholder="How are you feeling today? Any observations or thoughts..."
            className="w-full resize-none rounded-lg border border-border bg-background p-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px]"
            rows={4}
          />
        </div>
      )}
    </div>
  )
}
