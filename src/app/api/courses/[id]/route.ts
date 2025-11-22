import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabase } from '@/lib/supabase'

// GET /api/courses/[id] - Get a specific course
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { data: course, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 404 }
        )
      }
      console.error('Error fetching course:', error)
      return NextResponse.json(
        { error: 'Failed to fetch course' },
        { status: 500 }
      )
    }

    return NextResponse.json({ course })
  } catch (error) {
    console.error('Error in GET /api/courses/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/courses/[id] - Update a course (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // TODO: Add admin role check here
    
    const { id } = await params
    const body = await request.json()
    const {
      title,
      description,
      duration,
      level,
      price,
      image_url,
      technologies,
      instructor_name,
      instructor_bio,
      max_students,
      is_published
    } = body

    // Validate level if provided
    if (level && !['beginner', 'intermediate', 'advanced'].includes(level)) {
      return NextResponse.json(
        { error: 'Invalid level. Must be beginner, intermediate, or advanced' },
        { status: 400 }
      )
    }

    // Validate price if provided
    if (price !== undefined && (typeof price !== 'number' || price < 0)) {
      return NextResponse.json(
        { error: 'Price must be a non-negative number' },
        { status: 400 }
      )
    }

    // Build update object with only provided fields
    const updateData: Record<string, unknown> = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (duration !== undefined) updateData.duration = duration
    if (level !== undefined) updateData.level = level
    if (price !== undefined) updateData.price = price
    if (image_url !== undefined) updateData.image_url = image_url
    if (technologies !== undefined) updateData.technologies = technologies
    if (instructor_name !== undefined) updateData.instructor_name = instructor_name
    if (instructor_bio !== undefined) updateData.instructor_bio = instructor_bio
    if (max_students !== undefined) updateData.max_students = max_students
    if (is_published !== undefined) updateData.is_published = is_published

    const { data: course, error } = await supabase
      .from('courses')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 404 }
        )
      }
      console.error('Error updating course:', error)
      return NextResponse.json(
        { error: 'Failed to update course' },
        { status: 500 }
      )
    }

    return NextResponse.json({ course })
  } catch (error) {
    console.error('Error in PUT /api/courses/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/courses/[id] - Delete a course (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // TODO: Add admin role check here
    
    const { id } = await params

    // Check if course has enrollments
    const { data: enrollments, error: enrollmentError } = await supabase
      .from('enrollments')
      .select('id')
      .eq('course_id', id)
      .limit(1)

    if (enrollmentError) {
      console.error('Error checking enrollments:', enrollmentError)
      return NextResponse.json(
        { error: 'Failed to check course enrollments' },
        { status: 500 }
      )
    }

    if (enrollments && enrollments.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete course with existing enrollments' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting course:', error)
      return NextResponse.json(
        { error: 'Failed to delete course' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Course deleted successfully' })
  } catch (error) {
    console.error('Error in DELETE /api/courses/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
