import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Building, Users, Award } from 'lucide-react'
import Link from 'next/link'

// Mock data - will be replaced with Supabase data later
const partners = [
  {
    id: 1,
    name: "TechCorp Solutions",
    logo_url: "/api/placeholder/200/100",
    website_url: "https://techcorp.com",
    description: "Leading technology solutions provider offering internships and job placements for our graduates.",
    partnership_type: "Hiring Partner",
    benefits: ["Job Placements", "Internships", "Guest Lectures"],
    since: "2022"
  },
  {
    id: 2,
    name: "CloudFirst Inc.",
    logo_url: "/api/placeholder/200/100",
    website_url: "https://cloudfirst.com",
    description: "Cloud infrastructure company providing real-world project opportunities and mentorship programs.",
    partnership_type: "Project Partner",
    benefits: ["Real Projects", "Mentorship", "Cloud Credits"],
    since: "2023"
  },
  {
    id: 3,
    name: "DataViz Analytics",
    logo_url: "/api/placeholder/200/100",
    website_url: "https://dataviz.com",
    description: "Data analytics firm collaborating on curriculum development and providing industry insights.",
    partnership_type: "Academic Partner",
    benefits: ["Curriculum Input", "Industry Insights", "Workshops"],
    since: "2021"
  },
  {
    id: 4,
    name: "StartupHub Accelerator",
    logo_url: "/api/placeholder/200/100",
    website_url: "https://startuphub.com",
    description: "Startup accelerator supporting student entrepreneurs and innovative project development.",
    partnership_type: "Innovation Partner",
    benefits: ["Startup Support", "Funding Opportunities", "Networking"],
    since: "2023"
  },
  {
    id: 5,
    name: "CyberSecure Ltd.",
    logo_url: "/api/placeholder/200/100",
    website_url: "https://cybersecure.com",
    description: "Cybersecurity company offering specialized training and certification programs.",
    partnership_type: "Training Partner",
    benefits: ["Specialized Training", "Certifications", "Security Tools"],
    since: "2022"
  },
  {
    id: 6,
    name: "Mobile Innovations",
    logo_url: "/api/placeholder/200/100",
    website_url: "https://mobileinnovations.com",
    description: "Mobile app development company providing hands-on experience and project collaboration.",
    partnership_type: "Technology Partner",
    benefits: ["App Development", "Technology Access", "Code Reviews"],
    since: "2023"
  }
]

const getPartnershipTypeColor = (type: string) => {
  switch (type) {
    case 'Hiring Partner':
      return 'bg-green-100 text-green-800'
    case 'Project Partner':
      return 'bg-blue-100 text-blue-800'
    case 'Academic Partner':
      return 'bg-purple-100 text-purple-800'
    case 'Innovation Partner':
      return 'bg-orange-100 text-orange-800'
    case 'Training Partner':
      return 'bg-red-100 text-red-800'
    case 'Technology Partner':
      return 'bg-indigo-100 text-indigo-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Partners
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We collaborate with leading companies and organizations to provide our students 
              with real-world experience, job opportunities, and industry insights.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Partnership Benefits
            </h2>
            <p className="text-lg text-gray-600">
              How our partnerships enhance your learning experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Job Opportunities</CardTitle>
                <CardDescription>
                  Direct access to job openings and internships with our hiring partners
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Real-World Projects</CardTitle>
                <CardDescription>
                  Work on actual industry projects and gain practical experience
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Industry Insights</CardTitle>
                <CardDescription>
                  Learn from industry experts and stay updated with latest trends
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Partner Network
            </h2>
            <p className="text-lg text-gray-600">
              Meet the companies and organizations we work with
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <Card key={partner.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
                  <div className="text-center">
                    <Building className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <div className="text-lg font-semibold text-gray-600">{partner.name}</div>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getPartnershipTypeColor(partner.partnership_type)}>
                      {partner.partnership_type}
                    </Badge>
                    <span className="text-sm text-gray-500">Since {partner.since}</span>
                  </div>
                  <CardTitle className="text-xl">{partner.name}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {partner.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Partnership Benefits:</h4>
                    <div className="flex flex-wrap gap-1">
                      {partner.benefits.map((benefit) => (
                        <Badge key={benefit} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {partner.website_url && (
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link href={partner.website_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Visit Website
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Stats */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Partnership Impact
            </h2>
            <p className="text-xl text-blue-100">
              The results of our collaborative efforts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">1200+</div>
              <div className="text-blue-100">Job Placements</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">300+</div>
              <div className="text-blue-100">Live Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">95%</div>
              <div className="text-blue-100">Placement Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Interested in Partnership?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our network of partners and help shape the future of digital education while 
            accessing top talent for your organization.
          </p>
          <Link href="/contact">
            <Button size="lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
