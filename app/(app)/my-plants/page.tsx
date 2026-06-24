import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MyPlantsClient } from './MyPlantsClient'

export default async function MyPlantsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: plants } = await supabase
    .from('user_plants')
    .select('*')
    .eq('user_id', user.id)
    .order('added_at', { ascending: false })

  return <MyPlantsClient initialPlants={plants ?? []} userId={user.id} />
}
