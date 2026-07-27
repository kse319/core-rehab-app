'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PartyPopper } from 'lucide-react'

interface CelebrationProps {
  show: boolean
  dayNumber: number
  onClose?: () => void
}

export function Celebration({ show, dayNumber, onClose }: CelebrationProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        onClose?.()
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={() => {
            setVisible(false)
            onClose?.()
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="flex flex-col items-center gap-4 rounded-2xl bg-card p-10 text-center"
            style={{ boxShadow: 'var(--shadow-lg)' }}
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <PartyPopper className="h-16 w-16 text-primary" />
            </motion.div>
            <h2 className="text-2xl font-bold tracking-tight">Day {dayNumber ?? 0} Complete!</h2>
            <p className="text-muted-foreground">Amazing work today. Every day counts.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
