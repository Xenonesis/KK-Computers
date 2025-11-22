"use client"

import { useState } from 'react'
import { Play, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VideoPreviewProps {
  thumbnailUrl: string
  videoUrl?: string
  title: string
}

export function VideoPreview({ thumbnailUrl, videoUrl, title }: VideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handleClose = () => {
    setIsPlaying(false)
  }

  return (
    <div className="relative group">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={handlePlay}
            size="lg"
            className="rounded-full w-16 h-16 bg-white hover:bg-gray-100 text-blue-600 hover:text-blue-700 transition-all duration-300 hover:scale-110"
          >
            <Play className="h-8 w-8 ml-1" fill="currentColor" />
          </Button>
        </div>

        {/* Preview Badge */}
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <Play className="h-3 w-3" />
          Preview
        </div>
      </div>

      {/* Video Modal */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Video Player */}
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              {videoUrl ? (
                <iframe
                  src={videoUrl}
                  title={title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Video preview coming soon</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
