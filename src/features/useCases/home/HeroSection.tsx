import React, { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageUploader from "@/components/ui/image-uploader";

// Utils
import { put } from "aws-amplify/api";
import { toast } from "sonner";

type HeroSectionProps = {
  trigger: React.ReactNode;
  dataKey: {
    PK: string;
    SK: string;
  };
  data: { title: string; tagline: string; image: string | null | undefined };
};

const HeroSection: React.FC<HeroSectionProps> = ({
  trigger,
  data,
  dataKey,
}) => {


  const [formData, setFormData] = useState<{
    title: string;
    tagline: string;
    image: string | null | undefined;
  }>({
    title: data.title || "",
    tagline: data.tagline || "",
    image: data.image || "",
  });
  const [loading, setLoading] = useState(false);


  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await put({
        apiName: "main",
        path: "/",
        options: {
          body: {
            ...dataKey,
            details: {
              title: formData.title || undefined,
              tagline: formData.tagline || undefined,
              image: formData.image || undefined,
            },
          } as never,
        },
      }).response;
      const body = await res.body.json();
      toast.success("Hero section updated successfully!");
      console.log("Save response:", body);
    } catch (error) {
      console.error("Error saving hero section:", error);
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="!w-screen h-screen" side="top">
        <div className="container max-w-7xl mx-auto w-full py-3">
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger
                value="preview"
                className="!font-medium !text-sm px-10"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger value="edit" className="!font-medium !text-sm px-10">
                Edit
              </TabsTrigger>
            </TabsList>
            <TabsContent className="w-full" value="preview"></TabsContent>
            <TabsContent className="w-full" value="edit">
              <SheetHeader>
                <SheetTitle>Edit Hero Section</SheetTitle>
                <SheetDescription>
                  Make changes to the hero section here. Click save when
                  you&apos;re done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-6 px-4 max-w-4xl">
                <div className="grid gap-3">
                  <Label>Title</Label>
                  <Input
                    value={formData.title}
                    onChange={e => setFormData((prev: typeof formData) => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="grid gap-3">
                  <Label>Tagline</Label>
                  <Input
                    value={formData.tagline}
                    onChange={e => setFormData((prev: typeof formData) => ({ ...prev, tagline: e.target.value }))}
                  />
                </div>
                <ImageUploader
                  label="Background Image"
                  value={formData.image || ""}
                  onChange={img => setFormData((prev: typeof formData) => ({ ...prev, image: img }))}
                />
              </div>
              <SheetFooter>
                <div className="flex flex-row gap-4">
                  <Button
                    type="button"
                    className="max-w-sm !text-sm !font-medium"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner className="mr-2 h-4 w-4" /> Saving...
                      </>
                    ) : (
                      "Save changes"
                    )}
                  </Button>
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      className="max-w-sm !text-sm !font-medium"
                    >
                      Cancel
                    </Button>
                  </SheetClose>
                </div>
              </SheetFooter>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HeroSection;
