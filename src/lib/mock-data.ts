import { Course } from './supabase'

// Mock courses data for development and fallback
export const mockCourses: Course[] = [
  {
    id: '1',
    tutor_id: 'tutor_1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
    duration: '8 weeks',
    level: 'beginner',
    price: 99.99,
    image_url: 'https://placehold.co/600x400?text=Web+Development',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    max_students: 50,
    current_students: 25,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    tutor_id: 'tutor_2',
    title: 'Advanced React Development',
    description: 'Master React.js and build complex single-page applications.',
    duration: '10 weeks',
    level: 'intermediate',
    price: 149.99,
    image_url: 'https://placehold.co/600x400?text=React+Development',
    technologies: ['React', 'JavaScript', 'Redux'],
    max_students: 30,
    current_students: 15,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    tutor_id: 'tutor_3',
    title: 'Full Stack Development with MERN',
    description: 'Build complete web applications using MongoDB, Express, React, and Node.js.',
    duration: '12 weeks',
    level: 'advanced',
    price: 199.99,
    image_url: 'https://placehold.co/600x400?text=MERN+Stack',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
    max_students: 25,
    current_students: 20,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// Mock enrollments data
export const mockEnrollments = [
  {
    id: '1',
    user_id: 'user_123',
    content_type: 'course' as const,
    content_id: '1',
    enrollment_date: new Date().toISOString(),
    completion_date: null,
    progress: 25,
    status: 'in_progress' as const,
    payment_status: 'paid' as const,
    stripe_payment_intent_id: 'pi_123456',
    amount_paid: 99.99,
    course: mockCourses[0],
  },
]

// Function to get mock courses
export function getMockCourses(includeUnpublished = false) {
  if (includeUnpublished) {
    return [...mockCourses, {
      id: '4',
      tutor_id: 'tutor_4',
      title: 'Upcoming Course: Mobile App Development',
      description: 'Learn to build mobile applications for iOS and Android using React Native.',
      duration: '10 weeks',
      level: 'intermediate',
      price: 179.99,
      image_url: 'https://placehold.co/600x400?text=Mobile+Development',
      technologies: ['React Native', 'JavaScript', 'Firebase'],
      max_students: 30,
      current_students: 0,
      is_published: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }]
  }
  return mockCourses
}

// Function to get mock enrollments for a user
export function getMockEnrollmentsForUser(userId: string) {
  return mockEnrollments.filter(enrollment => enrollment.user_id === userId)
}
