"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileSpreadsheet, FileText } from "lucide-react";
import { ReactNode } from "react";

interface ExportMenuProps {
  trigger: ReactNode | ((open: boolean) => ReactNode);
  onTemplate?: () => void;
  onExcel?: () => void;
  onPdf?: () => void;
}

export function ExportMenu({
  trigger,
  onTemplate,
  onExcel,
  onPdf,
}: ExportMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {typeof trigger === "function" ? trigger(open) : trigger}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
        <DropdownMenuItem
          onClick={onTemplate}
          className="flex items-center justify-between rounded-xl px-3 py-3"
        >
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="h-5 w-5 text-green-600" />
            <span>Загвар татах</span>
          </div>
          <span className="text-xs font-semibold text-foreground">Excel</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onExcel}
          className="flex items-center justify-between rounded-xl px-3 py-3"
        >
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="h-5 w-5 text-green-600" />
            <span>Хүснэгт татах</span>
          </div>
          <span className="text-xs font-semibold text-foreground">Excel</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onPdf}
          className="flex items-center justify-between rounded-xl px-3 py-3"
        >
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-red-500" />
            <span>Хүснэгт татах</span>
          </div>
          <span className="text-xs font-semibold text-foreground">PDF</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
