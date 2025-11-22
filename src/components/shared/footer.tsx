import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Zap, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-900/5 dark:bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>

      {/* Newsletter Section */}
      <div className="border-b border-gray-300/50 dark:border-gray-700/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
              Stay Updated with Latest Tech Trends
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 px-4">
              Get exclusive insights, course updates, and career tips delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto px-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 sm:h-10 bg-gray-100 dark:bg-white/10 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-400"
              />
              <Button className="h-12 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 whitespace-nowrap">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                KK Computers
              </h3>
            </div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Empowering the next generation through comprehensive IT education, industry certifications,
              and hands-on learning experiences. Join 5,000+ students who transformed their careers with us.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110" aria-label="Facebook">
                <Facebook className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 dark:text-white" />
              </a>
              <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110" aria-label="Twitter">
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 dark:text-white" />
              </a>
              <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110" aria-label="Instagram">
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 dark:text-white" />
              </a>
              <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 dark:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link href="/courses" className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block">Courses</Link></li>
              <li><Link href="/projects" className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block">Projects</Link></li>
              <li><Link href="/events" className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block">Events</Link></li>
              <li><Link href="/about" className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block">About Us</Link></li>
              <li><Link href="/partners" className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block">Partners</Link></li>
              <li><Link href="/contact" className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block">Contact</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white">Popular Programs</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link href="/courses" className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block">Web Development</Link></li>
              <li><Link href="/courses" className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block">Data Science</Link></li>
              <li><Link href="/courses" className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block">Digital Marketing</Link></li>
              <li><Link href="/courses" className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block">Cybersecurity</Link></li>
              <li><Link href="/courses" className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block">Mobile Development</Link></li>
              <li><Link href="/courses" className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block">Cloud Computing</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white">Get in Touch</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-600/20 rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0">
                  <MapPin className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    123 Tech Street<br />
                    Digital City, DC 12345<br />
                    United States
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 break-all">info@kkcomputers.com</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6 sm:my-8 bg-gray-300/50 dark:bg-gray-700/50" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 text-center sm:text-left">
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
              © {new Date().getFullYear()} KK Computers. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link href="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap">Terms of Service</Link>
              <Link href="/cookies" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap">Cookie Policy</Link>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <span className="hidden sm:inline">Made with</span>
            <span className="text-red-400 animate-pulse text-base sm:text-lg">❤️</span>
            <span className="text-center sm:text-left">for the future of tech education</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
