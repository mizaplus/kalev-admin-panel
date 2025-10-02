"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChooseUsSection } from "@/features/domain/homepage"

interface ChooseUsSectionEditorProps {
  data: ChooseUsSection
  onUpdate: (data: ChooseUsSection) => void
}

export function ChooseUsSectionEditor({ data, onUpdate }: ChooseUsSectionEditorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Us Section</CardTitle>
        <CardDescription>
          Reasons why users should choose your services
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
          <Badge variant="secondary" className="mb-2">Reasons ({data.reasons.length})</Badge>
          <div className="space-y-2">
            {data.reasons.map((reason, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{reason.title}</span>
                  {reason.disabled && <Badge variant="destructive" className="text-xs">Disabled</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">{reason.description}</p>
                <p className="text-xs text-muted-foreground">Icon: {reason.icon}</p>
              </div>
            ))}
          </div>
        </div>
        {/* TODO: Add form fields */}
      </CardContent>
    </Card>
  )
}