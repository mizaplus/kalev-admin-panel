// Hooks
import { useAboutContext } from "@/features/domain/context/about-context";
import { useMutations } from "@/lib/useMutations";
import { useState } from "react";

// UI Components
import { Button } from "@/components/ui/button";
import DeleteItem from "@/components/ui/delete-item";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import ImageUploader from "@/components/ui/image-uploader";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { resolveMediaUrl } from "@/lib/media";
import { IoTrashBinOutline } from "react-icons/io5";
import { toast } from "sonner";

// Utils
import { v4 } from "uuid";

const Members = () => {
  const { data, reload } = useAboutContext();
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const { addData, updating } = useMutations();
  const [form, setForm] = useState({
    name: "",
    role: "",
    image: "",
  });

  const handleCreateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    // Check if all fields are filled except image
    if (form.name.trim() === "") {
      toast.error("Please enter the member's name.");
      return;
    }

    if (form.role.trim() === "") {
      toast.error("Please enter the member's role.");
      return;
    }

    const id = v4().replaceAll("-", "");

    const newMember = {
      PK: "ABOUT",
      SK: `TEAM#MEMBER#${id}`,
      details: {
        name: form.name,
        role: form.role,
        image: form.image || "user.png",
      },
    };

    const res = await addData([newMember]);
    if (res) {
      toast.success("Member added successfully.");
      setForm({ name: "", role: "", image: "" });
      setAddMemberOpen(false);
      reload();
    }
  };

  return (
    <div className="w-full mt-3">
      <div className="flex items-center justify-between mb-3">
        {addMemberOpen ? (
          <h4 className="text-lg font-semibold">
            <span className="text-primary">Add</span> Team Member
          </h4>
        ) : (
          <h4 className="text-lg font-semibold">
            <span className="text-primary">Our</span> Team Members (
            {data?.team.members.length})
          </h4>
        )}
        <Button
          variant="outline"
          onClick={() => setAddMemberOpen(!addMemberOpen)}
        >
          {addMemberOpen ? "Cancel" : "Add Member"}
        </Button>
      </div>
      {!addMemberOpen ? (
        <div className="grid lg:grid-cols-4 gap-10 max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {data?.team.members.map((member, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-md overflow-hidden relative"
            >
              <DeleteItem
                itemKey={{
                  PK: member.key.PK,
                  SK: member.key.SK,
                }}
                trigger={
                  <div className="absolute top-2 right-2 bg-white shadow-sm size-10 rounded-full px-2 py-1 text-xs font-semibold z-10 flex items-center justify-center hover:bg-red-100 cursor-pointer">
                    <IoTrashBinOutline className="size-4 text-red-600" />
                  </div>
                }
              />
              <div className="h-64 bg-gray-100/50 relative">
                <img
                  src={resolveMediaUrl(member.image)}
                  className="object-cover object-center w-full h-full"
                  alt=""
                />
              </div>
              <div className="p-5">
                <h5 className="font-semibold">{member.name}</h5>
                <p className="text-sm text-primary font-semibold">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <form
          className="flex flex-col gap-4 max-w-md"
          onSubmit={handleCreateMember}
        >
          <Field>
            <FieldLabel htmlFor="about-hero-headline">Member Name</FieldLabel>
            <FieldContent>
              <Input
                id="about-hero-headline"
                name="title"
                type="text"
                placeholder="Member Name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                disabled={updating}
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="about-hero-headline">Member Role</FieldLabel>
            <FieldContent>
              <Input
                id="about-hero-headline"
                name="role"
                type="text"
                placeholder="Member's Role"
                value={form.role}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, role: e.target.value }))
                }
                required
              />
            </FieldContent>
          </Field>
          <Field>
            <ImageUploader
              label="Member Photo"
              setValue={(val) => {
                setForm((prev) => ({ ...prev, image: val }));
              }}
              value={form.image}
              disabled={updating}
            />
          </Field>
          <Button type="submit" size="sm" disabled={updating}>
            {updating ? (
              <div className="flex items-center gap-2">
                <Spinner /> Saving...
              </div>
            ) : (
              "Add Member"
            )}
          </Button>
        </form>
      )}
    </div>
  );
};

export default Members;
