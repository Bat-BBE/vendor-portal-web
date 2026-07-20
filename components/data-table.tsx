"use client";

import * as React from "react";
import { Menu } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DataTableAlign = "left" | "center" | "right";

export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  width?: string;
  align?: DataTableAlign;
  render?: (row: T, rowIndex: number) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowId?: (row: T, index: number) => string | number;
  numbered?: boolean;
  selectable?: boolean;
  selectedIds?: Set<string | number>;
  onSelectedIdsChange?: (ids: Set<string | number>) => void;
  getRowBadge?: (row: T, index: number) => React.ReactNode;
  highlightedRowId?: string | number;
  onRowClick?: (row: T, index: number) => void;
  rowClassName?: (row: T, index: number) => string | undefined;
  onHeaderMenuClick?: () => void;
  hideHeaderMenu?: boolean;
  emptyMessage?: React.ReactNode;
  className?: string;
  maxWidth?: number | string;
  stickyHeader?: boolean;
  footer?: (data: T[]) => React.ReactNode;
}

const statusPillTone = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  error: "bg-error-soft text-error",
  info: "bg-info-soft text-info",
  neutral: "bg-background-tertiary text-foreground-secondary",
} as const;

export function StatusPill({
  label,
  tone = "neutral",
  className,
}: {
  label: React.ReactNode;
  tone?: keyof typeof statusPillTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "caption-1-bold inline-flex items-center rounded-full px-2.5 py-1",
        statusPillTone[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}

export function ActionLink({
  children,
  onClick,
  tone = "brand",
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  tone?: "brand" | "warning" | "error";
  className?: string;
}) {
  const toneClass =
    tone === "warning"
      ? "text-warning"
      : tone === "error"
        ? "text-error"
        : "text-brand-600";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "body-2-medium underline-offset-2 hover:underline",
        toneClass,
        className,
      )}
    >
      {children}
    </button>
  );
}

export function DataTable<T>({
  columns,
  data,
  getRowId = (_row, index) => index,
  numbered = false,
  selectable = false,
  selectedIds,
  onSelectedIdsChange,
  getRowBadge,
  highlightedRowId,
  onRowClick,
  rowClassName,
  onHeaderMenuClick,
  hideHeaderMenu = false,
  emptyMessage = "Мэдээлэл олдсонгүй",
  className,
  stickyHeader = false,
  footer,
}: DataTableProps<T>) {
  const isControlled = selectedIds !== undefined && !!onSelectedIdsChange;
  const [internalSelected, setInternalSelected] = React.useState<
    Set<string | number>
  >(() => new Set());
  const selected = isControlled ? selectedIds! : internalSelected;

  const setSelected = (next: Set<string | number>) => {
    if (isControlled) {
      onSelectedIdsChange!(next);
    } else {
      setInternalSelected(next);
    }
  };

  const allIds = React.useMemo(
    () => data.map((row, index) => getRowId(row, index)),
    [data, getRowId],
  );
  const allSelected =
    allIds.length > 0 && allIds.every((id) => selected.has(id));
  const someSelected = !allSelected && allIds.some((id) => selected.has(id));

  const toggleAll = () =>
    setSelected(allSelected ? new Set() : new Set(allIds));

  const toggleRow = (id: string | number) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const totalColumns =
    columns.length +
    (selectable ? 1 : 0) +
    (numbered ? 1 : 0) +
    (hideHeaderMenu ? 0 : 1);

  return (
    <div
      className={cn(
        "flex h-full min-h-0 min-w-0 w-full flex-col overflow-hidden rounded-xl border border-default bg-background",
        className,
      )}
    >
      <div className="sidebar-scroll h-full w-full overflow-x-auto overflow-y-auto">
        <Table className="min-w-max">
          <colgroup>
            {selectable && <col style={{ width: "44px" }} />}
            {numbered && <col style={{ width: "48px" }} />}
            {columns.map((column) => (
              <col
                key={column.key}
                style={column.width ? { width: column.width } : undefined}
              />
            ))}
            {!hideHeaderMenu && <col style={{ width: "44px" }} />}
          </colgroup>

          <TableHeader
            className={cn(stickyHeader && "sticky top-0 z-20 bg-[#E6EBF1]")}
          >
            <TableRow
              className={cn(
                "border-b border-default hover:bg-[#E6EBF1]",
                stickyHeader && "bg-[#E6EBF1]",
              )}
            >
              {selectable && (
                <TableHead className="px-4">
                  <Checkbox
                    checked={
                      allSelected
                        ? true
                        : someSelected
                          ? "indeterminate"
                          : false
                    }
                    onCheckedChange={toggleAll}
                    aria-label="Бүгдийг сонгох"
                  />
                </TableHead>
              )}
              {numbered && (
                <TableHead className="caption-1-bold px-4 text-foreground font-semibold">
                  №
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    "caption-1-bold px-4 text-foreground font-semibold",
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right",
                    column.headerClassName,
                  )}
                >
                  {column.header}
                </TableHead>
              ))}
              {!hideHeaderMenu && (
                <TableHead className="px-2 text-right">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-foreground"
                    onClick={onHeaderMenuClick}
                    aria-label="Багана тохиргоо"
                  >
                    <Menu className="h-4 w-4" strokeWidth={1.75} />
                  </Button>
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={totalColumns}
                  className="body-2-regular py-10 text-center text-foreground-tertiary"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => {
                const id = getRowId(row, index);
                const isHighlighted =
                  highlightedRowId !== undefined && highlightedRowId === id;

                return (
                  <TableRow
                    key={id}
                    onClick={
                      onRowClick ? () => onRowClick(row, index) : undefined
                    }
                    className={cn(
                      "group border-b border-subtle last:border-b-0",
                      onRowClick && "cursor-pointer",
                      isHighlighted
                        ? "bg-accent"
                        : "hover:bg-background-secondary",
                      rowClassName?.(row, index),
                    )}
                  >
                    {selectable && (
                      <TableCell
                        className="px-4"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <Checkbox
                          checked={selected.has(id)}
                          onCheckedChange={() => toggleRow(id)}
                          aria-label="Мөр сонгох"
                        />
                      </TableCell>
                    )}
                    {numbered && (
                      <TableCell className="body-2-regular px-4 text-foreground-tertiary">
                        {index + 1}
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell
                        key={column.key}
                        className={cn(
                          "body-2-regular px-4 text-foreground",
                          column.align === "center" && "text-center",
                          column.align === "right" && "text-right",
                          column.cellClassName,
                        )}
                      >
                        {column.render
                          ? column.render(row, index)
                          : ((row as Record<string, React.ReactNode>)[
                              column.key
                            ] ?? "—")}
                      </TableCell>
                    ))}
                    {!hideHeaderMenu && (
                      <TableCell className="px-3 text-right">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                          {getRowBadge?.(row, index)}
                        </span>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
          {footer && <TableFooter>{footer(data)}</TableFooter>}
        </Table>
      </div>
    </div>
  );
}
