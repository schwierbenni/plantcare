import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { TodayClient } from './TodayClient'

export default async function TodayPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: plants } = await supabase
    .from('user_plants')
    .select('*')
    .eq('user_id', user.id)
    .order('added_at', { ascending: true })

  return <TodayClient plants={plants ?? []} userId={user.id} />
}
