'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, BookOpen, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Today', icon: LayoutDashboard },
  { href: '/log', label: 'Log', icon: BookOpen },
  { href: '/settings', label: 'Settings', icon: Settings },
] as const

export function BottomNav() {
  const pathname = usePathname() ?? ''

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md safe-bottom"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-0.5 rounded-lg px-4 py-2 text-xs font-medium transition-colors duration-fast min-w-[64px]',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                className={cn(
                  'h-5 w-5 transition-all duration-fast',
                  isActive && 'scale-110'
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
