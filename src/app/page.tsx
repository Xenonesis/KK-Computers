import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { ScrollToTop } from '@/components/ScrollToTop'
import { FAQSection } from '@/components/FAQSection'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { LiveStats } from '@/components/LiveStats'

import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Laptop,
  Code,
  Database,
  Star,
  CheckCircle,
  TrendingUp,
  Globe,
  Zap,
  Shield,
  Clock,
  PlayCircle,
  Quote,
  Sparkles,
  Target,
  Rocket
} from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden transition-colors duration-300">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>

        {/* Floating Elements - Hidden on mobile for better performance */}
        <div className="hidden sm:block absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse"></div>
        <div className="hidden sm:block absolute top-40 right-20 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="hidden sm:block absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20 animate-pulse delay-500"></div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs sm:text-sm font-medium mb-4 sm:mb-6 transition-colors duration-300">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              #1 Digital Training Institute
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight transition-colors duration-300 px-2">
              Empower Your{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Digital Future
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed transition-colors duration-300 px-4">
              Join <span className="font-semibold text-blue-600 dark:text-blue-400"><AnimatedCounter end={5000} suffix="+" /></span> students who transformed their careers with our
              comprehensive IT education, industry certifications, and hands-on learning experience.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 px-4">
              <div className="text-center min-w-[80px] group cursor-default">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <AnimatedCounter end={95} suffix="%" />
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Job Placement</div>
              </div>
              <div className="text-center min-w-[80px] group cursor-default">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <AnimatedCounter end={50} suffix="+" />
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Expert Instructors</div>
              </div>
              <div className="text-center min-w-[80px] group cursor-default">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <AnimatedCounter end={4.9} />★
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Student Rating</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 max-w-md sm:max-w-none mx-auto">
              <Link href="/courses" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-12 sm:h-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                  <PlayCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Start Learning Today
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 sm:h-auto border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 text-sm sm:text-base">
                  <Globe className="mr-2 h-4 w-4" />
                  Explore Programs
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 opacity-60 px-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">Certified Programs</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">Industry Recognized</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">Career Growth</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-900 relative transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <Badge variant="outline" className="mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
              Why Choose Us
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 transition-colors duration-300 px-4">
              Transform Your Career with{' '}
              <span className="text-blue-600 dark:text-blue-400">KK Computers</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300 px-4">
              We provide comprehensive digital education with industry-relevant curriculum,
              hands-on projects, and personalized mentorship to ensure your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 px-2 sm:px-0">
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 dark:bg-gray-800">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Expert-Led Courses</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Learn from industry veterans with 10+ years of experience. Our instructors bring real-world
                  insights and practical knowledge to every lesson.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span>4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-1" />
                    <span>50+ Experts</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 dark:bg-gray-800">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Industry Certifications</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Earn globally recognized certifications from top tech companies. Our programs are
                  designed to meet industry standards and boost your career prospects.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    <span>95% Pass Rate</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-purple-500 dark:text-purple-400 mr-1" />
                    <span>20+ Certs</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 dark:bg-gray-800">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Community & Support</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Join a vibrant community of 5,000+ learners and professionals. Get 24/7 support,
                  peer collaboration, and lifetime access to our alumni network.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-green-500 mr-1" />
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-green-500 mr-1" />
                    <span>5K+ Students</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Benefits */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-3xl p-6 sm:p-8 md:p-12 transition-colors duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Laptop className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Hands-on Projects</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Build real-world applications</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Career Growth</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Average 40% salary increase</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Job Guarantee</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">95% placement success rate</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Global Access</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Learn from anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Preview */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <Badge variant="outline" className="mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
              Most Popular
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 transition-colors duration-300 px-4">
              Start Your Journey with Our{' '}
              <span className="text-blue-600 dark:text-blue-400">Top Courses</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
              Join thousands of students who chose these industry-leading programs to transform their careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 px-2 sm:px-0">
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:scale-105 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Bestseller</Badge>
                </div>
                <CardTitle className="text-xl font-bold mb-2">Full Stack Web Development</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Master modern web development with React, Node.js, and databases. Build production-ready applications.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      16 weeks
                    </span>
                    <span className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      1,250 students
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-medium">4.9</span>
                      <span className="text-gray-500 ml-1">(324 reviews)</span>
                    </div>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">$399</span>
                      <span className="text-sm text-gray-500 line-through ml-2">$599</span>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:scale-105 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Popular</Badge>
                </div>
                <CardTitle className="text-xl font-bold mb-2">Data Science & Analytics</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Learn Python, machine learning, and data visualization. Become a data-driven decision maker.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      20 weeks
                    </span>
                    <span className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      890 students
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-medium">4.8</span>
                      <span className="text-gray-500 ml-1">(256 reviews)</span>
                    </div>
                  </div>
                  <Progress value={72} className="h-2" />
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-purple-600">$499</span>
                      <span className="text-sm text-gray-500 line-through ml-2">$799</span>
                    </div>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:scale-105 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Laptop className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">New</Badge>
                </div>
                <CardTitle className="text-xl font-bold mb-2">Digital Marketing Mastery</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Master SEO, social media, PPC, and analytics. Drive growth for any business online.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      12 weeks
                    </span>
                    <span className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      650 students
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-medium">4.7</span>
                      <span className="text-gray-500 ml-1">(189 reviews)</span>
                    </div>
                  </div>
                  <Progress value={68} className="h-2" />
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-green-600">$299</span>
                      <span className="text-sm text-gray-500 line-through ml-2">$449</span>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/courses">
              <Button size="lg" variant="outline" className="border-2 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300">
                <BookOpen className="mr-2 h-5 w-5" />
                View All 50+ Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Live Platform Stats
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Real-Time Learning Activity
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See what&apos;s happening on our platform right now
            </p>
          </div>
          <LiveStats />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
              <Quote className="w-4 h-4 mr-2" />
              Student Success Stories
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What Our <span className="text-blue-600 dark:text-blue-400">Students Say</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real stories from real students who transformed their careers with KK Computers
            </p>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
              <Target className="w-4 h-4 mr-2" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Got Questions? <span className="text-blue-600 dark:text-blue-400">We&apos;ve Got Answers</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Everything you need to know about our courses and programs
            </p>
          </div>

          <FAQSection />
        </div>
      </section>

      {/* Old Testimonials Grid - Remove this */}
      <section className="hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/api/placeholder/48/48" />
                    <AvatarFallback className="bg-blue-600 text-white">SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                    <p className="text-sm text-gray-600">Full Stack Developer at TechCorp</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <Quote className="w-8 h-8 text-blue-300 mb-4" />
                <p className="text-gray-700 leading-relaxed mb-4">
                  &quot;KK Computers completely transformed my career. The hands-on projects and expert mentorship
                  helped me land my dream job as a Full Stack Developer. The curriculum is incredibly practical!&quot;
                </p>
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-green-600">Salary increase:</span> 150%
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/api/placeholder/48/48" />
                    <AvatarFallback className="bg-purple-600 text-white">MC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">Michael Chen</h4>
                    <p className="text-sm text-gray-600">Data Scientist at DataViz</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <Quote className="w-8 h-8 text-purple-300 mb-4" />
                <p className="text-gray-700 leading-relaxed mb-4">
                  &quot;The Data Science program exceeded my expectations. Real datasets, industry tools, and
                  amazing support from instructors. I got hired before even finishing the course!&quot;
                </p>
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-green-600">Job placement:</span> 2 weeks before graduation
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/api/placeholder/48/48" />
                    <AvatarFallback className="bg-green-600 text-white">ER</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">Emily Rodriguez</h4>
                    <p className="text-sm text-gray-600">Digital Marketing Manager</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <Quote className="w-8 h-8 text-green-300 mb-4" />
                <p className="text-gray-700 leading-relaxed mb-4">
                  &quot;From zero marketing knowledge to managing campaigns for Fortune 500 companies.
                  The practical approach and real client projects made all the difference.&quot;
                </p>
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-green-600">Career change:</span> From retail to tech marketing
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-8 bg-gray-50 rounded-2xl px-8 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">4.9★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">5,000+</div>
                <div className="text-sm text-gray-600">Happy Students</div>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">95%</div>
                <div className="text-sm text-gray-600">Job Placement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-6 py-2 bg-white/20 text-white border-white/30">
              Limited Time Offer
            </Badge>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Transform Your{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Career?
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Join <span className="font-semibold text-white">5,000+</span> students who transformed their careers.
              Start your journey today with our industry-leading programs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/courses">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Start Learning Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300">
                  <Users className="mr-2 h-4 w-4" />
                  Talk to an Advisor
                </Button>
              </Link>
            </div>

            {/* Special Offer */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-left mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-white mb-2">🎉 Early Bird Special</h3>
                  <p className="text-blue-100">Get 30% off any course when you enroll this month</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">30% OFF</div>
                  <div className="text-sm text-blue-100">Use code: EARLY30</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}
