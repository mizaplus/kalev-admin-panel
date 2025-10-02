"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface HeroSectionEditorProps {
  initialData?: {
    title: string;
    tagline: string;
    image: string;
  };
  sectionKey: {
    PK: string;
    SK: string;
  };
  onRefresh?: () => void;
  children: React.ReactNode;
}

export function HeroSectionEditor({
  initialData,
  sectionKey,
  onRefresh,
  children,
}: HeroSectionEditorProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    tagline: initialData?.tagline || "",
    image: initialData?.image || "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Prepare the payload for PUT request
      const payload = {
        PK: sectionKey.PK,
        SK: sectionKey.SK,
        details: {
          title: formData.title,
          tagline: formData.tagline,
          image: formData.image,
        },
      };

      const response = await fetch(
        "https://frmw9v5tz3.execute-api.eu-west-2.amazonaws.com/Prod/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to save: ${response.status} ${response.statusText}`
        );
      }

      // Show success notification

      // Close dialog
      setIsOpen(false);

      toast.success("Hero section updated successfully");

      // Refresh parent data if callback provided
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error("Failed to save hero section:", error);

      // Show error notification
      const errorMessage =
        error instanceof Error ? error.message : "Failed to save hero section";
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Reset form when dialog opens
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && initialData) {
      setFormData({
        title: initialData.title || "",
        tagline: initialData.tagline || "",
        image: initialData.image || "",
      });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Hero Section</AlertDialogTitle>
          <AlertDialogDescription>
            Update the main banner content that appears at the top of your
            homepage
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-6 py-4">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="hero-title" className="text-sm font-medium">
              Main Title
            </Label>
            <Input
              id="hero-title"
              placeholder="Enter your main headline..."
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full"
              disabled={isSaving}
            />
            <p className="text-xs text-gray-600">
              This will be the primary headline visitors see first
            </p>
          </div>

          {/* Tagline Field */}
          <div className="space-y-2">
            <Label htmlFor="hero-tagline" className="text-sm font-medium">
              Tagline/Subtitle
            </Label>
            <Textarea
              id="hero-tagline"
              placeholder="Enter your supporting message or tagline..."
              value={formData.tagline}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleInputChange("tagline", e.target.value)
              }
              className="w-full min-h-[100px] resize-none"
              disabled={isSaving}
            />
            <p className="text-xs text-gray-600">
              Supporting text that explains your value proposition
            </p>
          </div>

          {/* Image Field */}
          <div className="space-y-2">
            <Label htmlFor="hero-image" className="text-sm font-medium">
              Hero Image URL
            </Label>
            <Input
              id="hero-image"
              placeholder="https://example.com/hero-image.jpg"
              value={formData.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              className="w-full"
              disabled={isSaving}
            />
            <p className="text-xs text-gray-600">
              URL of the main hero image (recommended: 1200x600px or larger)
            </p>
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Preview</Label>
              <div className="border rounded-lg p-4 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formData.image}
                  alt="Hero preview"
                  className="w-full h-32 object-cover rounded-md"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel disabled={isSaving}>Cancel</AlertDialogCancel>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
