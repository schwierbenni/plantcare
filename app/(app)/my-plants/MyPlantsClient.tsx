'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { UserPlant } from '@/types/database'
import { AnimatedPlant } from '@/components/ui/AnimatedPlant'
import { Button } from '@/components/ui/Button'

const WATER_OPTIONS = ['Daily', 'Weekly', 'Biweekly', 'Monthly'] as const
const LIGHT_OPTIONS = ['Bright', 'Medium', 'Low', 'Direct'] as const

export function MyPlantsClient({ initialPlants, userId }: { initialPlants: UserPlant[]; userId: string }) {
  const [plants, setPlants] = useState(initialPlants)
  const [showModal, setShowModal] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const supabase = createClient()

  async function deletePlant(id: string) {
    if (!confirm('Delete this plant?')) return
    setDeleting(id)
    const plant = plants.find((p) => p.id === id)
    if (plant?.photo_url) {
      const path = plant.photo_url.split('/plant-images/')[1]
      if (path) await supabase.storage.from('plant-images').remove([path])
    }
    await supabase.from('user_plants').delete().eq('id', id)
    setPlants((prev) => prev.filter((p) => p.id !== id))
    setDeleting(null)
  }

  function onPlantAdded(plant: UserPlant) {
    setPlants((prev) => [plant, ...prev])
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-cream relative overflow-hidden">
        <div className="absolute bottom-0 right-0 pointer-events-none opacity-30">
          <div className="plant-sway" style={{ transformOrigin: 'bottom right' }}>
            <AnimatedPlant variant="fern" size={100} />
          </div>
        </div>
        <div className="px-5 pt-14 pb-8 relative z-10">
          <p className="text-[12px] font-nunito text-muted mb-1">Your collection</p>
          <h1 className="text-[32px] font-bricolage font-bold text-dark leading-tight">My Plants</h1>
          <p className="text-muted text-[14px] font-nunito mt-1">{plants.length} plant{plants.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="px-5 pb-8">
        {plants.length === 0 ? (
          <div className="text-center py-12">
            <div className="flex justify-center gap-3 mb-6 animate-fade-in-up">
              <div className="plant-sway plant-sway-delay-1" style={{ transformOrigin: 'bottom center' }}>
                <AnimatedPlant variant="small-bush" size={80} />
              </div>
              <div className="plant-sway plant-sway-delay-2" style={{ transformOrigin: 'bottom center' }}>
                <AnimatedPlant variant="fern" size={90} />
              </div>
              <div className="plant-sway plant-sway-delay-3" style={{ transformOrigin: 'bottom center' }}>
                <AnimatedPlant variant="succulent" size={70} />
              </div>
            </div>
            <p className="text-[20px] font-newsreader text-dark mb-2">Your garden is empty</p>
            <p className="text-muted text-[14px] font-nunito mb-6">Start adding plants from the guide or create your own.</p>
            <Link href="/guides">
              <Button variant="secondary">Browse Plant Guides</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {plants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onDelete={() => deletePlant(plant.id)}
                deleting={deleting === plant.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform z-30"
        aria-label="Add plant"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </button>

      {showModal && (
        <AddPlantModal
          userId={userId}
          onClose={() => setShowModal(false)}
          onAdded={onPlantAdded}
        />
      )}
    </div>
  )
}

function PlantCard({ plant, onDelete, deleting }: { plant: UserPlant; onDelete: () => void; deleting: boolean }) {
  return (
    <div className={`flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-muted/10 transition-all ${deleting ? 'opacity-50' : ''}`}>
      <div className="w-16 h-16 rounded-xl bg-primary/10 overflow-hidden flex items-center justify-center flex-shrink-0">
        {plant.photo_url ? (
          <Image src={plant.photo_url} alt={plant.name} width={64} height={64} className="object-cover w-full h-full" />
        ) : (
          <div className="scale-90">
            <AnimatedPlant variant="succulent" size={55} />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-[15px] font-nunito font-semibold text-dark truncate">{plant.name}</p>
          {plant.is_favorite && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#4C6B3A">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.335 4.342 1 7.5 1c1.622 0 3.36.836 4.5 2.165C13.14 1.836 14.878 1 16.5 1 19.658 1 23 3.335 23 7.191c0 4.105-5.37 8.863-11 14.402z" />
            </svg>
          )}
        </div>
        {plant.nickname && <p className="text-[12px] text-muted font-nunito">&quot;{plant.nickname}&quot;</p>}
        <p className="text-[12px] text-muted font-nunito mt-0.5">
          {plant.water_frequency || 'No schedule'} · {plant.last_watered ? `Watered ${new Date(plant.last_watered).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : 'Never watered'}
        </p>
      </div>

      <button
        onClick={onDelete}
        className="w-8 h-8 flex items-center justify-center rounded-full touch-feedback"
        aria-label="Delete plant"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="#7C8A6B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

function AddPlantModal({ userId, onClose, onAdded }: { userId: string; onClose: () => void; onAdded: (p: UserPlant) => void }) {
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [waterFreq, setWaterFreq] = useState<string>('Weekly')
  const [light, setLight] = useState<string>('Bright')
  const [notes, setNotes] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (name.length < 2) { setError('Name must be at least 2 characters'); return }
    setLoading(true)
    setError('')

    let photo_url: string | null = null
    if (photo) {
      const ext = photo.name.split('.').pop()
      const path = `user-uploads/${userId}/${crypto.randomUUID()}.${ext}`
      const { error: uploadError } = await supabase.storage.from('plant-images').upload(path, photo)
      if (!uploadError) {
        const { data } = supabase.storage.from('plant-images').getPublicUrl(path)
        photo_url = data.publicUrl
      }
    }

    const { data, error: insertError } = await supabase
      .from('user_plants')
      .insert({
        user_id: userId,
        name: name.trim(),
        nickname: nickname.trim() || null,
        water_frequency: waterFreq as 'Daily' | 'Weekly' | 'Biweekly' | 'Monthly',
        light,
        notes: notes.trim() || null,
        photo_url,
      })
      .select('*')
      .single()

    setLoading(false)
    if (insertError) {
      setError(insertError.message)
    } else if (data) {
      onAdded(data as UserPlant)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-cream rounded-t-3xl w-full max-w-app max-h-[90vh] overflow-y-auto animate-fade-in-up">
        <div className="sticky top-0 bg-cream/95 backdrop-blur-sm px-5 pt-5 pb-3 border-b border-muted/20 flex items-center justify-between">
          <h2 className="text-[20px] font-bricolage font-bold text-dark">Add a plant</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full touch-feedback">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#26331F" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-5 flex flex-col gap-5">
          {/* Photo */}
          <div>
            <label className="block text-[13px] font-nunito font-medium text-muted mb-2">Photo (optional)</label>
            <label className="flex items-center gap-3 bg-white border border-dashed border-muted/40 rounded-xl px-4 py-4 cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="#7C8A6B" strokeWidth="1.5" />
                <circle cx="12" cy="11" r="3" stroke="#7C8A6B" strokeWidth="1.5" />
                <path d="M3 16l4-4 4 4 4-5 4 5" stroke="#7C8A6B" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-[14px] font-nunito text-muted">{photo ? photo.name : 'Choose a photo…'}</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="block text-[13px] font-nunito font-medium text-muted mb-2">Plant name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Monstera Deliciosa"
              maxLength={100}
              className="w-full bg-white border border-muted/20 rounded-2xl px-4 py-3 text-[15px] font-nunito text-dark placeholder-muted/50 outline-none focus:border-primary"
              required
            />
          </div>

          {/* Nickname */}
          <div>
            <label className="block text-[13px] font-nunito font-medium text-muted mb-2">Nickname (optional)</label>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder='e.g. "Big Leaf"'
              maxLength={30}
              className="w-full bg-white border border-muted/20 rounded-2xl px-4 py-3 text-[15px] font-nunito text-dark placeholder-muted/50 outline-none focus:border-primary"
            />
          </div>

          {/* Water frequency */}
          <div>
            <label className="block text-[13px] font-nunito font-medium text-muted mb-2">Watering frequency</label>
            <div className="grid grid-cols-2 gap-2">
              {WATER_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setWaterFreq(opt)}
                  className={`py-2.5 rounded-xl text-[14px] font-nunito font-medium transition-all border ${
                    waterFreq === opt
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-dark border-muted/20'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Light */}
          <div>
            <label className="block text-[13px] font-nunito font-medium text-muted mb-2">Light conditions</label>
            <div className="grid grid-cols-2 gap-2">
              {LIGHT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setLight(opt)}
                  className={`py-2.5 rounded-xl text-[14px] font-nunito font-medium transition-all border ${
                    light === opt
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-dark border-muted/20'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[13px] font-nunito font-medium text-muted mb-2">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special care notes…"
              maxLength={500}
              rows={3}
              className="w-full bg-white border border-muted/20 rounded-2xl px-4 py-3 text-[15px] font-nunito text-dark placeholder-muted/50 outline-none focus:border-primary resize-none"
            />
          </div>

          {error && <p className="text-red-500 text-[13px] font-nunito">{error}</p>}

          <Button type="submit" loading={loading} size="lg" className="w-full">
            Save Plant
          </Button>
        </form>
      </div>
    </div>
  )
}
