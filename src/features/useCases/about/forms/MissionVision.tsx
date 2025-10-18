import React, { useEffect, useState } from "react";
import { useAboutContext } from "@/features/domain/context/about-context";
import { useUpdate } from "@/lib/useUpdate";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { GiTrophy, GiFist } from "react-icons/gi";
import TextEditor from "@/components/ui/rich-text-editor";
import { cleanupHtmlString } from "@/lib/utils";

const MissionVision = () => {
  const { data, reload, loading } = useAboutContext();
  const { updateData, updating } = useUpdate();

  const mission = data?.info?.mission_vision;
  const objectives = data?.info?.objectives;
  const missionKey = mission?.key;
  const objectivesKey = objectives?.key;

  const [preview, setPreview] = useState(false);
  const [form, setForm] = useState({
    mission: mission?.mission || "",
    vision: mission?.vision || "",
    objectives: objectives?.content || "",
  });

  useEffect(() => {
    setForm({
      mission: mission?.mission || "",
      vision: mission?.vision || "",
      objectives: objectives?.content || "",
    });
  }, [mission?.mission, mission?.vision, objectives?.content]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = form.mission.trim() !== "" && form.vision.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!missionKey) {
      toast.error("Missing content key for Mission & Vision.");
      return;
    }

    if (!objectivesKey) {
      toast.error("Missing content ket for objectives");
      return;
    }

    if (!isValid) {
      toast.error("Please complete both mission and vision fields.");
      return;
    }

    const payload = [
      {
        PK: missionKey.PK,
        SK: missionKey.SK,
        details: {
          mission: form.mission,
          vision: form.vision,
        },
      },
      {
        ...objectivesKey,
        details: {
          content: form.objectives,
        },
      },
    ];

    const res = await updateData(payload);
    if (res) {
      toast.success("Mission & Vision updated");
      await reload();
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="!font-medium mt-3 !text-sm"
        >
          Edit Mission & Vision
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="!h-screen overflow-y-auto">
        <div className="max-w-7xl w-full mx-auto p-4">
          <SheetHeader>
            <SheetTitle>Edit Mission & Vision</SheetTitle>
            <SheetDescription>
              Update the mission and vision statements.
            </SheetDescription>
          </SheetHeader>

          <div className="flex items-center space-x-2 px-3">
            <Switch
              id="mv-preview"
              checked={preview}
              onCheckedChange={setPreview}
            />
            <Label htmlFor="mv-preview">Preview</Label>
          </div>

          {!preview ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
              <Field>
                <FieldLabel htmlFor="mission">Mission</FieldLabel>
                <FieldContent>
                  <Textarea
                    id="mission"
                    name="mission"
                    value={form.mission}
                    onChange={handleChange}
                    disabled={loading || updating}
                    required
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="vision">Vision</FieldLabel>
                <FieldContent>
                  <Textarea
                    id="vision"
                    name="vision"
                    value={form.vision}
                    onChange={handleChange}
                    disabled={loading || updating}
                    required
                  />
                </FieldContent>
              </Field>
              <Field>
                <TextEditor
                  label="Story"
                  value={form.objectives}
                  setValue={(val) =>
                    setForm((prev) => ({ ...prev, objectives: val }))
                  }
                  readOnly={updating || loading}
                />
              </Field>

              <div>
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
            <div className="p-10 border mt-3">
              <div className="grid grid-cols-2 gap-10 mb-10 max-sm:grid-cols-1">
                <div className="flex flex-col items-center gap-5">
                  <div className="size-24 bg-white shadow-sm border rounded-full border-gray-200 flex items-center justify-center">
                    <GiTrophy className="size-10 text-primary" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-bold">Our Mission</h4>
                    <p className="text-gray-600">{form.mission}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-5">
                  <div className="size-20 bg-white shadow-sm border rounded-full border-gray-200 flex items-center justify-center">
                    <GiFist className="size-10 text-primary" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-bold">Our Vision</h4>
                    <p className="text-gray-600">{form.vision}</p>
                  </div>
                </div>
              </div>
              <hr className="border-gray-200" />
              <div
                className="markdown mt-10"
                dangerouslySetInnerHTML={{
                  __html: cleanupHtmlString(form.objectives),
                }}
              />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MissionVision;
