'use client'

import { useRouter } from 'next/navigation'

interface TopBarProps {
  title?: string
  showBack?: boolean
  rightElement?: React.ReactNode
}

export function TopBar({ title = 'Plant guide', showBack = false, rightElement }: TopBarProps) {
  const router = useRouter()

  return (
    <div className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-muted/20">
      <div className="flex items-center justify-between px-5 h-14">
        {showBack ? (
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full touch-feedback -ml-2"
            aria-label="Go back"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#26331F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : (
          <div className="w-10" />
        )}

        <span className="text-[15px] font-medium font-nunito text-dark tracking-tight">{title}</span>

        {rightElement ?? (
          <button className="w-10 h-10 flex items-center justify-center rounded-full touch-feedback -mr-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="5" r="1.5" fill="#26331F" />
              <circle cx="12" cy="12" r="1.5" fill="#26331F" />
              <circle cx="12" cy="19" r="1.5" fill="#26331F" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
