export interface Plant {
  id: string
  genus: string
  species: string
  common_name: string | null
  categories: string[]
  hero_image: string | null
  intro: string
  light: 'Bright' | 'Medium' | 'Low' | 'Direct'
  water: 'Daily' | 'Weekly' | 'Biweekly' | 'Monthly'
  humidity: 'High' | 'Medium' | 'Low'
  care: 'Easy' | 'Moderate' | 'Expert'
  sections: PlantSection[]
  quote: string | null
  created_at: string
}

export interface PlantSection {
  number: string
  topic: string
  title: string
  body: string
}

export interface UserPlant {
  id: string
  user_id: string
  catalog_plant_id: string | null
  name: string
  nickname: string | null
  photo_url: string | null
  light: string | null
  water_frequency: 'Daily' | 'Weekly' | 'Biweekly' | 'Monthly' | null
  last_watered: string | null
  is_favorite: boolean
  notes: string | null
  added_at: string
  updated_at: string
}

export interface PlantPushSubscription {
  id: string
  user_id: string
  endpoint: string
  p256dh: string
  auth: string
  user_agent: string | null
  created_at: string
  updated_at: string
}
