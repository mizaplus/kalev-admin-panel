import type { SVGProps } from "react";

import {
  AppWindow,
  FileText,
  LayoutDashboard,
  Map,
  MessageSquare,
  Plug,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  icon?: (props: SVGProps<SVGSVGElement>) => React.ReactNode;
  badge?: string;
};

type NavSection = {
  label: string;
  items: NavItem[];
  nested?: NavItem[];
};

const sections: NavSection[] = [
  {
    label: "Main",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Page Management",
    items: [
      { label: "Home", icon: AppWindow },
      { label: "About Us", icon: Users },
      { label: "Our Programs", icon: Sparkles },
      { label: "Get Involved", icon: MessageSquare },
      { label: "Donate", icon: ShoppingBag },
      { label: "Contact Us", icon: Map },
    ],
  },
  {
    label: "Admin",
    items: [
      { label: "Files", icon: FileText },
      { label: "Back Ups", icon: Plug },
    ],
  },
];

export function Sidebar() {
  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="grid size-10 place-content-center rounded-full bg-emerald-100 text-emerald-600 text-sm font-semibold">
          D
        </div>
        <div className="space-y-0.5">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Dashquant
          </span>
          <p className="text-[0.625rem] text-muted-foreground">
            Analytics & CRM Platform
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-4 pb-6">
        {sections.map((section) => (
          <Section key={section.label} section={section} />
        ))}
      </div>
    </aside>
  );
}

function Section({ section }: { section: NavSection }) {
  return (
    <div>
      <p className="px-2 text-[0.65rem] font-semibold uppercase text-muted-foreground">
        {section.label}
      </p>
      <div className="mt-3 space-y-1.5">
        {section.items.map((item) => (
          <NavLink key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}

function NavLink({ item }: { item: NavItem }) {
  const Icon = item.icon;
  const isActive = item.label === "Dashboard";

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-[0.7rem] font-medium transition",
        "hover:bg-emerald-50 hover:text-emerald-600",
        isActive
          ? "bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-200"
          : "text-muted-foreground",
      )}
    >
      {Icon ? (
        <Icon
          className={cn(
            "h-3.5 w-3.5",
            isActive ? "text-emerald-600" : "text-muted-foreground",
          )}
        />
      ) : (
        <span className="size-2.5 rounded-full bg-emerald-500" />
      )}
      <span className="text-sm">{item.label}</span>
      {item.badge ? (
        <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[0.6rem] font-semibold text-emerald-600">
          {item.badge}
        </span>
      ) : null}
    </button>
  );
}
