"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface FilterOption {
  value: string;
  label: string;
}

interface ChecklistFilterProps {
  label: string;
  options: FilterOption[];
  selected: string[];
  onApply: (values: string[]) => void;
  trigger?: React.ReactNode;
}

export function ChecklistFilter({
  label,
  options,
  selected,
  onApply,
  trigger,
}: ChecklistFilterProps) {
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState<string[]>(selected);

  const filtered = useMemo(
    () =>
      options.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [options, search],
  );

  function toggle(value: string) {
    setDraft((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger ?? (
          <Button variant="outline" size="sm">
            {label} {selected.length > 0 && `(${selected.length})`}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="end">
        <div className="relative mb-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="Хайх"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="max-h-56 space-y-1 overflow-y-auto">
          {filtered.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
            >
              <Checkbox
                checked={draft.includes(opt.value)}
                onCheckedChange={() => toggle(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
        <Button
          className="mt-3 w-full"
          size="sm"
          onClick={() => onApply(draft)}
        >
          Болсон
        </Button>
      </PopoverContent>
    </Popover>
  );
}
