"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { analytics } from '@/lib/analytics'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Initialize analytics on mount
    analytics.initialize()
  }, [])

  useEffect(() => {
    // Track page views
    if (pathname) {
      analytics.page(pathname, {
        search: searchParams?.toString()
      })
    }
  }, [pathname, searchParams])

  return <>{children}</>
}
