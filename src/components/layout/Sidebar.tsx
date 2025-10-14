import type { SVGProps } from "react";

import {
  AppWindow,
  BarChart3,
  Edit,
  FileText,
  LayoutDashboard,
  Map,
  MessageSquare,
  Plug,
  Settings2,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Square,
  TriangleAlert,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
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
    nested: [
      { label: "CRM" },
      { label: "Analytics" },
      { label: "eCommerce" },
    ],
  },
  {
    label: "Apps & Pages",
    items: [
      { label: "Application", icon: AppWindow },
      { label: "Chat", icon: MessageSquare },
      { label: "Users", icon: Users },
      { label: "Ecommerce", icon: ShoppingBag },
      { label: "Authentication", icon: ShieldCheck },
      { label: "Error Pages", icon: TriangleAlert },
    ],
  },
  {
    label: "Elements",
    items: [
      { label: "Basic", icon: Square },
      { label: "Advance", icon: Settings2 },
      { label: "Icons", icon: Sparkles },
    ],
  },
  {
    label: "Maps & Charts",
    items: [
      { label: "Maps", icon: Map },
      { label: "Chart", icon: BarChart3 },
    ],
  },
  {
    label: "Forms",
    items: [
      { label: "Forms Elements", icon: FileText },
      { label: "Forms Plugins", icon: Plug },
      { label: "Text Editors", icon: Edit },
    ],
  },
];

export function Sidebar() {
  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="grid size-11 place-content-center rounded-full bg-emerald-100 text-emerald-600 font-semibold">
          D
        </div>
        <div className="space-y-0.5">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Dashquant
          </span>
          <p className="text-xs text-muted-foreground">
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
      <p className="px-2 text-xs font-semibold uppercase text-muted-foreground">
        {section.label}
      </p>
      <div className="mt-3 space-y-1">
        {section.items.map((item) => (
          <NavLink key={item.label} item={item} />
        ))}
      </div>
      {section.nested && section.nested.length > 0 ? (
        <div className="mt-2 space-y-1 pl-11 text-sm text-muted-foreground">
          {section.nested.map((item) => (
            <button
              key={item.label}
              type="button"
              className="flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left transition hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
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
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
        "hover:bg-emerald-50 hover:text-emerald-600",
        isActive
          ? "bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-200"
          : "text-muted-foreground",
      )}
    >
      {Icon ? (
        <Icon
          className={cn(
            "size-4",
            isActive ? "text-emerald-600" : "text-muted-foreground",
          )}
        />
      ) : (
        <span className="size-2.5 rounded-full bg-emerald-500" />
      )}
      <span>{item.label}</span>
      {item.badge ? (
        <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-600">
          {item.badge}
        </span>
      ) : null}
    </button>
  );
}
