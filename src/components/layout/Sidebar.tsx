import type { SVGProps } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

import { cn } from "@/lib/utils";
import {
  AppWindow,
  LayoutDashboard,
  Map,
  MessageSquare,
  Sparkles,
  Users,
} from "lucide-react";

type NavItem = {
  label: string;
  icon?: (props: SVGProps<SVGSVGElement>) => React.ReactNode;
  badge?: string;
  to: string;
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
        to: "/",
      },
    ],
  },
  {
    label: "Page Management",
    items: [
      { label: "Home", icon: AppWindow, to: "/home" },
      { label: "About Us", icon: Users, to: "/about" },
      { label: "Our Programs", icon: Sparkles, to: "/programs" },
      { label: "Get Involved", icon: MessageSquare, to: "/get-involved" },
      { label: "Contact Us", icon: Map, to: "/contact" },
    ],
  },
  // {
  //   label: "Admin",
  //   items: [
  //     { label: "Files", icon: FileText, to: "/files" },
  //     { label: "Back Ups", icon: Plug, to: "/backups" },
  //   ],
  // },
];

export function Sidebar() {
  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <img src="/logo.png" alt="Logo" className="h-14 mx-auto my-4" />
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

  return (
    <RouterNavLink
      to={item.to}
      end={item.to === "/"}
      className={({ isActive }) =>
        cn(
          "flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-[0.7rem] font-medium transition",
          "hover:bg-primary/10 hover:text-primary",
          isActive
            ? "bg-primary/10 text-primary ring-1 ring-primary/30"
            : "text-muted-foreground",
        )
      }
    >
      {Icon ? (
        <Icon className={cn("h-3.5 w-3.5", "text-current")} />
      ) : (
        <span className="size-2.5 rounded-full bg-primary" />
      )}
      <span className="text-sm">{item.label}</span>
      {item.badge ? (
        <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[0.6rem] font-semibold text-primary">
          {item.badge}
        </span>
      ) : null}
    </RouterNavLink>
  );
}
