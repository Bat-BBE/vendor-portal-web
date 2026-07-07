"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, MenuIcon } from "lucide-react";
import { NavItem, SidebarProps } from "@/models/sidebarModel";
import Image from "next/image";
import { useState } from "react";

function renderIcon(icon?: NavItem["icon"]) {
  if (!icon) {
    return null;
  }
  if (React.isValidElement(icon)) {
    return icon;
  }
  return React.createElement(icon as React.ElementType, { size: 22 });
}

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
    "flex items-center gap-2 w-full px-5 py-3 text-[14px] leading-6 text-background transition-all duration-150 cursor-pointer select-none group",
    depth > 0 && "pl-8 text-[13px] font-normal",
    isActive
      ? "bg-background/10 border-l-4 border-white font-semibold"
      : "hover:bg-white/10",
  );

  if (hasChildren) {
    return (
      <div className="w-full">
        <button
          onClick={() => setOpen((v) => !v)}
          className={cn(rowClass, "justify-between")}
        >
          <span className="flex items-center gap-2.5 min-w-0">
            {item.icon && (
              <span className="shrink-0 opacity-80">
                {renderIcon(item.icon)}
              </span>
            )}
            {!collapsed && <span className="text-[14px]">{item.label}</span>}
          </span>
          {!collapsed && (
            <span className="opacity-60 shrink-0">
              {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          )}
        </button>
        {open && !collapsed && (
          <div className="mt-0.5 space-y-0.5">
            {item.children!.map((child, index) => (
              <NavRow
                key={child.href ?? `${child.label}-${depth}-${index}`}
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
      {item.icon && (
        <span className="shrink-0 opacity-80">{renderIcon(item.icon)}</span>
      )}
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
  navItems,
  bottomItems,
  defaultCollapsed = false,
  className,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen shrink-0 transition-all duration-300 ease-in-out",
        collapsed ? "w-[64px]" : "w-[300px]",
        className,
      )}
      style={{
        background: "linear-gradient(180deg, #003670 0%, #00B4B1 100%)",
        boxShadow: "-8px 0 20px 0 rgba(0, 97, 121, 0.20) inset",
      }}
    >
      <div className="flex h-[72px] p-5 justify-between items-center w-full self-stretch">
        <div className="flex items-center justify-center gap-2 min-w-0">
          <Image
            src="/assets/logo.svg"
            alt="logo"
            width={80}
            height={23}
            className="object-contain shrink-0 pb-1"
          />
          {!collapsed && (
            <span className="text-white/40 select-none text-[12px]">|</span>
          )}
          {!collapsed && (
            <p className="text-white text-[19px] font-semibold">VENDORSHIP</p>
          )}
        </div>
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="p-1 rounded-md text-background/50 hover:text-background hover:bg-white/10 transition-colors"
          aria-label="Toggle sidebar"
        >
          <MenuIcon size={22} color="background" />
        </button>
      </div>

      <div className="flex pb-[20px] flex-col justify-between items-start h-full">
        <nav className="flex flex-col items-start gap-3 w-full">
          {navItems?.map((item, index) => (
            <NavRow
              key={item.href ?? `${item.label}-${index}`}
              item={item}
              collapsed={collapsed}
            />
          ))}
        </nav>

        <div className="w-full">
          {bottomItems?.map((item) => (
            <NavRow key={item.label} item={item} collapsed={collapsed} />
          ))}
        </div>
      </div>
    </aside>
  );
}
