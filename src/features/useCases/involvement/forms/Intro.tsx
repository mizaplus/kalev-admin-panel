import React, { useEffect, useState } from "react";

import { useMutations } from "@/lib/useMutations";

import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useInvolvementContext } from "@/features/domain/context/involvement-context";
import { toast } from "sonner";

const InvolvementInfo = () => {
  const { data, reload, loading } = useInvolvementContext();
  const intro = {
    title: data?.involvement?.title || "",
    description: data?.involvement?.description || "",
  };
  const introKey = {
    PK: data?.involvement?.key?.PK,
    SK: data?.involvement?.key?.SK,
  };

  const [preview, setPreview] = useState(false);
  const [form, setForm] = useState({
    title: intro.title,
    description: intro.description,
  });
  const { updateData, updating: saving } = useMutations();

  useEffect(() => {
    setForm({
      title: intro.title,
      description: intro.description,
    });
  }, [intro.title, intro.description]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    form.title.trim() !== "" && form.description.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!introKey.PK || !introKey.SK) return;
    if (!isFormValid) {
      toast.error("All fields are required.");
      return;
    }
    const res = await updateData([
      {
        PK: introKey.PK,
        SK: introKey.SK,
        details: {
          title: form.title,
          description: form.description,
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
          Edit Involvement Intro
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="!h-screen w-screen">
        <div className="max-w-7xl w-full mx-auto">
          <SheetHeader>
            <SheetTitle>Edit Involvement Intro</SheetTitle>
            <SheetDescription>
              Update the title and description for your involvement intro
              section.
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
              id="programs-intro-preview"
              checked={preview}
              onCheckedChange={setPreview}
            />
            <Label htmlFor="programs-intro-preview">Preview</Label>
          </div>
          {!preview ? (
            <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
              <Field>
                <FieldLabel htmlFor="programs-intro-title">title</FieldLabel>
                <FieldContent>
                  <Input
                    id="programs-intro-title"
                    name="title"
                    type="text"
                    placeholder="Enter title"
                    value={form.title}
                    onChange={handleChange}
                    disabled={loading || saving}
                    required
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="programs-intro-description">
                  Description
                </FieldLabel>
                <FieldContent>
                  <Textarea
                    id="programs-intro-description"
                    name="description"
                    placeholder="Enter description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    disabled={loading || saving}
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
            <div className="text-center mb-12 py-10 bg-gray-100 mt-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {form.title}
              </h2>
              <p className="text-base text-gray-600 max-w-xl mx-auto">
                {form.description}
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InvolvementInfo;
