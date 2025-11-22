"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Full Stack Developer at Google",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content: "KK Computers transformed my career! The hands-on projects and expert instructors gave me the skills I needed to land my dream job. The supportive community made learning enjoyable and effective.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Data Scientist at Amazon",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    content: "Best investment in my education. The curriculum is up-to-date with industry standards, and the career support team helped me prepare for interviews. I got 3 job offers within a month of completing the course!",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "UI/UX Designer at Meta",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    content: "The quality of instruction is outstanding. Every instructor is passionate and knowledgeable. The platform is user-friendly, and the resources are comprehensive. Highly recommend to anyone looking to upskill!",
    rating: 5
  },
  {
    name: "David Park",
    role: "DevOps Engineer at Microsoft",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    content: "What sets KK Computers apart is their focus on real-world applications. The projects I built during the course are now part of my professional portfolio. Worth every penny!",
    rating: 5
  }
]

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const testimonial = testimonials[currentIndex]

  return (
    <div className="relative max-w-4xl mx-auto">
      <Card className="border-0 shadow-2xl bg-white dark:bg-gray-800">
        <CardContent className="p-8 md:p-12">
          <Quote className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-6 opacity-50" />
          
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed italic">
            &quot;{testimonial.content}&quot;
          </p>

          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={testimonial.image} alt={testimonial.name} />
              <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white text-lg">
                {testimonial.name}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {testimonial.role}
              </div>
              <div className="flex gap-1 mt-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          className="rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        {/* Dots Indicator */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-blue-600 dark:bg-blue-400' 
                  : 'w-2 bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          className="rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
