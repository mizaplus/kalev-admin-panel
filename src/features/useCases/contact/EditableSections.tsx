// Hooks

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useContactContext } from "@/features/domain/context/contact-context";
import { FaRegSmile } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import ContactHero from "./forms/Hero";
import ContactInfo from "./forms/ContactForm";

// Utils
// (none needed)

// Types
// (none needed)

const iconProps = {
  size: 36,
  style: { flexShrink: 0 },
  className: "text-primary",
};

const sectionData = [
  {
    title: "Hero Section",
    description: "Get Involved page hero image, title, and tagline.",
    icon: <FaRegSmile {...iconProps} />,
  },
  {
    title: "Contact Introduction",
    description: "Intro and description for contact opportunities.",
    icon: <IoCallOutline {...iconProps} />,
  },
];

const tips = [
  <>
    <span className="font-medium text-foreground">
      Edit the sections below to update Get Involved page.
    </span>
  </>,
  <>You can update hero, intro, and involvement options.</>,
];

const ContactSections = () => {
  const { loading, data } = useContactContext();

  if (loading && !data)
    return (
      <div className="flex flex-col items-center justify-center h-[500px]">
        <Spinner className="size-8" />
        <p className="ml-4 text-muted-foreground text-sm">Loading...</p>
      </div>
    );

  return (
    <>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {sectionData.map(({ title, description, icon }, i) => (
          <Card key={title} className="relative items-center text-center py-10">
            {loading && (
              <div className="absolute top-3 right-3 flex items-center gap-1">
                <Spinner className="size-4 text-primary" />
                <span className="text-xs text-muted-foreground">
                  Syncing...
                </span>
              </div>
            )}
            <CardContent className="flex flex-col items-center justify-between">
              <div className="my-3 size-16 border border-primary/50 flex justify-center items-center rounded-lg">
                {icon}
              </div>
              <CardTitle className="mb-2">{title}</CardTitle>
              <CardDescription className="max-w-xs">
                {description}
              </CardDescription>
              {i === 0 && <ContactHero />}
              {i === 1 && <ContactInfo />}
              {/* {i === 0 && <InvolvementHero />}
              {i === 1 && <InvolvementIntro />}
              {i === 2 && <InvolvementOptions />} */}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 w-full p-6 bg-muted/70 rounded-lg border border-muted-foreground/10 shadow-sm">
        <h2 className="text-base font-bold mb-2 text-foreground flex items-center gap-2">
          <span className="inline-block bg-blue-100 text-primary rounded px-2 py-0.5 text-xs font-semibold">
            Tips
          </span>
          About This Page
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          {tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ContactSections;
