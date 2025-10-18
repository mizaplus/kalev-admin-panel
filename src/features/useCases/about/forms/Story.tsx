import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import TextEditor from "@/components/ui/rich-text-editor";
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
import { useAboutContext } from "@/features/domain/context/about-context";
import { useUpdate } from "@/lib/useUpdate";
import { cleanupHtmlString } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

const Story = () => {
  const { updating, updateData } = useUpdate();
  const { data, reload, loading } = useAboutContext();
  const [form, setForm] = useState({
    content: data?.story.content || "",
  });
  const [preview, setPreview] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data?.story.key) {
      toast.error("Story key is missing. Cannot update.");
      return;
    }

    if (!form.content) {
      toast.error("Please fill in all fields.");
      return;
    }

    const payload = [
      {
        ...data?.story.key,
        details: {
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
                <TextEditor
                  label="Story"
                  value={form.content}
                  setValue={(val) =>
                    setForm((prev) => ({ ...prev, content: val }))
                  }
                  readOnly={updating || loading}
                />
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
            <div className="markdown p-5 bg-gray-100 mt-4 rounded-sm ml-3">
              <div
                className="markdown"
                dangerouslySetInnerHTML={{
                  __html: cleanupHtmlString(form.content),
                }}
              />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Story;
