import { useAboutContext } from "@/features/domain/context/about-context";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { FaRegSmile, FaInfoCircle, FaRegThumbsUp } from "react-icons/fa";
import AboutHero from "./forms/Hero";
import Story from "./forms/Story";

const iconProps = {
  size: 36,
  style: { flexShrink: 0 },
  className: "text-primary",
};

const sectionData = [
  {
    title: "Hero Section",
    description: "About page hero image, title, and tagline.",
    icon: <FaRegSmile {...iconProps} />,
  },
  {
    title: "Our Story",
    description: "The story behind Kalev Child Care Foundation.",
    icon: <FaInfoCircle {...iconProps} />,
  },
  {
    title: "Mission & Vision",
    description: "Our mission, vision, and objectives.",
    icon: <FaRegThumbsUp {...iconProps} />,
  },
  {
    title: "Our Team",
    description: "Meet the director and team members.",
    icon: <FaRegSmile {...iconProps} />,
  },
];

const tips = [
  <>
    <span className="font-medium text-foreground">This page is read-only.</span>{" "}
    Editing will be available soon.
  </>,
  <>Learn more about our story, mission, vision, objectives, and team below.</>,
];

const AboutSections = () => {
  const { loading } = useAboutContext();

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[500px]">
        <Spinner className="size-8" />
        <p className="ml-4 text-muted-foreground text-sm">Loading...</p>
      </div>
    );

  return (
    <>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-5">
        {sectionData.map(({ title, description, icon }, i) => (
          <Card key={title} className="items-center text-center py-10">
            <CardContent className="flex flex-col items-center justify-between">
              <div className="my-3 size-16 border border-primary/50 flex justify-center items-center rounded-lg">
                {icon}
              </div>
              <CardTitle className="mb-2">{title}</CardTitle>
              <CardDescription className="max-w-xs">
                {description}
              </CardDescription>
              {i === 0 && <AboutHero />}
              {i === 1 && <Story />}
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

export default AboutSections;
