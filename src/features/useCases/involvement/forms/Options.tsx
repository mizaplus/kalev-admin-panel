// Hooks
import React, { useEffect, useMemo, useState } from "react";
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
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";

// Utils
import { toast } from "sonner";
import { useMutations } from "@/lib/useMutations";

// Types
type OptionForm = {
  title: string;
  description: string;
  icon: string;
  buttonText: string;
  color: string;
  buttonLink: string;
  disabled: boolean;
  key?: { PK: string; SK: string };
};

const InvolvementOptions = () => {
  const { updateData, updating } = useMutations();
  const { data, reload, loading } = useInvolvementContext();
  const involvement = data?.involvement;
  // Only use options from context, no fallback
  const options: OptionForm[] = React.useMemo(
    () =>
      Array.isArray(involvement?.options)
        ? involvement.options.map((opt: any) => ({
            title: opt.title || "",
            description: opt.description || "",
            icon: opt.icon || "",
            buttonText: opt.buttonText || "",
            color: opt.color || "",
            buttonLink: opt.buttonLink || "",
            disabled: typeof opt.disabled === "boolean" ? opt.disabled : false,
            key: opt.key,
          }))
        : [],
    [involvement?.options],
  );

  const [preview, setPreview] = useState(false);
  const [form, setForm] = useState<OptionForm[]>(
    options.map((opt) => ({ ...opt })),
  );

  useEffect(() => {
    setForm(options.map((opt) => ({ ...opt })));
  }, [options]);

  const updateOption = (
    index: number,
    field: keyof OptionForm,
    value: OptionForm[keyof OptionForm],
  ) => {
    setForm((prev) =>
      prev.map((opt, idx) =>
        idx === index ? { ...opt, [field]: value } : opt,
      ),
    );
  };

  const removeOption = (index: number) => {
    setForm((prev) =>
      prev.length <= 1 ? prev : prev.filter((_, idx) => idx !== index),
    );
  };

  const isFormValid = useMemo(() => {
    return (
      form.length > 0 &&
      form.every(
        (opt) =>
          opt.title.trim() &&
          opt.description.trim() &&
          opt.icon.trim() &&
          opt.buttonText.trim() &&
          opt.buttonLink.trim() &&
          opt.color.trim(),
      )
    );
  }, [form]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Fill in all fields before saving.");
      return;
    }
    // Build payload for each option
    const updates = form.map((opt, idx) => ({
      PK: involvement?.options?.[idx]?.key?.PK || involvement?.key?.PK,
      SK: involvement?.options?.[idx]?.key?.SK || `OPTION#${idx + 1}`,
      details: {
        title: opt.title,
        description: opt.description,
        icon: opt.icon,
        buttonText: opt.buttonText,
        buttonLink: opt.buttonLink,
        color: opt.color,
        disabled: !!opt.disabled,
      },
    })) as any;
    const res = await updateData(updates);
    if (!res) return;
    await reload();
  };

  const previewOptions = useMemo(() => {
    return form.filter((opt) => !opt.disabled);
  }, [form]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="!font-medium mt-3 !text-sm"
          size="sm"
        >
          Edit Involvement Options
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="!h-screen overflow-y-auto">
        <div className="max-w-7xl w-full mx-auto">
          <SheetHeader>
            <SheetTitle>Edit Ways to Get Involved</SheetTitle>
            <SheetDescription>
              Update the options for donating, volunteering, and partnering.
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
              id="options-preview-toggle"
              checked={preview}
              onCheckedChange={setPreview}
            />
            <Label htmlFor="options-preview-toggle">Preview</Label>
          </div>
          {!preview ? (
            form.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No involvement options found.
              </div>
            ) : (
              <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
                <div className="space-y-3 rounded-lg border border-muted-foreground/20 bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">
                      Options
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Icons use the icofont set, e.g. <code>icofont-heart</code>.
                    Each option needs a unique message and icon.
                  </p>
                  <div className="space-y-4">
                    {form.map((opt, index) => (
                      <div
                        key={index}
                        className="rounded-md border border-muted-foreground/20 bg-background p-4"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-foreground">
                            Option {index + 1}
                          </h4>
                          <div className="flex items-center gap-2">
                            <Switch
                              id={`option-hidden-${index}`}
                              checked={!opt.disabled}
                              onCheckedChange={(checked) =>
                                updateOption(index, "disabled", !checked)
                              }
                              disabled={loading || updating}
                            />
                            <Label
                              htmlFor={`option-hidden-${index}`}
                              className="text-xs text-muted-foreground"
                            >
                              Visible
                            </Label>
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              className="text-xs text-muted-foreground"
                              onClick={() => removeOption(index)}
                              disabled={loading || updating || form.length <= 1}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3 grid gap-3 md:grid-cols-2">
                          <Field>
                            <FieldLabel htmlFor={`option-title-${index}`}>
                              Title
                            </FieldLabel>
                            <FieldContent>
                              <Input
                                id={`option-title-${index}`}
                                value={opt.title}
                                placeholder="Donate"
                                onChange={(event) =>
                                  updateOption(
                                    index,
                                    "title",
                                    event.target.value,
                                  )
                                }
                                disabled={loading || updating}
                                required
                              />
                            </FieldContent>
                          </Field>
                          <Field>
                            <FieldLabel htmlFor={`option-icon-${index}`}>
                              Icon class
                            </FieldLabel>
                            <FieldContent>
                              <Input
                                id={`option-icon-${index}`}
                                value={opt.icon}
                                placeholder="icofont-heart"
                                onChange={(event) =>
                                  updateOption(
                                    index,
                                    "icon",
                                    event.target.value,
                                  )
                                }
                                disabled={loading || updating}
                                required
                              />
                            </FieldContent>
                          </Field>
                        </div>
                        <Field className="mt-3">
                          <FieldLabel htmlFor={`option-description-${index}`}>
                            Description
                          </FieldLabel>
                          <FieldContent>
                            <Textarea
                              id={`option-description-${index}`}
                              value={opt.description}
                              placeholder="Your generosity helps fund medical care and supplies."
                              onChange={(event) =>
                                updateOption(
                                  index,
                                  "description",
                                  event.target.value,
                                )
                              }
                              disabled={loading || updating}
                              required
                              className="min-h-[100px]"
                            />
                          </FieldContent>
                        </Field>
                        <div className="mt-3 grid gap-3 md:grid-cols-2">
                          <Field>
                            <FieldLabel htmlFor={`option-buttonText-${index}`}>
                              Button Text
                            </FieldLabel>
                            <FieldContent>
                              <Input
                                id={`option-buttonText-${index}`}
                                value={opt.buttonText}
                                placeholder="Donate Now"
                                onChange={(event) =>
                                  updateOption(
                                    index,
                                    "buttonText",
                                    event.target.value,
                                  )
                                }
                                disabled={loading || updating}
                                required
                              />
                            </FieldContent>
                          </Field>
                          <Field>
                            <FieldLabel htmlFor={`option-buttonLink-${index}`}>
                              Button Link
                            </FieldLabel>
                            <FieldContent>
                              <Input
                                id={`option-buttonLink-${index}`}
                                value={opt.buttonLink}
                                placeholder="/donate"
                                onChange={(event) =>
                                  updateOption(
                                    index,
                                    "buttonLink",
                                    event.target.value,
                                  )
                                }
                                disabled={loading || updating}
                                required
                              />
                            </FieldContent>
                          </Field>
                        </div>
                        {/* <Field className="mt-3">
                          <FieldLabel htmlFor={`option-color-${index}`}>
                            Color
                          </FieldLabel>
                          <FieldContent>
                            <Input
                              id={`option-color-${index}`}
                              value={opt.color}
                              placeholder="blue"
                              onChange={(event) =>
                                updateOption(index, "color", event.target.value)
                              }
                              disabled={loading || updating}
                              required
                            />
                          </FieldContent>
                        </Field> */}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={loading || updating || !isFormValid}
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
            )
          ) : (
            <div className="mt-6 px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {data?.involvement.title}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {data?.involvement.description}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {previewOptions.map((option, index) => {
                  const colors = getColorClasses(option.color);
                  return (
                    <div
                      key={index}
                      className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 relative overflow-hidden"
                    >
                      {/* Background gradient overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      ></div>

                      <div className="relative z-10">
                        <div
                          className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mb-6 mx-auto ${colors.hoverBg} transition-colors duration-300`}
                        >
                          <i
                            className={`${option.icon} ${colors.text} text-2xl`}
                          ></i>
                        </div>
                        <h3
                          className={`text-2xl font-bold mb-4 text-gray-800 ${colors.hoverText} transition-colors duration-300 text-center`}
                        >
                          {option.title}
                        </h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                          {option.description}
                        </p>
                        <div className="text-center">
                          <a
                            href={option.buttonLink}
                            className={`bg-gradient-to-r ${colors.button} text-white px-6 py-3 rounded-lg transition-all duration-300 inline-block font-medium shadow-lg hover:shadow-xl transform hover:scale-105`}
                            target="_blank"
                          >
                            {option.buttonText}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const getColorClasses = (color: string) => {
  const colorMap = {
    blue: {
      gradient: "from-blue-50",
      bg: "bg-blue-100",
      hoverBg: "group-hover:bg-blue-200",
      text: "text-blue-600",
      hoverText: "group-hover:text-blue-700",
      button: "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
    },
    green: {
      gradient: "from-green-50",
      bg: "bg-green-100",
      hoverBg: "group-hover:bg-green-200",
      text: "text-green-600",
      hoverText: "group-hover:text-green-700",
      button:
        "from-green-600 to-green-700 hover:from-green-700 hover:to-green-800",
    },
    orange: {
      gradient: "from-orange-50",
      bg: "bg-orange-100",
      hoverBg: "group-hover:bg-orange-200",
      text: "text-orange-600",
      hoverText: "group-hover:text-orange-700",
      button:
        "from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800",
    },
  };
  return colorMap[color as keyof typeof colorMap] || colorMap.blue;
};

export default InvolvementOptions;
