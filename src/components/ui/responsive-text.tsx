import { cn } from "@/lib/utils"
import { ReactNode, createElement } from "react"

interface ResponsiveHeadingProps {
  children: ReactNode
  level: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
}

const headingSizes = {
  1: {
    sm: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
    md: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl", 
    lg: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
    xl: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
    "2xl": "text-6xl sm:text-7xl md:text-8xl lg:text-9xl",
    "3xl": "text-7xl sm:text-8xl md:text-9xl"
  },
  2: {
    sm: "text-xl sm:text-2xl md:text-3xl",
    md: "text-2xl sm:text-3xl md:text-4xl",
    lg: "text-3xl sm:text-4xl md:text-5xl",
    xl: "text-4xl sm:text-5xl md:text-6xl",
    "2xl": "text-5xl sm:text-6xl md:text-7xl",
    "3xl": "text-6xl sm:text-7xl md:text-8xl"
  },
  3: {
    sm: "text-lg sm:text-xl md:text-2xl",
    md: "text-xl sm:text-2xl md:text-3xl",
    lg: "text-2xl sm:text-3xl md:text-4xl",
    xl: "text-3xl sm:text-4xl md:text-5xl",
    "2xl": "text-4xl sm:text-5xl md:text-6xl",
    "3xl": "text-5xl sm:text-6xl md:text-7xl"
  },
  4: {
    sm: "text-base sm:text-lg md:text-xl",
    md: "text-lg sm:text-xl md:text-2xl",
    lg: "text-xl sm:text-2xl md:text-3xl",
    xl: "text-2xl sm:text-3xl md:text-4xl",
    "2xl": "text-3xl sm:text-4xl md:text-5xl",
    "3xl": "text-4xl sm:text-5xl md:text-6xl"
  },
  5: {
    sm: "text-sm sm:text-base md:text-lg",
    md: "text-base sm:text-lg md:text-xl",
    lg: "text-lg sm:text-xl md:text-2xl",
    xl: "text-xl sm:text-2xl md:text-3xl",
    "2xl": "text-2xl sm:text-3xl md:text-4xl",
    "3xl": "text-3xl sm:text-4xl md:text-5xl"
  },
  6: {
    sm: "text-xs sm:text-sm md:text-base",
    md: "text-sm sm:text-base md:text-lg",
    lg: "text-base sm:text-lg md:text-xl",
    xl: "text-lg sm:text-xl md:text-2xl",
    "2xl": "text-xl sm:text-2xl md:text-3xl",
    "3xl": "text-2xl sm:text-3xl md:text-4xl"
  }
}

export function ResponsiveHeading({
  children,
  level,
  className,
  size = "md"
}: ResponsiveHeadingProps) {
  return createElement(
    `h${level}`,
    {
      className: cn(
        headingSizes[level][size],
        "font-bold leading-tight",
        className
      )
    },
    children
  )
}

interface ResponsiveTextProps {
  children: ReactNode
  className?: string
  size?: "xs" | "sm" | "base" | "lg" | "xl"
  variant?: "body" | "caption" | "lead"
}

const textSizes = {
  xs: "text-xs sm:text-sm",
  sm: "text-sm sm:text-base", 
  base: "text-base sm:text-lg",
  lg: "text-lg sm:text-xl",
  xl: "text-xl sm:text-2xl"
}

const textVariants = {
  body: "leading-relaxed",
  caption: "leading-normal text-muted-foreground",
  lead: "leading-relaxed font-medium"
}

export function ResponsiveText({ 
  children, 
  className, 
  size = "base",
  variant = "body"
}: ResponsiveTextProps) {
  return (
    <p className={cn(
      textSizes[size],
      textVariants[variant],
      className
    )}>
      {children}
    </p>
  )
}

interface ResponsiveButtonProps {
  children: ReactNode
  className?: string
  size?: "sm" | "md" | "lg"
  fullWidthOnMobile?: boolean
}

const buttonSizes = {
  sm: "px-3 py-2 text-sm sm:px-4 sm:py-2",
  md: "px-4 py-2 text-base sm:px-6 sm:py-3",
  lg: "px-6 py-3 text-lg sm:px-8 sm:py-4"
}

export function ResponsiveButtonWrapper({ 
  children, 
  className,
  size = "md",
  fullWidthOnMobile = false
}: ResponsiveButtonProps) {
  return (
    <div className={cn(
      buttonSizes[size],
      fullWidthOnMobile && "w-full sm:w-auto",
      className
    )}>
      {children}
    </div>
  )
}
