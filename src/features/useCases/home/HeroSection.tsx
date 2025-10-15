import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type HomePageHeroDetails } from "@/lib/api/homepage";
import { resolveMediaUrl } from "@/lib/media";

type HeroSectionProps = {
  hero: HomePageHeroDetails;
};

const navItems = [
  { label: "Home", active: true },
  { label: "About Us" },
  { label: "Our Programs" },
  { label: "Get Involved" },
  { label: "Donate" },
  { label: "Contact Us" },
];

export function HeroSection({ hero }: HeroSectionProps) {
  const imageSrc = resolveMediaUrl(hero.image);

  return (
    <Card className="flex flex-col gap-0 overflow-hidden rounded-sm border border-muted bg-white p-0 shadow-none">
      <header className="flex items-center justify-between border-b border-muted/50 px-4 py-4 md:px-10">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Kalev Childcare Foundation"
            className="h-10 w-auto"
          />
        </div>
        <nav className="hidden items-center gap-4 text-xs font-medium md:flex">
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`flex flex-col items-center gap-1 text-xs ${
                item.active
                  ? "text-[#FF6A1A]"
                  : "text-slate-600 transition hover:text-[#FF6A1A]"
              }`}
            >
              <span>{item.label}</span>
              <span
                className={`h-0.5 w-8 rounded-full ${
                  item.active ? "bg-[#FF6A1A]" : "bg-transparent"
                }`}
              />
            </div>
          ))}
        </nav>
      </header>

      <div className="relative isolate flex min-h-[420px] items-center justify-center overflow-hidden bg-slate-900 px-6 py-20 md:px-10">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={hero.title}
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/65 via-slate-900/55 to-slate-900/35" />

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center text-white">
          <h1 className="text-xl font-semibold tracking-tight sm:text-3xl">
            {hero.title}
          </h1>
          <p className="max-w-sm text-sm text-white/85">{hero.tagline}</p>
          <Button className="rounded-full bg-[#FF6A1A] px-8 text-xs font-semibold text-white shadow-lg shadow-[#FF6A1A]/30 transition hover:bg-[#ff792f]">
            Learn More
          </Button>
        </div>
      </div>
    </Card>
  );
}
