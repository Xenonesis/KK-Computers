"use client"

import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, ThumbsUp } from 'lucide-react'
import Link from 'next/link'

// This would normally come from an API or database
const blogPost = {
  id: '1',
  title: '10 Essential Skills Every Web Developer Should Master in 2024',
  content: `
    <h2>Introduction</h2>
    <p>The world of web development is constantly evolving, and staying ahead requires continuous learning and adaptation. In this comprehensive guide, we'll explore the top 10 skills that every web developer should master in 2024 to remain competitive and build exceptional web applications.</p>

    <h2>1. Modern JavaScript (ES6+)</h2>
    <p>JavaScript continues to be the backbone of web development. Understanding modern JavaScript features like arrow functions, destructuring, async/await, and modules is essential for writing clean, efficient code.</p>
    
    <h2>2. React and Component-Based Architecture</h2>
    <p>React has become the industry standard for building user interfaces. Learning React, along with concepts like hooks, context, and component composition, will significantly boost your development capabilities.</p>

    <h2>3. TypeScript for Type Safety</h2>
    <p>TypeScript adds static typing to JavaScript, helping catch errors early and improving code maintainability. It's becoming increasingly popular in professional development environments.</p>

    <h2>4. Responsive Design and CSS Frameworks</h2>
    <p>With mobile-first development being crucial, mastering responsive design techniques and frameworks like Tailwind CSS or Bootstrap is essential.</p>

    <h2>5. Version Control with Git</h2>
    <p>Git is the industry-standard version control system. Understanding branching, merging, and collaborative workflows is crucial for any developer.</p>

    <h2>6. API Integration and REST/GraphQL</h2>
    <p>Modern applications rely heavily on APIs. Understanding how to consume and create APIs using REST or GraphQL is a must-have skill.</p>

    <h2>7. Testing and Quality Assurance</h2>
    <p>Writing tests using frameworks like Jest, React Testing Library, or Cypress ensures your code is reliable and maintainable.</p>

    <h2>8. Performance Optimization</h2>
    <p>Understanding how to optimize web performance through code splitting, lazy loading, and efficient resource management is crucial for user experience.</p>

    <h2>9. Security Best Practices</h2>
    <p>Security should never be an afterthought. Learn about authentication, authorization, XSS prevention, and CSRF protection.</p>

    <h2>10. DevOps Fundamentals</h2>
    <p>Basic understanding of CI/CD, containerization with Docker, and cloud deployment platforms like Vercel or AWS is increasingly important.</p>

    <h2>Conclusion</h2>
    <p>Mastering these skills will set you up for success in 2024 and beyond. Remember, the key is consistent practice and building real projects. Start with one skill at a time and gradually expand your expertise.</p>
  `,
  author: 'Sarah Johnson',
  authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  authorBio: 'Lead Full Stack Instructor with 15+ years of industry experience',
  date: '2024-01-15',
  readTime: '8 min read',
  category: 'Web Development',
  image: 'https://placehold.co/1200x600/3b82f6/ffffff?text=Web+Development',
  tags: ['JavaScript', 'React', 'TypeScript', 'Web Development', 'Career']
}

export default function BlogPostPage() {
  const params = useParams()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <Badge className="mb-4">{blogPost.category}</Badge>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {blogPost.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(blogPost.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{blogPost.readTime}</span>
            </div>
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-4 pb-6">
            <Avatar className="h-12 w-12">
              <AvatarImage src={blogPost.authorAvatar} alt={blogPost.author} />
              <AvatarFallback>{blogPost.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">{blogPost.author}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{blogPost.authorBio}</div>
            </div>
          </div>

          {/* Social Actions */}
          <div className="flex items-center gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" size="sm">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <img
          src={blogPost.image}
          alt={blogPost.title}
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="prose prose-lg dark:prose-invert max-w-none p-8">
            <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
          </CardContent>
        </Card>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {blogPost.tags.map((tag, idx) => (
            <Badge key={idx} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Related Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge className="w-fit mb-2">Web Development</Badge>
                  <h4 className="text-lg font-semibold">
                    <Link href={`/blog/${i + 1}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                      Related Article Title {i}
                    </Link>
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    A brief description of the related article...
                  </p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Learning?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Explore our comprehensive courses and take your skills to the next level
            </p>
            <Button size="lg" asChild>
              <Link href="/courses">
                Browse Courses
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
