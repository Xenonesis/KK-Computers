'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import RoleSelection from '@/components/RoleSelection'
import { UserProfile } from '@/lib/supabase'

export default function SetupProfilePage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    if (isLoaded && user) {
      checkExistingProfile()
    }
  }, [isLoaded, user])

  const checkExistingProfile = async () => {
    try {
      const response = await fetch('/api/profile')
      if (response.ok) {
        const data = await response.json()
        if (data.profile) {
          setProfile(data.profile)
          // If user already has a profile, redirect to appropriate dashboard
          if (data.profile.role === 'tutor') {
            router.push('/dashboard/tutor')
          } else {
            router.push('/dashboard/student')
          }
        }
      }
    } catch (error) {
      console.error('Error checking profile:', error)
    }
  }

  const handleRoleSelect = async (role: 'student' | 'tutor') => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      const data = await response.json()
      setProfile(data.profile)
      
      // The RoleSelection component will handle the redirect
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoaded) {
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

  // If profile exists and has a role, redirect (this should be handled by useEffect)
  if (profile && profile.role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <RoleSelection 
      onRoleSelect={handleRoleSelect}
      isLoading={isLoading}
    />
  )
}
