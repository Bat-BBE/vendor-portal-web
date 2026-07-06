"use client";

import { MoreVertical, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HelpArticleActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function HelpArticleActions({
  onEdit,
  onDelete,
}: HelpArticleActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-full bg-white/90 text-foreground shadow-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 py-2 px-1">
        <DropdownMenuItem
          onClick={onEdit}
          className="gap-3 flex justify-between border-b-1 rounded-none py-2"
        >
          Засварлах
          <SquarePen className="h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          className="gap-3 flex justify-between py-2"
        >
          Устгах
          <Trash2 className="h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
