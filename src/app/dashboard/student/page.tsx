'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Calendar, FolderOpen, Trophy, Clock, Star } from 'lucide-react'
import { Enrollment, UserProfile } from '@/lib/supabase'

export default function StudentDashboard() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLoaded && user) {
      loadDashboardData()
    }
  }, [isLoaded, user])

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      
      // Load profile
      const profileResponse = await fetch('/api/profile')
      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        if (profileData.profile?.role !== 'student') {
          router.push('/setup-profile')
          return
        }
        setProfile(profileData.profile)
      }

      // Load enrollments
      const enrollmentsResponse = await fetch('/api/enrollments')
      if (enrollmentsResponse.ok) {
        const enrollmentsData = await enrollmentsResponse.json()
        setEnrollments(enrollmentsData.enrollments || [])
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    router.push('/sign-in')
    return null
  }

  const courseEnrollments = enrollments.filter(e => e.content_type === 'course')
  const eventEnrollments = enrollments.filter(e => e.content_type === 'event')
  const projectEnrollments = enrollments.filter(e => e.content_type === 'project')
  
  const completedCourses = courseEnrollments.filter(e => e.status === 'completed').length
  const inProgressCourses = courseEnrollments.filter(e => e.status === 'in_progress').length
  const averageProgress = courseEnrollments.length > 0 
    ? courseEnrollments.reduce((sum, e) => sum + e.progress, 0) / courseEnrollments.length 
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {profile?.first_name || user.firstName}!
          </h1>
          <p className="text-gray-600 mt-2">
            Continue your learning journey and track your progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courseEnrollments.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCourses}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressCourses}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(averageProgress)}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/courses')}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                Browse Courses
              </CardTitle>
              <CardDescription>
                Discover new courses to expand your skills
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/events')}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-500" />
                Upcoming Events
              </CardTitle>
              <CardDescription>
                Join live workshops and webinars
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/projects')}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FolderOpen className="h-5 w-5 mr-2 text-purple-500" />
                Explore Projects
              </CardTitle>
              <CardDescription>
                Work on hands-on projects with guidance
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="courses">My Courses ({courseEnrollments.length})</TabsTrigger>
            <TabsTrigger value="events">My Events ({eventEnrollments.length})</TabsTrigger>
            <TabsTrigger value="projects">My Projects ({projectEnrollments.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Courses</h2>
              <Button onClick={() => router.push('/courses')}>
                Browse More Courses
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseEnrollments.map((enrollment) => (
                <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        {enrollment.course?.title || 'Course Title'}
                      </CardTitle>
                      <Badge variant={
                        enrollment.status === 'completed' ? 'default' :
                        enrollment.status === 'in_progress' ? 'secondary' :
                        'outline'
                      }>
                        {enrollment.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {enrollment.course?.description || 'Course description'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{enrollment.progress}%</span>
                        </div>
                        <Progress value={enrollment.progress} className="h-2" />
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Enrolled:</span>
                          <span>{new Date(enrollment.enrollment_date).toLocaleDateString()}</span>
                        </div>
                        {enrollment.completion_date && (
                          <div className="flex justify-between">
                            <span>Completed:</span>
                            <span>{new Date(enrollment.completion_date).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      
                      <Button className="w-full" size="sm">
                        {enrollment.status === 'completed' ? 'Review Course' : 'Continue Learning'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {courseEnrollments.length === 0 && (
                <Card className="col-span-full">
                  <CardContent className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
                    <p className="text-gray-500 mb-4">Start your learning journey by enrolling in a course</p>
                    <Button onClick={() => router.push('/courses')}>
                      Browse Courses
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Events</h2>
              <Button onClick={() => router.push('/events')}>
                Browse Events
              </Button>
            </div>
            
            <div className="space-y-4">
              {eventEnrollments.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
                    <p className="text-gray-500 mb-4">Join live events to learn with others</p>
                    <Button onClick={() => router.push('/events')}>
                      Browse Events
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Events list will be implemented here
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Projects</h2>
              <Button onClick={() => router.push('/projects')}>
                Browse Projects
              </Button>
            </div>
            
            <div className="space-y-4">
              {projectEnrollments.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                    <p className="text-gray-500 mb-4">Work on hands-on projects to build your portfolio</p>
                    <Button onClick={() => router.push('/projects')}>
                      Browse Projects
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Projects list will be implemented here
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
