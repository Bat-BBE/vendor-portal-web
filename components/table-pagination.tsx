"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../components/ui/select";
import { cn } from "@/lib/utils";

interface TablePaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;

  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function TablePagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: TablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const getPages = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (page <= 4) {
      return [1, 2, 3, 4, "...", totalPages];
    }
    if (page >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  };

  return (
    <div className="position-relative flex items-center justify-end gap-[16px] px-[16px] py-[20px]">
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              text=""
              className={cn(page === 1 && "pointer-events-none opacity-40")}
              onClick={(e) => {
                e.preventDefault();

                if (page > 1) {
                  onPageChange(page - 1);
                }
              }}
            />
          </PaginationItem>

          {getPages().map((item, index) =>
            item === "..." ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationLink
                  href="#"
                  isActive={page === item}
                  className={cn(
                    "h-8 w-8 rounded-xl font-medium text-[14px] text-foreground",
                    page === item
                      ? "bg-brand-50 text-brand-500"
                      : "hover:bg-muted",
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(item);
                  }}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              text=""
              className={cn(
                page === totalPages && "pointer-events-none opacity-40",
              )}
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPages) {
                  onPageChange(page + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Select
        value={pageSize.toString()}
        onValueChange={(value) => onPageSizeChange(Number(value))}
      >
        <SelectTrigger className="w-[140px] border-none cursor-pointer">
          <span>Хуудас:</span>
          <span className="font-medium">{pageSize}</span>
        </SelectTrigger>

        <SelectContent
          position="popper"
          align="end"
          sideOffset={6}
          className="w-[140px] rounded-xl border bg-background p-1 shadow-lg"
        >
          {[1, 10, 20, 50, 100].map((size) => (
            <SelectItem
              key={size}
              value={size.toString()}
              className="h-10 rounded-lg px-3 text-sm data-[highlighted]:bg-accent cursor-pointer"
            >
              <span className="text-foreground">Хуудас: </span>
              <span className="font-medium text-foreground">{size}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
