'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { Course } from '@/lib/supabase'

interface SuccessPageProps {
  params: Promise<{ id: string }>
}

export default function CourseSuccessPage({ params }: SuccessPageProps) {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [courseId, setCourseId] = useState<string | null>(null)

  useEffect(() => {
    params.then(p => setCourseId(p.id))
  }, [params])

  useEffect(() => {
    if (courseId) {
      fetchCourse()
    }
  }, [courseId])

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>
              You have successfully enrolled in the course
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
              <p className="text-muted-foreground mb-4">{course.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Duration:</span>
                  <span className="ml-2">{course.duration}</span>
                </div>
                <div>
                  <span className="font-medium">Level:</span>
                  <span className="ml-2 capitalize">{course.level}</span>
                </div>
                <div>
                  <span className="font-medium">Price Paid:</span>
                  <span className="ml-2">${course.price}</span>
                </div>
                {sessionId && (
                  <div>
                    <span className="font-medium">Session ID:</span>
                    <span className="ml-2 text-xs font-mono">{sessionId.slice(-8)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">What&apos;s Next?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Check your email for course access details</li>
                <li>• Visit your dashboard to track your progress</li>
                <li>• Join our community for support and discussions</li>
                <li>• Start learning at your own pace</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" className="flex-1">
                <Button className="w-full">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </Button>
              </Link>
              <Link href="/courses" className="flex-1">
                <Button variant="outline" className="w-full">
                  Browse More Courses
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>
                Need help? Contact our support team at{' '}
                <a href="mailto:support@kkcomputers.com" className="text-blue-600 hover:underline">
                  support@kkcomputers.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
