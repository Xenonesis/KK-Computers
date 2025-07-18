import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Users, Clock } from 'lucide-react'

// Mock data - will be replaced with Supabase data later
const events = [
  {
    id: 1,
    title: "Web Development Workshop",
    description: "Hands-on workshop covering modern web development techniques using React and Next.js. Perfect for beginners and intermediate developers.",
    date: "2024-02-15",
    time: "10:00 AM - 4:00 PM",
    location: "KK Computers Main Campus",
    type: "workshop",
    max_participants: 30,
    current_participants: 18,
    price: 49,
    instructor: "Sarah Johnson",
    image: "/api/placeholder/400/250"
  },
  {
    id: 2,
    title: "AI & Machine Learning Seminar",
    description: "Explore the latest trends in artificial intelligence and machine learning. Industry experts will share insights and practical applications.",
    date: "2024-02-20",
    time: "2:00 PM - 5:00 PM",
    location: "Virtual Event",
    type: "seminar",
    max_participants: 100,
    current_participants: 67,
    price: 0,
    instructor: "Dr. Michael Chen",
    image: "/api/placeholder/400/250"
  },
  {
    id: 3,
    title: "AWS Cloud Certification Bootcamp",
    description: "Intensive 3-day bootcamp to prepare for AWS Cloud Practitioner certification. Includes practice exams and hands-on labs.",
    date: "2024-02-25",
    time: "9:00 AM - 6:00 PM",
    location: "KK Computers Main Campus",
    type: "certification",
    max_participants: 25,
    current_participants: 22,
    price: 299,
    instructor: "Emily Rodriguez",
    image: "/api/placeholder/400/250"
  },
  {
    id: 4,
    title: "Cybersecurity Awareness Workshop",
    description: "Learn essential cybersecurity practices for individuals and businesses. Covers threat detection, prevention, and response strategies.",
    date: "2024-03-05",
    time: "1:00 PM - 5:00 PM",
    location: "KK Computers Main Campus",
    type: "workshop",
    max_participants: 40,
    current_participants: 12,
    price: 39,
    instructor: "David Kim",
    image: "/api/placeholder/400/250"
  },
  {
    id: 5,
    title: "Mobile App Development Masterclass",
    description: "Advanced masterclass on building cross-platform mobile applications using React Native and Flutter.",
    date: "2024-03-10",
    time: "10:00 AM - 6:00 PM",
    location: "Virtual Event",
    type: "workshop",
    max_participants: 50,
    current_participants: 31,
    price: 79,
    instructor: "Lisa Wang",
    image: "/api/placeholder/400/250"
  },
  {
    id: 6,
    title: "Google Analytics Certification Prep",
    description: "Comprehensive preparation course for Google Analytics Individual Qualification (IQ) certification exam.",
    date: "2024-03-15",
    time: "9:00 AM - 3:00 PM",
    location: "KK Computers Main Campus",
    type: "certification",
    max_participants: 20,
    current_participants: 8,
    price: 149,
    instructor: "Alex Thompson",
    image: "/api/placeholder/400/250"
  }
]

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'workshop':
      return 'bg-blue-100 text-blue-800'
    case 'seminar':
      return 'bg-green-100 text-green-800'
    case 'certification':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our workshops, seminars, and certification programs to enhance your skills 
              and connect with fellow learners and industry professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📅</div>
                    <div className="text-sm text-gray-600">Event</div>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                    <div className="text-right">
                      {event.price === 0 ? (
                        <span className="text-lg font-bold text-green-600">Free</span>
                      ) : (
                        <span className="text-lg font-bold text-blue-600">${event.price}</span>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {event.description}
                  </CardDescription>
                  <div className="text-sm text-blue-600 font-medium">
                    Instructor: {event.instructor}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {event.current_participants}/{event.max_participants} participants
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ 
                        width: `${(event.current_participants / event.max_participants) * 100}%` 
                      }}
                    ></div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    disabled={event.current_participants >= event.max_participants}
                  >
                    {event.current_participants >= event.max_participants ? 'Fully Booked' : 'Register Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to get notified about upcoming events, workshops, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <Button variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
