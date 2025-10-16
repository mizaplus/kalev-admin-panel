import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldContent } from "@/components/ui/field";
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
import { useAboutContext } from "@/features/domain/context/about-context";
import { useUpdate } from "@/lib/useUpdate";
import { useState } from "react";
import { toast } from "sonner";

const Story = () => {
  const { updating, updateData } = useUpdate();
  const { data, reload, loading } = useAboutContext();
  const [form, setForm] = useState({
    title: data?.story.title || "",
    content: data?.story.content || "",
  });
  const [preview, setPreview] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data?.story.key) {
      toast.error("Story key is missing. Cannot update.");
      return;
    }

    if (!form.title || !form.content) {
      toast.error("Please fill in all fields.");
      return;
    }

    const payload = [
      {
        ...data?.story.key,
        details: {
          title: form.title,
          content: form.content,
        },
      },
    ];

    const res = await updateData(payload);
    if (res) {
      reload();
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
          Edit Story
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="w-screen h-screen">
        <div className="max-w-7xl mx-auto w-full">
          <SheetHeader>
            <SheetTitle>Edit Story</SheetTitle>
            <SheetDescription>
              Update the story behind Kalev Child Care Foundation.
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
                    disabled={updating || loading}
                    required
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="about-hero-headline">Story</FieldLabel>
                <FieldContent>
                  {/* <TextEditor
                  label="Story"
                  value={form.content}
                  setValue={(val) =>
                    setForm((prev) => ({ ...prev, content: val }))
                  }
                  readOnly={updating || loading}
                /> */}
                  <Textarea
                    id="about-hero-story"
                    name="content"
                    placeholder="Enter story"
                    value={form.content}
                    onChange={handleChange}
                    disabled={updating || loading}
                    required
                    className="h-[600px]"
                  />
                </FieldContent>
              </Field>
              <div className="flex items-center gap-5">
                <Button
                  type="submit"
                  disabled={updating}
                  onClick={handleSubmit}
                >
                  {updating ? <Spinner className="size-4 mr-2" /> : null}
                  {updating ? "Saving..." : "Save Changes"}
                </Button>
                <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
              </div>
            </form>
          ) : (
            <div className="markdown p-5 bg-gray-200 mt-4 rounded-sm ml-3">
              <h1 className="text-3xl mb-5 font-medium">{form.title}</h1>
              <div
                className="markdown"
                dangerouslySetInnerHTML={{ __html: form.content }}
              />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Story;
