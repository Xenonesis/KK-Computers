import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabase, testSupabaseConnection } from '@/lib/supabase'
import { getMockEnrollmentsForUser } from '@/lib/mock-data'

// GET /api/enrollments - Get user's enrollments
export async function GET() {
  try {
    console.log('GET /api/enrollments called')

    // Try to get user ID from Clerk auth
    let userId: string | null = null
    try {
      const authResult = await auth()
      userId = authResult.userId
      console.log('User ID:', userId)
    } catch (authError) {
      console.error('Clerk auth error:', authError)
      // For development, we'll use a mock user ID
      if (process.env.NODE_ENV === 'development') {
        userId = 'user_123' // Mock user ID for development
        console.log('Using mock user ID for development:', userId)
      } else {
        return NextResponse.json(
          {
            error: 'Authentication service unavailable',
            details: authError instanceof Error ? authError.message : 'Unknown auth error'
          },
          { status: 503 }
        )
      }
    }

    if (!userId) {
      console.log('No user ID found, returning unauthorized')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Test Supabase connection
    const connectionTest = await testSupabaseConnection()
    if (!connectionTest.success) {
      console.error('Supabase connection failed, using mock data:', connectionTest.error)

      // Use mock data as fallback
      const mockEnrollments = getMockEnrollmentsForUser(userId)

      return NextResponse.json({
        enrollments: mockEnrollments,
        _meta: {
          source: 'mock',
          message: 'Using mock data due to database connection issues',
          error: connectionTest.error
        }
      })
    }

    console.log('Fetching enrollments for user:', userId)
    const { data: enrollments, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        course:courses(*)
      `)
      .eq('user_id', userId)
      .order('enrollment_date', { ascending: false })

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return NextResponse.json(
        {
          error: 'Failed to fetch enrollments',
          details: error.message,
          code: error.code
        },
        { status: 500 }
      )
    }

    console.log('Enrollments fetched successfully:', enrollments?.length || 0)
    return NextResponse.json({ enrollments })
  } catch (error) {
    console.error('Error in GET /api/enrollments:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// POST /api/enrollments - Create a new enrollment
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { course_id } = body

    if (!course_id) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }

    // Check if course exists and is published
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('*')
      .eq('id', course_id)
      .eq('is_published', true)
      .single()

    if (courseError || !course) {
      return NextResponse.json(
        { error: 'Course not found or not available' },
        { status: 404 }
      )
    }

    // Check if user is already enrolled
    const { data: existingEnrollment, error: enrollmentCheckError } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', course_id)
      .single()

    if (enrollmentCheckError && enrollmentCheckError.code !== 'PGRST116') {
      console.error('Error checking existing enrollment:', enrollmentCheckError)
      return NextResponse.json(
        { error: 'Failed to check enrollment status' },
        { status: 500 }
      )
    }

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'Already enrolled in this course' },
        { status: 400 }
      )
    }

    // Check if course has available spots
    if (course.max_students && course.current_students >= course.max_students) {
      return NextResponse.json(
        { error: 'Course is full' },
        { status: 400 }
      )
    }

    // Create enrollment
    const { data: enrollment, error } = await supabase
      .from('enrollments')
      .insert({
        user_id: userId,
        course_id: course_id,
        status: 'enrolled',
        payment_status: 'pending'
      })
      .select(`
        *,
        course:courses(*)
      `)
      .single()

    if (error) {
      console.error('Error creating enrollment:', error)
      return NextResponse.json(
        { error: 'Failed to create enrollment' },
        { status: 500 }
      )
    }

    // Update course student count
    await supabase
      .from('courses')
      .update({ current_students: course.current_students + 1 })
      .eq('id', course_id)

    return NextResponse.json({ enrollment }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/enrollments:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
