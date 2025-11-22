"use client"

import { useEffect, useState } from 'react'
import { Users, BookOpen, Award, TrendingUp } from 'lucide-react'

export function LiveStats() {
  const [stats, setStats] = useState({
    activeUsers: 127,
    coursesCompleted: 3458,
    certifications: 2891,
    avgSalaryIncrease: 42
  })

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3),
        coursesCompleted: prev.coursesCompleted + Math.floor(Math.random() * 2),
        certifications: prev.certifications + Math.floor(Math.random() * 2),
        avgSalaryIncrease: 42 // Keep this constant
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl p-5 sm:p-6 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 sm:p-2.5 bg-blue-600 dark:bg-blue-500 rounded-lg">
            <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" title="Live" />
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
          {stats.activeUsers}
        </div>
        <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Active Learners Now</div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-xl p-5 sm:p-6 border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 sm:p-2.5 bg-purple-600 dark:bg-purple-500 rounded-lg">
            <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" title="Live" />
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
          {stats.coursesCompleted}
        </div>
        <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Courses Completed</div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl p-5 sm:p-6 border border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 sm:p-2.5 bg-green-600 dark:bg-green-500 rounded-lg">
            <Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" title="Live" />
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
          {stats.certifications}
        </div>
        <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Certifications Issued</div>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-xl p-5 sm:p-6 border border-orange-200 dark:border-orange-800 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 sm:p-2.5 bg-orange-600 dark:bg-orange-500 rounded-lg">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
          {stats.avgSalaryIncrease}%
        </div>
        <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Avg. Salary Increase</div>
      </div>
    </div>
  )
}
