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
  onClear?: () => void;
  label?: string;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_WINDOW_SIZE = 6;

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
  onClear,
  label = "Огноо сонгох",
}: PeriodFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState<"month" | "range">(value.mode);

  const initialYear = value.mode === "month" ? value.year : CURRENT_YEAR;
  const initialMonth =
    value.mode === "month" ? value.month : new Date().getMonth() + 1;

  const [draftYear, setDraftYear] = React.useState(initialYear);
  const [draftMonth, setDraftMonth] = React.useState(initialMonth);
  const [windowEndYear, setWindowEndYear] = React.useState(() =>
    Math.min(
      CURRENT_YEAR,
      Math.max(initialYear, CURRENT_YEAR - YEAR_WINDOW_SIZE + 1) +
        YEAR_WINDOW_SIZE -
        1,
    ),
  );

  const [draftRange, setDraftRange] = React.useState<DateRange | undefined>(
    value.mode === "range" ? { from: value.from, to: value.to } : undefined,
  );
  const [calendarMonth, setCalendarMonth] = React.useState<Date>(
    value.mode === "range" && value.from ? value.from : new Date(),
  );

  const years = Array.from(
    { length: YEAR_WINDOW_SIZE },
    (_, i) => windowEndYear - YEAR_WINDOW_SIZE + 1 + i,
  );

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const isAtLatestWindow = windowEndYear >= CURRENT_YEAR;

  function goToPrevWindow() {
    setWindowEndYear((y) => y - YEAR_WINDOW_SIZE);
  }

  function goToNextWindow() {
    setWindowEndYear((y) => Math.min(CURRENT_YEAR, y + YEAR_WINDOW_SIZE));
  }

  function syncDraftFromValue() {
    if (value.mode === "month") {
      setDraftYear(value.year);
      setDraftMonth(value.month);
      setWindowEndYear(
        Math.min(
          CURRENT_YEAR,
          Math.max(value.year, CURRENT_YEAR - YEAR_WINDOW_SIZE + 1) +
            YEAR_WINDOW_SIZE -
            1,
        ),
      );
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
    const now = new Date();
    if (tab === "month") {
      setDraftYear(now.getFullYear());
      setDraftMonth(now.getMonth() + 1);
      setWindowEndYear(CURRENT_YEAR);
    } else {
      setDraftRange(undefined);
    }
    onClear?.();
    setOpen(false);
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
          className="
          flex
          w-full
          min-w-[180px]
          max-w-full
          sm:w-auto
          sm:min-w-[180px]
          sm:max-w-[280px]
          items-center
          justify-between
          gap-3
          rounded-xl
          bg-white
          px-3
          py-5.5
        "
        >
          <span className="flex min-w-0 items-center gap-2">
            <CalendarIcon className="h-6 w-6 shrink-0" />
            <span className="truncate">{getTriggerLabel(value, label)}</span>
          </span>

          <ChevronDown
            size={13}
            className={cn(
              "shrink-0 text-[#898989] transition-transform duration-150",
              open && "rotate-180",
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as "month" | "range")}
          className="flex flex-col"
        >
          <div className="p-3 pb-0">
            <TabsList className="grid w-full grid-cols-2 bg-[#E6EBF1]">
              <TabsTrigger
                value="month"
                className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm py-1 cursor-pointer"
              >
                Сараар
              </TabsTrigger>
              <TabsTrigger
                value="range"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground py-1 cursor-pointer"
              >
                Өдрөөр
              </TabsTrigger>
            </TabsList>
          </div>

          {tab === "month" && (
            <div className="flex flex-col gap-4 p-3">
              <div className="border px-1 py-2 rounded-xl">
                <p className="mb-2 text-center text-sm font-medium text-foreground">
                  Жил сонгоно уу.
                </p>
                <div className="mb-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={goToPrevWindow}
                    className="rounded p-1 hover:bg-muted"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-xs text-muted-foreground">
                    {years[0]} - {years[years.length - 1]}
                  </span>
                  <button
                    type="button"
                    onClick={goToNextWindow}
                    disabled={isAtLatestWindow}
                    className={cn(
                      "rounded p-1 hover:bg-muted",
                      isAtLatestWindow &&
                        "cursor-not-allowed opacity-30 hover:bg-transparent",
                    )}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {years.map((y) => {
                    const isFuture = y > CURRENT_YEAR;
                    return (
                      <button
                        key={y}
                        type="button"
                        disabled={isFuture}
                        onClick={() => setDraftYear(y)}
                        className={cn(
                          "rounded-md py-1 text-sm transition-colors",
                          isFuture &&
                            "cursor-not-allowed text-muted-foreground/40 hover:bg-transparent",
                          !isFuture &&
                            (y === draftYear
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"),
                        )}
                      >
                        {y}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border px-1 py-2 rounded-xl">
                <p className="mb-2 text-center text-sm font-medium text-foreground">
                  Сар сонгоно уу.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {months.map((m) => {
                    const isFuture =
                      draftYear === CURRENT_YEAR &&
                      m > new Date().getMonth() + 1;
                    return (
                      <button
                        key={m}
                        type="button"
                        disabled={isFuture}
                        onClick={() => setDraftMonth(m)}
                        className={cn(
                          "rounded-md py-1 text-sm transition-colors",
                          isFuture &&
                            "cursor-not-allowed text-muted-foreground/40 hover:bg-transparent",
                          !isFuture &&
                            (m === draftMonth
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"),
                        )}
                      >
                        {m} - сар
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {tab === "range" && (
            <div className="flex flex-col gap-3 p-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-foreground">
                    Эхлэх огноо
                  </span>
                  <div className="rounded-md bg-muted px-3 py-2 text-sm">
                    {formatDate(draftRange?.from) || "---"}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-foreground">
                    Дуусах огноо
                  </span>
                  <div className="rounded-md bg-muted px-3 py-2 text-sm">
                    {formatDate(draftRange?.to) || "---"}
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
                disabled={{ after: new Date() }}
                className="p-0 w-full"
              />
            </div>
          )}
        </Tabs>

        <div className="flex items-center gap-2 pb-2 px-3">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 px-2 py-5 cursor-pointer"
            onClick={handleClear}
          >
            Цэвэрлэх
          </Button>
          <Button
            variant="brandSecondary"
            size="sm"
            className="flex-1 rounded-full px-2 py-4 cursor-pointer"
            onClick={handleApply}
          >
            Шүүх
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
