import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { TopBar } from '@/components/layout/TopBar'
import { PlantHero } from '@/components/plant/PlantHero'
import { PlantStats } from '@/components/plant/PlantStats'
import { PlantFooter } from '@/components/plant/PlantFooter'
import { Plant, PlantSection } from '@/types/database'

export const revalidate = 3600

export default async function PlantDetailPage({ params }: { params: { plantId: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: plant } = await supabase
    .from('plants')
    .select('*')
    .eq('id', params.plantId)
    .single<Plant>()

  if (!plant) notFound()

  // Check if user already has this plant
  let userPlantId: string | undefined
  let isFavorite = false
  let isAdded = false

  if (user) {
    const { data: up } = await supabase
      .from('user_plants')
      .select('id, is_favorite')
      .eq('user_id', user.id)
      .eq('catalog_plant_id', plant.id)
      .single()
    if (up) {
      userPlantId = up.id
      isFavorite = up.is_favorite
      isAdded = true
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <TopBar title="Plant guide" showBack />

      <PlantHero heroImage={plant.hero_image} plantName={`${plant.genus} ${plant.species}`} />

      {/* Kicker */}
      <div className="px-5 pt-5">
        <p className="text-[12px] font-nunito text-muted">
          {plant.categories.slice(0, 2).join(' · ')}
        </p>
      </div>

      {/* Title */}
      <div className="px-5 mt-1">
        <h1 className="text-[40px] font-bricolage font-bold text-dark leading-tight">
          {plant.genus} {plant.species}
        </h1>
        {plant.common_name && (
          <p className="text-[15px] font-newsreader italic text-muted mt-1">{plant.common_name}</p>
        )}
      </div>

      <PlantStats plant={plant} />

      {/* Intro */}
      <div className="px-5 mb-8">
        <p className="text-[20px] font-newsreader text-dark leading-relaxed">{plant.intro}</p>
      </div>

      {/* Sections */}
      <div className="px-5 mb-8 flex flex-col gap-8">
        {(plant.sections as PlantSection[]).map((section) => (
          <div key={section.number}>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-[23px] font-bricolage font-bold text-dark">{section.number}</span>
              <span className="text-[12px] font-nunito text-muted uppercase tracking-wider">{section.topic}</span>
            </div>
            <h3 className="text-[18px] font-bricolage font-semibold text-dark mb-2">{section.title}</h3>
            <p className="text-[15px] font-nunito text-dark/80 leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>

      {/* Quote */}
      {plant.quote && (
        <div className="px-5 mb-24">
          <blockquote className="border-l-[3px] border-primary pl-4">
            <p className="text-[21px] font-newsreader italic text-brown leading-relaxed">{plant.quote}</p>
          </blockquote>
        </div>
      )}

      <PlantFooter
        plantId={plant.id}
        plantName={`${plant.genus} ${plant.species}`}
        userId={user?.id ?? null}
        initialAdded={isAdded}
        initialFavorite={isFavorite}
        userPlantId={userPlantId}
      />
    </div>
  )
}
