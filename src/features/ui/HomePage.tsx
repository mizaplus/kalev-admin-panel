import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { HeroSection } from "@/features/useCases/home/HeroSection";
import { Spinner } from "@/components/ui/spinner";
import {
  fetchHomePage,
  updateHomePageHero,
  type HomePageHeroDetails,
  type HomePageResponse,
} from "@/lib/api/homepage";
import { resolveMediaUrl } from "@/lib/media";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const heroSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  tagline: z
    .string()
    .min(10, "Tagline should briefly explain the hero message."),
  image: z.string().min(1, "Provide a hero image path or URL."),
});

type HeroFormValues = z.infer<typeof heroSchema>;

type SectionId = "hero" | "about" | "choose_us" | "programs";
type TabValue = "preview" | "edit";

const SECTION_META: Record<
  SectionId,
  { label: string; description: string; editable: boolean; note?: string }
> = {
  hero: {
    label: "Hero Banner",
    description: "Primary landing hero with headline, tagline, and CTA.",
    editable: true,
  },
  about: {
    label: "About Section",
    description: "Short introduction that appears beneath the hero.",
    editable: false,
    note: "Editing for the About section is coming soon.",
  },
  choose_us: {
    label: "Why Choose Us",
    description: "Highlights core reasons families trust Kalev Childcare.",
    editable: false,
    note: "Manage benefits and reasons in an upcoming release.",
  },
  programs: {
    label: "Programs",
    description: "Showcases the key initiatives offered by the foundation.",
    editable: false,
    note: "Programs are managed from their dedicated page.",
  },
};

const SNIPPET_LENGTH = 110;

function getSnippet(text?: string | null, length = SNIPPET_LENGTH) {
  if (!text) {
    return "";
  }
  return text.length > length ? `${text.slice(0, length - 1)}…` : text;
}

