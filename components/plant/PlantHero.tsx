import Image from 'next/image'
import { AnimatedPlant } from '@/components/ui/AnimatedPlant'

export function PlantHero({ heroImage, plantName }: { heroImage: string | null; plantName: string }) {
  return (
    <div className="relative w-full h-[280px] bg-cream overflow-hidden">
      {heroImage ? (
        <Image
          src={heroImage}
          alt={plantName}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-cream to-primary/10 relative">
          <div className="animate-breathe">
            <AnimatedPlant variant="monstera" size={180} />
          </div>
        </div>
      )}
    </div>
  )
}
