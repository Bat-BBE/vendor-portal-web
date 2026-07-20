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
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
        {hasTabs && (
          <div className="shrink-0 overflow-x-auto">
            <Tabs value={activeTab} onValueChange={onTabChange}>
              <TabsList className="inline-flex h-auto rounded-xl bg-[#E6EBF1] p-1">
                {tabs!.map((opt) => (
                  <TabsTrigger
                    key={opt.value}
                    value={opt.value}
                    className="
                    whitespace-nowrap
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    font-medium
                    transition-all
                    data-[state=active]:bg-white
                    data-[state=active]:text-foreground
                    data-[state=active]:shadow-none
                  "
                  >
                    {opt.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}

        {search && (
          <div className="relative w-full min-w-[180px] flex-1 sm:max-w-[260px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setFilters({
                  search: e.target.value || null,
                });
              }}
              placeholder="Хайх"
              className="h-11 rounded-xl bg-white pl-10"
            />
          </div>
        )}

        {showYearFilter && (
          <div className="w-full sm:w-auto shrink-0">
            <PeriodFilter
              value={periodValue}
              onChange={handlePeriodChange}
              onClear={handlePeriodClear}
            />
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-start gap-2 xl:justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="
          h-10
          shrink-0
          rounded-xl
          bg-white
          px-4
          py-6
        "
        >
          <span>Шинэчлэх</span>

          <RefreshCw
            className={cn("ml-2 h-4 w-4", isRefreshing && "animate-spin")}
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
              className="
              h-10
              shrink-0
              rounded-xl
              bg-white
              px-4
              py-6
            "
            >
              <span>Шүүлтүүр</span>

              <Funnel className="ml-2 h-4 w-4" />
            </Button>
          }
        />

        <Button
          type="button"
          variant="brandSecondary"
          onClick={handleDownload}
          disabled={isDownloading}
          className="
          h-10
          shrink-0
          rounded-xl
          px-5
          py-5
        "
        >
          <span>Татах</span>

          <Paperclip className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
