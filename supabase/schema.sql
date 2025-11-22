-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user_profiles table to store additional user information
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id VARCHAR(255) UNIQUE NOT NULL, -- Clerk user ID
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

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tutor_id VARCHAR(255), -- Clerk user ID of the tutor (will be added later if not exists)
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration VARCHAR(100) NOT NULL,
    level VARCHAR(50) CHECK (level IN ('beginner', 'intermediate', 'advanced')) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    technologies TEXT[] DEFAULT '{}',
    instructor_name VARCHAR(255), -- Keep for backward compatibility
    instructor_bio TEXT, -- Keep for backward compatibility
    max_students INTEGER,
    current_students INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    stripe_price_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add tutor_id column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='tutor_id') THEN
        ALTER TABLE courses ADD COLUMN tutor_id VARCHAR(255);
        -- Set default tutor_id for existing courses
        UPDATE courses SET tutor_id = 'system' WHERE tutor_id IS NULL;
    END IF;
END $$;

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tutor_id VARCHAR(255) NOT NULL, -- Clerk user ID of the tutor
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER NOT NULL,
    location VARCHAR(255), -- Can be online link or physical address
    event_type VARCHAR(50) CHECK (event_type IN ('workshop', 'webinar', 'meetup', 'conference', 'seminar')) NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    max_attendees INTEGER,
    current_attendees INTEGER DEFAULT 0,
    technologies TEXT[] DEFAULT '{}',
    is_published BOOLEAN DEFAULT false,
    stripe_price_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (tutor_id) REFERENCES user_profiles(user_id)
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tutor_id VARCHAR(255) NOT NULL, -- Clerk user ID of the tutor
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    difficulty_level VARCHAR(50) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')) NOT NULL,
    estimated_duration VARCHAR(100) NOT NULL, -- e.g., "2-3 weeks", "1 month"
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    technologies TEXT[] DEFAULT '{}',
    requirements TEXT[], -- Prerequisites
    deliverables TEXT[], -- What students will build/learn
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    project_type VARCHAR(50) CHECK (project_type IN ('guided', 'mentored', 'collaborative', 'individual')) NOT NULL,
    is_published BOOLEAN DEFAULT false,
    stripe_price_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (tutor_id) REFERENCES user_profiles(user_id)
);

-- Create enrollments table (now supports courses, events, and projects)
CREATE TABLE IF NOT EXISTS enrollments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL, -- Clerk user ID
    content_type VARCHAR(20) CHECK (content_type IN ('course', 'event', 'project')) NOT NULL,
    content_id UUID NOT NULL, -- References courses.id, events.id, or projects.id
    enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completion_date TIMESTAMP WITH TIME ZONE,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    status VARCHAR(50) CHECK (status IN ('enrolled', 'in_progress', 'completed', 'cancelled')) DEFAULT 'enrolled',
    payment_status VARCHAR(50) CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')) DEFAULT 'pending',
    stripe_payment_intent_id VARCHAR(255),
    amount_paid DECIMAL(10,2),
    UNIQUE(user_id, content_type, content_id)
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
    stripe_payment_intent_id VARCHAR(255) UNIQUE NOT NULL,
    stripe_session_id VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50) CHECK (status IN ('pending', 'succeeded', 'failed', 'cancelled', 'refunded')) NOT NULL,
    payment_method VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course_modules table (for future expansion)
