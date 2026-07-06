// components/layout/header-wrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import { getNavByRole } from "@/config/nav.config";
import { Header } from "@/components/layout/header";
import {
  CompanySelector,
  type Company,
} from "@/components/layout/company-selector";
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
  companies?: Company[];
  selectedCompanyId?: string;
  onSelectCompany?: (companyId: string) => void;
}

function findActivePath(
  items: NavItem[],
  bottom: NavItem[],
  pathname: string,
): NavItem[] | null {
  for (const item of items) {
    if (item.href === pathname) return [item];
    if (item.children) {
      const childPath = findActivePath(item.children, [], pathname);
      if (childPath) return [item, ...childPath];
    }
  }
  for (const item of bottom) {
    if (item.href === pathname) return [item];

    if (item.children) {
      const childPath = findActivePath(item.children, [], pathname);
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
    { ...leaf, label: leaf.description ?? leaf.label, href: undefined },
  ];
}

export function HeaderWrapper({
  role,
  user,
  companies = [],
  selectedCompanyId = "",
  onSelectCompany,
}: HeaderWrapperProps) {
  const pathname = usePathname();
  const { nav, bottom } = getNavByRole(role);

  const activePath = findActivePath(nav, bottom, pathname) ?? [];
  const breadcrumbs = buildBreadcrumbs(activePath);

  return (
    <>
      {role === "system_admin" && companies.length > 0 && onSelectCompany && (
        <CompanySelector
          companies={companies}
          selectedCompanyId={selectedCompanyId}
          onSelectCompany={onSelectCompany}
          className="mx-4 mb-4"
        />
      )}
      <Header
        breadcrumbs={breadcrumbs}
        userName={user.name}
        userEmail={user.email}
        notifications={user.notifications}
      />
    </>
  );
}
