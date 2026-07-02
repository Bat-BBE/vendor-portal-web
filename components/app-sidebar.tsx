"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
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

import { getNavByRole } from "../config/nav.config";
import { AppSidebarProps, NavItem } from "@/models/sidebarModel";

function renderIcon(icon?: NavItem["icon"], size: number = 24) {
  if (!icon) return null;
  if (React.isValidElement(icon)) {
    return React.cloneElement(
      icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
      {
        style: { width: size, height: size },
      },
    );
  }
  return React.createElement(icon as React.ElementType, {
    style: { width: size, height: size },
  });
}

function SidebarBrand() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <div className="flex h-[72px] p-5 justify-between items-center w-full self-stretch">
      <div className="flex items-center justify-center gap-2 min-w-0">
        {!collapsed && (
          <Image
            src="/assets/logo.svg"
            alt="logo"
            width={75}
            height={23}
            className="object-contain shrink-0 pb-1"
          />
        )}
        {!collapsed && (
          <>
            <span className="text-white/40 select-none text-[12px]">|</span>
            <p className="text-white text-[19px] font-semibold">VENDORSHIP</p>
          </>
        )}
        <button
          className="p-1 rounded-md text-background/50 hover:text-background hover:bg-white/10 transition-colors"
          aria-label="Toggle sidebar"
        >
          <MenuIcon size={22} color="background" />
        </button>
      </div>
    </div>
  );
}

function NavMenuItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const hasChildren = !!item.children?.length;
  const isActive =
    item.href === pathname || item.children?.some((c) => c.href === pathname);

  const rowClass = cn(
    "flex items-center w-full py-3 text-[14px] leading-6 text-white transition-all duration-150 cursor-pointer select-none rounded-none h-auto",
    collapsed ? "justify-center gap-0 px-0" : "gap-3 px-5",
    "hover:bg-white/10 hover:text-white",
    isActive && "bg-white/10 border-l-4 border-white font-semibold text-white",
  );

  const iconBox = (icon: NavItem["icon"]) => (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center opacity-80">
      {renderIcon(icon, collapsed ? 20 : 24)}
    </span>
  );

  if (hasChildren) {
    return (
      <Collapsible defaultOpen={isActive} className="group/collapsible w-full">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              tooltip={item.label}
              className={cn(rowClass, !collapsed && "justify-between")}
            >
              <div
                className={cn(
                  "flex items-center min-w-0",
                  collapsed ? "gap-0" : "gap-3",
                )}
              >
                {item.icon && iconBox(item.icon)}
                {!collapsed && (
                  <span className="text-[14px] truncate">{item.label}</span>
                )}
              </div>
              {!collapsed && (
                <ChevronDown
                  size={14}
                  className="opacity-60 shrink-0 transition-transform group-data-[state=open]/collapsible:rotate-180"
                />
              )}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          {!collapsed && (
            <CollapsibleContent>
              <SidebarMenuSub className="border-none ml-0 px-0 mt-0.5 space-y-0.5">
                {item.children!.map((child) => {
                  const childActive = child.href === pathname;
                  return (
                    <SidebarMenuSubItem key={child.label}>
                      <SidebarMenuSubButton
                        asChild
                        className={cn(
                          "pl-8 text-[13px] font-normal text-white h-auto py-3",
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

function HoverExpandWrapper({ children }: { children: React.ReactNode }) {
  const { state, setOpen, isMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const hoverTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHover = React.useRef(false);

  if (isMobile) return <>{children}</>;

  const clearHoverTimeout = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearHoverTimeout();
    if (collapsed) {
      openedByHover.current = true;
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    clearHoverTimeout();
    if (openedByHover.current) {
      hoverTimeout.current = setTimeout(() => {
        setOpen(false);
        openedByHover.current = false;
      }, 150);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="h-full"
    >
      {children}
    </div>
  );
}

export function AppSidebar({
  role,
  ...props
}: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
  const { nav, bottom } = getNavByRole(role);

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className={cn(
        "border-none text-white",
        "[&_[data-sidebar=sidebar]]:text-white",
        props.className,
      )}
      style={{
        // @ts-expect-error custom css vars
        "--sidebar-background": "transparent",
        "--sidebar-border": "transparent",
        // "--sidebar-width": "280px",
        // "--sidebar-width-icon": "64px",
      }}
    >
      <HoverExpandWrapper>
        <div
          className="flex flex-col h-full w-full"
          style={{
            background: "linear-gradient(180deg, #003670 0%, #00B4B1 100%)",
            boxShadow: "-8px 0 20px 0 rgba(0, 97, 121, 0.20) inset",
          }}
        >
          <SidebarHeader className="p-0 bg-transparent">
            <SidebarBrand />
          </SidebarHeader>

          <SidebarContent className="bg-transparent">
            <SidebarGroup className="p-0">
              <SidebarGroupContent>
                <SidebarMenu className="gap-3 px-0">
                  {nav.map((item) => (
                    <NavMenuItem key={item.label} item={item} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarGroup className="mt-auto p-1 pb-5">
            <SidebarGroupContent>
              <SidebarMenu className="gap-0 px-0">
                {bottom?.map((item) => (
                  <NavMenuItem key={item.label} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </HoverExpandWrapper>
    </Sidebar>
  );
}
