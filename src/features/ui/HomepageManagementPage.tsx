"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Info, CheckCircle, Grid3X3, Edit3, Eye, ChevronRight } from "lucide-react"

export function HomepageManagementPage() {
  return (
    <div className="w-full px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Homepage Management</h1>
        <p className="text-gray-600 mt-2">
          Manage and customize content sections for your website homepage
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-4">
        {/* Hero Section */}
        <div className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">Hero Section</h3>
                  <Badge variant="secondary" className="text-xs">Required</Badge>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The main banner section featuring your primary message, call-to-action, and hero image that visitors see first
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="gap-2 bg-white hover:bg-gray-50 border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Edit3 className="h-4 w-4" />
              Edit Section
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* About Section */}
        <div className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Info className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">About Section</h3>
                  <Badge variant="secondary" className="text-xs">Required</Badge>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Share your organization&apos;s story, mission, and values to build trust and connection with your audience
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="gap-2 bg-white hover:bg-gray-50 border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Edit3 className="h-4 w-4" />
              Edit Section
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Choose Us Section */}
        <div className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-50 border border-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">Why Choose Us</h3>
                  <Badge variant="outline" className="text-xs">Optional</Badge>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Highlight key benefits and unique value propositions that set your organization apart from others
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="gap-2 bg-white hover:bg-gray-50 border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Edit3 className="h-4 w-4" />
              Edit Section
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Programs Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Grid3X3 className="h-6 w-6 text-orange-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-medium text-gray-700">Programs Showcase</h3>
                  <Badge variant="outline" className="text-xs border-gray-400 text-gray-600">Read Only</Badge>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Program content is managed through the dedicated Programs section and automatically displays here
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              disabled
              className="gap-2 bg-gray-100 border-gray-300 text-gray-500"
            >
              <Eye className="h-4 w-4" />
              View Only
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Changes are automatically saved as drafts. Use the preview function to see how your changes will look before publishing to the live website.
        </p>
      </div>
    </div>
  )
}
