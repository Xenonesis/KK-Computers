-- KK Computers Platform Migration Script
-- Run this in Supabase SQL Editor to add role-based features

-- Step 1: Create user_profiles table
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

-- Step 2: Add tutor_id to courses table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='tutor_id') THEN
        ALTER TABLE courses ADD COLUMN tutor_id VARCHAR(255);
        -- Set default tutor_id for existing courses
        UPDATE courses SET tutor_id = 'system' WHERE tutor_id IS NULL;
    END IF;
END $$;

-- Step 3: Create events table
CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tutor_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER NOT NULL,
    location VARCHAR(255),
    event_type VARCHAR(50) CHECK (event_type IN ('workshop', 'webinar', 'meetup', 'conference', 'seminar')) NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    max_attendees INTEGER,
    current_attendees INTEGER DEFAULT 0,
    technologies TEXT[] DEFAULT '{}',
    is_published BOOLEAN DEFAULT false,
    stripe_price_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 4: Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tutor_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    difficulty_level VARCHAR(50) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')) NOT NULL,
    estimated_duration VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    technologies TEXT[] DEFAULT '{}',
    requirements TEXT[],
    deliverables TEXT[],
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    project_type VARCHAR(50) CHECK (project_type IN ('guided', 'mentored', 'collaborative', 'individual')) NOT NULL,
    is_published BOOLEAN DEFAULT false,
    stripe_price_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 5: Update enrollments table to support multiple content types
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='enrollments' AND column_name='content_type') THEN
        ALTER TABLE enrollments ADD COLUMN content_type VARCHAR(20) CHECK (content_type IN ('course', 'event', 'project'));
        ALTER TABLE enrollments ADD COLUMN content_id UUID;
        
        -- Migrate existing data
        UPDATE enrollments SET content_type = 'course', content_id = course_id WHERE content_type IS NULL;
        
        -- Make new columns NOT NULL after migration
        ALTER TABLE enrollments ALTER COLUMN content_type SET NOT NULL;
        ALTER TABLE enrollments ALTER COLUMN content_id SET NOT NULL;
        
        -- Drop old unique constraint and add new one
        ALTER TABLE enrollments DROP CONSTRAINT IF EXISTS enrollments_user_id_course_id_key;
        ALTER TABLE enrollments ADD CONSTRAINT enrollments_user_content_unique UNIQUE(user_id, content_type, content_id);
    END IF;
END $$;

-- Step 6: Enable RLS on new tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Step 7: Create RLS Policies for user_profiles
DROP POLICY IF EXISTS "Users can view all public profiles" ON user_profiles;
CREATE POLICY "Users can view all public profiles" ON user_profiles
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (auth.jwt() ->> 'sub' = user_id);

-- Step 8: Update RLS Policies for courses
DROP POLICY IF EXISTS "Authenticated users can view all courses" ON courses;

DROP POLICY IF EXISTS "Tutors can view their own courses" ON courses;
CREATE POLICY "Tutors can view their own courses" ON courses
    FOR SELECT USING (auth.jwt() ->> 'sub' = tutor_id);

DROP POLICY IF EXISTS "Tutors can create courses" ON courses;
CREATE POLICY "Tutors can create courses" ON courses
    FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = tutor_id);

DROP POLICY IF EXISTS "Tutors can update their own courses" ON courses;
CREATE POLICY "Tutors can update their own courses" ON courses
    FOR UPDATE USING (auth.jwt() ->> 'sub' = tutor_id);

DROP POLICY IF EXISTS "Tutors can delete their own courses" ON courses;
CREATE POLICY "Tutors can delete their own courses" ON courses
    FOR DELETE USING (auth.jwt() ->> 'sub' = tutor_id);

-- Step 9: Create RLS Policies for events
DROP POLICY IF EXISTS "Public events are viewable by everyone" ON events;
CREATE POLICY "Public events are viewable by everyone" ON events
    FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Tutors can view their own events" ON events;
CREATE POLICY "Tutors can view their own events" ON events
    FOR SELECT USING (auth.jwt() ->> 'sub' = tutor_id);

DROP POLICY IF EXISTS "Tutors can create events" ON events;
CREATE POLICY "Tutors can create events" ON events
    FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = tutor_id);

DROP POLICY IF EXISTS "Tutors can update their own events" ON events;
CREATE POLICY "Tutors can update their own events" ON events
    FOR UPDATE USING (auth.jwt() ->> 'sub' = tutor_id);

DROP POLICY IF EXISTS "Tutors can delete their own events" ON events;
CREATE POLICY "Tutors can delete their own events" ON events
    FOR DELETE USING (auth.jwt() ->> 'sub' = tutor_id);

-- Step 10: Create RLS Policies for projects
DROP POLICY IF EXISTS "Public projects are viewable by everyone" ON projects;
CREATE POLICY "Public projects are viewable by everyone" ON projects
    FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Tutors can view their own projects" ON projects;
CREATE POLICY "Tutors can view their own projects" ON projects
    FOR SELECT USING (auth.jwt() ->> 'sub' = tutor_id);

DROP POLICY IF EXISTS "Tutors can create projects" ON projects;
CREATE POLICY "Tutors can create projects" ON projects
    FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = tutor_id);

DROP POLICY IF EXISTS "Tutors can update their own projects" ON projects;
CREATE POLICY "Tutors can update their own projects" ON projects
    FOR UPDATE USING (auth.jwt() ->> 'sub' = tutor_id);

DROP POLICY IF EXISTS "Tutors can delete their own projects" ON projects;
CREATE POLICY "Tutors can delete their own projects" ON projects
    FOR DELETE USING (auth.jwt() ->> 'sub' = tutor_id);

-- Step 11: Update enrollments policies for tutors to view their content enrollments
DROP POLICY IF EXISTS "Tutors can view enrollments for their courses" ON enrollments;
CREATE POLICY "Tutors can view enrollments for their courses" ON enrollments
    FOR SELECT USING (
        content_type = 'course' AND 
        EXISTS (
            SELECT 1 FROM courses 
            WHERE courses.id = enrollments.content_id 
            AND courses.tutor_id = auth.jwt() ->> 'sub'
        )
    );

DROP POLICY IF EXISTS "Tutors can view enrollments for their events" ON enrollments;
CREATE POLICY "Tutors can view enrollments for their events" ON enrollments
    FOR SELECT USING (
        content_type = 'event' AND 
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = enrollments.content_id 
            AND events.tutor_id = auth.jwt() ->> 'sub'
        )
    );

DROP POLICY IF EXISTS "Tutors can view enrollments for their projects" ON enrollments;
CREATE POLICY "Tutors can view enrollments for their projects" ON enrollments
    FOR SELECT USING (
        content_type = 'project' AND 
        EXISTS (
            SELECT 1 FROM projects 
            WHERE projects.id = enrollments.content_id 
            AND projects.tutor_id = auth.jwt() ->> 'sub'
        )
    );

-- Step 12: Add updated_at triggers for new tables
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_user_profiles_updated_at') THEN
        CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_events_updated_at') THEN
        CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_projects_updated_at') THEN
        CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Migration completed successfully!
SELECT 'Migration completed successfully! You can now use the role-based features.' as status;
