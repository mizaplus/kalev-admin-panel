// Hooks
import React, { useEffect, useMemo, useState } from "react";
import { useHomepageContext } from "@/features/domain/context/homepage-context";
import { updateHomePageAbout } from "@/lib/api/homepage";

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
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Utils
import { toast } from "sonner";
import { resolveMediaUrl } from "@/lib/media";

const FALLBACK_INTRO = "Nonprofit • You Make a Difference";
const FALLBACK_CONTENT =
  "Share your mission, impact, and the story behind your organization so supporters understand why your work matters.";

const About = () => {
  const { data, reload, loading } = useHomepageContext();
  const about = data?.about?.details;
  const aboutKey = data?.about?.key;

  const [preview, setPreview] = useState(false);
  const [form, setForm] = useState({
    title: about?.title || "",
    content: about?.content || "",
    image: about?.image || "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      title: about?.title || "",
      content: about?.content || "",
      image: about?.image || "",
    });
  }, [about?.title, about?.content, about?.image]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const isFormValid =
    form.title.trim() !== "" &&
    form.content.trim() !== "" &&
    form.image.trim() !== "";

  const { intro, body } = useMemo(() => {
    const segments = form.content
      .split(/\n+/)
      .map((segment) => segment.trim())
      .filter(Boolean);

    if (segments.length > 1) {
      return {
        intro: segments[0],
        body: segments.slice(1).join("\n\n"),
      };
    }

    return {
      intro: "",
      body: form.content,
    };
  }, [form.content]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!aboutKey) return;

    if (!isFormValid) {
      toast.error("All fields are required.");
      return;
    }

    setSaving(true);
    try {
      await updateHomePageAbout(aboutKey, form);
      toast.success("About section updated successfully!");
      await reload();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const imageSrc = resolveMediaUrl(form.image);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="!font-medium mt-3 !text-sm"
          size="sm"
        >
          Edit About Section
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="!h-screen">
        <div className="max-w-7xl w-full mx-auto">
          <SheetHeader>
            <SheetTitle>Edit About Information</SheetTitle>
            <SheetDescription>
              Update the story, mission, and image that describe your
              organization.
            </SheetDescription>
          </SheetHeader>
          <div className="flex items-center space-x-2 px-3">
            <Switch
              id="about-preview-toggle"
              checked={preview}
              onCheckedChange={setPreview}
            />
            <Label htmlFor="about-preview-toggle">Preview</Label>
          </div>
          {!preview ? (
            <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
              <Field>
                <FieldLabel htmlFor="about-title">Section title</FieldLabel>
                <FieldContent>
                  <Input
                    id="about-title"
                    name="title"
                    type="text"
                    placeholder="About Us"
                    value={form.title}
                    onChange={handleChange}
                    disabled={loading || saving}
                    required
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="about-content">Description</FieldLabel>
                <FieldContent>
                  <Textarea
                    id="about-content"
                    name="content"
                    placeholder="Share the mission and impact of your organisation."
                    value={form.content}
                    onChange={handleChange}
                    disabled={loading || saving}
                    required
                    className="min-h-[180px]"
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="about-image">Image URL</FieldLabel>
                <FieldContent>
                  <Input
                    id="about-image"
                    name="image"
                    type="text"
                    placeholder="https://..."
                    value={form.image}
                    onChange={handleChange}
                    disabled={loading || saving}
                    required
                  />
                </FieldContent>
              </Field>
              <div>
                <Button
                  type="submit"
                  size="sm"
                  disabled={loading || saving || !isFormValid}
                >
                  {saving ? (
                    <div className="flex items-center gap-2">
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
            <div className="mt-6 px-4">
              <div className="grid gap-8 rounded-lg border border-muted-foreground/10 bg-white p-6 shadow-sm md:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-4 flex flex-col justify-center">
                  <p className="text-xs font-normal uppercase tracking-wide text-muted-foreground">
                    {intro || FALLBACK_INTRO}
                  </p>
                  <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
                    {form.title || "About Us"}
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground whitespace-pre-line">
                    {body || FALLBACK_CONTENT}
                  </p>
                </div>
                <div className="relative overflow-hidden rounded-lg border border-muted-foreground/20 bg-muted/70">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={form.title || "About section image"}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full min-h-[260px] items-center justify-center text-sm text-muted-foreground">
                      Add an image URL to preview
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default About;
