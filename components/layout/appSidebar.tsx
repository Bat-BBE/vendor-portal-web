"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { getNavByRole } from "../../config/nav.config";
import { AppSidebarProps } from "@/models/sidebarModel";

export function AppSidebar({ role, defaultCollapsed }: AppSidebarProps) {
  const { nav, bottom } = getNavByRole(role);

  return (
    <Sidebar
      navItems={nav}
      bottomItems={bottom}
      defaultCollapsed={defaultCollapsed}
    />
  );
}
