"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
import { CompanySelector } from "./layout/company-selector";

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

function NavMenuItem({
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
                  className="opacity-60 shrink-0 transition-transform group-data-[state=open]/collapsible:rotate-180"
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
  companies,
  selectedCompanyId,
  onSelectCompany,
  ...props
}: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
  const { nav, bottom } = getNavByRole(role);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const companiesValue = companies ?? [];
  const { state } = useSidebar();
  const collapsed_state = state === "collapsed";

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
          {!collapsed_state ? (
            role === "system_admin" &&
            companiesValue.length > 0 &&
            selectedCompanyId &&
            onSelectCompany ? (
              <CompanySelector
                companies={companiesValue}
                selectedCompanyId={selectedCompanyId}
                onSelectCompany={onSelectCompany}
                className="mb-4 mx-2"
              />
            ) : null
          ) : null}

          <SidebarContent className="flex-1 overflow-y-auto bg-transparent">
            <SidebarGroup className="p-0">
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1 px-0 pb-6">
                  {nav.map((item) => (
                    <NavMenuItem
                      key={item.label}
                      item={item}
                      openMenu={openMenu}
                      setOpenMenu={setOpenMenu}
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarGroup className="mt-auto p-1 pb-5">
            <SidebarGroupContent>
              <SidebarMenu className="gap-0 px-0">
                {bottom?.map((item) => (
                  <NavMenuItem
                    key={item.label}
                    item={item}
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </HoverExpandWrapper>
    </Sidebar>
  );
}
