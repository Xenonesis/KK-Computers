"use client"

import { useState } from 'react'
import { Course } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, CheckCircle, XCircle, Clock, Users, Award, DollarSign } from 'lucide-react'
import Link from 'next/link'

interface CourseComparisonProps {
  courses: Course[]
  onClose: () => void
}

export function CourseComparison({ courses, onClose }: CourseComparisonProps) {
  if (courses.length === 0) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-auto">
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Compare Courses</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left p-4 font-semibold sticky left-0 bg-white dark:bg-gray-800 z-10">
                        Feature
                      </th>
                      {courses.map((course) => (
                        <th key={course.id} className="text-left p-4 min-w-[250px]">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
                            <Badge variant={
                              course.level === 'beginner' ? 'secondary' :
                              course.level === 'intermediate' ? 'default' :
                              'destructive'
                            }>
                              {course.level}
                            </Badge>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {/* Price */}
                    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-4 font-medium sticky left-0 bg-white dark:bg-gray-800">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gray-500" />
                          Price
                        </div>
                      </td>
                      {courses.map((course) => (
                        <td key={course.id} className="p-4">
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {course.price === 0 ? 'Free' : `$${course.price}`}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Duration */}
                    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-4 font-medium sticky left-0 bg-white dark:bg-gray-800">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          Duration
                        </div>
                      </td>
                      {courses.map((course) => (
                        <td key={course.id} className="p-4">{course.duration}</td>
                      ))}
                    </tr>

                    {/* Students */}
                    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-4 font-medium sticky left-0 bg-white dark:bg-gray-800">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          Students Enrolled
                        </div>
                      </td>
                      {courses.map((course) => (
                        <td key={course.id} className="p-4">{course.current_students || 0} students</td>
                      ))}
                    </tr>

                    {/* Max Students */}
                    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-4 font-medium sticky left-0 bg-white dark:bg-gray-800">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          Max Capacity
                        </div>
                      </td>
                      {courses.map((course) => (
                        <td key={course.id} className="p-4">{course.max_students || 'Unlimited'}</td>
                      ))}
                    </tr>

                    {/* Technologies */}
                    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-4 font-medium sticky left-0 bg-white dark:bg-gray-800">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-gray-500" />
                          Technologies
                        </div>
                      </td>
                      {courses.map((course) => (
                        <td key={course.id} className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {course.technologies?.map((tech, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Certificate */}
                    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-4 font-medium sticky left-0 bg-white dark:bg-gray-800">
                        Certificate Included
                      </td>
                      {courses.map((course) => (
                        <td key={course.id} className="p-4">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </td>
                      ))}
                    </tr>

                    {/* Lifetime Access */}
                    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-4 font-medium sticky left-0 bg-white dark:bg-gray-800">
                        Lifetime Access
                      </td>
                      {courses.map((course) => (
                        <td key={course.id} className="p-4">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </td>
                      ))}
                    </tr>

                    {/* Job Assistance */}
                    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-4 font-medium sticky left-0 bg-white dark:bg-gray-800">
                        Job Assistance
                      </td>
                      {courses.map((course) => (
                        <td key={course.id} className="p-4">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </td>
                      ))}
                    </tr>

                    {/* Actions */}
                    <tr>
                      <td className="p-4 font-medium sticky left-0 bg-white dark:bg-gray-800">
                        Actions
                      </td>
                      {courses.map((course) => (
                        <td key={course.id} className="p-4">
                          <Link href={`/courses/${course.id}`}>
                            <Button className="w-full">
                              View Details
                            </Button>
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
