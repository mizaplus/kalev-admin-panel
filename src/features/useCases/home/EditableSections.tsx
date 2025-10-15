import type { ReactNode } from "react";

// Hooks
import { useHomepageContext } from "@/features/domain/context/homepage-context";

// UI Components
import { Button } from "@/components/ui/button";
import Hero from "./forms/Hero";
import About from "./forms/About";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { FaRegSmile, FaInfoCircle, FaRegThumbsUp } from "react-icons/fa";

const iconProps = {
  size: 36,
  style: { flexShrink: 0 },
  className: "text-primary",
};

type SectionItem = {
  title: string;
  description: string;
  icon: ReactNode;
  action?: () => ReactNode;
};

const sectionData: SectionItem[] = [
  {
    title: "Welcome Section",
    description:
      "Introduce your site with a warm welcome and a brief overview.",
    icon: <FaRegSmile {...iconProps} />,
    action: () => <Hero />,
  },
  {
    title: "About Info",
    description:
      "Share your mission, vision, and what makes your organization unique.",
    icon: <FaInfoCircle {...iconProps} />,
    action: () => <About />,
  },
  {
    title: "Choose Us",
    description:
      "Highlight key reasons or values that set you apart from others.",
    icon: <FaRegThumbsUp {...iconProps} />,
  },
];

const EditButton = ({ children }: { children?: ReactNode }) => (
  <Button variant="outline" className="!font-medium mt-3 !text-sm" size="sm">
    {children || "Edit Section"}
  </Button>
);

const tips = [
  <>
    <span className="font-medium text-foreground">Click</span> on any section
    above to start editing its content.
  </>,
  <>
    Use the{" "}
    <span className="font-medium text-foreground">formatting toolbar</span> to
    add headings, lists, or links.
  </>,
  <>
    <span className="font-medium text-foreground">Preview</span> your changes
    before saving to ensure everything looks right.
  </>,
  <>
    <span className="font-medium text-foreground">Save</span> your changes to
    update the live site.
  </>,
  <>
    If you need help, check the{" "}
    <span className="font-medium text-foreground">documentation</span> or
    contact support.
  </>,
];

const EditableSections = () => {
  const { loading } = useHomepageContext();

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[500px]">
        <Spinner className="size-8" />
        <p className="ml-4 text-muted-foreground text-sm">Loading...</p>
      </div>
    );

  return (
    <>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {sectionData.map(({ title, description, icon, action }) => (
          <Card key={title} className="items-center text-center py-10">
            <CardContent className="flex flex-col items-center justify-between">
              <div className="my-3 size-16 border border-primary/50 flex justify-center items-center rounded-lg">
                {icon}
              </div>
              <CardTitle className="mb-2">{title}</CardTitle>
              <CardDescription className="max-w-xs">
                {description}
              </CardDescription>
              {action ? action() : <EditButton />}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 w-full p-6 bg-muted/70 rounded-lg border border-muted-foreground/10 shadow-sm">
        <h2 className="text-base font-bold mb-2 text-foreground flex items-center gap-2">
          <span className="inline-block bg-blue-100 text-primary rounded px-2 py-0.5 text-xs font-semibold">
            Tips
          </span>
          How to Edit Content
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

export default EditableSections;
