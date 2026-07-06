"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  ChevronDown,
} from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type DateRange } from "react-day-picker";

export type PeriodFilterValue =
  | { mode: "month"; year: number; month: number }
  | { mode: "range"; from: Date | undefined; to: Date | undefined };

interface PeriodFilterProps {
  value: PeriodFilterValue;
  onChange: (value: PeriodFilterValue) => void;
  label?: string;
}

function formatDate(date: Date | undefined) {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}/${m}/${d}`;
}

function getTriggerLabel(value: PeriodFilterValue, fallback: string) {
  if (value.mode === "month") {
    return `${value.year}/${String(value.month).padStart(2, "0")}`;
  }
  if (value.from && value.to) {
    return `${formatDate(value.from)} - ${formatDate(value.to)}`;
  }
  if (value.from) {
    return formatDate(value.from);
  }
  return fallback;
}

export function PeriodFilter({
  value,
  onChange,
  label = "Огноо сонгох",
}: PeriodFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState<"month" | "range">(value.mode);

  const initialYear =
    value.mode === "month" ? value.year : new Date().getFullYear();
  const initialMonth =
    value.mode === "month" ? value.month : new Date().getMonth() + 1;
  const [draftYear, setDraftYear] = React.useState(initialYear);
  const [draftMonth, setDraftMonth] = React.useState(initialMonth);
  const [decadeStart, setDecadeStart] = React.useState(
    Math.floor((initialYear - 1) / 12) * 12 + 1,
  );

  const [draftRange, setDraftRange] = React.useState<DateRange | undefined>(
    value.mode === "range" ? { from: value.from, to: value.to } : undefined,
  );
  const [calendarMonth, setCalendarMonth] = React.useState<Date>(
    value.mode === "range" && value.from ? value.from : new Date(),
  );

  const years = Array.from({ length: 12 }, (_, i) => decadeStart + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  function syncDraftFromValue() {
    if (value.mode === "month") {
      setDraftYear(value.year);
      setDraftMonth(value.month);
      setDecadeStart(Math.floor((value.year - 1) / 12) * 12 + 1);
    } else {
      setDraftRange({ from: value.from, to: value.to });
      if (value.from) setCalendarMonth(value.from);
    }
    setTab(value.mode);
  }

  function handleOpenChange(next: boolean) {
    if (next) syncDraftFromValue();
    setOpen(next);
  }

  function handleClear() {
    if (tab === "month") {
      const now = new Date();
      setDraftYear(now.getFullYear());
      setDraftMonth(now.getMonth() + 1);
    } else {
      setDraftRange(undefined);
    }
  }

  function handleApply() {
    if (tab === "month") {
      onChange({ mode: "month", year: draftYear, month: draftMonth });
    } else {
      onChange({ mode: "range", from: draftRange?.from, to: draftRange?.to });
    }
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="flex w-[280px] items-center justify-between gap-2 rounded-xl bg-[--BackgroundColor-Primary,#FFF] py-2 pl-3 pr-2"
        >
          <span className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 shrink-0" />
            {getTriggerLabel(value, label)}
          </span>
          <ChevronDown
            size={13}
            className={cn(
              "text-[#898989] transition-transform duration-150",
              open && "rotate-180",
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[340px] p-0" align="start">
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as "month" | "range")}
          className="flex flex-col"
        >
          <div className="p-3 pb-0">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="month"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Сараар
              </TabsTrigger>
              <TabsTrigger
                value="range"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Өдрөөр
              </TabsTrigger>
            </TabsList>
          </div>

          {tab === "month" && (
            <div className="flex flex-col gap-4 p-3">
              <div>
                <p className="mb-2 text-center text-sm font-medium text-foreground">
                  Жил сонгоно уу.
                </p>
                <div className="mb-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setDecadeStart((d) => d - 12)}
                    className="rounded p-1 hover:bg-muted"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-xs text-muted-foreground">
                    {decadeStart} - {decadeStart + 11}
                  </span>
                  <button
                    type="button"
                    onClick={() => setDecadeStart((d) => d + 12)}
                    className="rounded p-1 hover:bg-muted"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {years.map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setDraftYear(y)}
                      className={cn(
                        "rounded-md py-1.5 text-sm transition-colors",
                        y === draftYear
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted",
                      )}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-center text-sm font-medium text-foreground">
                  Сар сонгоно уу.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {months.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDraftMonth(m)}
                      className={cn(
                        "rounded-md py-1.5 text-sm transition-colors",
                        m === draftMonth
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted",
                      )}
                    >
                      {m} - сар
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "range" && (
            <div className="flex flex-col gap-3 p-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    Эхлэх огноо
                  </span>
                  <div className="rounded-md bg-muted px-3 py-2 text-sm">
                    {formatDate(draftRange?.from) || "—"}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    Дуусах огноо
                  </span>
                  <div className="rounded-md bg-muted px-3 py-2 text-sm">
                    {formatDate(draftRange?.to) || "—"}
                  </div>
                </div>
              </div>

              <Calendar
                mode="range"
                selected={draftRange}
                onSelect={setDraftRange}
                month={calendarMonth}
                onMonthChange={setCalendarMonth}
                numberOfMonths={1}
                className="p-0"
              />
            </div>
          )}
        </Tabs>

        <div className="flex items-center gap-2 border-t p-3">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 bg-muted hover:bg-muted/80"
            onClick={handleClear}
          >
            Цэвэрлэх
          </Button>
          <Button
            size="sm"
            className="flex-1 rounded-full"
            onClick={handleApply}
          >
            Шүүх
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
