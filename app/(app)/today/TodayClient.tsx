'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { UserPlant } from '@/types/database'
import { AnimatedPlant, FloatingParticles } from '@/components/ui/AnimatedPlant'
import { Button } from '@/components/ui/Button'

function isDueToday(plant: UserPlant): boolean {
  if (!plant.water_frequency) return false
  if (!plant.last_watered) return true
  const lastWatered = new Date(plant.last_watered)
  const today = new Date()
  const daysDiff = Math.floor((today.getTime() - lastWatered.getTime()) / (1000 * 60 * 60 * 24))
  const intervalMap = { Daily: 1, Weekly: 7, Biweekly: 14, Monthly: 30 }
  return daysDiff >= intervalMap[plant.water_frequency]
}

function getNextWatering(plant: UserPlant): string {
  if (!plant.water_frequency || !plant.last_watered) return 'Today'
  const intervalMap = { Daily: 1, Weekly: 7, Biweekly: 14, Monthly: 30 }
  const days = intervalMap[plant.water_frequency]
  const next = new Date(plant.last_watered)
  next.setDate(next.getDate() + days)
  const today = new Date()
  const diff = Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  if (diff <= 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  return `In ${diff} days`
}

export function TodayClient({ plants }: { plants: UserPlant[]; userId: string }) {
  const [localPlants, setLocalPlants] = useState(plants)
  const [wateringAll, setWateringAll] = useState(false)
  const supabase = createClient()

  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const todayStr = today.toISOString().split('T')[0]

  const duePlants = localPlants.filter(isDueToday)
  const upcomingPlants = localPlants.filter((p) => !isDueToday(p) && p.water_frequency)

  async function waterPlant(id: string) {
    setLocalPlants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, last_watered: todayStr } : p))
    )
    const { error } = await supabase
      .from('user_plants')
      .update({ last_watered: todayStr })
      .eq('id', id)
    if (error) {
      setLocalPlants((prev) =>
        prev.map((p) => (p.id === id ? { ...p, last_watered: p.last_watered } : p))
      )
    }
  }

  async function waterAll() {
    setWateringAll(true)
    const ids = duePlants.map((p) => p.id)
    setLocalPlants((prev) =>
      prev.map((p) => (ids.includes(p.id) ? { ...p, last_watered: todayStr } : p))
    )
    await supabase
      .from('user_plants')
      .update({ last_watered: todayStr })
      .in('id', ids)
    setWateringAll(false)
  }

  return (
    <div className="min-h-screen bg-cream relative">
      {/* Animated header scene */}
      <div className="bg-gradient-to-b from-primary/15 to-cream relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around pointer-events-none h-32 px-4 opacity-60">
          <div className="plant-sway" style={{ transformOrigin: 'bottom center' }}>
            <AnimatedPlant variant="small-bush" size={55} />
          </div>
          <div className="plant-sway plant-sway-delay-2" style={{ transformOrigin: 'bottom center' }}>
            <AnimatedPlant variant="succulent" size={48} />
          </div>
          <div className="plant-sway plant-sway-delay-1" style={{ transformOrigin: 'bottom center' }}>
            <AnimatedPlant variant="fern" size={58} />
          </div>
          <div className="plant-sway plant-sway-delay-3" style={{ transformOrigin: 'bottom center' }}>
            <AnimatedPlant variant="succulent" size={44} />
          </div>
          <div className="plant-sway plant-sway-delay-4" style={{ transformOrigin: 'bottom center' }}>
            <AnimatedPlant variant="small-bush" size={50} />
          </div>
        </div>
        <FloatingParticles count={5} />
        <div className="px-5 pt-14 pb-20">
          <p className="text-[12px] font-nunito text-muted mb-1">{dateStr}</p>
          <h1 className="text-[32px] font-bricolage font-bold text-dark leading-tight">
            {duePlants.length === 0 ? 'All good today' : `${duePlants.length} plant${duePlants.length > 1 ? 's' : ''} need water`}
          </h1>
        </div>
      </div>

      <div className="px-5 py-4">
        {/* Due today */}
        {duePlants.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-bricolage font-bold text-dark">Due today</h2>
              <Button
                size="sm"
                onClick={waterAll}
                loading={wateringAll}
                className="text-[13px]"
              >
                Water all
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              {duePlants.map((plant) => (
                <WateringCard key={plant.id} plant={plant} onWater={() => waterPlant(plant.id)} />
              ))}
            </div>
          </section>
        )}

        {/* All happy */}
        {duePlants.length === 0 && localPlants.length > 0 && (
          <div className="text-center py-8 animate-fade-in-up">
            <div className="relative inline-block mb-4">
              <div className="animate-breathe">
                <AnimatedPlant variant="monstera" size={100} />
              </div>
            </div>
            <p className="text-[20px] font-newsreader text-dark mb-1">All plants are happy today 🌿</p>
            <p className="text-muted text-[14px] font-nunito">Check back when it&apos;s watering time.</p>
          </div>
        )}

        {localPlants.length === 0 && (
          <div className="text-center py-12 animate-fade-in-up">
            <div className="animate-breathe mb-4 inline-block">
              <AnimatedPlant variant="small-bush" size={90} />
            </div>
            <p className="text-[20px] font-newsreader text-dark mb-2">No plants yet</p>
            <p className="text-muted text-[14px] font-nunito mb-6">Add plants from the Guides or My Plants tab.</p>
          </div>
        )}

        {/* Upcoming */}
        {upcomingPlants.length > 0 && (
          <section>
            <h2 className="text-[18px] font-bricolage font-bold text-dark mb-4">Upcoming</h2>
            <div className="flex flex-col gap-2">
              {upcomingPlants.map((plant) => (
                <div key={plant.id} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-muted/10">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22V12M12 12C12 7 8 4 3 3C3 8 7 11 12 12ZM12 12C12 7 16 4 21 3C21 8 17 11 12 12Z" stroke="#4C6B3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-nunito font-semibold text-dark truncate">{plant.nickname || plant.name}</p>
                    <p className="text-[12px] text-muted font-nunito">{plant.water_frequency}</p>
                  </div>
                  <span className="text-[12px] font-nunito font-medium text-primary">{getNextWatering(plant)}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function WateringCard({ plant, onWater }: { plant: UserPlant; onWater: () => void }) {
  const [watered, setWatered] = useState(false)

  function handleWater() {
    setWatered(true)
    onWater()
  }

  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-4 py-3.5 border transition-all ${
        watered ? 'bg-primary/5 border-primary/20' : 'bg-white border-muted/10'
      }`}
    >
      <button
        onClick={handleWater}
        disabled={watered}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all active:scale-90 ${
          watered ? 'bg-primary border-primary' : 'border-muted/40'
        }`}
      >
        {watered && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-[15px] font-nunito font-semibold transition-all ${watered ? 'text-muted line-through' : 'text-dark'}`}>
          {plant.nickname || plant.name}
        </p>
        <p className="text-[12px] text-muted font-nunito">
          {plant.water_frequency} · {plant.last_watered ? `Last watered ${new Date(plant.last_watered).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : 'Never watered'}
        </p>
      </div>

      <div className={`transition-all ${watered ? 'animate-drip' : ''}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13z" fill={watered ? '#4C6B3A' : '#7C8A6B'} opacity="0.7" />
        </svg>
      </div>
    </div>
  )
}
