"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProgramsSection } from "@/features/domain/homepage"

interface ProgramsSectionEditorProps {
  data: ProgramsSection
  onUpdate: (data: ProgramsSection) => void
}

export function ProgramsSectionEditor({ data, onUpdate }: ProgramsSectionEditorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Programs Section</CardTitle>
        <CardDescription>
          Showcase of available programs and services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Badge variant="secondary" className="mb-2">Current Title</Badge>
          <p className="text-sm">{data.title}</p>
        </div>
        <div>
          <Badge variant="secondary" className="mb-2">Current Description</Badge>
          <p className="text-sm">{data.description}</p>
        </div>
        <div>
          <Badge variant="secondary" className="mb-2">Program Items ({data.items.length})</Badge>
          <div className="space-y-2">
            {data.items.map((program, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{program.title}</span>
                  <Badge variant="outline" className="text-xs">{program.slug}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{program.description}</p>
                <p className="text-xs text-muted-foreground">Image: {program.image}</p>
              </div>
            ))}
          </div>
        </div>
        {/* TODO: Add form fields */}
      </CardContent>
    </Card>
  )
}