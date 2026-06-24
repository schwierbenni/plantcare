'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

interface PlantFooterProps {
  plantId: string
  plantName: string
  userId: string | null
  initialAdded: boolean
  initialFavorite: boolean
  userPlantId?: string
}

export function PlantFooter({
  plantId,
  plantName,
  userId,
  initialAdded,
  initialFavorite,
  userPlantId: initialUserPlantId,
}: PlantFooterProps) {
  const [added, setAdded] = useState(initialAdded)
  const [favorite, setFavorite] = useState(initialFavorite)
  const [loading, setLoading] = useState(false)
  const [upid, setUpid] = useState(initialUserPlantId)
  const router = useRouter()
  const supabase = createClient()

  async function handleAddToggle() {
    if (!userId) {
      router.push('/login')
      return
    }
    setLoading(true)
    if (!added) {
      const { data, error } = await supabase
        .from('user_plants')
        .insert({
          user_id: userId,
          catalog_plant_id: plantId,
          name: plantName,
        })
        .select('id')
        .single()
      if (!error && data) {
        setUpid(data.id)
        setAdded(true)
      }
    } else {
      if (upid) {
        await supabase.from('user_plants').delete().eq('id', upid)
        setAdded(false)
        setUpid(undefined)
        setFavorite(false)
      }
    }
    setLoading(false)
  }

  async function handleFavorite() {
    if (!userId) {
      router.push('/login')
      return
    }
    if (!added || !upid) {
      await handleAddToggle()
      return
    }
    const newFav = !favorite
    setFavorite(newFav)
    await supabase.from('user_plants').update({ is_favorite: newFav }).eq('id', upid)
  }

  return (
    <div className="fixed bottom-[60px] left-1/2 -translate-x-1/2 w-full max-w-app bg-cream/95 backdrop-blur-sm border-t border-muted/20 px-5 py-3 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={handleFavorite}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-muted/30 touch-feedback flex-shrink-0 transition-all active:scale-90"
          aria-label="Toggle favorite"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={favorite ? '#4C6B3A' : 'none'}>
            <path
              d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.335 4.342 1 7.5 1c1.622 0 3.36.836 4.5 2.165C13.14 1.836 14.878 1 16.5 1 19.658 1 23 3.335 23 7.191c0 4.105-5.37 8.863-11 14.402z"
              stroke={favorite ? '#4C6B3A' : '#7C8A6B'}
              strokeWidth="2"
            />
          </svg>
        </button>

        <Button
          onClick={handleAddToggle}
          variant={added ? 'secondary' : 'primary'}
          loading={loading}
          className="flex-1"
        >
          {added ? '✓ Added to my plants' : 'Add to my plants'}
        </Button>
      </div>
    </div>
  )
}
