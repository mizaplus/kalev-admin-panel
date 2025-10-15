// Hooks
import React, { useEffect, useState } from "react";
import { useHomepageContext } from "@/features/domain/context/homepage-context";
import { updateHomePageHero } from "@/lib/api/homepage";

// UI Components
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldContent } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Utils
import { toast } from "sonner";
import { resolveMediaUrl } from "@/lib/media";

const Hero = () => {
  const { data, reload, loading } = useHomepageContext();
  const hero = data?.hero?.details;
  const heroKey = data?.hero?.key;

  const [preview, setPreview] = useState(false);
  const [form, setForm] = useState({
    title: hero?.title || "",
    tagline: hero?.tagline || "",
    image: hero?.image || "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      title: hero?.title || "",
      tagline: hero?.tagline || "",
      image: hero?.image || "",
    });
  }, [hero?.title, hero?.tagline, hero?.image]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    form.title.trim() !== "" &&
    form.tagline.trim() !== "" &&
    form.image.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroKey) return;
    if (!isFormValid) {
      toast.error("All fields are required.");
      return;
    }
    setSaving(true);
    try {
      await updateHomePageHero(heroKey, form);
      toast.success("Hero section updated successfully!");
      await reload();
    } catch (err) {
      // Optionally handle error
      console.error(err);
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="!font-medium mt-3 !text-sm"
          size="sm"
        >
          Edit Hero Section
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="!h-screen">
        <div className="max-w-7xl w-full mx-auto">
          <SheetHeader>
            <SheetTitle>Edit Hero Section</SheetTitle>
            <SheetDescription>
              Update the main headline, subheading, and image for your homepage
              hero section.
            </SheetDescription>
          </SheetHeader>
          <div className="flex items-center space-x-2 px-3">
            <Switch
              id="airplane-mode"
              checked={preview}
              onCheckedChange={setPreview}
            />
            <Label htmlFor="airplane-mode">Preview</Label>
          </div>
          {!preview ? (
            <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
              <Field>
                <FieldLabel htmlFor="hero-headline">Headline</FieldLabel>
                <FieldContent>
                  <Input
                    id="hero-headline"
                    name="title"
                    type="text"
                    placeholder="Enter headline"
                    value={form.title}
                    onChange={handleChange}
                    disabled={loading || saving}
                    required
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="hero-subheading">Subheading</FieldLabel>
                <FieldContent>
                  <Textarea
                    id="hero-subheading"
                    name="tagline"
                    placeholder="Enter subheading"
                    value={form.tagline}
                    onChange={handleChange}
                    required
                    disabled={loading || saving}
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="hero-image">Image URL</FieldLabel>
                <FieldContent>
                  <Input
                    id="hero-image"
                    name="image"
                    type="text"
                    placeholder="Enter image URL"
                    value={form.image}
                    onChange={handleChange}
                    disabled={loading || saving}
                    required
                  />
                </FieldContent>
              </Field>
              <div className="">
                <Button
                  type="submit"
                  size={"sm"}
                  disabled={loading || saving || !isFormValid}
                >
                  {saving ? (
                    <div className="flex gap-2 items-center">
                      <Spinner /> Saving...
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    className="!font-medium mt-3 !text-sm ml-3"
                    size="sm"
                    disabled={loading || saving}
                  >
                    Cancel
                  </Button>
                </SheetClose>
              </div>
            </form>
          ) : (
            <div className="mt-4">
              <img
                src="/header.png"
                alt="Header Image"
                className="border border-gray-300"
              />
              <div
                className="h-[500px] bg-cover bg-center flex flex-col items-center justify-center overflow-hidden rounded"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.6)), url(${resolveMediaUrl(
                    form.image,
                  )})`,
                }}
              >
                <div className="relative z-10 p-8 flex flex-col items-center justify-center">
                  <h1 className="text-2xl font-semibold text-white drop-shadow">
                    {form.title || "Headline goes here"}
                  </h1>
                  <p className="mt-2 text-sm text-white max-w-sm text-center">
                    {form.tagline || "Subheading goes here"}
                  </p>
                  <Button size="lg" className="mt-4">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Hero;
