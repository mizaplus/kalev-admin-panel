import React, { useState } from "react";

// UI Components
import { Button } from "@/components/ui/button";
import DeleteItem from "@/components/ui/delete-item";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import ImageUploader from "@/components/ui/image-uploader";
import { Input } from "@/components/ui/input";
import TextEditor from "@/components/ui/rich-text-editor";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useProgramsContext } from "@/features/domain/context/programs-context";
import { resolveMediaUrl } from "@/lib/media";
import { useMutations } from "@/lib/useMutations";
import type { ProgramItem } from "@/store/programs/types";
import { IoTrashBinOutline } from "react-icons/io5";
import { toast } from "sonner";

const Programs: React.FC = () => {
  const { data, reload, loading } = useProgramsContext();
  const { addData, updating } = useMutations();
  const [addProgramOpen, setAddProgramOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    content: "",
  });
  const programs = data?.programs.items;

  const handleCreateProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.image || !form.content) {
      toast.error("Please complete all fields.");
      return;
    }

    const slug = form.title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const slugExists = programs?.some((prog) => prog.slug === slug);
    if (slugExists) {
      toast.error(
        "A program with this title already exists. Please choose a different title.",
      );
      return;
    }

    const res = await addData([
      {
        PK: "PROGRAMS",
        SK: `PROGRAM#${slug}`,
        details: {
          title: form.title,
          description: form.description,
          image: form.image,
          content: form.content,
          slug,
        },
      },
    ]);

    if (res) {
      setForm({
        title: "",
        description: "",
        image: "",
        content: "",
      });
      setAddProgramOpen(false);
      toast.success("Program added successfully.");
      reload();
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
          Edit Programs
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-screen w-screen overflow-y-auto pb-5"
      >
        <div className="max-w-7xl w-full mx-auto">
          <SheetHeader className="max-w-7xl">
            <SheetTitle>Edit Programs</SheetTitle>
            <SheetDescription>
              Modify your team's information and details here.
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

          <div className="px-4">
            <div className="flex items-center justify-between mb-3">
              {addProgramOpen ? (
                <h4 className="text-lg font-semibold">
                  <span className="text-primary">Add</span> Program
                </h4>
              ) : (
                <h4 className="text-lg font-semibold">
                  <span className="text-primary">Our</span> Programs (
                  {programs?.length || 0})
                </h4>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  if (updating) return;
                  if (addProgramOpen) {
                    setForm({
                      title: "",
                      description: "",
                      image: "",
                      content: "",
                    });
                  }
                  setAddProgramOpen(!addProgramOpen);
                }}
              >
                {addProgramOpen ? "Cancel" : "Add Program"}
              </Button>
            </div>
            {!addProgramOpen ? (
              <div className="grid grid-cols-3 gap-4">
                {programs?.map((program) => (
                  <ProgramCard
                    key={program.slug || program.title}
                    program={program}
                    edit
                  />
                ))}
              </div>
            ) : (
              <>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={handleCreateProgram}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4">
                      <Field>
                        <FieldLabel htmlFor="about-hero-headline">
                          Name{" "}
                          <span className="text-xs text-gray-500">
                            ({80 - form.title.length} chars left)
                          </span>
                        </FieldLabel>
                        <FieldContent>
                          <Input
                            id="about-hero-headline"
                            name="title"
                            type="text"
                            placeholder="Program Title"
                            value={form.title}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                            required
                            maxLength={80}
                            disabled={updating}
                          />
                        </FieldContent>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="about-hero-headline">
                          Description{" "}
                          <span className="text-xs text-gray-500">
                            ({120 - form.description.length} chars left)
                          </span>
                        </FieldLabel>
                        <FieldContent>
                          <Textarea
                            id="about-hero-headline"
                            name="role"
                            placeholder="A brief description of the program"
                            value={form.description}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                description: e.target.value,
                              }))
                            }
                            className="min-h-[200px]"
                            required
                            maxLength={120}
                            disabled={updating}
                          />
                        </FieldContent>
                      </Field>
                    </div>
                    <div>
                      <Field>
                        <ImageUploader
                          label="Cover Photo"
                          setValue={(val) => {
                            setForm((prev) => ({ ...prev, image: val }));
                          }}
                          value={form.image}
                          disabled={updating}
                        />
                      </Field>
                    </div>
                  </div>

                  <Field>
                    <TextEditor
                      value={form.content}
                      setValue={(val) =>
                        setForm((prev) => ({ ...prev, content: val }))
                      }
                      readOnly={updating}
                    />
                  </Field>
                  <div className="py-3 flex items-center gap-3">
                    <Button type="submit" size="sm" disabled={updating}>
                      {updating ? (
                        <div className="flex items-center gap-2">
                          <Spinner /> Saving...
                        </div>
                      ) : (
                        "Add Program"
                      )}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const ProgramCard: React.FC<{ program: ProgramItem; edit?: boolean }> = ({
  program,
  edit,
}) => (
  <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden">
    <div className="h-48 sm:h-56 md:h-64 relative overflow-hidden">
      <img
        src={resolveMediaUrl(program.image)}
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {!edit ? (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full bg-white/90 backdrop-blur-sm z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg">
          <i className="icofont-heart-alt text-primary text-lg sm:text-xl"></i>
        </div>
      ) : (
        <DeleteItem
          itemKey={{
            ...program.key,
          }}
          trigger={
            <div className="absolute top-2 right-2 bg-white shadow-sm size-10 rounded-full px-2 py-1 text-xs font-semibold z-10 duration-500 flex items-center justify-center hover:bg-red-500 cursor-pointer hover:text-white">
              <IoTrashBinOutline className="size-4" />
            </div>
          }
        />
      )}
    </div>
    <div className="p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
        {program.title}
      </h3>
      <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed line-clamp-3 text-sm sm:text-base">
        {program.description}
      </p>
      <a
        href={`/programs/${program.slug}`}
        className="inline-flex items-center gap-2 font-medium text-primary hover:text-primary/80 transition-colors duration-300 group/link text-sm sm:text-base"
      >
        Learn More
        <i className="icofont-rounded-right text-xs sm:text-sm group-hover/link:translate-x-1 transition-transform duration-300"></i>
      </a>
    </div>
  </div>
);

export default Programs;
