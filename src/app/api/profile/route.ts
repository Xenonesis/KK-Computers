import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { supabase } from '@/lib/supabase'
import { createClient } from '@supabase/supabase-js'

// Create a service role client for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// GET /api/profile - Get current user's profile
export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching profile:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!profile) {
      // Profile doesn't exist, create one
      const user = await currentUser()
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      const newProfile = {
        user_id: userId,
        email: user.emailAddresses[0]?.emailAddress || '',
        first_name: user.firstName || '',
        last_name: user.lastName || '',
        role: 'student' as const, // Default role
        skills: [],
        experience_years: 0,
        is_verified: false
      }

      const { data: createdProfile, error: createError } = await supabaseAdmin
        .from('user_profiles')
        .insert(newProfile)
        .select()
        .single()

      if (createError) {
        console.error('Error creating profile:', createError)
        return NextResponse.json({ error: createError.message }, { status: 500 })
      }

      return NextResponse.json({ profile: createdProfile })
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error('Error in GET /api/profile:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// PUT /api/profile - Update current user's profile
export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      first_name,
      last_name,
      role,
      bio,
      profile_image_url,
      website_url,
      linkedin_url,
      github_url,
      skills,
      experience_years,
      hourly_rate
    } = body

    // Validate role
    if (role && !['student', 'tutor', 'admin'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    const updateData: Record<string, unknown> = {}
    if (first_name !== undefined) updateData.first_name = first_name
    if (last_name !== undefined) updateData.last_name = last_name
    if (role !== undefined) updateData.role = role
    if (bio !== undefined) updateData.bio = bio
    if (profile_image_url !== undefined) updateData.profile_image_url = profile_image_url
    if (website_url !== undefined) updateData.website_url = website_url
    if (linkedin_url !== undefined) updateData.linkedin_url = linkedin_url
    if (github_url !== undefined) updateData.github_url = github_url
    if (skills !== undefined) updateData.skills = skills
    if (experience_years !== undefined) updateData.experience_years = experience_years
    if (hourly_rate !== undefined) updateData.hourly_rate = hourly_rate

    const { data: profile, error } = await supabase
      .from('user_profiles')
      .update(updateData)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating profile:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error('Error in PUT /api/profile:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
