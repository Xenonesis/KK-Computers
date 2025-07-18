"use client"

import { useState, useEffect } from 'react'

type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide'

interface ResponsiveState {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isWide: boolean
  breakpoint: Breakpoint
  width: number
}

const getBreakpoint = (width: number): Breakpoint => {
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  if (width < 1280) return 'desktop'
  return 'wide'
}

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isWide: false,
    breakpoint: 'desktop',
    width: 1024
  })

  useEffect(() => {
    const updateState = () => {
      const width = window.innerWidth
      const breakpoint = getBreakpoint(width)
      
      setState({
        isMobile: breakpoint === 'mobile',
        isTablet: breakpoint === 'tablet',
        isDesktop: breakpoint === 'desktop',
        isWide: breakpoint === 'wide',
        breakpoint,
        width
      })
    }

    // Set initial state
    updateState()

    // Add event listener
    window.addEventListener('resize', updateState)

    // Cleanup
    return () => window.removeEventListener('resize', updateState)
  }, [])

  return state
}

// Hook for media queries
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

// Predefined breakpoint hooks
export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
export const useIsWide = () => useMediaQuery('(min-width: 1280px)')

// Touch device detection
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    
    checkTouch()
    window.addEventListener('resize', checkTouch)
    
    return () => window.removeEventListener('resize', checkTouch)
  }, [])

  return isTouch
}
