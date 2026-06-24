'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AnimatedPlant, FloatingParticles } from '@/components/ui/AnimatedPlant'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setError(error.message)
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col overflow-hidden relative">
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

      <div className="flex-1 flex flex-col px-8 justify-center z-10">
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

        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <h1 className="text-[32px] font-bricolage font-bold text-dark mb-8 leading-tight">
            Welcome back
          </h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-white border border-muted/30 rounded-2xl px-4 py-3.5 text-[15px] font-nunito text-dark placeholder-muted/50 outline-none focus:border-primary transition-colors"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-white border border-muted/30 rounded-2xl px-4 py-3.5 text-[15px] font-nunito text-dark placeholder-muted/50 outline-none focus:border-primary transition-colors"
            />

            {error && <p className="text-red-500 text-[13px] font-nunito">{error}</p>}

            <Button type="submit" loading={loading} size="lg" className="w-full">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
