"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  KeyRound,
  LogOut,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/minicomponents/userAvatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ProfilePopover({
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
  const [open, setOpen] = useState(false);

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
