import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabase, testSupabaseConnection } from '@/lib/supabase'

// GET /api/projects - Get all published projects or user's own projects
export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/projects called')

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
        projects: [],
        _meta: {
          source: 'fallback',
          message: 'Database connection failed, returning empty results',
          error: connectionTest.error
        }
      })
    }

    let query = supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    // Filter by tutor if specified
    if (tutorId) {
      query = query.eq('tutor_id', tutorId)
    }

    // If not requesting unpublished projects, only show published ones
    if (!includeUnpublished) {
      query = query.eq('is_published', true)
    }

    console.log('Executing query...')
    const { data: projects, error } = await query

    if (error) {
      console.error('Supabase error details:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('Projects fetched successfully:', projects?.length || 0)
    return NextResponse.json({ projects: projects || [] })
  } catch (error) {
    console.error('Error in GET /api/projects:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// POST /api/projects - Create a new project (tutors only)
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
        error: 'Only tutors can create projects' 
      }, { status: 403 })
    }

    const body = await request.json()
    const {
      title,
      description,
      difficulty_level,
      estimated_duration,
      price,
      technologies,
      requirements,
      deliverables,
      max_participants,
      project_type,
      is_published
    } = body

    // Validate required fields
    if (!title || !description || !difficulty_level || !estimated_duration || !project_type) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 })
    }

    // Validate difficulty_level
    const validDifficultyLevels = ['beginner', 'intermediate', 'advanced']
    if (!validDifficultyLevels.includes(difficulty_level)) {
      return NextResponse.json({ 
        error: 'Invalid difficulty level' 
      }, { status: 400 })
    }

    // Validate project_type
    const validProjectTypes = ['guided', 'mentored', 'collaborative', 'individual']
    if (!validProjectTypes.includes(project_type)) {
      return NextResponse.json({ 
        error: 'Invalid project type' 
      }, { status: 400 })
    }

    const projectData = {
      tutor_id: userId,
      title,
      description,
      difficulty_level,
      estimated_duration,
      price: price || 0,
      technologies: technologies || [],
      requirements: requirements || [],
      deliverables: deliverables || [],
      max_participants: max_participants || null,
      current_participants: 0,
      project_type,
      is_published: is_published || false
    }

    const { data: project, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single()

    if (error) {
      console.error('Error creating project:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/projects:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
