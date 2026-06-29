"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { getNavByRole, UserRole } from "../../config/nav.config";

interface AppSidebarProps {
  role: UserRole;
  brandName?: string;
  defaultCollapsed?: boolean;
}

export function AppSidebar({
  role,
  brandName,
  defaultCollapsed,
}: AppSidebarProps) {
  const { nav, bottom } = getNavByRole(role);

  return (
    <Sidebar
      navItems={nav}
      bottomItems={bottom}
      brandName={brandName}
      defaultCollapsed={defaultCollapsed}
    />
  );
}