CREATE TABLE IF NOT EXISTS course_modules (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    duration_minutes INTEGER,
    video_url TEXT,
    content TEXT,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_progress table (for tracking module completion)
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL, -- Clerk user ID
    enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
    module_id UUID NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
    completed_at TIMESTAMP WITH TIME ZONE,
    time_spent_minutes INTEGER DEFAULT 0,
    UNIQUE(user_id, module_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(is_published);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments(status);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_payment_intent ON payments(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_enrollment_id ON user_progress(enrollment_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at (with IF NOT EXISTS logic)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_courses_updated_at') THEN
        CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_payments_updated_at') THEN
        CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_course_modules_updated_at') THEN
        CREATE TRIGGER update_course_modules_updated_at BEFORE UPDATE ON course_modules
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

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

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
DROP POLICY IF EXISTS "Users can view all public profiles" ON user_profiles;
CREATE POLICY "Users can view all public profiles" ON user_profiles
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (auth.jwt() ->> 'sub' = user_id);

-- RLS Policies for courses
DROP POLICY IF EXISTS "Public courses are viewable by everyone" ON courses;
CREATE POLICY "Public courses are viewable by everyone" ON courses
    FOR SELECT USING (is_published = true);

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

-- RLS Policies for events
CREATE POLICY "Public events are viewable by everyone" ON events
    FOR SELECT USING (is_published = true);

CREATE POLICY "Tutors can view their own events" ON events
    FOR SELECT USING (auth.jwt() ->> 'sub' = tutor_id);

CREATE POLICY "Tutors can create events" ON events
    FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = tutor_id);

CREATE POLICY "Tutors can update their own events" ON events
    FOR UPDATE USING (auth.jwt() ->> 'sub' = tutor_id);

CREATE POLICY "Tutors can delete their own events" ON events
    FOR DELETE USING (auth.jwt() ->> 'sub' = tutor_id);

-- RLS Policies for projects
CREATE POLICY "Public projects are viewable by everyone" ON projects
    FOR SELECT USING (is_published = true);

CREATE POLICY "Tutors can view their own projects" ON projects
    FOR SELECT USING (auth.jwt() ->> 'sub' = tutor_id);

CREATE POLICY "Tutors can create projects" ON projects
    FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = tutor_id);

CREATE POLICY "Tutors can update their own projects" ON projects
    FOR UPDATE USING (auth.jwt() ->> 'sub' = tutor_id);

CREATE POLICY "Tutors can delete their own projects" ON projects
    FOR DELETE USING (auth.jwt() ->> 'sub' = tutor_id);

-- RLS Policies for enrollments (users can only see their own enrollments)
CREATE POLICY "Users can view their own enrollments" ON enrollments
    FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can insert their own enrollments" ON enrollments
    FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can update their own enrollments" ON enrollments
    FOR UPDATE USING (auth.jwt() ->> 'sub' = user_id);

-- Tutors can view enrollments for their content
CREATE POLICY "Tutors can view enrollments for their courses" ON enrollments
    FOR SELECT USING (
        content_type = 'course' AND
        EXISTS (
            SELECT 1 FROM courses
            WHERE courses.id = enrollments.content_id
            AND courses.tutor_id = auth.jwt() ->> 'sub'
        )
    );

CREATE POLICY "Tutors can view enrollments for their events" ON enrollments
    FOR SELECT USING (
        content_type = 'event' AND
        EXISTS (
            SELECT 1 FROM events
            WHERE events.id = enrollments.content_id
            AND events.tutor_id = auth.jwt() ->> 'sub'
        )
    );

CREATE POLICY "Tutors can view enrollments for their projects" ON enrollments
    FOR SELECT USING (
        content_type = 'project' AND
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = enrollments.content_id
            AND projects.tutor_id = auth.jwt() ->> 'sub'
        )
    );

-- RLS Policies for payments (users can only see their own payments)
CREATE POLICY "Users can view their own payments" ON payments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM enrollments 
            WHERE enrollments.id = payments.enrollment_id 
            AND enrollments.user_id = auth.jwt() ->> 'sub'
        )
    );

-- RLS Policies for course_modules (public read for published modules of published courses)
CREATE POLICY "Published modules of published courses are viewable" ON course_modules
    FOR SELECT USING (
        is_published = true AND 
        EXISTS (
            SELECT 1 FROM courses 
            WHERE courses.id = course_modules.course_id 
            AND courses.is_published = true
        )
    );

-- RLS Policies for user_progress (users can only see their own progress)
CREATE POLICY "Users can view their own progress" ON user_progress
    FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can insert their own progress" ON user_progress
    FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can update their own progress" ON user_progress
    FOR UPDATE USING (auth.jwt() ->> 'sub' = user_id);
