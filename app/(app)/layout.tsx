import { BottomNav } from '@/components/layout/BottomNav'
import { OfflineBanner } from '@/components/ui/OfflineBanner'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OfflineBanner />
      <main className="pb-[72px]">
        {children}
      </main>
      <BottomNav />
    </>
  )
}
