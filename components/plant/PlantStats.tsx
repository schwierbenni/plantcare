import { Plant } from '@/types/database'

const statIcons = {
  Light: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" fill="#4C6B3A" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="#4C6B3A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Water: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13z" fill="#4C6B3A" opacity="0.8" />
    </svg>
  ),
  Humidity: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M8 4a4 4 0 0 0 0 8H16a4 4 0 0 0 0-8" stroke="#4C6B3A" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 20h16" stroke="#4C6B3A" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 16v4M12 14v6M16 16v4" stroke="#4C6B3A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Care: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.335 4.342 1 7.5 1c1.622 0 3.36.836 4.5 2.165C13.14 1.836 14.878 1 16.5 1 19.658 1 23 3.335 23 7.191c0 4.105-5.37 8.863-11 14.402z" fill="#4C6B3A" opacity="0.7" />
    </svg>
  ),
}

export function PlantStats({ plant }: { plant: Plant }) {
  const stats = [
    { label: 'Light', value: plant.light },
    { label: 'Water', value: plant.water },
    { label: 'Humidity', value: plant.humidity },
    { label: 'Care', value: plant.care },
  ]

  return (
    <div className="px-5 my-6">
      <div className="border-t border-muted/20 pt-4 pb-4 border-b border-muted/20">
        <div className="flex justify-around">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1.5">
              <div className="opacity-70">{statIcons[stat.label as keyof typeof statIcons]}</div>
              <span className="text-[12px] font-nunito font-medium text-muted leading-none">{stat.label}</span>
              <span className="text-[14px] font-nunito font-semibold text-dark leading-none">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
