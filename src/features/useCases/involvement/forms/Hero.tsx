// Hooks
import React, { useEffect, useState } from "react";
import { useInvolvementContext } from "@/features/domain/context/involvement-context";

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
import { toast } from "sonner";
import ImageUploader from "@/components/ui/image-uploader";
import { useMutations } from "@/lib/useMutations";
import HeroPreview from "@/components/ui/hero";

// Utils
// (none needed)

// Types
// (none needed)

const InvolvementHero = () => {
  const { updateData, updating } = useMutations();
  const { data, reload, loading } = useInvolvementContext();
  const hero = data?.hero;
  const heroKey = data?.hero?.key;

  const [preview, setPreview] = useState(false);
  const [form, setForm] = useState({
    title: hero?.title || "",
    tagline: hero?.tagline || "",
    image: hero?.image || "",
  });
  const [oldImage, setOldImage] = useState("");

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
            <SheetTitle>Edit Get Involved Hero Section</SheetTitle>
            <SheetDescription>
              Update the main headline, subheading, and image for your Get
              Involved page hero section.
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
              id="involvement-hero-preview"
              checked={preview}
              onCheckedChange={setPreview}
            />
            <Label htmlFor="involvement-hero-preview">Preview</Label>
          </div>
          {!preview ? (
            <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
              <Field>
                <FieldLabel htmlFor="involvement-hero-headline">
                  Headline
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="involvement-hero-headline"
                    name="title"
                    type="text"
                    placeholder="Enter headline"
                    value={form.title}
                    onChange={handleChange}
                    disabled={loading || updating}
                    required
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="involvement-hero-subheading">
                  Subheading
                </FieldLabel>
                <FieldContent>
                  <Textarea
                    id="involvement-hero-subheading"
                    name="tagline"
                    placeholder="Enter subheading"
                    value={form.tagline}
                    onChange={handleChange}
                    required
                    disabled={loading || updating}
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
                  disabled={loading || updating || !isFormValid}
                >
                  {updating ? (
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
                    disabled={loading || updating}
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

export default InvolvementHero;
