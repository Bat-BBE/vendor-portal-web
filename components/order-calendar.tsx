"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type OrderStatus = "delivered" | "prepared" | "pending";

interface OrderRow {
  id: string;
  orderNumber: string;
  orderDate: string;
  deliveryDate: string;
  viewedDate: string;
  branch: string;
  supplier: string;
  amount: string;
  status: OrderStatus;
}

const WEEKDAY_LABELS = [
  "Даваа",
  "Мягмар",
  "Лхагва",
  "Пүрэв",
  "Баасан",
  "Бямба",
  "Ням",
];

const MONTH_LABELS = [
  "1-р сар",
  "2-р сар",
  "3-р сар",
  "4-р сар",
  "5-р сар",
  "6-р сар",
  "7-р сар",
  "8-р сар",
  "9-р сар",
  "10-р сар",
  "11-р сар",
  "12-р сар",
];

const statusLabel: Record<OrderStatus, string> = {
  delivered: "Хүргэлтэд гарсан",
  prepared: "Захиалга баталгаажсан",
  pending: "Хүлээгдэж байна",
};

const statusBadgeColor: Record<OrderStatus, string> = {
  pending: "bg-emerald-100 text-emerald-700",
  prepared: "bg-blue-100 text-blue-700",
  delivered: "bg-amber-100 text-amber-700",
};

const statusPillColor: Record<OrderStatus, string> = {
  pending: "bg-emerald-50 text-emerald-700",
  prepared: "bg-blue-50 text-blue-700",
  delivered: "bg-amber-50 text-amber-700",
};

function parseYmd(value: string): Date {
  const [y, m, d] = value.split("/").map(Number);
  return new Date(y, m - 1, d);
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatPanelDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}/${m}/${d}`;
}

interface OrderCalendarProps {
  orders: OrderRow[];
  onSelectOrder?: (order: OrderRow) => void;
}

export function OrderCalendar({ orders, onSelectOrder }: OrderCalendarProps) {
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  const days = useMemo(() => {
    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth = new Date(year, month + 1, 0);

    const startOffset = (firstOfMonth.getDay() + 6) % 7;
    const totalCells = Math.ceil((startOffset + lastOfMonth.getDate()) / 7) * 7;

    const cells: { date: Date; inCurrentMonth: boolean }[] = [];
    for (let i = 0; i < totalCells; i++) {
      const dayNum = i - startOffset + 1;
      const date = new Date(year, month, dayNum);
      cells.push({ date, inCurrentMonth: date.getMonth() === month });
    }
    return cells;
  }, [year, month]);

  function ordersForDay(date: Date) {
    return orders.filter((o) => sameDay(parseYmd(o.deliveryDate), date));
  }

  function statusCountsForDay(date: Date) {
    const dayOrders = ordersForDay(date);
    const counts: Partial<Record<OrderStatus, number>> = {};
    for (const o of dayOrders) {
      counts[o.status] = (counts[o.status] ?? 0) + 1;
    }
    return counts;
  }

  function goPrevMonth() {
    setCursor(new Date(year, month - 1, 1));
  }

  function goNextMonth() {
    setCursor(new Date(year, month + 1, 1));
  }

  function goToday() {
    setCursor(new Date(today.getFullYear(), today.getMonth(), 1));
  }

  const selectedDayOrders = selectedDate ? ordersForDay(selectedDate) : [];

  return (
    <div className="flex gap-4">
      <div className="flex flex-1 flex-col gap-4 rounded-2xl bg-white px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={goPrevMonth}
              aria-label="Өмнөх сар"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="min-w-[120px] text-center text-base font-semibold">
              {MONTH_LABELS[month]} {year}
            </span>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={goNextMonth}
              aria-label="Дараагийн сар"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            className="h-8 rounded-lg px-3 text-sm"
            onClick={goToday}
          >
            Өнөөдөр
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl border border-default">
          <div className="grid grid-cols-7 bg-brand-500">
            {WEEKDAY_LABELS.map((label) => (
              <div
                key={label}
                className="px-3 py-3 text-sm font-medium text-white"
              >
                {label}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px bg-default">
            {days.map(({ date, inCurrentMonth }) => {
              const counts = statusCountsForDay(date);
              const hasOrders = Object.keys(counts).length > 0;
              const isSelected = selectedDate && sameDay(date, selectedDate);

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => hasOrders && setSelectedDate(date)}
                  className={cn(
                    "relative flex min-h-[100px] flex-col items-start gap-2 bg-white p-3 text-left transition-colors",
                    !inCurrentMonth && "bg-background-secondary/40",
                    hasOrders && "cursor-pointer hover:bg-accent/40",
                    !hasOrders && "cursor-default",
                    isSelected && "bg-accent/40",
                  )}
                >
                  <span
                    className={cn(
                      "text-lg font-semibold",
                      isSelected && "text-teal-600",
                      !inCurrentMonth && "text-muted-foreground",
                    )}
                  >
                    {date.getDate()}
                  </span>

                  <div className="flex flex-wrap gap-1">
                    {(Object.keys(counts) as OrderStatus[]).map((status) => (
                      <span
                        key={status}
                        className={cn(
                          "flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                          statusBadgeColor[status],
                        )}
                      >
                        {counts[status]}
                      </span>
                    ))}
                  </div>

                  {isSelected && (
                    <span className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-inset ring-teal-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedDate && (
        <div className="flex w-[340px] shrink-0 flex-col rounded-2xl border border-default bg-white">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm font-semibold text-foreground">
              {formatPanelDate(selectedDate)}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setSelectedDate(null)}
              aria-label="Хаах"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            {selectedDayOrders.length === 0 ? (
              <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
                Энэ өдөр захиалга алга
              </div>
            ) : (
              selectedDayOrders.map((order) => (
                <button
                  key={order.id}
                  type="button"
                  onClick={() => onSelectOrder?.(order)}
                  className="flex flex-col gap-1.5 rounded-xl border border-default p-3 text-left hover:bg-accent/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {order.orderNumber}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        statusPillColor[order.status],
                      )}
                    >
                      {statusLabel[order.status]}
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-foreground">
                    {order.branch}
                  </span>

                  <span className="text-sm text-muted-foreground">
                    {order.amount}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
