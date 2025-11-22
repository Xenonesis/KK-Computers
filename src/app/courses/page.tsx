'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, Star, BookOpen } from 'lucide-react'
import { Course, Enrollment } from '@/lib/supabase'
import { CoursePurchaseButton } from '@/components/course-purchase-button'
import Link from 'next/link'

export default function CoursesPage() {
  const { isLoaded, userId } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCourses()
    if (isLoaded && userId) {
      fetchEnrollments()
    }
  }, [isLoaded, userId])

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch courses')
      }

      setCourses(data.courses)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const fetchEnrollments = async () => {
    try {
      const response = await fetch('/api/enrollments')
      const data = await response.json()

      if (response.ok) {
        setEnrollments(data.enrollments)
      }
    } catch (err) {
      console.error('Error fetching enrollments:', err)
    }
  }

  const isEnrolled = (courseId: string) => {
    return enrollments.some(enrollment =>
      enrollment.content_id === courseId &&
      enrollment.content_type === 'course' &&
      ['enrolled', 'in_progress', 'completed'].includes(enrollment.status)
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading courses...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Courses
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive range of IT courses designed to advance your career
              and keep you ahead in the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        </section>
      )}

      {/* Courses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available</h3>
              <p className="text-gray-500">Check back later for new courses!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                    {course.image_url ? (
                      <img
                        src={course.image_url}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BookOpen className="h-16 w-16 text-blue-600" />
                    )}
                  </div>

                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={
                        course.level === 'beginner' ? 'secondary' :
                        course.level === 'intermediate' ? 'default' :
                        'destructive'
                      }>
                        {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">
                      <Link href={`/courses/${course.id}`} className="hover:text-blue-600">
                        {course.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {course.technologies && course.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {course.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.current_students} students</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">
                          {course.price === 0 ? 'Free' : `$${course.price}`}
                        </span>
                      </div>

                      <CoursePurchaseButton
                        course={course}
                        isEnrolled={isEnrolled(course.id)}
                        onEnrollmentChange={fetchEnrollments}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
