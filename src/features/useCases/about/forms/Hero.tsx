import React, { useEffect, useState } from "react";

import { useMutations } from "@/lib/useMutations";

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
import { toast } from "sonner";
import { useAboutContext } from "@/features/domain/context/about-context";
import ImageUploader from "@/components/ui/image-uploader";
import HeroPreview from "@/components/ui/hero";

const AboutHero = () => {
  const { data, reload, loading } = useAboutContext();
  const hero = data?.hero;
  const heroKey = data?.hero?.key;

  const [preview, setPreview] = useState(false);
  const [form, setForm] = useState({
    title: hero?.title || "",
    tagline: hero?.tagline || "",
    image: hero?.image || "",
  });
  const [oldImage, setOldImage] = useState("");
  const { updateData, updating: saving } = useMutations();

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

  // Use centralized updateData
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroKey) return;
    if (!isFormValid) {
      toast.error("All fields are required.");
      return;
    }
    const res = await updateData([
      {
        PK: heroKey.PK,
        SK: heroKey.SK,
        details: {
          title: form.title,
          tagline: form.tagline,
          image: form.image,
        },
      },
    ]);

    if (!res) return;

    await reload();
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
            <SheetTitle>Edit About Hero Section</SheetTitle>
            <SheetDescription>
              Update the main headline, subheading, and image for your about
              page hero section.
            </SheetDescription>
            {loading && (
              <div className="flex items-center gap-1">
                <Spinner className="size-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Syncing...
                </span>
              </div>
            )}
          </SheetHeader>
          <div className="flex items-center space-x-2 px-3">
            <Switch
              id="about-hero-preview"
              checked={preview}
              onCheckedChange={setPreview}
            />
            <Label htmlFor="about-hero-preview">Preview</Label>
          </div>
          {!preview ? (
            <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
              <Field>
                <FieldLabel htmlFor="about-hero-headline">Headline</FieldLabel>
                <FieldContent>
                  <Input
                    id="about-hero-headline"
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
                <FieldLabel htmlFor="about-hero-subheading">
                  Subheading
                </FieldLabel>
                <FieldContent>
                  <Textarea
                    id="about-hero-subheading"
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
                <ImageUploader
                  label="Background Image"
                  setValue={(val) =>
                    setForm((prev) => ({ ...prev, image: val }))
                  }
                  edit={{
                    oldValue: oldImage,
                    setOldValue: setOldImage,
                  }}
                  value={form.image}
                />
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
            <HeroPreview
              title={form.title}
              tagline={form.tagline}
              image={form.image}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AboutHero;
