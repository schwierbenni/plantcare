import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileClient } from './ProfileClient'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: plants } = await supabase
    .from('user_plants')
    .select('id, is_favorite')
    .eq('user_id', user.id)

  const { data: sub } = await supabase
    .from('plant_push_subscriptions')
    .select('id')
    .eq('user_id', user.id)
    .limit(1)
    .single()

  const totalPlants = plants?.length ?? 0
  const favorites = plants?.filter((p) => p.is_favorite).length ?? 0

  return (
    <ProfileClient
      email={user.email ?? ''}
      userId={user.id}
      totalPlants={totalPlants}
      favorites={favorites}
      hasNotifications={!!sub}
    />
  )
}
