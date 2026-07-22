"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { NavItem } from "@/models/sidebarModel";
import { renderIcon } from "@/helpers/render";

export function NavMenuItem({
  item,
  openMenu,
  setOpenMenu,
}: {
  item: NavItem;
  openMenu: string | null;
  setOpenMenu: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const hasChildren = !!item.children?.length;
  const isActive =
    item.href === pathname || item.children?.some((c) => c.href === pathname);

  const rowClass = cn(
    "relative flex w-full items-center gap-3 px-5 py-3 text-[14px] leading-6 text-white transition-all duration-150 cursor-pointer select-none rounded-none h-auto",
    "hover:bg-white/10 hover:text-white",
    isActive &&
      "bg-white/10 font-semibold text-white before:absolute before:left-0 before:h-full before:top-0 before:w-1 before:bg-white",
  );

  const iconBox = (icon: NavItem["icon"]) => (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center opacity-80">
      {renderIcon(icon, 24)}
    </span>
  );

  if (hasChildren) {
    return (
      <Collapsible
        open={openMenu === item.label}
        onOpenChange={(open) => {
          setOpenMenu(open ? item.label : null);
        }}
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              tooltip={item.label}
              className={cn(rowClass, "justify-between items-center")}
            >
              <div
                className={cn(
                  "flex items-center min-w-0",
                  collapsed ? "gap-0" : "gap-3",
                )}
              >
                {item.icon && iconBox(item.icon)}
                {!collapsed && <span className="truncate">{item.label}</span>}
              </div>
              {!collapsed && (
                <ChevronDown
                  size={14}
                  className={cn(
                    "shrink-0 opacity-60 transition-transform duration-200",
                    openMenu === item.label && "rotate-180",
                  )}
                />
              )}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          {!collapsed && (
            <CollapsibleContent className="w-full">
              <SidebarMenuSub className="border-none ml-0 px-0 mt-0.5 space-y-0.5">
                {item.children!.map((child) => {
                  const childActive = child.href === pathname;
                  return (
                    <SidebarMenuSubItem key={child.label}>
                      <SidebarMenuSubButton
                        asChild
                        className={cn(
                          !collapsed &&
                            "pl-10 w-full text-[13px] font-normal text-white h-auto py-3 rounded-none transition-all duration-150",
                          "hover:bg-white/10 hover:text-white",
                          childActive &&
                            "bg-white/10 border-l-4 border-white font-semibold text-white",
                        )}
                      >
                        <Link href={child.href ?? "#"}>
                          {child.icon && (
                            <span className="shrink-0 opacity-80">
                              {renderIcon(child.icon)}
                            </span>
                          )}
                          <span className="truncate">{child.label}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            </CollapsibleContent>
          )}
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem className="p-0">
      <SidebarMenuButton
        asChild
        tooltip={item.label}
        className={cn(rowClass, "justify-center items-center")}
      >
        <Link href={item.href ?? "#"}>
          {item.icon && iconBox(item.icon)}
          {!collapsed && <span className="truncate flex-1">{item.label}</span>}
        </Link>
      </SidebarMenuButton>
      {!collapsed && item.badge != null && (
        <SidebarMenuBadge className="min-w-[20px] h-5 px-1.5 rounded-full bg-white/20 text-white text-[11px] font-semibold flex items-center justify-center right-3">
          {item.badge}
        </SidebarMenuBadge>
      )}
    </SidebarMenuItem>
  );
}
