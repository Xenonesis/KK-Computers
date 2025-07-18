import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Calendar, Award, TrendingUp, Clock } from 'lucide-react'

interface Course {
  id: number
  title: string
  progress: number
  nextLesson?: string
  dueDate?: string
  completed?: boolean
  completedDate?: string
}

interface Event {
  id: number
  title: string
  date: string
  time: string
  type: string
}

interface Achievement {
  id: number
  title: string
  date: string
  type: string
}

export default async function DashboardPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Mock data - will be replaced with actual user data from Supabase
  const userStats = {
    coursesEnrolled: 3,
    coursesCompleted: 1,
    certificatesEarned: 1,
    totalStudyHours: 45,
    upcomingEvents: 2,
    currentStreak: 7
  }

  const enrolledCourses: Course[] = [
    {
      id: 1,
      title: "Full Stack Web Development",
      progress: 65,
      nextLesson: "React State Management",
      dueDate: "2024-02-20"
    },
    {
      id: 2,
      title: "Python Programming Fundamentals",
      progress: 100,
      completed: true,
      completedDate: "2024-01-15"
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      progress: 30,
      nextLesson: "SEO Optimization",
      dueDate: "2024-03-01"
    }
  ]

  const upcomingEvents: Event[] = [
    {
      id: 1,
      title: "Web Development Workshop",
      date: "2024-02-15",
      time: "10:00 AM",
      type: "workshop"
    },
    {
      id: 2,
      title: "AI & Machine Learning Seminar",
      date: "2024-02-20",
      time: "2:00 PM",
      type: "seminar"
    }
  ]

  const recentAchievements: Achievement[] = [
    {
      id: 1,
      title: "Python Fundamentals Certificate",
      date: "2024-01-15",
      type: "certificate"
    },
    {
      id: 2,
      title: "7-Day Learning Streak",
      date: "2024-01-10",
      type: "streak"
    }
  ]

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
              <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.totalStudyHours}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.certificatesEarned}</div>
              <p className="text-xs text-muted-foreground">
                Earned this year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.currentStreak}</div>
              <p className="text-xs text-muted-foreground">
                Days in a row
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enrolled Courses */}
          <Card>
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>
                Your current learning progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{course.title}</h3>
                      {course.completed ? (
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      ) : (
                        <Badge variant="outline">{course.progress}%</Badge>
                      )}
                    </div>
                    
                    {!course.completed && (
                      <>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          Next: {course.nextLesson}
                        </p>
                        {course.dueDate && (
                          <p className="text-xs text-gray-500">
                            Due: {new Date(course.dueDate).toLocaleDateString()}
                          </p>
                        )}
                      </>
                    )}
                    
                    {course.completed && course.completedDate && (
                      <p className="text-sm text-green-600">
                        Completed on {new Date(course.completedDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                Events you&apos;re registered for
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{event.title}</h3>
                      <Badge variant="outline">
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </div>
                  </div>
                ))}
                
                {upcomingEvents.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    No upcoming events. Check out our events page to register for workshops and seminars.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Achievements */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>
              Your latest accomplishments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <div>
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
