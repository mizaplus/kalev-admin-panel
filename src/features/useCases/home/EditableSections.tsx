import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useHomepageContext } from "@/features/domain/context/homepage-context";
import { FaRegSmile, FaInfoCircle, FaRegThumbsUp } from "react-icons/fa";

const iconProps = {
  size: 36,
  color: "#2563eb",
  style: { flexShrink: 0 },
};

const sections = [
  {
    title: "Welcome Section",
    description:
      "Introduce your site with a warm welcome and a brief overview.",
    icon: <FaRegSmile {...iconProps} />,
  },
  {
    title: "About Info",
    description:
      "Share your mission, vision, and what makes your organization unique.",
    icon: <FaInfoCircle {...iconProps} />,
  },
  {
    title: "Choose Us",
    description:
      "Highlight key reasons or values that set you apart from others.",
    icon: <FaRegThumbsUp {...iconProps} />,
  },
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
      <div className="mt-10 flex gap-5">
        {sections.map((section) => (
          <Card key={section.title} className="items-center text-center">
            <CardContent className="flex flex-col items-center justify-between">
              <div className="my-3">{section.icon}</div>
              <CardTitle className="mb-2">{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 w-full p-6 bg-muted/70 rounded-lg border border-muted-foreground/10 shadow-sm">
        <h2 className="text-base font-bold mb-2 text-foreground flex items-center gap-2">
          <span className="inline-block bg-blue-100 text-blue-700 rounded px-2 py-0.5 text-xs font-semibold">
            Tips
          </span>
          How to Edit Content
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">Click</span> on any
            section above to start editing its content.
          </li>
          <li>
            Use the{" "}
            <span className="font-medium text-foreground">
              formatting toolbar
            </span>{" "}
            to add headings, lists, or links.
          </li>
          <li>
            <span className="font-medium text-foreground">Preview</span> your
            changes before saving to ensure everything looks right.
          </li>
          <li>
            <span className="font-medium text-foreground">Save</span> your
            changes to update the live site.
          </li>
          <li>
            If you need help, check the{" "}
            <span className="font-medium text-foreground">documentation</span>{" "}
            or contact support.
          </li>
        </ul>
      </div>
    </>
  );
};

export default EditableSections;
