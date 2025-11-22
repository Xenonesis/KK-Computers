import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

// Create Supabase client with custom configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Disable session persistence for server-side
  },
  global: {
    headers: {
      'User-Agent': 'kk-computers-app/1.0.0',
    },
  },
})

// Helper function to test Supabase connection
export async function testSupabaseConnection() {
  try {
    // Use a simple select query to test connection
    const { data, error } = await supabase
      .from('courses')
      .select('id')
      .limit(1)

    if (error) {
      console.error('Supabase connection test failed:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Supabase connection test error:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown connection error'
    }
  }
}

// Database types
export interface UserProfile {
  id: string
  user_id: string // Clerk user ID
  email: string
  first_name?: string
  last_name?: string
  role: 'student' | 'tutor' | 'admin'
  bio?: string
  profile_image_url?: string
  website_url?: string
  linkedin_url?: string
  github_url?: string
  skills: string[]
  experience_years: number
  hourly_rate?: number
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  tutor_id: string // Clerk user ID
  title: string
  description: string
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  price: number
  image_url?: string
  technologies: string[]
  max_students?: number
  current_students: number
  is_published: boolean
  stripe_price_id?: string
  created_at: string
  updated_at: string
  tutor?: UserProfile // Optional joined data
}

export interface Event {
  id: string
  tutor_id: string // Clerk user ID
  title: string
  description: string
  event_date: string
  duration_minutes: number
  location?: string
  event_type: 'workshop' | 'webinar' | 'meetup' | 'conference' | 'seminar'
  price: number
  max_attendees?: number
  current_attendees: number
  technologies: string[]
  is_published: boolean
  stripe_price_id?: string
  created_at: string
  updated_at: string
  tutor?: UserProfile // Optional joined data
}

export interface Project {
  id: string
  tutor_id: string // Clerk user ID
  title: string
  description: string
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  estimated_duration: string
  price: number
  technologies: string[]
  requirements: string[]
  deliverables: string[]
  max_participants?: number
  current_participants: number
  project_type: 'guided' | 'mentored' | 'collaborative' | 'individual'
  is_published: boolean
  stripe_price_id?: string
  created_at: string
  updated_at: string
  tutor?: UserProfile // Optional joined data
}

export interface Enrollment {
  id: string
  user_id: string
  content_type: 'course' | 'event' | 'project'
  content_id: string
  enrollment_date: string
  completion_date?: string
  progress: number
  status: 'enrolled' | 'in_progress' | 'completed' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  stripe_payment_intent_id?: string
  amount_paid?: number
  course?: Course // Optional joined data
  event?: Event // Optional joined data
  project?: Project // Optional joined data
}

export interface Payment {
  id: string
  enrollment_id: string
  stripe_payment_intent_id: string
  stripe_session_id?: string
  amount: number
  currency: string
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled' | 'refunded'
  payment_method?: string
  created_at: string
  updated_at: string
}

export interface CourseModule {
  id: string
  course_id: string
  title: string
  description?: string
  order_index: number
  duration_minutes?: number
  video_url?: string
  content?: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  enrollment_id: string
  module_id: string
  completed_at?: string
  time_spent_minutes: number
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
