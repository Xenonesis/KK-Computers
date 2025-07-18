"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ResponsiveContainer, ResponsiveGrid, ResponsiveStack } from '@/components/ui/responsive-container'
import { ResponsiveHeading, ResponsiveText } from '@/components/ui/responsive-text'
import { useResponsive, useIsMobile, useIsTablet, useIsDesktop } from '@/hooks/use-responsive'
import { Monitor, Smartphone, Tablet } from 'lucide-react'

export default function TestResponsivePage() {
  const { breakpoint, width } = useResponsive()
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()

  return (
    <div className="min-h-screen bg-background">
      <ResponsiveContainer className="py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 px-4">
          📱 Mobile Responsive Test
        </h1>

        {/* Mobile Test Section */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>Mobile Responsiveness Check</CardTitle>
            <CardDescription>
              Test how the site looks on different screen sizes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <h3 className="font-semibold mb-2">Current Screen Size:</h3>
                <div className="text-sm space-y-1">
                  <div className="block sm:hidden text-green-600">📱 Mobile (&lt; 640px)</div>
                  <div className="hidden sm:block md:hidden text-blue-600">📱 Small Tablet (640px - 768px)</div>
                  <div className="hidden md:block lg:hidden text-purple-600">💻 Tablet (768px - 1024px)</div>
                  <div className="hidden lg:block xl:hidden text-orange-600">🖥️ Desktop (1024px - 1280px)</div>
                  <div className="hidden xl:block text-red-600">🖥️ Large Desktop (&gt; 1280px)</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-center">
                  <div className="text-lg font-bold">Mobile First</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Base styles</div>
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-center">
                  <div className="text-lg font-bold">Tablet</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">sm: & md:</div>
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-center">
                  <div className="text-lg font-bold">Desktop</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">lg: & xl:</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Device Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isMobile && <Smartphone className="w-5 h-5" />}
              {isTablet && <Tablet className="w-5 h-5" />}
              {isDesktop && <Monitor className="w-5 h-5" />}
              Current Device: {breakpoint}
            </CardTitle>
            <CardDescription>
              Screen width: {width}px
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant={isMobile ? "default" : "outline"}>Mobile</Badge>
              <Badge variant={isTablet ? "default" : "outline"}>Tablet</Badge>
              <Badge variant={isDesktop ? "default" : "outline"}>Desktop</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Typography Test */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Typography Responsiveness</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ResponsiveHeading level={1} size="xl">
              Heading 1 - Extra Large
            </ResponsiveHeading>
            <ResponsiveHeading level={2} size="lg">
              Heading 2 - Large
            </ResponsiveHeading>
            <ResponsiveHeading level={3} size="md">
              Heading 3 - Medium
            </ResponsiveHeading>
            <ResponsiveText size="lg" variant="lead">
              This is lead text that scales responsively across devices.
            </ResponsiveText>
            <ResponsiveText size="base" variant="body">
              This is body text that adapts to different screen sizes for optimal readability.
            </ResponsiveText>
            <ResponsiveText size="sm" variant="caption">
              This is caption text that remains legible on all devices.
            </ResponsiveText>
          </CardContent>
        </Card>

        {/* Grid Layout Test */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Grid Layout Test</CardTitle>
            <CardDescription>
              Grid adapts from 1 column on mobile to 4 columns on desktop
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveGrid 
              cols={{ default: 1, sm: 2, md: 3, lg: 4 }}
              gap="md"
            >
              {Array.from({ length: 8 }, (_, i) => (
                <Card key={i} className="p-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-2 flex items-center justify-center text-primary-foreground font-bold">
                      {i + 1}
                    </div>
                    <p className="text-sm">Grid Item {i + 1}</p>
                  </div>
                </Card>
              ))}
            </ResponsiveGrid>
          </CardContent>
        </Card>

        {/* Stack Layout Test */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Stack Layout Test</CardTitle>
            <CardDescription>
              Stack changes from vertical on mobile to horizontal on larger screens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveStack 
              direction="horizontal-md" 
              spacing="lg" 
              justify="center"
              className="mb-6"
            >
              <Button variant="default">Primary Action</Button>
              <Button variant="outline">Secondary Action</Button>
              <Button variant="ghost">Tertiary Action</Button>
            </ResponsiveStack>

            <ResponsiveStack 
              direction="horizontal-sm" 
              spacing="md" 
              align="center"
            >
              <div className="flex-1">
                <h4 className="font-semibold">Flexible Content</h4>
                <p className="text-sm text-muted-foreground">
                  This content adapts to available space
                </p>
              </div>
              <Button size="sm">Action</Button>
            </ResponsiveStack>
          </CardContent>
        </Card>

        {/* Button Responsiveness Test */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Button Responsiveness</CardTitle>
            <CardDescription>
              Buttons adapt their size and layout for different devices
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="w-full sm:w-auto">
                Full Width on Mobile
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Responsive Button
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button variant="default" className="touch-target">
                Touch Friendly
              </Button>
              <Button variant="secondary" className="touch-target">
                44px Min Height
              </Button>
              <Button variant="outline" className="touch-target">
                Accessible Size
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dark Mode Test */}
        <Card>
          <CardHeader>
            <CardTitle>Dark Mode Test</CardTitle>
            <CardDescription>
              All components should adapt to light and dark themes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Color Adaptation</h4>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-muted-foreground">
                    This content uses semantic colors that adapt to the theme.
                  </p>
                </div>
                <div className="p-4 bg-primary text-primary-foreground rounded-lg">
                  <p>Primary colored content</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Interactive Elements</h4>
                <Button variant="default" className="w-full">
                  Primary Button
                </Button>
                <Button variant="outline" className="w-full">
                  Outline Button
                </Button>
                <Button variant="ghost" className="w-full">
                  Ghost Button
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </ResponsiveContainer>
    </div>
  )
}
