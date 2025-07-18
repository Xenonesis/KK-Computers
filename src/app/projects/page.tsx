import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, Calendar } from 'lucide-react'
import Link from 'next/link'

// Mock data - will be replaced with Supabase data later
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
    image: "/api/placeholder/400/250",
    github_url: "https://github.com/example/ecommerce",
    live_url: "https://ecommerce-demo.com",
    created_at: "2024-01-15",
    student_name: "Sarah Johnson",
    course: "Full Stack Web Development"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    technologies: ["Vue.js", "Firebase", "Vuetify", "Socket.io"],
    image: "/api/placeholder/400/250",
    github_url: "https://github.com/example/taskmanager",
    live_url: "https://taskmanager-demo.com",
    created_at: "2024-01-10",
    student_name: "Michael Chen",
    course: "Frontend Development"
  },
  {
    id: 3,
    title: "Data Analytics Dashboard",
    description: "Interactive dashboard for visualizing sales data with charts, filters, and real-time updates. Built using Python and modern visualization libraries.",
    technologies: ["Python", "Dash", "Plotly", "Pandas", "PostgreSQL"],
    image: "/api/placeholder/400/250",
    github_url: "https://github.com/example/analytics",
    live_url: "https://analytics-demo.com",
    created_at: "2024-01-05",
    student_name: "Emily Rodriguez",
    course: "Data Science & Analytics"
  },
  {
    id: 4,
    title: "Mobile Fitness App",
    description: "Cross-platform mobile app for fitness tracking with workout plans, progress monitoring, and social features.",
    technologies: ["React Native", "Firebase", "Redux", "Expo"],
    image: "/api/placeholder/400/250",
    github_url: "https://github.com/example/fitness",
    live_url: null,
    created_at: "2023-12-28",
    student_name: "David Kim",
    course: "Mobile App Development"
  },
  {
    id: 5,
    title: "AI Chatbot Platform",
    description: "Intelligent chatbot platform with natural language processing capabilities and integration with multiple messaging platforms.",
    technologies: ["Python", "TensorFlow", "Flask", "NLP", "Docker"],
    image: "/api/placeholder/400/250",
    github_url: "https://github.com/example/chatbot",
    live_url: "https://chatbot-demo.com",
    created_at: "2023-12-20",
    student_name: "Lisa Wang",
    course: "AI & Machine Learning"
  },
  {
    id: 6,
    title: "Blockchain Voting System",
    description: "Secure voting system built on blockchain technology ensuring transparency and immutability of votes.",
    technologies: ["Solidity", "Web3.js", "React", "Ethereum", "MetaMask"],
    image: "/api/placeholder/400/250",
    github_url: "https://github.com/example/voting",
    live_url: "https://voting-demo.com",
    created_at: "2023-12-15",
    student_name: "Alex Thompson",
    course: "Blockchain Development"
  }
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Student Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the amazing projects created by our students. These showcase the practical 
              skills and knowledge gained through our comprehensive courses.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🚀</div>
                    <div className="text-sm text-gray-600">Project Preview</div>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{project.course}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(project.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {project.description}
                  </CardDescription>
                  <div className="text-sm text-blue-600 font-medium">
                    by {project.student_name}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    {project.github_url && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-1" />
                          Code
                        </Link>
                      </Button>
                    )}
                    {project.live_url && (
                      <Button size="sm" asChild>
                        <Link href={project.live_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Live Demo
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Your Own Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our courses and create impressive projects that showcase your skills to potential employers.
          </p>
          <Link href="/courses">
            <Button size="lg" variant="secondary">
              Explore Courses
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
