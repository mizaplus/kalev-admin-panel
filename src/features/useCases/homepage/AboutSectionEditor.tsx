"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AboutSection } from "@/features/domain/homepage"

interface AboutSectionEditorProps {
  data: AboutSection
  onUpdate: (data: AboutSection) => void
}

export function AboutSectionEditor({ data, onUpdate }: AboutSectionEditorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Section</CardTitle>
        <CardDescription>
          Information about the organization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Badge variant="secondary" className="mb-2">Current Title</Badge>
          <p className="text-sm">{data.title}</p>
        </div>
        <div>
          <Badge variant="secondary" className="mb-2">Current Content</Badge>
          <p className="text-sm">{data.content}</p>
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