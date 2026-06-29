import { AppSidebar } from "@/components/layout/appSidebar";
import { Header } from "@/components/layout/header";
import type { UserRole } from "@/config/nav.config";

async function getCurrentUser() {
  return {
    role: "admin" as UserRole,
    name: "Үндэрмаа",
    email: "undarmaa@iotech.mn",
  };
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar role={user.role} brandName="VENDORSHIP" />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header
          userName={user.name}
          userEmail={user.email}
          notificationCount={3}
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
