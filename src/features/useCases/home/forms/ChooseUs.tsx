// Hooks
import React, { useEffect, useMemo, useState } from "react";
import { useHomepageContext } from "@/features/domain/context/homepage-context";
import { type ContentKey } from "@/lib/api/homepage";

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
import { cn } from "@/lib/utils";
import { useMutations } from "@/lib/useMutations";

type ReasonForm = {
  key?: ContentKey;
  title: string;
  description: string;
  icon: string;
  disabled: boolean;
};

const FALLBACK_REASONS: ReasonForm[] = [
  {
    title: "Compassionate Support",
    description:
      "Emotional and practical support for families at every stage, helping them feel empowered and guided.",
    icon: "icofont-heart",
    disabled: false,
  },
  {
    title: "Community Awareness",
    description:
      "Raising awareness to reduce stigma and create supportive communities for children and parents.",
    icon: "icofont-megaphone",
    disabled: false,
  },
  {
    title: "Inclusive Care",
    description:
      "Ensuring every child receives care regardless of background or income.",
    icon: "icofont-group",
    disabled: false,
  },
];

const DEFAULT_CHOOSE_US = {
  title: "Why Choose Us",
  description:
    "We provide compassionate care, expert guidance, and lifelong support so every child gets the opportunities they deserve.",
};

