import type { SVGProps } from "react";

import {
  Bell,
  CalendarClock,
  MessageSquare,
  Search,
  Settings,
  ShoppingCart,
  SunMedium,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Topbar() {
  return (
    <header className="flex h-20 w-full flex-none items-center border-b border-muted bg-white/80 px-8 backdrop-blur">
      <div className="flex flex-1 items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-9 rounded-full text-muted-foreground hover:bg-emerald-50 hover:text-emerald-600"
        >
          <Search className="h-4 w-4" />
        </Button>
        <div className="relative flex flex-1 items-center">
          <Search className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for results..."
            className="h-9 w-full rounded-full border-0 bg-muted/60 pl-9 text-xs placeholder:text-muted-foreground/70 focus-visible:border-transparent focus-visible:ring-0"
          />
        </div>
      </div>

      <div className="ml-6 flex items-center gap-4">
        <QuickAction icon={CalendarClock} label="Schedule" />
        <QuickAction icon={ShoppingCart} label="Cart" badge="3" />
        <QuickAction icon={MessageSquare} label="Messages" badge="5" />
        <QuickAction icon={Bell} label="Notifications" badge="2" />
        <QuickAction icon={Settings} label="Settings" />

        <div className="flex items-center gap-3 rounded-full border border-muted bg-white px-3 py-1.5 shadow-sm">
          <Avatar className="size-8">
            <AvatarImage
              src="https://i.pravatar.cc/120?img=47"
              alt="Alex Moore"
            />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="text-xs font-semibold text-foreground">Alex Moore</p>
            <p className="text-[0.65rem] text-muted-foreground">Admin</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7 rounded-full text-muted-foreground hover:bg-emerald-50 hover:text-emerald-600"
          >
            <SunMedium className="h-3.5 w-3.5" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

function QuickAction({
  icon: Icon,
  label,
  badge,
}: {
  icon: (props: SVGProps<SVGSVGElement>) => React.ReactNode;
  label: string;
  badge?: string;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="relative size-9 rounded-xl border border-muted/70 bg-white text-muted-foreground shadow-sm transition hover:border-emerald-200 hover:text-emerald-600"
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="sr-only">{label}</span>
      {badge ? (
        <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-[9px] font-semibold text-white">
          {badge}
        </span>
      ) : null}
    </Button>
  );
}
