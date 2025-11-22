'use client'

import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Loader2 } from 'lucide-react'
import { Course } from '@/lib/supabase'

interface CoursePurchaseButtonProps {
  course: Course
  isEnrolled?: boolean
  onEnrollmentChange?: () => void
}

export function CoursePurchaseButton({ 
  course, 
  isEnrolled = false, 
  onEnrollmentChange 
}: CoursePurchaseButtonProps) {
  const { isSignedIn } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePurchase = async () => {
    if (!isSignedIn) {
      // Redirect to sign in
      window.location.href = '/sign-in'
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course_id: course.id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleFreeEnrollment = async () => {
    if (!isSignedIn) {
      window.location.href = '/sign-in'
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course_id: course.id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to enroll in course')
      }

      // Call the callback to refresh enrollment status
      if (onEnrollmentChange) {
        onEnrollmentChange()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (isEnrolled) {
    return (
      <Button disabled className="w-full">
        Already Enrolled
      </Button>
    )
  }

  const isFree = course.price === 0
  const isCourseFull = course.max_students && course.current_students >= course.max_students

  if (isCourseFull) {
    return (
      <Button disabled className="w-full">
        Course Full
      </Button>
    )
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={isFree ? handleFreeEnrollment : handlePurchase}
        disabled={loading}
        className="w-full"
        size="lg"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <ShoppingCart className="w-4 h-4 mr-2" />
        )}
        {loading
          ? 'Processing...'
          : isFree
          ? 'Enroll for Free'
          : `Purchase for $${course.price}`}
      </Button>
      
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </div>
      )}
      
      {!isSignedIn && (
        <p className="text-sm text-muted-foreground text-center">
          You need to sign in to enroll in this course
        </p>
      )}
    </div>
  )
}
