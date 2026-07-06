"use client";

import { useState } from "react";
import { useQueryStates } from "nuqs";
import { Search, RefreshCw, Paperclip, Funnel } from "lucide-react";

import { filterParsers } from "@/lib/filter-params";
import { PeriodFilter, type PeriodFilterValue } from "./period-filter";
import { ChecklistFilter, type FilterOption } from "./checklist-filter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface FilterTabOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  tabs?: FilterTabOption[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
  columnOptions: FilterOption[];
  showYearFilter?: boolean;
  search?: boolean;
  refresh: () => void | Promise<void>;
  onDownload?: () => void | Promise<void>;
}

export function FilterBar({
  tabs,
  activeTab,
  onTabChange,
  search = true,
  columnOptions,
  showYearFilter = true,
  refresh,
  onDownload,
}: FilterBarProps) {
  const [filters, setFilters] = useQueryStates(filterParsers, {
    shallow: false,
  });
  const [searchValue, setSearchValue] = useState(filters.search ?? "");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const hasTabs = Boolean(tabs && tabs.length > 0);

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

  function handlePeriodChange(v: PeriodFilterValue) {
    if (v.mode === "month") {
      setFilters({ year: v.year, month: v.month, from: null, to: null });
    } else {
      setFilters({
        from: v.from ?? null,
        to: v.to ?? null,
        year: null,
        month: null,
      });
    }
  }

  function handlePeriodClear() {
    setFilters({ year: null, month: null, from: null, to: null });
  }

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
      <div className="flex flex-1 items-center gap-4">
        {hasTabs && (
          <Tabs value={activeTab} onValueChange={onTabChange}>
            <TabsList className="grid w-full grid-cols-2 gap-1 bg-[#E6EBF1] p-1">
              {tabs!.map((opt) => (
                <TabsTrigger
                  key={opt.value}
                  value={opt.value}
                  className="p-2 font-medium data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  {opt.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

        {search && (
          <div className="relative w-full max-w-[280px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground" />
            <Input
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setFilters({ search: e.target.value || null });
              }}
              placeholder="Хайх"
              className="pl-9 bg-white"
            />
          </div>
        )}

        {showYearFilter && (
          <PeriodFilter
            value={periodValue}
            onChange={handlePeriodChange}
            onClear={handlePeriodClear}
          />
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="ghost"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 bg-white px-3 py-5 text-sm text-foreground transition-colors"
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
              className="flex items-center gap-2 bg-white px-3 py-5 text-sm text-foreground transition-colors"
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
