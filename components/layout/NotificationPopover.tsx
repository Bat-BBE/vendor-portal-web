"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
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

export function NotificationPopover({
  notifications,
  onNotificationRead,
  onMarkAllRead,
}: {
  notifications: NotificationItem[];
  onNotificationRead?: (id: string) => void;
  onMarkAllRead?: () => void;
}) {
  const [open, setOpen] = useState(false);
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
