import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardShell } from "@/components/layout/DashboardShell";
import type { UserRole } from "@/models/sidebarModel";
import type { Company } from "@/components/layout/company-selector";

async function getCurrentUser() {
  return {
    role: "system_admin" as UserRole,
    name: "Undarmaa",
    email: "undarmaa@iotech.mn",
    notifications: [
      {
        id: "1",
        avatarText: "U",
        message: "New vendor request needs review",
        time: "5 min ago",
        read: false,
      },
      {
        id: "2",
        avatarText: "A",
        message: "System update completed successfully",
        time: "1 hour ago",
        read: false,
      },
    ],
  };
}

async function getUserCompanies(): Promise<Company[]> {
  return [
    { id: "0", name: "Testing ХХК" },
    { id: "1", name: "Монос групп ХХК" },
    { id: "2", name: "Монос Фарм ХХК" },
    { id: "3", name: "Монос Трейд ХХК" },
    { id: "4", name: "Монос Лоджистикс ХХК" },
    { id: "5", name: "Монос Ритэйл ХХК" },
  ];
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, companies] = await Promise.all([
    getCurrentUser(),
    getUserCompanies(),
  ]);

  return (
    <SidebarProvider>
      <DashboardShell
        role={user.role}
        user={user}
        companies={companies}
        defaultCompanyId={companies[0]?.id ?? ""}
      >
        {children}
      </DashboardShell>
    </SidebarProvider>
  );
}
