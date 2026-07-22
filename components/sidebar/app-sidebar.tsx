"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";

import { getNavByRole } from "../../config/nav.config";
import { AppSidebarProps } from "@/models/sidebarModel";
import { CompanySelector } from "../layout/company-selector";
import { SidebarBrand } from "./SidebarBrand";
import { NavMenuItem } from "./NavMenuItem";
import { HoverExpandWrapper } from "./HoverExpandWrapper";

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

          <SidebarGroup className="mt-auto m-0 p-0 pb-5">
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
