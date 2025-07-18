import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (will be updated as we create the schema)
export interface Course {
  id: string
  title: string
  description: string
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  price: number
  image_url?: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  image_url?: string
  github_url?: string
  live_url?: string
  created_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  type: 'workshop' | 'seminar' | 'certification'
  max_participants?: number
  created_at: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  image_url?: string
  rating: number
  created_at: string
}

export interface Partner {
  id: string
  name: string
  logo_url: string
  website_url?: string
  description?: string
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied'
  created_at: string
}
