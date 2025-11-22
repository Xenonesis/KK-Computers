"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Sun, Moon, Monitor } from "lucide-react"

export default function TestDarkModePage() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Dark Mode Test Page</h1>
          <p className="text-muted-foreground">
            This page tests all aspects of the dark mode functionality
          </p>
        </div>

        {/* Theme Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Theme Controls</CardTitle>
            <CardDescription>
              Current theme: <strong>{theme}</strong> | Resolved: <strong>{resolvedTheme}</strong> | System: <strong>{systemTheme}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <Button
                onClick={() => setTheme("light")}
                variant={theme === "light" ? "default" : "outline"}
              >
                <Sun className="mr-2 h-4 w-4" />
                Light
              </Button>
              <Button
                onClick={() => setTheme("dark")}
                variant={theme === "dark" ? "default" : "outline"}
              >
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </Button>
              <Button
                onClick={() => setTheme("system")}
                variant={theme === "system" ? "default" : "outline"}
              >
                <Monitor className="mr-2 h-4 w-4" />
                System
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Color Palette Test */}
        <Card>
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
            <CardDescription>All theme colors should adapt to dark mode</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="h-20 bg-background border rounded flex items-center justify-center">
                  background
                </div>
                <p className="text-xs text-center text-muted-foreground">Background</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-foreground text-background rounded flex items-center justify-center">
                  foreground
                </div>
                <p className="text-xs text-center text-muted-foreground">Foreground</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-primary text-primary-foreground rounded flex items-center justify-center">
                  primary
                </div>
                <p className="text-xs text-center text-muted-foreground">Primary</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-secondary text-secondary-foreground rounded flex items-center justify-center">
                  secondary
                </div>
                <p className="text-xs text-center text-muted-foreground">Secondary</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-accent text-accent-foreground rounded flex items-center justify-center">
                  accent
                </div>
                <p className="text-xs text-center text-muted-foreground">Accent</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-muted text-muted-foreground rounded flex items-center justify-center">
                  muted
                </div>
                <p className="text-xs text-center text-muted-foreground">Muted</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Components Test */}
        <Card>
          <CardHeader>
            <CardTitle>UI Components</CardTitle>
            <CardDescription>All components should work in both themes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Buttons */}
            <div>
              <h4 className="font-semibold mb-3">Buttons</h4>
              <div className="flex gap-2 flex-wrap">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Badges */}
            <div>
              <h4 className="font-semibold mb-3">Badges</h4>
              <div className="flex gap-2 flex-wrap">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>

            {/* Inputs */}
            <div>
              <h4 className="font-semibold mb-3">Input Fields</h4>
              <div className="space-y-2">
                <Input placeholder="Enter text here..." />
                <Input placeholder="Disabled input" disabled />
              </div>
            </div>

            {/* Cards */}
            <div>
              <h4 className="font-semibold mb-3">Nested Card</h4>
              <Card>
                <CardHeader>
                  <CardTitle>Nested Card Title</CardTitle>
                  <CardDescription>This is a card inside another card</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Content of the nested card should also adapt to dark mode.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Text Styles Test */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Different text styles and colors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold">Heading 1</h1>
              <h2 className="text-3xl font-semibold">Heading 2</h2>
              <h3 className="text-2xl font-semibold">Heading 3</h3>
              <h4 className="text-xl font-medium">Heading 4</h4>
            </div>
            <div className="space-y-2">
              <p className="text-foreground">Regular text (foreground)</p>
              <p className="text-muted-foreground">Muted text</p>
              <p className="text-blue-600 dark:text-blue-400">Blue text (adaptive)</p>
              <p className="text-purple-600 dark:text-purple-400">Purple text (adaptive)</p>
              <p className="text-green-600 dark:text-green-400">Green text (adaptive)</p>
              <p className="text-red-600 dark:text-red-400">Red text (adaptive)</p>
            </div>
          </CardContent>
        </Card>

        {/* Background Gradients Test */}
        <Card>
          <CardHeader>
            <CardTitle>Background Gradients</CardTitle>
            <CardDescription>Gradient backgrounds in both modes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-32 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg flex items-center justify-center">
              <span className="font-semibold">Blue to Purple Gradient</span>
            </div>
            <div className="h-32 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg flex items-center justify-center">
              <span className="font-semibold">Green to Emerald Gradient</span>
            </div>
          </CardContent>
        </Card>

        {/* Border and Shadow Test */}
        <Card>
          <CardHeader>
            <CardTitle>Borders and Shadows</CardTitle>
            <CardDescription>Testing border and shadow styles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                Border default
              </div>
              <div className="p-4 border-2 border-blue-600 dark:border-blue-400 rounded-lg">
                Colored border
              </div>
              <div className="p-4 shadow-md rounded-lg bg-card">
                Shadow medium
              </div>
              <div className="p-4 shadow-lg rounded-lg bg-card">
                Shadow large
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Message */}
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-green-800 dark:text-green-200 font-semibold">
            ✓ If you can see this message properly styled, dark mode is working correctly!
          </p>
        </div>
      </div>
    </div>
  )
}
