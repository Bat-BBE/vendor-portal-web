"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  KeyRound,
  LogOut,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/models/sidebarModel";
import { UserAvatar } from "@/components/minicomponents/userAvatar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

function NotificationPopover({
  notifications,
  onNotificationRead,
  onMarkAllRead,
}: {
  notifications: NotificationItem[];
  onNotificationRead?: (id: string) => void;
  onMarkAllRead?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="
          relative
          flex
          items-center
          justify-center
          rounded-lg
          transition-colors

          h-10 w-10
          lg:h-12 lg:w-12

          hover:bg-background-secondary
          "
          aria-label="Мэдэгдлүүд"
        >
          <Bell size={22} className="text-foreground" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-2 min-w-[16px] h-4 px-1 rounded-full bg-destructive text-white text-[10px] font-bold flex items-center justify-center leading-none">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="center"
        sideOffset={12}
        className="w-[380px] p-0 rounded-2xl border-none shadow-xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4">
          <h3 className="text-[17px] font-bold text-foreground">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <span className="text-[12px] font-semibold text-teal-600 bg-teal-50 border border-teal-200 rounded-full px-3 py-1">
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="max-h-[360px] overflow-y-auto">
          {notifications.length === 0 && (
            <p className="px-5 py-8 text-center text-[13px] text-muted-foreground">
              Мэдэгдэл алга байна
            </p>
          )}
          {notifications.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 px-5 py-3.5 border-t first:border-t-0"
            >
              <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-600 font-semibold text-[14px] flex items-center justify-center shrink-0">
                {item.avatarText}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[13px] leading-5 text-foreground">
                  {item.message}
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[12px] text-muted-foreground">
                    {item.time}
                  </span>
                  {!item.read && (
                    <button
                      onClick={() => onNotificationRead?.(item.id)}
                      className="flex items-center gap-1 text-[12px] font-medium text-teal-600 hover:text-teal-700 transition-colors cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                      set as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 px-5 py-4">
          <button
            onClick={() => setOpen(false)}
            className="flex-1 h-10 rounded-full bg-background-secondary text-[13px] font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onMarkAllRead?.();
              setOpen(false);
            }}
            className="flex-1 h-10 rounded-full text-[13px] font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
            style={{
              background: "linear-gradient(180deg, #003670 0%, #00B4B1 100%)",
            }}
          >
            Mark all as read
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ProfilePopover({
  userName,
  userEmail,
  userAvatar,
  onProfileClick,
  onChangePasswordClick,
  onLogoutClick,
}: {
  userName: string;
  userEmail: string;
  userAvatar?: string;
  onProfileClick?: () => void;
  onChangePasswordClick?: () => void;
  onLogoutClick?: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  const menuItems = [
    {
      label: "Хэрэглэгчийн мэдээлэл",
      icon: User,
      onClick: onProfileClick,
    },
    {
      label: "Нууц үг солих",
      icon: KeyRound,
      onClick: onChangePasswordClick,
    },
    {
      label: "Системээс гарах",
      icon: LogOut,
      onClick: onLogoutClick,
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-background-secondary transition-colors cursor-pointer"
          aria-label="Хэрэглэгч"
        >
          <UserAvatar name={userName} src={userAvatar} size={28} />
          <span className="text-[13px] font-semibold text-foreground-secondary hidden md:block max-w-[120px] lg:max-w-[180px] xl:max-w-[240px] truncate">
            {userName}
          </span>
          <ChevronDown
            size={13}
            className={cn(
              "text-[#898989] transition-transform duration-150",
              open && "rotate-180",
            )}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={12}
        className="w-[280px] p-0 rounded-2xl border-none shadow-xl overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 py-4 border-b">
          <UserAvatar name={userName} src={userAvatar} size={40} />
          <div className="min-w-0">
            <p className="text-[14px] font-bold text-foreground truncate">
              {userName}
            </p>
            <p className="text-[12px] text-muted-foreground truncate">
              {userEmail}
            </p>
          </div>
        </div>

        <div className="py-2">
          {menuItems.map(({ label, icon: Icon, onClick }) => (
            <button
              key={label}
              onClick={() => {
                onClick?.();
                setOpen(false);
              }}
              className="flex items-center justify-between w-full px-4 py-3 text-[13px] font-medium text-foreground hover:bg-background-secondary transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <Icon size={17} className="text-foreground shrink-0" />
                {label}
              </span>
              <ChevronRight size={15} className="text-foreground" />
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function HeaderBreadcrumb({ items }: { items: NavItem[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="flex-nowrap items-center gap-2.5">
        {items.length === 0 && (
          <BreadcrumbItem>
            <BreadcrumbPage className="text-[20px] font-bold uppercase leading-7 tracking-tight text-foreground">
              Dashboard
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}

        {items.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={item.label}>
              <BreadcrumbItem
                className={cn(!isFirst && !isLast && "hidden md:block")}
              >
                {isFirst ? (
                  <BreadcrumbPage className="text-[20px] font-bold uppercase leading-7 tracking-tight text-foreground">
                    {item.label}
                  </BreadcrumbPage>
                ) : isLast ? (
                  <BreadcrumbPage className="truncate text-[14px] leading-5 text-foreground-secondary">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={item.href ?? "#"}
                      className="truncate text-[14px] leading-5 text-foreground-secondary transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator className="text-brand-500">
                  |
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
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
        "px-4 sm:px-6 lg:px-8 xl:px-10",
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
