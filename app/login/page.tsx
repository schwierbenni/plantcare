'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AnimatedPlant, FloatingParticles } from '@/components/ui/AnimatedPlant'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col overflow-hidden relative">
      {/* Animated background scene */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around pointer-events-none overflow-hidden h-72 opacity-30">
        <div className="plant-sway plant-sway-delay-1" style={{ transformOrigin: 'bottom center' }}>
          <AnimatedPlant variant="tall-tree" size={100} />
        </div>
        <div className="plant-sway plant-sway-delay-2" style={{ transformOrigin: 'bottom center' }}>
          <AnimatedPlant variant="fern" size={90} />
        </div>
        <div className="plant-sway plant-sway-delay-3" style={{ transformOrigin: 'bottom center' }}>
          <AnimatedPlant variant="tall-tree" size={120} />
        </div>
        <div className="plant-sway" style={{ transformOrigin: 'bottom center' }}>
          <AnimatedPlant variant="small-bush" size={80} />
        </div>
        <div className="plant-sway plant-sway-delay-4" style={{ transformOrigin: 'bottom center' }}>
          <AnimatedPlant variant="fern" size={70} />
        </div>
      </div>

      <FloatingParticles count={8} />

      {/* Content */}
      <div className="flex-1 flex flex-col px-8 justify-center z-10">
        {/* Logo */}
        <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center animate-breathe">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 22V12M12 12C12 7 8 4 3 3C3 8 7 11 12 12ZM12 12C12 7 16 4 21 3C21 8 17 11 12 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-2xl font-bricolage font-bold text-dark tracking-tight">Plantable</span>
          </div>
          <p className="text-muted text-[14px] font-nunito">Your personal plant care companion</p>
        </div>

        {!sent ? (
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <h1 className="text-[32px] font-bricolage font-bold text-dark mb-2 leading-tight">
              Welcome to<br />Plantable
            </h1>
            <p className="text-muted text-[15px] font-nunito mb-8 leading-relaxed">
              Sign in with your email to start caring for your plants.
            </p>

            <form onSubmit={handleMagicLink} className="flex flex-col gap-4">
              <div>
                <label className="block text-[13px] font-nunito font-medium text-muted mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white border border-muted/30 rounded-2xl px-4 py-3.5 text-[15px] font-nunito text-dark placeholder-muted/50 outline-none focus:border-primary transition-colors"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-[13px] font-nunito">{error}</p>
              )}

              <Button type="submit" loading={loading} size="lg" className="w-full">
                Send Magic Link
              </Button>
            </form>

            <p className="text-center text-[12px] text-muted font-nunito mt-6">
              No password needed — we&apos;ll email you a login link.
            </p>
          </div>
        ) : (
          <div className="animate-fade-in-up text-center" style={{ animationFillMode: 'both' }}>
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-breathe">
              <span className="text-4xl">🌿</span>
            </div>
            <h2 className="text-[26px] font-bricolage font-bold text-dark mb-3">Check your inbox</h2>
            <p className="text-muted text-[15px] font-nunito leading-relaxed">
              We&apos;ve sent a magic link to<br />
              <strong className="text-dark">{email}</strong>
            </p>
            <p className="text-muted text-[13px] font-nunito mt-4">
              Click the link in the email to sign in.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 text-primary text-[13px] font-nunito font-medium underline"
            >
              Use a different email
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
