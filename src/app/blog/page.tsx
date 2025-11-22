"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, Clock, User, Search, ArrowRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const blogPosts = [
  {
    id: '1',
    title: '10 Essential Skills Every Web Developer Should Master in 2024',
    excerpt: 'Discover the most in-demand web development skills that will boost your career and keep you ahead of the curve.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Web Development',
    image: 'https://placehold.co/800x400/3b82f6/ffffff?text=Web+Development',
    featured: true
  },
  {
    id: '2',
    title: 'AI and Machine Learning: A Beginner\'s Guide',
    excerpt: 'Start your journey into artificial intelligence with this comprehensive guide for beginners.',
    author: 'Michael Chen',
    date: '2024-01-12',
    readTime: '10 min read',
    category: 'Data Science',
    image: 'https://placehold.co/800x400/8b5cf6/ffffff?text=AI+ML',
    featured: true
  },
  {
    id: '3',
    title: 'The Complete Guide to Cybersecurity Careers',
    excerpt: 'Everything you need to know about starting a successful career in cybersecurity.',
    author: 'Emily Rodriguez',
    date: '2024-01-10',
    readTime: '12 min read',
    category: 'Cybersecurity',
    image: 'https://placehold.co/800x400/ec4899/ffffff?text=Cybersecurity',
    featured: false
  },
  {
    id: '4',
    title: 'Cloud Computing: AWS vs Azure vs Google Cloud',
    excerpt: 'A detailed comparison of the three major cloud platforms to help you choose the right one.',
    author: 'David Park',
    date: '2024-01-08',
    readTime: '15 min read',
    category: 'Cloud Computing',
    image: 'https://placehold.co/800x400/10b981/ffffff?text=Cloud',
    featured: false
  },
  {
    id: '5',
    title: 'Mobile App Development: React Native vs Flutter',
    excerpt: 'Compare two popular frameworks and decide which one is best for your next mobile project.',
    author: 'Alex Thompson',
    date: '2024-01-05',
    readTime: '7 min read',
    category: 'Mobile Development',
    image: 'https://placehold.co/800x400/f59e0b/ffffff?text=Mobile',
    featured: false
  },
  {
    id: '6',
    title: 'Digital Marketing Strategies That Actually Work',
    excerpt: 'Proven digital marketing tactics to grow your business and reach your target audience.',
    author: 'Jessica Lee',
    date: '2024-01-03',
    readTime: '9 min read',
    category: 'Digital Marketing',
    image: 'https://placehold.co/800x400/ef4444/ffffff?text=Marketing',
    featured: false
  }
]

const categories = ['All', 'Web Development', 'Data Science', 'Cybersecurity', 'Cloud Computing', 'Mobile Development', 'Digital Marketing']

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              Latest Tech Insights
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              KK Computers <span className="text-blue-600 dark:text-blue-400">Blog</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Insights, tutorials, and news from the world of technology and education
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white dark:bg-gray-800"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="h-10"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge>{post.category}</Badge>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                        Featured
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <Link href={`/blog/${post.id}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Card key={post.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <Badge className="w-fit mb-2">{post.category}</Badge>
                  <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <Link href={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="ghost" className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No articles found matching your search.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
