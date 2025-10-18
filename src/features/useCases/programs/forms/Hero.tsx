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
import { resolveMediaUrl } from "@/lib/media";
import { IoChevronForwardOutline } from "react-icons/io5";
import ImageUploader from "@/components/ui/image-uploader";
import { useProgramsContext } from "@/features/domain/context/programs-context";

const ProgramsHero = () => {
  const { data, reload, loading } = useProgramsContext();
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
            <div className="mt-4">
              <img
                src={"/header.png"}
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
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-white">Home</span>
                    <IoChevronForwardOutline className="text-white" />
                    <span className="text-xs font-medium text-white">
                      {form.tagline}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProgramsHero;
