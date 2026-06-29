"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  ShoppingCart,
  Package,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Bookmark,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { NavItem, SidebarProps } from "@/models/sidebarModel";

const DEFAULT_NAV: NavItem[] = [
  { label: "Нүүр хуудас", href: "/", icon: <LayoutDashboard size={16} /> },
  {
    label: "Төлбөр тооцоо",
    icon: <ShoppingCart size={16} />,
    children: [
      { label: "Бүх захиалга", href: "/orders" },
      { label: "Хүлээгдэж буй", href: "/orders/pending" },
      { label: "Үл мэдэгдэх", href: "/orders/unknown" },
    ],
  },
  { label: "Захиалга", href: "/invoices", icon: <Package size={16} /> },
  {
    label: "Хамтын ажиллагаа",
    icon: <BarChart2 size={16} />,
    children: [
      { label: "Маркетинг", href: "/collab/marketing" },
      { label: "Хамтын ажиллагаа", href: "/collab/partners" },
    ],
  },
  { label: "Тайлан", href: "/reports", icon: <BarChart2 size={16} /> },
  {
    label: "Хяналтын тайлантууд",
    icon: <Settings size={16} />,
    children: [{ label: "Жилийн тайлан", href: "/control/annual" }],
  },
];

const DEFAULT_BOTTOM: NavItem[] = [
  { label: "Тусламж", href: "/help", icon: <HelpCircle size={16} /> },
  { label: "Сонирхол байдлын", href: "/saved", icon: <Bookmark size={16} /> },
  { label: "Санал хүсэлт", href: "/feedback", icon: <Bell size={16} /> },
  { label: "Гарах", href: "/logout", icon: <LogOut size={16} /> },
];

function NavRow({
  item,
  depth = 0,
  collapsed,
}: {
  item: NavItem;
  depth?: number;
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const hasChildren = !!item.children?.length;
  const [open, setOpen] = React.useState(false);

  const isActive =
    item.href === pathname || item.children?.some((c) => c.href === pathname);

  const rowClass = cn(
    "flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer select-none group",
    depth === 0 ? "font-medium" : "font-normal pl-8 text-[13px]",
    isActive
      ? "bg-white/20 text-white"
      : "text-white/70 hover:bg-white/10 hover:text-white",
  );

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setOpen((v) => !v)}
          className={cn(rowClass, "justify-between")}
        >
          <span className="flex items-center gap-2.5 min-w-0">
            {item.icon && (
              <span className="shrink-0 opacity-80">{item.icon}</span>
            )}
            {!collapsed && <span className="truncate">{item.label}</span>}
          </span>
          {!collapsed && (
            <span className="opacity-60 shrink-0">
              {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          )}
        </button>
        {open && !collapsed && (
          <div className="mt-0.5 space-y-0.5">
            {item.children!.map((child) => (
              <NavRow
                key={child.label}
                item={child}
                depth={depth + 1}
                collapsed={collapsed}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link href={item.href ?? "#"} className={rowClass}>
      {item.icon && <span className="shrink-0 opacity-80">{item.icon}</span>}
      {!collapsed && <span className="truncate flex-1">{item.label}</span>}
      {!collapsed && item.badge != null && (
        <span className="ml-auto shrink-0 min-w-[20px] h-5 px-1.5 rounded-full bg-white/20 text-white text-[11px] font-semibold flex items-center justify-center">
          {item.badge}
        </span>
      )}
    </Link>
  );
}

export function Sidebar({
  logo,
  brandName = "VENDORSHIP",
  navItems = DEFAULT_NAV,
  bottomItems = DEFAULT_BOTTOM,
  defaultCollapsed = false,
  className,
}: SidebarProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen shrink-0 transition-all duration-300 ease-in-out",
        collapsed ? "w-[60px]" : "w-[240px]",
        className,
      )}
      style={{
        background:
          "linear-gradient(180deg, #0D6B5E 0%, #094D43 50%, #063830 100%)",
      }}
    >
      <div className="flex items-center justify-between px-3 py-4 border-b border-white/10">
        <div className="flex items-center gap-2 min-w-0">
          {logo ?? (
            <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center shrink-0">
              <span className="text-white text-[10px] font-bold">M</span>
            </div>
          )}
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-white text-[10px] font-medium opacity-60 uppercase tracking-widest truncate">
                MONOS
              </p>
              <p className="text-white text-[13px] font-bold truncate">
                {brandName}
              </p>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="shrink-0 p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <PanelLeftOpen size={15} />
          ) : (
            <PanelLeftClose size={15} />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 space-y-0.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {navItems.map((item) => (
          <NavRow key={item.label} item={item} collapsed={collapsed} />
        ))}
      </nav>

      <div className="px-2 pb-4 pt-2 border-t border-white/10 space-y-0.5">
        {bottomItems.map((item) => (
          <NavRow key={item.label} item={item} collapsed={collapsed} />
        ))}
      </div>
    </aside>
  );
}
