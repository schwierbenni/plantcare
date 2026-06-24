'use client'

import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { urlBase64ToUint8Array } from '@/lib/push/vapid'
import { AnimatedPlant } from '@/components/ui/AnimatedPlant'
import { Button } from '@/components/ui/Button'

interface Props {
  email: string
  userId: string
  totalPlants: number
  favorites: number
  hasNotifications: boolean
}

export function ProfileClient({ email, totalPlants, favorites, hasNotifications }: Props) {
  const [notifEnabled, setNotifEnabled] = useState(hasNotifications)
  const [notifLoading, setNotifLoading] = useState(false)
  const [pushSupported, setPushSupported] = useState(true)
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const initials = email.split('@')[0].slice(0, 2).toUpperCase()
  const isIOS = typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent)

  useEffect(() => {
    if (!('PushManager' in window) || !('serviceWorker' in navigator)) {
      setPushSupported(false)
    }
    const handler = (e: Event) => { e.preventDefault(); setInstallPrompt(e as BeforeInstallPromptEvent) }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function toggleNotifications() {
    if (!pushSupported) return
    setNotifLoading(true)
    try {
      if (!notifEnabled) {
        const permission = await Notification.requestPermission()
        if (permission !== 'granted') { setNotifLoading(false); return }
        const reg = await navigator.serviceWorker.ready
        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
        })
        await fetch('/api/push/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sub.toJSON()),
        })
        setNotifEnabled(true)
      } else {
        await fetch('/api/push/subscribe', { method: 'DELETE' })
        setNotifEnabled(false)
      }
    } catch (e) {
      console.error(e)
    }
    setNotifLoading(false)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  async function handleInstall() {
    if (installPrompt) {
      installPrompt.prompt()
      await installPrompt.userChoice
      setInstallPrompt(null)
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-b from-dark-green to-primary relative overflow-hidden pt-14 pb-20">
        <div className="absolute bottom-0 right-4 pointer-events-none opacity-25">
          <div className="plant-sway" style={{ transformOrigin: 'bottom right' }}>
            <AnimatedPlant variant="tall-tree" size={110} />
          </div>
        </div>
        <div className="px-5 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-[20px] font-bricolage font-bold">{initials}</span>
            </div>
            <div>
              <p className="text-white text-[17px] font-bricolage font-bold">{email.split('@')[0]}</p>
              <p className="text-white/60 text-[13px] font-nunito">{email}</p>
            </div>
          </div>
          <div className="flex gap-6 mt-5">
            <div>
              <p className="text-white text-[24px] font-bricolage font-bold">{totalPlants}</p>
              <p className="text-white/60 text-[12px] font-nunito">Plants</p>
            </div>
            <div className="w-px bg-white/20" />
            <div>
              <p className="text-white text-[24px] font-bricolage font-bold">{favorites}</p>
              <p className="text-white/60 text-[12px] font-nunito">Favorites</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-6 flex flex-col gap-6">
        {/* Notifications */}
        <section>
          <h2 className="text-[13px] font-nunito font-medium text-muted uppercase tracking-wider mb-3">Notifications</h2>
          <div className="bg-white rounded-xl border border-muted/10">
            <div className="flex items-center justify-between px-4 py-4">
              <div>
                <p className="text-[15px] font-nunito font-semibold text-dark">Watering reminders</p>
                <p className="text-[12px] font-nunito text-muted">
                  {!pushSupported
                    ? 'Not supported on this browser'
                    : notifEnabled
                    ? "You'll be notified when plants need water"
                    : 'Get daily reminders to water your plants'}
                </p>
              </div>
              <button
                onClick={toggleNotifications}
                disabled={!pushSupported || notifLoading}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notifEnabled ? 'bg-primary' : 'bg-muted/30'
                } ${!pushSupported ? 'opacity-40 cursor-not-allowed' : ''}`}
                aria-label="Toggle notifications"
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    notifEnabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* App */}
        <section>
          <h2 className="text-[13px] font-nunito font-medium text-muted uppercase tracking-wider mb-3">App</h2>
          <div className="bg-white rounded-xl border border-muted/10 divide-y divide-muted/10">
            {(installPrompt || isIOS) && (
              <button
                onClick={handleInstall}
                className="w-full flex items-center justify-between px-4 py-4 touch-feedback"
              >
                <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v14M8 12l4 4 4-4" stroke="#26331F" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M4 17v3h16v-3" stroke="#26331F" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="text-[15px] font-nunito text-dark">Install App</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="#7C8A6B" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            )}
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#26331F" strokeWidth="1.5" />
                  <path d="M12 8v4l2 2" stroke="#26331F" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-[15px] font-nunito text-dark">About Plantable</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="#7C8A6B" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" stroke="#26331F" strokeWidth="1.5" />
                </svg>
                <span className="text-[15px] font-nunito text-dark">Privacy Policy</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="#7C8A6B" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </section>

        {/* Account */}
        <section>
          <h2 className="text-[13px] font-nunito font-medium text-muted uppercase tracking-wider mb-3">Account</h2>
          <div className="flex flex-col gap-3">
            <Button onClick={handleSignOut} variant="secondary" className="w-full">
              Sign out
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
