import { cn } from "@/lib/utils";
import type { NavItem } from "@/models/sidebarModel";
import { NotificationPopover } from "./NotificationPopover";
import { ProfilePopover } from "./ProfilePopover";
import { HeaderBreadcrumb } from "./HeaderBreadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

export interface NotificationItem {
  id: string;
  avatarText: string;
  message: string;
  time: string;
  read: boolean;
}

interface HeaderProps {
  breadcrumbs: NavItem[];
  userName: string;
  userEmail: string;
  userAvatar?: string;
  notifications?: NotificationItem[];
  onNotificationRead?: (id: string) => void;
  onMarkAllRead?: () => void;
  onProfileClick?: () => void;
  onChangePasswordClick?: () => void;
  onLogoutClick?: () => void;
  className?: string;
}

export function Header({
  breadcrumbs,
  userName,
  userEmail,
  userAvatar,
  notifications = [],
  onNotificationRead,
  onMarkAllRead,
  onProfileClick,
  onChangePasswordClick,
  onLogoutClick,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "flex shrink-0 items-center justify-between bg-background",
        "gap-2 sm:gap-4 lg:gap-8",
        "px-4 sm:px-4 lg:px-4 xl:px-4",
        "py-3 lg:py-6",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 lg:gap-4 overflow-hidden">
        <SidebarTrigger className="-ml-1 shrink-0 cursor-pointer" />
        <div className="min-w-0 flex-1 overflow-hidden">
          <HeaderBreadcrumb items={breadcrumbs} />
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <NotificationPopover
          notifications={notifications}
          onNotificationRead={onNotificationRead}
          onMarkAllRead={onMarkAllRead}
        />

        <ProfilePopover
          userName={userName}
          userEmail={userEmail}
          userAvatar={userAvatar}
          onProfileClick={onProfileClick}
          onChangePasswordClick={onChangePasswordClick}
          onLogoutClick={onLogoutClick}
        />
      </div>
    </header>
  );
}
