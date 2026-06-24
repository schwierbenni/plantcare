import { createClient } from '@/lib/supabase/server'
import { AnimatedPlant } from '@/components/ui/AnimatedPlant'
import { GuidesClient } from './GuidesClient'

export const revalidate = 3600

type PlantVariant = 'tall-tree' | 'fern' | 'small-bush' | 'monstera' | 'succulent'
const variants: PlantVariant[] = ['tall-tree', 'fern', 'tall-tree', 'small-bush', 'fern', 'tall-tree']

export default async function GuidesPage() {
  const supabase = await createClient()
  const { data: plants } = await supabase
    .from('plants')
    .select('*')
    .order('genus', { ascending: true })

  return (
    <div className="min-h-screen bg-cream">
      {/* Header with animated forest */}
      <div className="bg-gradient-to-b from-dark-green to-primary relative overflow-hidden pt-14 pb-24">
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around pointer-events-none h-36 px-2 opacity-40">
          {variants.map((v, i) => (
            <div key={i} className={`plant-sway plant-sway-delay-${(i % 4) + 1}`} style={{ transformOrigin: 'bottom center' }}>
              <AnimatedPlant variant={v} size={60 + (i % 3) * 15} />
            </div>
          ))}
        </div>
        <div className="px-5 relative z-10">
          <p className="text-[12px] font-nunito text-white/60 mb-1 uppercase tracking-wider">Foliage Guide</p>
          <h1 className="text-[36px] font-bricolage font-bold text-white leading-tight">Plant<br />Encyclopedia</h1>
          <p className="text-white/70 text-[14px] font-nunito mt-2">Curated care guides for your collection</p>
        </div>
      </div>

      <GuidesClient plants={plants ?? []} />
    </div>
  )
}
