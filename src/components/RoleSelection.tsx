'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, Users, BookOpen, Calendar, FolderOpen } from 'lucide-react'

interface RoleSelectionProps {
  onRoleSelect: (role: 'student' | 'tutor') => Promise<void>
  isLoading?: boolean
}

export default function RoleSelection({ onRoleSelect, isLoading = false }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<'student' | 'tutor' | null>(null)
  const router = useRouter()

  const handleRoleSelect = async (role: 'student' | 'tutor') => {
    setSelectedRole(role)
    try {
      await onRoleSelect(role)
      // Redirect based on role
      if (role === 'tutor') {
        router.push('/dashboard/tutor')
      } else {
        router.push('/dashboard/student')
      }
    } catch (error) {
      console.error('Error selecting role:', error)
      setSelectedRole(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to KK Computers!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose your role to get started with our learning platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Student Card */}
          <Card className="relative overflow-hidden border-2 hover:border-blue-500 transition-all duration-300 cursor-pointer group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all duration-300" />
            <CardHeader className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Learner
                </Badge>
              </div>
              <CardTitle className="text-2xl text-gray-900">I&apos;m a Student</CardTitle>
              <CardDescription className="text-gray-600">
                I want to learn new skills and advance my career
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700">Access courses from expert tutors</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700">Join live events and workshops</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FolderOpen className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700">Participate in hands-on projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700">Connect with other learners</span>
                </div>
              </div>
              <Button 
                onClick={() => handleRoleSelect('student')}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {selectedRole === 'student' && isLoading ? 'Setting up...' : 'Continue as Student'}
              </Button>
            </CardContent>
          </Card>

          {/* Tutor Card */}
          <Card className="relative overflow-hidden border-2 hover:border-green-500 transition-all duration-300 cursor-pointer group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all duration-300" />
            <CardHeader className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Educator
                </Badge>
              </div>
              <CardTitle className="text-2xl text-gray-900">I&apos;m a Tutor</CardTitle>
              <CardDescription className="text-gray-600">
                I want to share my knowledge and teach others
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Create and sell online courses</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Host live events and workshops</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FolderOpen className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Guide students through projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Build your teaching community</span>
                </div>
              </div>
              <Button 
                onClick={() => handleRoleSelect('tutor')}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {selectedRole === 'tutor' && isLoading ? 'Setting up...' : 'Continue as Tutor'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Don&apos;t worry, you can always change your role later in your profile settings
          </p>
        </div>
      </div>
    </div>
  )
}
