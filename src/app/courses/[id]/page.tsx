'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Users, Star, BookOpen, ArrowLeft, CheckCircle } from 'lucide-react'
import { Course, Enrollment } from '@/lib/supabase'
import { CoursePurchaseButton } from '@/components/course-purchase-button'
import Link from 'next/link'

interface CoursePageProps {
  params: Promise<{ id: string }>
}

export default function CoursePage({ params }: CoursePageProps) {
  const { isLoaded, userId } = useAuth()
  const [course, setCourse] = useState<Course | null>(null)
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [courseId, setCourseId] = useState<string | null>(null)

  useEffect(() => {
    params.then(p => setCourseId(p.id))
  }, [params])

  useEffect(() => {
    if (courseId) {
      fetchCourse()
      if (isLoaded && userId) {
        fetchEnrollment()
      }
    }
  }, [courseId, isLoaded, userId])

  const fetchCourse = async () => {
    if (!courseId) return
    try {
      const response = await fetch(`/api/courses/${courseId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch course')
      }

      setCourse(data.course)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const fetchEnrollment = async () => {
    if (!courseId) return
    try {
      const response = await fetch('/api/enrollments')
      const data = await response.json()

      if (response.ok) {
        const userEnrollment = data.enrollments.find(
          (enrollment: Enrollment) => enrollment.content_id === courseId && enrollment.content_type === 'course'
        )
        setEnrollment(userEnrollment || null)
      }
    } catch (err) {
      console.error('Error fetching enrollment:', err)
    }
  }

  const isEnrolled = enrollment && ['enrolled', 'in_progress', 'completed'].includes(enrollment.status)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading course...</div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <p className="text-red-600 mb-4">{error || 'Course not found'}</p>
            <Link href="/courses">
              <Button>Back to Courses</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/courses">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
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
                    <span className="text-sm text-muted-foreground">(124 reviews)</span>
                  </div>
                </div>
                <CardTitle className="text-3xl">{course.title}</CardTitle>
                <CardDescription className="text-lg">
                  {course.description}
                </CardDescription>
              </CardHeader>
              
              {course.image_url && (
                <div className="px-6 pb-6">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={course.image_url} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </Card>

            {/* Course Details */}
            <Card>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="font-medium">{course.duration}</div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="font-medium">{course.current_students}</div>
                    <div className="text-sm text-muted-foreground">Students</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <BookOpen className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="font-medium">{course.level}</div>
                    <div className="text-sm text-muted-foreground">Level</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="font-medium">Certificate</div>
                    <div className="text-sm text-muted-foreground">Included</div>
                  </div>
                </div>

                {course.technologies && course.technologies.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Technologies You&apos;ll Learn</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {course.tutor && (
                  <div>
                    <h4 className="font-medium mb-2">Instructor</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-medium">{course.tutor.first_name} {course.tutor.last_name}</div>
                      {course.tutor.bio && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {course.tutor.bio}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle>What You&apos;ll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Master the fundamentals and advanced concepts',
                    'Build real-world projects from scratch',
                    'Learn industry best practices and standards',
                    'Get hands-on experience with modern tools',
                    'Understand deployment and production workflows',
                    'Receive personalized feedback and support'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card>
              <CardHeader>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {course.price === 0 ? 'Free' : `$${course.price}`}
                  </div>
                  {course.max_students && (
                    <p className="text-sm text-muted-foreground">
                      {course.current_students} / {course.max_students} students enrolled
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <CoursePurchaseButton 
                  course={course}
                  isEnrolled={!!isEnrolled}
                  onEnrollmentChange={fetchEnrollment}
                />
                
                {isEnrolled && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        You&apos;re enrolled in this course!
                      </span>
                    </div>
                    {enrollment && (
                      <div className="mt-2 text-sm text-green-700">
                        Progress: {enrollment.progress}%
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Course Features */}
            <Card>
              <CardHeader>
                <CardTitle>This Course Includes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  'Lifetime access to course materials',
                  'Downloadable resources and code',
                  'Certificate of completion',
                  'Direct instructor support',
                  'Mobile and desktop access',
                  '30-day money-back guarantee'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
