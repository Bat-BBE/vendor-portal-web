"use client";

import { usePathname } from "next/navigation";
import { getNavByRole } from "@/config/nav.config";
import { Header } from "@/components/layout/header";
import type { NavItem, UserRole } from "@/models/sidebarModel";

interface HeaderWrapperProps {
  role: UserRole;
  user: {
    name: string;
    email: string;
    notifications: Array<{
      id: string;
      avatarText: string;
      message: string;
      time: string;
      read: boolean;
    }>;
  };
}

function findActivePath(items: NavItem[], pathname: string): NavItem[] | null {
  for (const item of items) {
    if (item.href === pathname) return [item];
    if (item.children) {
      const childPath = findActivePath(item.children, pathname);
      if (childPath) return [item, ...childPath];
    }
  }
  return null;
}
function buildBreadcrumbs(activePath: NavItem[]): NavItem[] {
  if (activePath.length !== 1) return activePath;
  const leaf = activePath[0];
  return [
    leaf,
    {
      ...leaf,
      label: leaf.description ?? leaf.label,
      href: undefined,
    },
  ];
}

export function HeaderWrapper({ role, user }: HeaderWrapperProps) {
  const pathname = usePathname();
  const { nav } = getNavByRole(role);

  const activePath = findActivePath(nav, pathname) ?? [];
  const breadcrumbs = buildBreadcrumbs(activePath);

  return (
    <Header
      breadcrumbs={breadcrumbs}
      userName={user.name}
      userEmail={user.email}
      notifications={user.notifications}
    />
  );
}
