"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, Award, Users, BookOpen, Linkedin, Twitter, Github, Mail } from 'lucide-react'
import Link from 'next/link'

const instructors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Lead Full Stack Instructor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    expertise: ['Web Development', 'JavaScript', 'React', 'Node.js'],
    bio: '15+ years of industry experience. Former Senior Engineer at Google. Published author and conference speaker.',
    rating: 4.9,
    students: 12500,
    courses: 8,
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Data Science Expert',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    expertise: ['Machine Learning', 'Python', 'AI', 'Data Analysis'],
    bio: 'PhD in Computer Science. Led AI teams at Amazon. Passionate about making ML accessible to everyone.',
    rating: 5.0,
    students: 9800,
    courses: 6,
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    title: 'Cybersecurity Specialist',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    expertise: ['Ethical Hacking', 'Network Security', 'Penetration Testing'],
    bio: 'Certified Ethical Hacker with 12 years experience. Former security consultant for Fortune 500 companies.',
    rating: 4.9,
    students: 8600,
    courses: 5,
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  },
  {
    id: '4',
    name: 'David Park',
    title: 'Cloud Architecture Guru',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    expertise: ['AWS', 'Azure', 'DevOps', 'Kubernetes'],
    bio: 'AWS Certified Solutions Architect. Built cloud infrastructure for startups to enterprises.',
    rating: 4.8,
    students: 11200,
    courses: 7,
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  },
  {
    id: '5',
    name: 'Alex Thompson',
    title: 'Mobile Development Lead',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    expertise: ['React Native', 'Flutter', 'iOS', 'Android'],
    bio: '10+ years building mobile apps. Apps featured by Apple and Google. Published 20+ apps with millions of downloads.',
    rating: 4.9,
    students: 7500,
    courses: 4,
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  },
  {
    id: '6',
    name: 'Jessica Lee',
    title: 'Digital Marketing Strategist',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    expertise: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
    bio: 'Grew multiple brands from zero to millions. Google Analytics & Ads certified. Featured in Marketing Week.',
    rating: 5.0,
    students: 6800,
    courses: 5,
    social: {
      linkedin: '#',
      twitter: '#'
    }
  }
]

export default function InstructorsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
              <Award className="w-4 h-4 mr-2" />
              World-Class Instructors
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Learn from <span className="text-blue-600 dark:text-blue-400">Industry Experts</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our instructors are industry veterans with real-world experience from top tech companies
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Expert Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">4.9★</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">100K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Students Taught</div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <Card key={instructor.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="relative inline-block mx-auto mb-4">
                    <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800 shadow-lg">
                      <AvatarImage src={instructor.avatar} alt={instructor.name} />
                      <AvatarFallback>{instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2">
                      <Award className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl mb-1">{instructor.name}</CardTitle>
                  <CardDescription className="text-base font-medium text-blue-600 dark:text-blue-400">
                    {instructor.title}
                  </CardDescription>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(instructor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{instructor.rating}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                        <Users className="h-4 w-4" />
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {instructor.students.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{instructor.courses}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Courses</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {instructor.bio}
                  </p>

                  {/* Expertise */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {instructor.expertise.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center justify-center gap-2 pt-4">
                    {instructor.social.linkedin && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={instructor.social.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {instructor.social.twitter && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={instructor.social.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {instructor.social.github && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={instructor.social.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* View Profile Button */}
                  <Button className="w-full" asChild>
                    <Link href={`/instructors/${instructor.id}`}>
                      View Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to Become an Instructor?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Share your expertise with thousands of students worldwide
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">
              Apply Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
