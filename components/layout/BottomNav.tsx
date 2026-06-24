'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  {
    href: '/today',
    label: 'Today',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="5" fill={active ? '#4C6B3A' : 'none'} stroke={active ? '#4C6B3A' : '#7C8A6B'} strokeWidth="2" />
        <line x1="12" y1="2" x2="12" y2="4" stroke={active ? '#4C6B3A' : '#7C8A6B'} strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="20" x2="12" y2="22" stroke={active ? '#4C6B3A' : '#7C8A6B'} strokeWidth="2" strokeLinecap="round" />
        <line x1="2" y1="12" x2="4" y2="12" stroke={active ? '#4C6B3A' : '#7C8A6B'} strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="12" x2="22" y2="12" stroke={active ? '#4C6B3A' : '#7C8A6B'} strokeWidth="2" strokeLinecap="round" />
        <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" stroke={active ? '#4C6B3A' : '#7C8A6B'} strokeWidth="2" strokeLinecap="round" />
        <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" stroke={active ? '#4C6B3A' : '#7C8A6B'} strokeWidth="2" strokeLinecap="round" />
        <line x1="19.07" y1="4.93" x2="17.66" y2="6.34" stroke={active ? '#4C6B3A' : '#7C8A6B'} strokeWidth="2" strokeLinecap="round" />
        <line x1="6.34" y1="17.66" x2="4.93" y2="19.07" stroke={active ? '#4C6B3A' : '#7C8A6B'} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/my-plants',
    label: 'My Plants',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 22V12M12 12C12 8 9 5 5 4C5 8 8 11 12 12ZM12 12C12 8 15 5 19 4C19 8 16 11 12 12Z"
          stroke={active ? '#4C6B3A' : '#7C8A6B'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={active ? '#4C6B3A' : 'none'}
          fillOpacity={active ? '0.15' : '0'}
        />
      </svg>
    ),
  },
  {
    href: '/guides',
    label: 'Guides',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
          stroke={active ? '#4C6B3A' : '#7C8A6B'}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
          stroke={active ? '#4C6B3A' : '#7C8A6B'}
          strokeWidth="2"
          fill={active ? '#4C6B3A' : 'none'}
          fillOpacity={active ? '0.12' : '0'}
        />
      </svg>
    ),
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="8"
          r="4"
          stroke={active ? '#4C6B3A' : '#7C8A6B'}
          strokeWidth="2"
          fill={active ? '#4C6B3A' : 'none'}
          fillOpacity={active ? '0.15' : '0'}
        />
        <path
          d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
          stroke={active ? '#4C6B3A' : '#7C8A6B'}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-app bg-cream border-t border-muted/30 z-50 safe-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const active = pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center gap-0.5 px-4 py-1.5 touch-feedback rounded-xl transition-all"
            >
              <span className={`transition-transform ${active ? 'scale-110' : 'scale-100'}`}>
                {tab.icon(active)}
              </span>
              <span
                className="text-[10.5px] font-medium font-nunito leading-none"
                style={{ color: active ? '#4C6B3A' : '#7C8A6B' }}
              >
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
