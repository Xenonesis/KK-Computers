"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, CheckCircle } from 'lucide-react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setMessage(data.message || 'Thank you for subscribing!')
        setEmail('')
        
        setTimeout(() => {
          setStatus('idle')
          setMessage('')
        }, 3000)
      } else {
        setStatus('error')
        setMessage(data.message || 'Failed to subscribe. Please try again.')
        
        setTimeout(() => {
          setStatus('idle')
          setMessage('')
        }, 3000)
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setStatus('error')
      setMessage('An error occurred. Please try again.')
      
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 3000)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {status === 'success' ? (
        <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">{message}</span>
        </div>
      ) : status === 'error' ? (
        <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
          <span className="font-medium">{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 h-12 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />
          </div>
          <Button
            type="submit"
            disabled={status === 'loading'}
            className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      )}
    </div>
  )
}
