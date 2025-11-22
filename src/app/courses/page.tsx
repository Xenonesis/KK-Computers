'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Clock, Users, Star, BookOpen, TrendingUp, GitCompare } from 'lucide-react'
import { Course, Enrollment } from '@/lib/supabase'
import { CoursePurchaseButton } from '@/components/course-purchase-button'
import { CourseFilters } from '@/components/CourseFilters'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { CourseComparison } from '@/components/CourseComparison'
import { trackEvent } from '@/lib/analytics'
import Link from 'next/link'

export default function CoursesPage() {
  const { isLoaded, userId } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  
  // Comparison states
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([])
  const [showComparison, setShowComparison] = useState(false)

  useEffect(() => {
    fetchCourses()
    if (isLoaded && userId) {
      fetchEnrollments()
    }
  }, [isLoaded, userId])

  // Filter and sort courses
  useEffect(() => {
    let result = [...courses]

    // Search filter
    if (searchQuery) {
      result = result.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.technologies?.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Level filter
    if (selectedLevel !== 'all') {
      result = result.filter(course => course.level === selectedLevel)
    }

    // Category filter (based on technologies)
    if (selectedCategory !== 'all') {
      const categoryMap: Record<string, string[]> = {
        web: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular', 'Node.js'],
        mobile: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS', 'Android'],
        data: ['Python', 'R', 'SQL', 'Machine Learning', 'AI', 'Data Science'],
        cloud: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes'],
        security: ['Cybersecurity', 'Ethical Hacking', 'Network Security'],
        marketing: ['SEO', 'Social Media', 'Content Marketing', 'Analytics']
      }
      
      result = result.filter(course =>
        course.technologies?.some(tech =>
          categoryMap[selectedCategory]?.some(cat =>
            tech.toLowerCase().includes(cat.toLowerCase())
          )
        )
      )
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'popular':
        result.sort((a, b) => (b.current_students || 0) - (a.current_students || 0))
        break
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      default:
        // Featured - keep original order
        break
    }

    setFilteredCourses(result)
  }, [courses, searchQuery, selectedLevel, selectedCategory, sortBy])

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

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedLevel('all')
    setSelectedCategory('all')
    setSortBy('featured')
  }

  const toggleCourseComparison = (courseId: string) => {
    setSelectedForComparison(prev => {
      if (prev.includes(courseId)) {
        return prev.filter(id => id !== courseId)
      } else {
        if (prev.length >= 3) {
          alert('You can compare up to 3 courses at a time')
          return prev
        }
        return [...prev, courseId]
      }
    })
  }

  const handleCompare = () => {
    if (selectedForComparison.length < 2) {
      alert('Please select at least 2 courses to compare')
      return
    }
    trackEvent.buttonClicked('compare_courses', 'courses_page')
    setShowComparison(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="lg" text="Loading courses..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              {courses.length}+ Courses Available
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Our <span className="text-blue-600 dark:text-blue-400">Courses</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover comprehensive IT courses designed to advance your career and keep you ahead in the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CourseFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onReset={resetFilters}
          />
        </div>
      </section>

      {/* Results Count & Compare Button */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredCourses.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{courses.length}</span> courses
          </p>
          {selectedForComparison.length > 0 && (
            <Button
              onClick={handleCompare}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <GitCompare className="h-4 w-4 mr-2" />
              Compare ({selectedForComparison.length})
            </Button>
          )}
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <BookOpen className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {searchQuery || selectedLevel !== 'all' || selectedCategory !== 'all' 
                  ? 'No courses match your filters' 
                  : 'No courses available'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchQuery || selectedLevel !== 'all' || selectedCategory !== 'all'
                  ? 'Try adjusting your filters to see more results'
                  : 'Check back later for new courses!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white dark:bg-gray-800 hover:scale-105 relative">
                  {/* Comparison Checkbox */}
                  <div className="absolute top-3 left-3 z-10">
                    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-3 py-2 shadow-lg border border-gray-200 dark:border-gray-700">
                      <Checkbox
                        id={`compare-${course.id}`}
                        checked={selectedForComparison.includes(course.id)}
                        onCheckedChange={() => toggleCourseComparison(course.id)}
                      />
                      <label
                        htmlFor={`compare-${course.id}`}
                        className="text-xs font-medium cursor-pointer"
                      >
                        Compare
                      </label>
                    </div>
                  </div>

                  <Link href={`/courses/${course.id}`} onClick={() => trackEvent.courseView(course.id, course.title)}>
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center relative overflow-hidden">
                      {course.image_url ? (
                        <img
                          src={course.image_url}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <BookOpen className="h-16 w-16 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-500" />
                      )}
                      {isEnrolled(course.id) && (
                        <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Enrolled
                        </div>
                      )}
                    </div>
                  </Link>

                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={
                        course.level === 'beginner' ? 'secondary' :
                        course.level === 'intermediate' ? 'default' :
                        'destructive'
                      } className="text-xs font-semibold">
                        {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                      </Badge>
                      <div className="flex items-center space-x-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-400">4.8</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">
                      <Link href={`/courses/${course.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {course.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {course.technologies && course.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {course.technologies.slice(0, 3).map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                            {tech}
                          </Badge>
                        ))}
                        {course.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{course.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.current_students || 0} students</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {course.price === 0 ? 'Free' : `$${course.price}`}
                          </span>
                          {course.price > 0 && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2 line-through">
                              ${(course.price * 1.5).toFixed(2)}
                            </span>
                          )}
                        </div>
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

      {/* Course Comparison Modal */}
      {showComparison && (
        <CourseComparison
          courses={courses.filter(c => selectedForComparison.includes(c.id))}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  )
}
