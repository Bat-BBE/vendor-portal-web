import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import type { UserRole } from "@/models/sidebarModel";

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
        read: true,
      },
    ],
  };
}

export default async function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <SidebarProvider>
      <AppSidebar role={user.role} />
      <SidebarInset>
        <HeaderWrapper role={user.role} user={user} />
        <main className="flex-1 overflow-y-auto px-2 py-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
