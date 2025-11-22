import { NextResponse } from 'next/server'
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

async function applyDatabaseSchema() {
  try {
    console.log('Applying database schema...')

    // Create user_profiles table
    await supabaseAdmin.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS user_profiles (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) NOT NULL,
          first_name VARCHAR(100),
          last_name VARCHAR(100),
          role VARCHAR(20) CHECK (role IN ('student', 'tutor', 'admin')) NOT NULL DEFAULT 'student',
          bio TEXT,
          profile_image_url TEXT,
          website_url TEXT,
          linkedin_url TEXT,
          github_url TEXT,
          skills TEXT[] DEFAULT '{}',
          experience_years INTEGER DEFAULT 0,
          hourly_rate DECIMAL(10,2),
          is_verified BOOLEAN DEFAULT false,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    // Add tutor_id to courses table if it doesn't exist
    await supabaseAdmin.rpc('exec_sql', {
      sql: `
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='tutor_id') THEN
            ALTER TABLE courses ADD COLUMN tutor_id VARCHAR(255);
            UPDATE courses SET tutor_id = 'system' WHERE tutor_id IS NULL;
            ALTER TABLE courses ALTER COLUMN tutor_id SET NOT NULL;
          END IF;
        END $$;
      `
    })

    console.log('Database schema applied successfully')
  } catch (error) {
    console.error('Error applying schema:', error)
    // Don't throw error, continue with setup
  }
}

export async function GET() {
  try {
    console.log('Running setup diagnostics...')
    
    const results: {
      environment: {
        supabaseUrl: string | undefined;
        hasAnonKey: boolean;
        hasServiceKey: boolean;
      };
      tables: Record<string, string>;
      connection: boolean;
      errors: string[];
    } = {
      environment: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
      tables: {},
      connection: false,
      errors: []
    }

    // Test basic connection
    try {
      const { error } = await supabase
        .from('courses')
        .select('count(*)')
        .limit(1)

      if (error) {
        results.errors.push(`Courses table error: ${error.message}`)
      } else {
        results.connection = true
        results.tables.courses = 'exists'
      }
    } catch (err) {
      results.errors.push(`Connection error: ${err instanceof Error ? err.message : 'Unknown'}`)
    }

    // Test other tables
    const tables = ['enrollments', 'payments', 'course_modules', 'user_progress']
    
    for (const table of tables) {
      try {
        const { error } = await supabase
          .from(table)
          .select('count(*)')
          .limit(1)

        if (error) {
          results.tables[table] = `error: ${error.message}`
        } else {
          results.tables[table] = 'exists'
        }
      } catch (err) {
        results.tables[table] = `error: ${err instanceof Error ? err.message : 'Unknown'}`
      }
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error('Setup diagnostics error:', error)
    return NextResponse.json({
      error: 'Setup diagnostics failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST() {
  try {
    console.log('Setting up database schema and sample data...')

    // First, apply the new schema
    await applyDatabaseSchema()

    console.log('Creating sample courses...')

    // Create multiple sample courses using admin client
    const sampleCourses = [
      {
        title: 'Introduction to Web Development',
        description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript. Perfect for beginners who want to start their journey in web development.',
        duration: '8 weeks',
        level: 'beginner',
        price: 99.99,
        technologies: ['HTML', 'CSS', 'JavaScript'],
        instructor_name: 'John Smith',
        instructor_bio: 'Experienced web developer with 10+ years in the industry.',
        max_students: 50,
        current_students: 25,
        is_published: true
      },
      {
        title: 'Advanced React Development',
        description: 'Master React.js and build complex single-page applications. Learn hooks, context, and advanced patterns.',
        duration: '10 weeks',
        level: 'intermediate',
        price: 149.99,
        technologies: ['React', 'JavaScript', 'Redux', 'TypeScript'],
        instructor_name: 'Sarah Johnson',
        instructor_bio: 'Frontend specialist with expertise in React and modern JavaScript.',
        max_students: 30,
        current_students: 15,
        is_published: true
      },
      {
        title: 'Full Stack Development with MERN',
        description: 'Build complete web applications using MongoDB, Express, React, and Node.js. From database to deployment.',
        duration: '12 weeks',
        level: 'advanced',
        price: 199.99,
        technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
        instructor_name: 'Michael Chen',
        instructor_bio: 'Full stack developer specializing in JavaScript-based technologies.',
        max_students: 25,
        current_students: 20,
        is_published: true
      }
    ]

    const { data: courses, error } = await supabaseAdmin
      .from('courses')
      .insert(sampleCourses)
      .select()

    if (error) {
      console.error('Error creating sample courses:', error)
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `${courses?.length || 0} sample courses created successfully`,
      courses
    })
  } catch (error) {
    console.error('Error in POST /api/setup:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// DELETE /api/setup - Clear all sample data
export async function DELETE() {
  try {
    console.log('Clearing all sample data...')

    // Delete all courses (this will cascade to related data)
    const { error } = await supabaseAdmin
      .from('courses')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all records

    if (error) {
      console.error('Error clearing data:', error)
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'All sample data cleared successfully'
    })
  } catch (error) {
    console.error('Clear data error:', error)
    return NextResponse.json({
      error: 'Clear data failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
