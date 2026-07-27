'use client'

import { useState, useEffect } from 'react'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function getMotivation(): string {
  const messages = [
    'Every step forward matters.',
    'You\'re building something lasting.',
    'Consistency is your superpower.',
    'Your body thanks you for showing up.',
    'Small daily progress leads to big results.',
    'You\'re stronger than you were yesterday.',
    'Trust the process — it\'s working.',
  ]
  return messages[Math.floor(Math.random() * messages.length)] ?? messages[0] ?? ''
}

export function Greeting() {
  const [greeting, setGreeting] = useState('')
  const [motivation, setMotivation] = useState('')

  useEffect(() => {
    setGreeting(getGreeting())
    setMotivation(getMotivation())
  }, [])

  if (!greeting) return null

  return (
    <div className="mb-2">
      <h1 className="text-2xl font-bold tracking-tight">{greeting}</h1>
      <p className="text-sm text-muted-foreground">{motivation}</p>
    </div>
  )
}