export default function HomePage() {
  const [homeData, setHomeData] = useState<HomePageResponse | null>(null);
  const [initialHero, setInitialHero] = useState<HomePageHeroDetails | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<SectionId | null>(
    null,
  );
  const [sheetTab, setSheetTab] = useState<TabValue>("preview");

  const form = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema),
    defaultValues: { title: "", tagline: "", image: "" },
  });

  useEffect(() => {
    let isMounted = true;

    fetchHomePage()
      .then((data) => {
        if (!isMounted) {
          return;
        }
        setHomeData(data);
        setInitialHero(data.hero.details);
        form.reset(data.hero.details);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!isMounted) {
          return;
        }
        const message =
          err instanceof Error ? err.message : "Failed to load homepage data.";
        setError(message);
        toast.error(message);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [form]);

  const watchedHero = form.watch();
  const previewHero = useMemo<HomePageHeroDetails>(() => {
    return {
      title:
        watchedHero.title?.trim() ||
        initialHero?.title ||
        "Add a hero headline to preview it here.",
      tagline:
        watchedHero.tagline?.trim() ||
        initialHero?.tagline ||
        "Your tagline will appear here once you populate the form.",
      image:
        watchedHero.image?.trim() ||
        initialHero?.image ||
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    };
  }, [watchedHero.image, watchedHero.tagline, watchedHero.title, initialHero]);

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = form;

  const openSection = useCallback(
    (id: SectionId) => {
      setSelectedSection(id);
      setSheetTab("preview");
      setSheetOpen(true);
      if (id === "hero" && initialHero) {
        form.reset(initialHero);
      }
    },
    [form, initialHero],
  );

  const handleSheetChange = useCallback(
    (open: boolean) => {
      setSheetOpen(open);
      if (!open) {
        setSelectedSection(null);
        setSheetTab("preview");
        if (initialHero) {
          form.reset(initialHero);
        }
      }
    },
    [form, initialHero],
  );

  const onSubmit = handleSubmit(async (values) => {
    if (!homeData?.hero.key) {
      const message =
        "Unable to update hero content because no key was provided by the API.";
      setError(message);
      toast.error(message);
      return;
    }

    setIsSaving(true);

    try {
      await updateHomePageHero(homeData.hero.key, values);
      setError(null);
      toast.success("Hero content updated successfully.");
      setInitialHero(values);
      setHomeData((current) =>
        current
          ? { ...current, hero: { ...current.hero, details: values } }
          : current,
      );
      form.reset(values);
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Failed to save hero content.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  });

  const sections = useMemo(() => {
    if (!homeData) {
      return [];
    }

    return [
      {
        id: "hero" as const,
        heading: SECTION_META.hero.label,
        description: SECTION_META.hero.description,
        detail: getSnippet(homeData.hero.details.tagline),
        status: "Editable",
        editable: true,
      },
      {
        id: "about" as const,
        heading: SECTION_META.about.label,
        description: SECTION_META.about.description,
        detail: getSnippet(homeData.about.details.content),
        status: "Preview only",
        editable: false,
      },
      {
        id: "choose_us" as const,
        heading: SECTION_META.choose_us.label,
        description: SECTION_META.choose_us.description,
        detail: `${homeData.choose_us.details.reasons.filter((reason) => !reason.disabled).length} active reasons`,
        status: "Preview only",
        editable: false,
      },
      {
        id: "programs" as const,
        heading: SECTION_META.programs.label,
        description: SECTION_META.programs.description,
        detail: `${homeData.programs.details.items.length} published programs`,
        status: "Managed elsewhere",
        editable: false,
      },
    ];
  }, [homeData]);

  const renderSectionPreview = useCallback(() => {
    if (!homeData || !selectedSection) {
      return null;
    }

    if (selectedSection === "hero") {
      return <HeroSection hero={previewHero} />;
    }

    if (selectedSection === "about") {
      const about = homeData.about.details;
      const imageSrc = resolveMediaUrl(about.image);

      return (
        <Card className="overflow-hidden">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={about.title}
              className="h-64 w-full object-cover"
              loading="lazy"
            />
          ) : null}
          <CardHeader>
            <CardTitle>{about.title || "About Us"}</CardTitle>
            <CardDescription>{SECTION_META.about.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">
              {about.content || "No about content found."}
            </p>
          </CardContent>
        </Card>
      );
    }

    if (selectedSection === "choose_us") {
      const choose = homeData.choose_us.details;
      return (
        <Card>
          <CardHeader>
            <CardTitle>{choose.title || "Why Choose Us"}</CardTitle>
            <CardDescription>{choose.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {choose.reasons.map((reason) => (
              <Card
                key={reason.title}
                className="border-muted bg-muted/20 px-4 py-3 shadow-none"
              >
                <p className="text-sm font-semibold text-foreground">
                  {reason.title}
                  {reason.disabled ? (
                    <Badge
                      variant="outline"
                      className="ml-2 border-dashed text-xs text-muted-foreground"
                    >
                      Hidden
                    </Badge>
                  ) : null}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {reason.description}
                </p>
              </Card>
            ))}
          </CardContent>
        </Card>
      );
    }

    const programs = homeData.programs.details;
    return (
      <Card>
        <CardHeader>
          <CardTitle>{programs.title || "Programs"}</CardTitle>
          <CardDescription>{programs.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {programs.items.map((item) => (
            <div key={item.slug} className="space-y-1 rounded-lg border p-4">
              <p className="text-sm font-semibold text-foreground">
                {item.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }, [homeData, previewHero, selectedSection]);

  const renderEditContent = () => {
    if (selectedSection !== "hero") {
      const note =
        (selectedSection && SECTION_META[selectedSection]?.note) ||
        "Editing for this section will arrive soon.";
      return (
        <Alert>
          <AlertTitle>Editing not yet available</AlertTitle>
          <AlertDescription>{note}</AlertDescription>
        </Alert>
      );
    }

    if (!homeData?.hero.key) {
      return (
        <Alert>
          <AlertTitle>Missing content key</AlertTitle>
          <AlertDescription>
            The hero section cannot be updated because the API did not provide
            the required key fields.
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <form onSubmit={onSubmit} className="space-y-6">
        <FieldSet>
          <Field>
            <FieldLabel htmlFor="hero-title">
              <FieldTitle>Title</FieldTitle>
            </FieldLabel>
            <FieldContent>
              <Input
                id="hero-title"
                placeholder="Smile mama"
                aria-invalid={Boolean(errors.title)}
                {...form.register("title")}
              />
              <FieldDescription>
                This becomes the primary heading for the hero section.
              </FieldDescription>
              <FieldError errors={errors.title ? [errors.title] : undefined} />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="hero-tagline">
              <FieldTitle>Tagline</FieldTitle>
            </FieldLabel>
            <FieldContent>
              <Textarea
                id="hero-tagline"
                placeholder="Instilling hope through quality care..."
                aria-invalid={Boolean(errors.tagline)}
                rows={4}
                {...form.register("tagline")}
              />
              <FieldDescription>
                Keep this concise while highlighting the mission.
              </FieldDescription>
              <FieldError
                errors={errors.tagline ? [errors.tagline] : undefined}
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="hero-image">
              <FieldTitle>Image</FieldTitle>
            </FieldLabel>
            <FieldContent>
              <Input
                id="hero-image"
                placeholder="public/hero.jpg"
                aria-invalid={Boolean(errors.image)}
                {...form.register("image")}
              />
              <FieldDescription>
                Accepts a relative path from the public folder or a full URL.
              </FieldDescription>
              <FieldError errors={errors.image ? [errors.image] : undefined} />
            </FieldContent>
          </Field>
        </FieldSet>

        <Button type="submit" disabled={isSaving || !isDirty}>
          {isSaving ? (
            <>
              <Spinner className="size-4 text-primary-foreground" />
              Saving…
            </>
          ) : (
            "Save hero"
          )}
        </Button>
      </form>
    );
  };

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Homepage</h1>
        <p className="text-sm text-muted-foreground">
          Manage the sections that power the public homepage.
        </p>
      </header>

      {error ? (
        <Alert variant="destructive">
          <AlertTitle>There was a problem</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {isLoading || !homeData ? (
        <SectionListSkeleton />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <Card key={section.id} className="flex flex-col gap-0">
              <CardHeader>
                <CardTitle>{section.heading}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {section.detail || "No content found yet."}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <Badge
                  variant={section.editable ? "default" : "outline"}
                  className={
                    section.editable
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground"
                  }
                >
                  {section.status}
                </Badge>
                <Button
                  variant="ghost"
                  className="hover:bg-primary/10 hover:text-primary"
                  onClick={() => openSection(section.id)}
                >
                  Open section
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Sheet open={sheetOpen} onOpenChange={handleSheetChange}>
        <SheetContent className="flex h-full w-full flex-col gap-0 overflow-y-auto sm:max-w-xl md:max-w-3xl lg:max-w-4xl">
          <SheetHeader className="border-b border-border pb-4">
            <SheetTitle>
              {selectedSection
                ? SECTION_META[selectedSection].label
                : "Section"}
            </SheetTitle>
            <SheetDescription>
              {selectedSection ? SECTION_META[selectedSection].description : ""}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <Tabs
              value={sheetTab}
              onValueChange={(value) => setSheetTab(value as TabValue)}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="edit" disabled={selectedSection !== "hero"}>
                  Edit
                </TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="mt-6 space-y-4">
                {renderSectionPreview()}
              </TabsContent>
              <TabsContent value="edit" className="mt-6 space-y-4">
                {renderEditContent()}
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}

function SectionListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[0, 1, 2, 3].map((index) => (
        <Card key={index}>
          <CardHeader>
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-3 w-48" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
