"use client";

import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import type { UserRole } from "@/models/sidebarModel";
import type { Company } from "@/components/layout/company-selector";

interface DashboardShellProps {
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
  companies: Company[];
  defaultCompanyId: string;
  children: React.ReactNode;
}

export function DashboardShell({
  role,
  user,
  companies,
  defaultCompanyId,
  children,
}: DashboardShellProps) {
  const [selectedCompanyId, setSelectedCompanyId] =
    React.useState(defaultCompanyId);

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
  };

  return (
    <>
      <AppSidebar
        role={role}
        companies={companies}
        selectedCompanyId={selectedCompanyId}
        onSelectCompany={handleSelectCompany}
      />
      <SidebarInset>
        <HeaderWrapper role={role} user={user} />
        <main className="flex-1 overflow-y-auto px-2 py-1">{children}</main>
      </SidebarInset>
    </>
  );
}
