"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HeroSection } from "@/features/domain/homepage"

interface HeroSectionEditorProps {
  data: HeroSection
  onUpdate: (data: HeroSection) => void
}

export function HeroSectionEditor({ data, onUpdate }: HeroSectionEditorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
        <CardDescription>
          Main banner content that appears at the top of the homepage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Badge variant="secondary" className="mb-2">Current Title</Badge>
            <p className="text-sm">{data.title}</p>
          </div>
          <div>
            <Badge variant="secondary" className="mb-2">Current Tagline</Badge>
            <p className="text-sm">{data.tagline}</p>
          </div>
        </div>
        <div>
          <Badge variant="secondary" className="mb-2">Current Image</Badge>
          <p className="text-sm text-muted-foreground">{data.image}</p>
        </div>
        {/* TODO: Add form fields */}
      </CardContent>
    </Card>
  )
}