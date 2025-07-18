"use client"

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ResponsiveImageProps {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
  quality?: number
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'wide'
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-[16/9]'
}

const objectFitClasses = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  none: 'object-none',
  'scale-down': 'object-scale-down'
}

export function ResponsiveImage({
  src,
  alt,
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  quality = 75,
  aspectRatio,
  objectFit = 'cover',
  placeholder = 'empty',
  blurDataURL
}: ResponsiveImageProps) {
  return (
    <div className={cn(
      'relative overflow-hidden',
      aspectRatio && aspectRatioClasses[aspectRatio],
      className
    )}>
      <Image
        src={src}
        alt={alt}
        fill={aspectRatio ? true : false}
        width={aspectRatio ? undefined : 800}
        height={aspectRatio ? undefined : 600}
        sizes={sizes}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={cn(
          'transition-transform duration-300 hover:scale-105',
          objectFitClasses[objectFit]
        )}
      />
    </div>
  )
}

interface ResponsiveAvatarProps {
  src?: string
  alt: string
  fallback: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
}

const avatarSizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-20 h-20 text-2xl'
}

export function ResponsiveAvatar({
  src,
  alt,
  fallback,
  size = 'md',
  className
}: ResponsiveAvatarProps) {
  return (
    <div className={cn(
      'relative rounded-full overflow-hidden bg-muted flex items-center justify-center font-medium',
      avatarSizes[size],
      className
    )}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 96px, 128px"
        />
      ) : (
        <span className="text-muted-foreground">
          {fallback}
        </span>
      )}
    </div>
  )
}

interface ResponsiveIconProps {
  icon: React.ComponentType<{ className?: string }>
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const iconSizes = {
  xs: 'w-3 h-3 sm:w-4 sm:h-4',
  sm: 'w-4 h-4 sm:w-5 sm:h-5',
  md: 'w-5 h-5 sm:w-6 sm:h-6',
  lg: 'w-6 h-6 sm:w-8 sm:h-8',
  xl: 'w-8 h-8 sm:w-10 sm:h-10'
}

export function ResponsiveIcon({
  icon: Icon,
  size = 'md',
  className
}: ResponsiveIconProps) {
  return (
    <Icon className={cn(
      iconSizes[size],
      className
    )} />
  )
}
