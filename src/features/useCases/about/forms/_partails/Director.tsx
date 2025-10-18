import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAboutContext } from "@/features/domain/context/about-context";
import { useUpdate } from "@/lib/useUpdate";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldContent } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
// Removed Sheet imports
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import ImageUploader from "@/components/ui/image-uploader";
import { SheetClose } from "@/components/ui/sheet";
import TextEditor from "@/components/ui/rich-text-editor";

const Director = () => {
  const { data, reload, loading } = useAboutContext();
  const { updateData, updating } = useUpdate();
  const director = data?.team.director;
  const directorKey = director?.key;

  const [preview, setPreview] = useState(false);
  const [form, setForm] = useState({
    name: director?.name || "",
    image: director?.image || "",
    content: director?.content || "",
  });
  const [oldImage, setOldImage] = useState("");

  useEffect(() => {
    setForm({
      name: director?.name || "",
      image: director?.image || "",
      content: director?.content || "",
    });
  }, [director?.name, director?.image, director?.content]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValid =
    form.name.trim() !== "" &&
    form.image.trim() !== "" &&
    form.content.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!directorKey) {
      toast.error("Missing director content key.");
      return;
    }
    if (!isValid) {
      toast.error("Please complete all fields.");
      return;
    }
    const payload = [
      {
        PK: directorKey.PK,
        SK: directorKey.SK,
        details: {
          name: form.name,
          image: form.image,
          content: form.content,
        },
      },
    ];
    const res = await updateData(payload);
    if (res) {
      toast.success("Director updated");
      await reload();
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 mb-4">
        <Switch
          id="director-preview"
          checked={preview}
          onCheckedChange={setPreview}
        />
        <Label htmlFor="director-preview">Preview</Label>
      </div>
      {!preview ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="max-w-md flex flex-col gap-4">
            <Field>
              <FieldLabel htmlFor="director-name">Name</FieldLabel>
              <FieldContent>
                <Input
                  id="director-name"
                  name="name"
                  type="text"
                  placeholder="Director's name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={loading || updating}
                  required
                />
              </FieldContent>
            </Field>
            <Field>
              <ImageUploader
                label="Director Image"
                setValue={(val) => setForm((prev) => ({ ...prev, image: val }))}
                edit={{ oldValue: oldImage, setOldValue: setOldImage }}
                value={form.image}
              />
            </Field>
          </div>
          <TextEditor
            label="Director's Bio"
            value={form.content}
            setValue={(val) => setForm((prev) => ({ ...prev, content: val }))}
          />
          <div className="flex items-center gap-3">
            <Button
              type="submit"
              size="sm"
              disabled={loading || updating || !isValid}
            >
              {updating ? (
                <div className="flex items-center gap-2">
                  <Spinner /> Saving...
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
            <SheetClose asChild>
              <Button
                type="button"
                variant="outline"
                // Sheet handles closing internally
              >
                Cancel
              </Button>
            </SheetClose>
          </div>
        </form>
      ) : (
        <div className="p-8 flex flex-col items-center">
          {form.image ? (
            <img
              src={form.image}
              alt={form.name}
              className="rounded-full w-32 h-32 object-cover mb-4 border"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-4">
              No Image
            </div>
          )}
          <h2 className="text-xl font-bold mb-2">
            {form.name || "Director Name"}
          </h2>
          <div
            className="prose max-w-lg text-center"
            dangerouslySetInnerHTML={{
              __html: form.content || "<p>No bio provided.</p>",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Director;
