// Hooks
import React, { useEffect, useState } from "react";

// UI Components
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
import { Textarea } from "@/components/ui/textarea";
import { useContactContext } from "@/features/domain/context/contact-context";
import { useMutations } from "@/lib/useMutations";
import { toast } from "sonner";

// Utils
// (none needed)

// Types
// (none needed)

const ContactForm = () => {
  const { updateData, updating } = useMutations();
  const { data, reload, loading } = useContactContext();
  const contact = data?.contact;
  const contactKey = contact?.key;

  const [form, setForm] = useState({
    title: contact?.title || "",
    description: contact?.description || "",
    phone: contact?.phone || "",
    email: contact?.email || "",
    address: {
      poBox: contact?.address?.poBox || "",
      country: contact?.address?.country || "",
      city: contact?.address?.city || "",
      street: contact?.address?.street || "",
      organization: contact?.address?.organization || "",
    },
    socialMedia: {
      twitter: contact?.socialMedia?.twitter || "",
      instagram: contact?.socialMedia?.instagram || "",
      linkedin: contact?.socialMedia?.linkedin || "",
      tiktok: contact?.socialMedia?.tiktok || "",
    },
  });

  useEffect(() => {
    setForm({
      title: contact?.title || "",
      description: contact?.description || "",
      phone: contact?.phone || "",
      email: contact?.email || "",
      address: {
        poBox: contact?.address?.poBox || "",
        country: contact?.address?.country || "",
        city: contact?.address?.city || "",
        street: contact?.address?.street || "",
        organization: contact?.address?.organization || "",
      },
      socialMedia: {
        twitter: contact?.socialMedia?.twitter || "",
        instagram: contact?.socialMedia?.instagram || "",
        linkedin: contact?.socialMedia?.linkedin || "",
        tiktok: contact?.socialMedia?.tiktok || "",
      },
    });
  }, [contact]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [name]: value,
      },
    }));
  };

  const isFormValid =
    form.title.trim() !== "" &&
    form.description.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.email.trim() !== "" &&
    form.address.poBox.trim() !== "" &&
    form.address.country.trim() !== "" &&
    form.address.city.trim() !== "" &&
    form.address.street.trim() !== "" &&
    form.address.organization.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactKey) return;
    if (!isFormValid) {
      toast.error("All fields are required.");
      return;
    }
    const res = await updateData([
      {
        PK: contactKey.PK,
        SK: contactKey.SK,
        details: {
          ...form,
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
          Edit Contact Section
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="!h-screen overflow-y-auto">
        <div className="max-w-7xl w-full mx-auto">
          <SheetHeader>
            <SheetTitle>Edit Contact Section</SheetTitle>
            <SheetDescription>
              Update contact details, address, and social media links.
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
          <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
            {/* ...all form fields as before... */}
            <Field>
              <FieldLabel htmlFor="contact-title">Section Title</FieldLabel>
              <FieldContent>
                <Input
                  id="contact-title"
                  name="title"
                  type="text"
                  placeholder="Get In Touch"
                  value={form.title}
                  onChange={handleChange}
                  disabled={loading || updating}
                  required
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="contact-description">Description</FieldLabel>
              <FieldContent>
                <Textarea
                  id="contact-description"
                  name="description"
                  placeholder="Contact description"
                  value={form.description}
                  onChange={handleChange}
                  disabled={loading || updating}
                  required
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="contact-phone">Phone</FieldLabel>
              <FieldContent>
                <Input
                  id="contact-phone"
                  name="phone"
                  type="text"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={loading || updating}
                  required
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="contact-email">Email</FieldLabel>
              <FieldContent>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                  disabled={loading || updating}
                  required
                />
              </FieldContent>
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="contact-poBox">P.O. Box</FieldLabel>
                <FieldContent>
                  <Input
                    id="contact-poBox"
                    name="poBox"
                    type="text"
                    placeholder="P.O. Box"
                    value={form.address.poBox}
                    onChange={handleAddressChange}
                    disabled={loading || updating}
                    required
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-country">Country</FieldLabel>
                <FieldContent>
                  <Input
                    id="contact-country"
                    name="country"
                    type="text"
                    placeholder="Country"
                    value={form.address.country}
                    onChange={handleAddressChange}
                    disabled={loading || updating}
                    required
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-city">City</FieldLabel>
                <FieldContent>
                  <Input
                    id="contact-city"
                    name="city"
                    type="text"
                    placeholder="City"
                    value={form.address.city}
                    onChange={handleAddressChange}
                    disabled={loading || updating}
                    required
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-street">Street</FieldLabel>
                <FieldContent>
                  <Input
                    id="contact-street"
                    name="street"
                    type="text"
                    placeholder="Street"
                    value={form.address.street}
                    onChange={handleAddressChange}
                    disabled={loading || updating}
                    required
                  />
                </FieldContent>
              </Field>
              <Field className="md:col-span-2">
                <FieldLabel htmlFor="contact-organization">
                  Organization
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="contact-organization"
                    name="organization"
                    type="text"
                    placeholder="Organization"
                    value={form.address.organization}
                    onChange={handleAddressChange}
                    disabled={loading || updating}
                    required
                  />
                </FieldContent>
              </Field>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="contact-twitter">Twitter</FieldLabel>
                <FieldContent>
                  <Input
                    id="contact-twitter"
                    name="twitter"
                    type="text"
                    placeholder="Twitter handle"
                    value={form.socialMedia.twitter}
                    onChange={handleSocialChange}
                    disabled={loading || updating}
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-instagram">Instagram</FieldLabel>
                <FieldContent>
                  <Input
                    id="contact-instagram"
                    name="instagram"
                    type="text"
                    placeholder="Instagram handle"
                    value={form.socialMedia.instagram}
                    onChange={handleSocialChange}
                    disabled={loading || updating}
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-linkedin">LinkedIn</FieldLabel>
                <FieldContent>
                  <Input
                    id="contact-linkedin"
                    name="linkedin"
                    type="text"
                    placeholder="LinkedIn handle"
                    value={form.socialMedia.linkedin}
                    onChange={handleSocialChange}
                    disabled={loading || updating}
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-tiktok">TikTok</FieldLabel>
                <FieldContent>
                  <Input
                    id="contact-tiktok"
                    name="tiktok"
                    type="text"
                    placeholder="TikTok handle"
                    value={form.socialMedia.tiktok}
                    onChange={handleSocialChange}
                    disabled={loading || updating}
                  />
                </FieldContent>
              </Field>
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ContactForm;
