import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabase, testSupabaseConnection } from '@/lib/supabase'
import { getMockCourses } from '@/lib/mock-data'

// GET /api/courses - Get all published courses or all courses for admin
export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/courses called')
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('Has Anon Key:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    const { searchParams } = new URL(request.url)
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true'

    console.log('Include unpublished:', includeUnpublished)

    // Test Supabase connection first
    const connectionTest = await testSupabaseConnection()
    if (!connectionTest.success) {
      console.error('Supabase connection failed, using mock data:', connectionTest.error)

      // Use mock data as fallback
      const mockCourses = getMockCourses(includeUnpublished)

      return NextResponse.json({
        courses: mockCourses,
        _meta: {
          source: 'mock',
          message: 'Using mock data due to database connection issues',
          error: connectionTest.error
        }
      })
    }

    let query = supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })

    // If not requesting unpublished courses, only show published ones
    if (!includeUnpublished) {
      query = query.eq('is_published', true)
    }

    console.log('Executing query...')
    const { data: courses, error } = await query

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return NextResponse.json(
        {
          error: 'Failed to fetch courses',
          details: error.message,
          code: error.code
        },
        { status: 500 }
      )
    }

    console.log('Courses fetched successfully:', courses?.length || 0)
    return NextResponse.json({ courses })
  } catch (error) {
    console.error('Error in GET /api/courses:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// POST /api/courses - Create a new course (tutors only)
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is a tutor
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('user_id', userId)
      .single()

    if (!profile || profile.role !== 'tutor') {
      return NextResponse.json({
        error: 'Only tutors can create courses'
      }, { status: 403 })
    }
    
    const body = await request.json()
    const {
      title,
      description,
      duration,
      level,
      price,
      image_url,
      technologies = [],
      max_students,
      is_published = false
    } = body

    // Validate required fields
    if (!title || !description || !duration || !level || price === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate level
    if (!['beginner', 'intermediate', 'advanced'].includes(level)) {
      return NextResponse.json(
        { error: 'Invalid level. Must be beginner, intermediate, or advanced' },
        { status: 400 }
      )
    }

    // Validate price
    if (typeof price !== 'number' || price < 0) {
      return NextResponse.json(
        { error: 'Price must be a non-negative number' },
        { status: 400 }
      )
    }

    const { data: course, error } = await supabase
      .from('courses')
      .insert({
        title,
        description,
        duration,
        level,
        price,
        image_url,
        technologies,
        max_students,
        current_students: 0,
        is_published
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating course:', error)
      return NextResponse.json(
        { error: 'Failed to create course' },
        { status: 500 }
      )
    }

    return NextResponse.json({ course }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/courses:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
