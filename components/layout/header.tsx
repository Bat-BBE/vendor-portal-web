"use client";

import * as React from "react";
import { Bell, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { HeaderProps } from "@/models/headerModel";
import { UserAvatar } from "@/components/minicomponents/userAvatar";

export function Header({
  title = "ТӨЛБӨР ТООЦОО",
  subtitle = "Авлагын дэлгэрэнгүй",
  userName = "Үндэрмаа",
  userEmail = "undarmaa@iotech.mn",
  userAvatar,
  notificationCount = 0,
  onNotificationClick,
  onUserClick,
  logo,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "h-14 flex items-center justify-between px-5 bg-white border-b border-[#DFDFDF] shrink-0",
        className,
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        {logo && <div className="shrink-0">{logo}</div>}
        <div className="min-w-0">
          <h1 className="text-[15px] font-bold text-[#000000] leading-tight truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[12px] text-[#898989] leading-tight truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onNotificationClick}
          className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F0F0F0] transition-colors"
          aria-label="Мэдэгдлүүд"
        >
          <Bell size={17} className="text-[#5C5C5C]" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#F03131] text-white text-[10px] font-bold flex items-center justify-center leading-none">
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}
        </button>

        <button
          onClick={onUserClick}
          className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-[#F0F0F0] transition-colors"
          aria-label="Хэрэглэгч"
        >
          <UserAvatar name={userName} src={userAvatar} size={28} />
          <span className="text-[13px] font-medium text-[#000000] hidden sm:block max-w-[120px] truncate">
            {userName}
          </span>
          <ChevronDown size={13} className="text-[#898989]" />
        </button>
      </div>
    </header>
  );
}