const ChooseUs = () => {
  const { updating: saving, updateData } = useMutations();
  const { data, reload, loading } = useHomepageContext();
  const chooseUs = data?.choose_us?.details;
  const chooseUsKey = data?.choose_us?.key;

  const [preview, setPreview] = useState(false);
  const mapReasons = (reasons?: unknown): ReasonForm[] => {
    if (!Array.isArray(reasons) || reasons.length === 0) {
      return FALLBACK_REASONS.map((reason) => ({ ...reason }));
    }

    return reasons.map((reason) => {
      const record = (reason ?? {}) as Record<string, unknown>;
      const base =
        record.details && typeof record.details === "object"
          ? (record.details as Partial<ReasonForm>)
          : (record as Partial<ReasonForm>);

      const key =
        record.key && typeof record.key === "object"
          ? (record.key as ContentKey)
          : undefined;

      return {
        key,
        title: base?.title || "",
        description: base?.description || "",
        icon: base?.icon || "",
        disabled: typeof base?.disabled === "boolean" ? base.disabled : false,
      };
    });
  };

  const [form, setForm] = useState({
    title: chooseUs?.title || "",
    description: chooseUs?.description || "",
    reasons: mapReasons(chooseUs?.reasons),
  });

  useEffect(() => {
    setForm({
      title: chooseUs?.title || "",
      description: chooseUs?.description || "",
      reasons: mapReasons(chooseUs?.reasons),
    });
  }, [chooseUs]);

  const updateReason = <K extends keyof ReasonForm>(
    index: number,
    field: K,
    value: ReasonForm[K],
  ) => {
    setForm((previous) => {
      const reasons = previous.reasons.map((reason, idx) =>
        idx === index ? { ...reason, [field]: value } : reason,
      );
      return { ...previous, reasons };
    });
  };

  // const addReason = () => {
  //   setForm((previous) => ({
  //     ...previous,
  //     reasons: [
  //       ...previous.reasons,
  //       { title: "", description: "", icon: "", disabled: false },
  //     ],
  //   }));
  // };

  const removeReason = (index: number) => {
    setForm((previous) => {
      if (previous.reasons.length <= 1) {
        return previous;
      }
      return {
        ...previous,
        reasons: previous.reasons.filter((_, idx) => idx !== index),
      };
    });
  };

  const isFormValid = useMemo(() => {
    if (
      form.title.trim() === "" ||
      form.description.trim() === "" ||
      form.reasons.length === 0
    ) {
      return false;
    }

    return form.reasons.every(
      (reason) =>
        reason.title.trim() !== "" &&
        reason.description.trim() !== "" &&
        reason.icon.trim() !== "",
    );
  }, [form]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) {
      toast.error("Fill in all fields before saving.");
      return;
    }

    const keyedReasons = form.reasons.filter(
      (reason) => reason.key && reason.key.PK && reason.key.SK,
    );

    if (!chooseUsKey) {
      toast.error("Missing content keys for update.");
      return;
    }

    if (keyedReasons.length === 0) {
      toast.error("At least one reason must have a valid content key.");
      return;
    }

    const updates: Array<any> = [];

    updates.push({
      ...chooseUsKey,
      details: {
        title: form.title,
        description: form.description,
      },
    });

    // Include Reasons that have keys (existing reasons)
    keyedReasons.forEach((reason) => {
      updates.push({
        ...reason.key!,
        details: {
          title: reason.title,
          description: reason.description,
          icon: reason.icon,
          disabled: reason.disabled,
        },
      });
    });

    if (updates.length === 0) {
      toast.error("No valid data to update.");
      return;
    }

    const res = await updateData(updates);
    if (!res) return;

    await reload();
  };

  const previewReasons = useMemo(() => {
    const active = form.reasons.filter((reason) => !reason.disabled);
    if (active.length > 0) {
      return active;
    }

    return FALLBACK_REASONS;
  }, [form.reasons]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="!font-medium mt-3 !text-sm"
          size="sm"
        >
          Edit Choose Us Section
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="!h-screen overflow-y-auto">
        <div className="max-w-7xl w-full mx-auto">
          <SheetHeader>
            <SheetTitle>Edit Why Choose Us</SheetTitle>
            <SheetDescription>
              Tailor your key value propositions and the reasons supporters
              connect with your organisation.
            </SheetDescription>
          </SheetHeader>
          <div className="flex items-center space-x-2 px-3">
            <Switch
              id="choose-preview-toggle"
              checked={preview}
              onCheckedChange={setPreview}
            />
            <Label htmlFor="choose-preview-toggle">Preview</Label>
          </div>
          {!preview ? (
            <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
              <div className="space-y-3 rounded-lg border border-muted-foreground/20 bg-muted/30 p-4">
                <Field>
                  <FieldLabel htmlFor="choose-title">Section title</FieldLabel>
                  <FieldContent>
                    <Input
                      id="choose-title"
                      name="title"
                      type="text"
                      placeholder="Why Choose Us"
                      value={form.title}
                      onChange={(event) =>
                        setForm((previous) => ({
                          ...previous,
                          title: event.target.value,
                        }))
                      }
                      disabled={loading || saving}
                      required
                    />
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel htmlFor="choose-description">
                    Section description
                  </FieldLabel>
                  <FieldContent>
                    <Textarea
                      id="choose-description"
                      name="description"
                      placeholder="Explain why families and supporters should trust your organisation."
                      value={form.description}
                      onChange={(event) =>
                        setForm((previous) => ({
                          ...previous,
                          description: event.target.value,
                        }))
                      }
                      disabled={loading || saving}
                      required
                      className="min-h-[120px]"
                    />
                  </FieldContent>
                </Field>
              </div>
              <div className="space-y-3 rounded-lg border border-muted-foreground/20 bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">
                    Reasons
                  </h3>
                  {/* <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={addReason}
                    disabled={loading || saving}
                  >
                    Add Reason
                  </Button> */}
                </div>
                <p className="text-xs text-muted-foreground">
                  Icons use the icofont set, e.g. <code>icofont-heart</code>.
                  Each reason needs a unique message and icon.
                </p>
                <div className="space-y-4">
                  {form.reasons.map((reason, index) => (
                    <div
                      key={index}
                      className="rounded-md border border-muted-foreground/20 bg-background p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-foreground">
                          Reason {index + 1}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Switch
                            id={`reason-hidden-${index}`}
                            checked={!reason.disabled}
                            onCheckedChange={(checked) =>
                              updateReason(index, "disabled", !checked)
                            }
                            disabled={loading || saving}
                          />
                          <Label
                            htmlFor={`reason-hidden-${index}`}
                            className="text-xs text-muted-foreground"
                          >
                            Visible
                          </Label>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="text-xs text-muted-foreground"
                            onClick={() => removeReason(index)}
                            disabled={
                              loading || saving || form.reasons.length <= 1
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 grid gap-3 md:grid-cols-2">
                        <Field>
                          <FieldLabel htmlFor={`reason-title-${index}`}>
                            Title
                          </FieldLabel>
                          <FieldContent>
                            <Input
                              id={`reason-title-${index}`}
                              value={reason.title}
                              placeholder="Compassionate Support"
                              onChange={(event) =>
                                updateReason(index, "title", event.target.value)
                              }
                              disabled={loading || saving}
                              required
                            />
                          </FieldContent>
                        </Field>
                        <Field>
                          <FieldLabel htmlFor={`reason-icon-${index}`}>
                            Icon class
                          </FieldLabel>
                          <FieldContent>
                            <Input
                              id={`reason-icon-${index}`}
                              value={reason.icon}
                              placeholder="icofont-heart"
                              onChange={(event) =>
                                updateReason(index, "icon", event.target.value)
                              }
                              disabled={loading || saving}
                              required
                            />
                          </FieldContent>
                        </Field>
                      </div>
                      <Field className="mt-3">
                        <FieldLabel htmlFor={`reason-description-${index}`}>
                          Description
                        </FieldLabel>
                        <FieldContent>
                          <Textarea
                            id={`reason-description-${index}`}
                            value={reason.description}
                            placeholder="Emotional and practical support to families at every stage."
                            onChange={(event) =>
                              updateReason(
                                index,
                                "description",
                                event.target.value,
                              )
                            }
                            disabled={loading || saving}
                            required
                            className="min-h-[100px]"
                          />
                        </FieldContent>
                      </Field>
                    </div>
                  ))}
                </div>
              </div>
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
              <div className="rounded-2xl border border-muted-foreground/10 bg-muted/60 p-8 shadow-sm">
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className="text-2xl font-semibold text-foreground">
                    {form.title.trim() || DEFAULT_CHOOSE_US.title}
                  </h2>
                  <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />
                  <p className="mt-4 text-sm leading-6 text-muted-foreground max-w-lg mx-auto">
                    {form.description.trim() || DEFAULT_CHOOSE_US.description}
                  </p>
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  {previewReasons.map((reason, index) => {
                    const iconClass = cn(
                      reason.icon.trim(),
                      reason.icon.includes("text-") ? "" : "text-primary",
                    );
                    return (
                      <div
                        key={`${reason.title}-${index}`}
                        className="flex flex-col items-center rounded-xl p-6 text-center"
                      >
                        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-white text-3xl text-primary shadow">
                          {iconClass.trim() ? (
                            <i className={iconClass.trim()} aria-hidden />
                          ) : (
                            <span className="text-base text-muted-foreground">
                              Icon
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">
                          {reason.title || "Reason title"}
                        </h3>
                        <p className="mt-2 text-xs leading-6 text-muted-foreground">
                          {reason.description || "Reason description"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChooseUs;
