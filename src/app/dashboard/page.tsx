'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Calendar, Award, TrendingUp, Clock, ExternalLink } from 'lucide-react'
import { Enrollment } from '@/lib/supabase'
import Link from 'next/link'

export default function DashboardPage() {
  const { isLoaded, userId } = useAuth()
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isLoaded && userId) {
      fetchEnrollments()
    } else if (isLoaded && !userId) {
      // Redirect to sign in if not authenticated
      window.location.href = '/sign-in'
    }
  }, [isLoaded, userId])

  const fetchEnrollments = async () => {
    try {
      const response = await fetch('/api/enrollments')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch enrollments')
      }

      setEnrollments(data.enrollments)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading dashboard...</div>
      </div>
    )
  }

  if (!userId) {
    return null // Will redirect via useEffect
  }

  // Calculate user stats from enrollments
  const userStats = {
    coursesEnrolled: enrollments.length,
    coursesCompleted: enrollments.filter(e => e.status === 'completed').length,
    coursesInProgress: enrollments.filter(e => e.status === 'in_progress').length,
    averageProgress: enrollments.length > 0
      ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
      : 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back!
          </h1>
          <p className="text-lg text-gray-600">
            Here&apos;s your learning progress and upcoming activities.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.coursesEnrolled}</div>
              <p className="text-xs text-muted-foreground">
                {userStats.coursesCompleted} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.coursesInProgress}</div>
              <p className="text-xs text-muted-foreground">
                Active courses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.averageProgress}%</div>
              <p className="text-xs text-muted-foreground">
                Across all courses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.coursesCompleted}</div>
              <p className="text-xs text-muted-foreground">
                Courses finished
              </p>
            </CardContent>
          </Card>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enrolled Courses */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>My Courses</CardTitle>
                  <CardDescription>
                    Your current learning progress
                  </CardDescription>
                </div>
                <Link href="/courses">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Browse Courses
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrollments.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
                    <p className="text-gray-500 mb-4">Start your learning journey by enrolling in a course</p>
                    <Link href="/courses">
                      <Button>Browse Courses</Button>
                    </Link>
                  </div>
                ) : (
                  enrollments.map((enrollment) => (
                    <div key={enrollment.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">
                          <Link
                            href={`/courses/${enrollment.content_id}`}
                            className="hover:text-blue-600"
                          >
                            {enrollment.course?.title || 'Course'}
                          </Link>
                        </h3>
                        <Badge variant={
                          enrollment.status === 'completed' ? 'default' :
                          enrollment.status === 'in_progress' ? 'secondary' :
                          'outline'
                        }>
                          {enrollment.status === 'completed' ? 'Completed' :
                           enrollment.status === 'in_progress' ? 'In Progress' :
                           'Enrolled'}
                        </Badge>
                      </div>

                      {enrollment.status !== 'completed' && (
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${enrollment.progress}%` }}
                          ></div>
                        </div>
                      )}

                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Progress: {enrollment.progress}%</span>
                        <span>
                          Enrolled: {new Date(enrollment.enrollment_date).toLocaleDateString()}
                        </span>
                      </div>

                      {enrollment.completion_date && (
                        <p className="text-sm text-green-600 mt-1">
                          Completed on {new Date(enrollment.completion_date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and links
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/courses">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse All Courses
                  </Button>
                </Link>
                <Link href="/events">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Events
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Explore Projects
                  </Button>
                </Link>
                {userStats.coursesEnrolled > 0 && (
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Learning Tips</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Set aside dedicated study time daily</li>
                      <li>• Complete practice exercises</li>
                      <li>• Join our community discussions</li>
                      <li>• Track your progress regularly</li>
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Enrollments */}
        {enrollments.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest course enrollments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {enrollments
                  .sort((a, b) => new Date(b.enrollment_date).getTime() - new Date(a.enrollment_date).getTime())
                  .slice(0, 3)
                  .map((enrollment) => (
                    <div key={enrollment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">{enrollment.course?.title || 'Course'}</h3>
                          <p className="text-sm text-gray-600">
                            Enrolled on {new Date(enrollment.enrollment_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {enrollment.progress}% complete
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
