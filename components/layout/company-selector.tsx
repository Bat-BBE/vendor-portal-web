"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface Company {
  id: string;
  name: string;
}

interface CompanySelectorProps {
  companies: Company[];
  selectedCompanyId: string;
  onSelectCompany: (companyId: string) => void;
  className?: string;
}

export function CompanySelector({
  companies,
  selectedCompanyId,
  onSelectCompany,
  className,
}: CompanySelectorProps) {
  const [open, setOpen] = React.useState(false);
  const selected = companies.find((c) => c.id === selectedCompanyId);

  if (companies.length <= 1) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex w-auto items-center justify-between rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-left transition-colors hover:bg-white/15 cursor-pointer",
            className,
          )}
        >
          <span className="truncate text-[15px] text-white">
            {selected?.name ?? "Компани сонгох"}
          </span>
          <ChevronDown
            size={18}
            className={cn(
              "shrink-0 text-white transition-transform duration-150",
              open && "rotate-180",
            )}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-[--radix-popover-trigger-width] min-w-[260px] p-2 rounded-2xl border-none shadow-xl"
      >
        <div className="flex flex-col gap-1 max-h-[320px] overflow-y-auto">
          {companies.map((company) => {
            const isSelected = company.id === selectedCompanyId;
            return (
              <button
                key={company.id}
                onClick={() => {
                  onSelectCompany(company.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 w-full rounded-xl border px-4 py-3 text-left text-[14px] font-medium transition-colors cursor-pointer",
                  isSelected
                    ? "border-teal-400 bg-teal-50 text-foreground"
                    : "border-transparent hover:bg-background-secondary text-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                    isSelected ? "border-teal-500" : "border-[#c9c9c9]",
                  )}
                >
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-teal-500" />
                  )}
                </span>
                <span className="truncate">{company.name}</span>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
