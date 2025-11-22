import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabase, testSupabaseConnection } from '@/lib/supabase'

// GET /api/events - Get all published events or user's own events
export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/events called')

    const { searchParams } = new URL(request.url)
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true'
    const tutorId = searchParams.get('tutorId')

    console.log('Include unpublished:', includeUnpublished)
    console.log('Tutor ID filter:', tutorId)

    // Test Supabase connection first
    const connectionTest = await testSupabaseConnection()
    if (!connectionTest.success) {
      console.error('Supabase connection failed:', connectionTest.error)
      return NextResponse.json({
        events: [],
        _meta: {
          source: 'fallback',
          message: 'Database connection failed, returning empty results',
          error: connectionTest.error
        }
      })
    }

    let query = supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true })

    // Filter by tutor if specified
    if (tutorId) {
      query = query.eq('tutor_id', tutorId)
    }

    // If not requesting unpublished events, only show published ones
    if (!includeUnpublished) {
      query = query.eq('is_published', true)
    }

    console.log('Executing query...')
    const { data: events, error } = await query

    if (error) {
      console.error('Supabase error details:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('Events fetched successfully:', events?.length || 0)
    return NextResponse.json({ events: events || [] })
  } catch (error) {
    console.error('Error in GET /api/events:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// POST /api/events - Create a new event (tutors only)
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is a tutor
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('user_id', userId)
      .single()

    if (!profile || profile.role !== 'tutor') {
      return NextResponse.json({ 
        error: 'Only tutors can create events' 
      }, { status: 403 })
    }

    const body = await request.json()
    const {
      title,
      description,
      event_date,
      duration_minutes,
      location,
      event_type,
      price,
      max_attendees,
      technologies,
      is_published
    } = body

    // Validate required fields
    if (!title || !description || !event_date || !duration_minutes || !event_type) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 })
    }

    // Validate event_type
    const validEventTypes = ['workshop', 'webinar', 'meetup', 'conference', 'seminar']
    if (!validEventTypes.includes(event_type)) {
      return NextResponse.json({ 
        error: 'Invalid event type' 
      }, { status: 400 })
    }

    const eventData = {
      tutor_id: userId,
      title,
      description,
      event_date,
      duration_minutes,
      location: location || null,
      event_type,
      price: price || 0,
      max_attendees: max_attendees || null,
      current_attendees: 0,
      technologies: technologies || [],
      is_published: is_published || false
    }

    const { data: event, error } = await supabase
      .from('events')
      .insert(eventData)
      .select()
      .single()

    if (error) {
      console.error('Error creating event:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ event }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/events:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
