'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plant } from '@/types/database'
import { AnimatedPlant } from '@/components/ui/AnimatedPlant'

const careBadgeColors = {
  Easy: 'bg-primary/10 text-primary',
  Moderate: 'bg-amber-100 text-amber-700',
  Expert: 'bg-red-100 text-red-700',
}

const plantVariants = ['monstera', 'fern', 'succulent', 'small-bush', 'fern'] as const

export function GuidesClient({ plants }: { plants: Plant[] }) {
  const [query, setQuery] = useState('')

  const filtered = plants.filter((p) => {
    const q = query.toLowerCase()
    return (
      p.genus.toLowerCase().includes(q) ||
      p.species.toLowerCase().includes(q) ||
      (p.common_name?.toLowerCase() || '').includes(q) ||
      p.categories.some((c) => c.toLowerCase().includes(q))
    )
  })

  return (
    <div className="px-5 py-5">
      {/* Search */}
      <div className="relative mb-6">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
          <circle cx="11" cy="11" r="8" stroke="#7C8A6B" strokeWidth="2" />
          <path d="m21 21-4.35-4.35" stroke="#7C8A6B" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search plants…"
          className="w-full bg-white border border-muted/20 rounded-2xl pl-10 pr-4 py-3 text-[15px] font-nunito text-dark placeholder-muted/50 outline-none focus:border-primary transition-colors"
        />
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted font-nunito text-[15px]">No plants found for &quot;{query}&quot;</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {filtered.map((plant, i) => (
          <Link key={plant.id} href={`/guides/${plant.id}`} className="block group">
            <div className="bg-white rounded-xl overflow-hidden border border-muted/10 active:scale-[0.98] transition-transform">
              {/* Plant image / illustration */}
              <div className="relative h-44 bg-gradient-to-br from-cream to-primary/10 overflow-hidden">
                {plant.hero_image ? (
                  <Image
                    src={plant.hero_image}
                    alt={plant.genus}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-end justify-center pb-2">
                    <div className="animate-breathe">
                      <AnimatedPlant
                        variant={plantVariants[i % plantVariants.length]}
                        size={140}
                      />
                    </div>
                  </div>
                )}
                {/* Care badge */}
                <div className="absolute top-3 right-3">
                  <span className={`text-[11px] font-nunito font-semibold px-2.5 py-1 rounded-full ${careBadgeColors[plant.care]}`}>
                    {plant.care}
                  </span>
                </div>
              </div>

              <div className="px-4 py-3">
                <p className="text-[11px] font-nunito text-muted mb-1">
                  {plant.categories.slice(0, 2).join(' · ')}
                </p>
                <h3 className="text-[19px] font-bricolage font-bold text-dark leading-tight">
                  {plant.genus} <span className="italic font-normal text-[17px]">{plant.species}</span>
                </h3>
                {plant.common_name && (
                  <p className="text-[13px] font-nunito italic text-muted mt-0.5">{plant.common_name}</p>
                )}
                <div className="flex gap-3 mt-2.5">
                  {[
                    { label: 'Light', value: plant.light },
                    { label: 'Water', value: plant.water },
                  ].map((s) => (
                    <div key={s.label} className="flex gap-1 items-center">
                      <span className="text-[11px] text-muted font-nunito">{s.label}:</span>
                      <span className="text-[11px] font-semibold text-dark font-nunito">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
