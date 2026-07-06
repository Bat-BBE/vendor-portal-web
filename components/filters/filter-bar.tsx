"use client";

import { useState } from "react";
import { useQueryStates } from "nuqs";
import {
  Search,
  RefreshCw,
  SlidersHorizontal,
  Paperclip,
  Funnel,
} from "lucide-react";

import { filterParsers } from "@/lib/filter-params";
import { PeriodFilter, type PeriodFilterValue } from "./period-filter";
import { ChecklistFilter, type FilterOption } from "./checklist-filter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  columnOptions: FilterOption[];
  showYearFilter?: boolean;
  search?: boolean;
  refresh: () => void | Promise<void>;
  onDownload?: () => void | Promise<void>;
}

export function FilterBar({
  search = true,
  columnOptions,
  showYearFilter = true,
  refresh,
  onDownload,
}: FilterBarProps) {
  const [filters, setFilters] = useQueryStates(filterParsers, {
    shallow: false,
  });
  const [searchValue, setSearchValue] = useState(filters.q ?? "");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const periodValue: PeriodFilterValue =
    filters.from && filters.to
      ? {
          mode: "range",
          from: new Date(filters.from),
          to: new Date(filters.to),
        }
      : {
          mode: "month",
          year: filters.year,
          month: filters.month ?? new Date().getMonth() + 1,
        };

  async function handleRefresh() {
    setIsRefreshing(true);
    try {
      await refresh();
    } finally {
      setIsRefreshing(false);
    }
  }

  async function handleDownload() {
    if (!onDownload) return;
    setIsDownloading(true);
    try {
      await onDownload();
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-1 items-center gap-8">
        {search && (
          <div className="relative w-full max-w-86">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setFilters({ q: e.target.value || null });
              }}
              placeholder="Хайх"
              className="pl-9"
            />
          </div>
        )}

        {showYearFilter && (
          <PeriodFilter
            value={periodValue}
            onChange={(v) => {
              if (v.mode === "month") {
                setFilters({
                  year: v.year,
                  month: v.month,
                  from: null,
                  to: null,
                });
              } else {
                setFilters({
                  from: v.from ?? null,
                  to: v.to ?? null,
                  year: null,
                  month: null,
                });
              }
            }}
          />
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="ghost"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 text-sm text-foreground-secondary transition-colors hover:text-foreground disabled:opacity-50"
        >
          Шинэчлэх
          <RefreshCw
            className={cn("h-4 w-4", isRefreshing && "animate-spin")}
          />
        </Button>

        <ChecklistFilter
          label="Шүүлтүүр"
          options={columnOptions}
          selected={filters.columns}
          onApply={(columns) => setFilters({ columns })}
          trigger={
            <Button
              type="button"
              variant="ghost"
              className="flex items-center gap-2 text-sm text-foreground-secondary transition-colors hover:text-foreground"
            >
              Шүүлтүүр
              <Funnel className="h-4 w-4" />
            </Button>
          }
        />

        <Button
          type="button"
          variant="brandSecondary"
          onClick={handleDownload}
          disabled={isDownloading}
          className="gap-3 rounded-3xl px-6 py-5 text-[13px]"
        >
          Татах
          <Paperclip className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
