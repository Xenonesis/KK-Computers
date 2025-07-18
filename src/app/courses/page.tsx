import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Users, Star, BookOpen } from 'lucide-react'

// Mock data - will be replaced with Supabase data later
const courses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    description: "Master modern web development with React, Node.js, and databases. Build real-world applications from scratch.",
    duration: "16 weeks",
    level: "Intermediate",
    price: 399,
    students: 1250,
    rating: 4.8,
    image: "/api/placeholder/400/250",
    technologies: ["React", "Node.js", "MongoDB", "Express"]
  },
  {
    id: 2,
    title: "Python Programming Fundamentals",
    description: "Learn Python from basics to advanced concepts. Perfect for beginners starting their programming journey.",
    duration: "12 weeks",
    level: "Beginner",
    price: 299,
    students: 890,
    rating: 4.9,
    image: "/api/placeholder/400/250",
    technologies: ["Python", "Django", "Flask", "SQLite"]
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    description: "Comprehensive digital marketing course covering SEO, social media, PPC, and analytics.",
    duration: "10 weeks",
    level: "Beginner",
    price: 249,
    students: 650,
    rating: 4.7,
    image: "/api/placeholder/400/250",
    technologies: ["Google Ads", "Facebook Ads", "SEO", "Analytics"]
  },
  {
    id: 4,
    title: "Data Science & Analytics",
    description: "Dive into data science with Python, machine learning, and statistical analysis.",
    duration: "20 weeks",
    level: "Advanced",
    price: 499,
    students: 420,
    rating: 4.9,
    image: "/api/placeholder/400/250",
    technologies: ["Python", "Pandas", "Scikit-learn", "Tableau"]
  },
  {
    id: 5,
    title: "Mobile App Development",
    description: "Build native mobile apps for iOS and Android using React Native and Flutter.",
    duration: "14 weeks",
    level: "Intermediate",
    price: 349,
    students: 780,
    rating: 4.6,
    image: "/api/placeholder/400/250",
    technologies: ["React Native", "Flutter", "Firebase", "API Integration"]
  },
  {
    id: 6,
    title: "Cybersecurity Fundamentals",
    description: "Learn essential cybersecurity concepts, ethical hacking, and network security.",
    duration: "18 weeks",
    level: "Intermediate",
    price: 449,
    students: 320,
    rating: 4.8,
    image: "/api/placeholder/400/250",
    technologies: ["Network Security", "Penetration Testing", "CISSP", "Ethical Hacking"]
  }
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Courses
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive range of IT courses designed to advance your career 
              and keep you ahead in the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-blue-600" />
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={course.level === 'Beginner' ? 'secondary' : course.level === 'Intermediate' ? 'default' : 'destructive'}>
                      {course.level}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students} students</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      ${course.price}
                    </span>
                    <Button>
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
