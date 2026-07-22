"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { StatusPill } from "@/components/data-table";
import { DataTable, type DataTableColumn } from "@/components/data-table";
import { TablePagination } from "@/components/table-pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  supplyPrice: string;
  qty: number;
  totalPrice: string;
}

export interface OrderDetailsDialogOrder {
  id: string;
  orderNumber: string;
  branch?: string;
  orderDate?: string;
  viewedDate?: string;
  deliveryDate?: string;
  status?: string;
}

const mockItems: OrderItem[] = [
  {
    id: "1",
    name: "Ибупрофен 400мг №10 NCPCгох",
    supplyPrice: "12,000₮",
    qty: 30,
    totalPrice: "360,000₮",
  },
  {
    id: "2",
    name: "Гарын тос",
    supplyPrice: "10,000₮",
    qty: 41,
    totalPrice: "410,000₮",
  },
];

const itemColumns: DataTableColumn<OrderItem>[] = [
  { key: "name", header: "Бүтээгдэхүүний нэр" },
  { key: "supplyPrice", header: "Нийлүүлэх үнэ" },
  { key: "qty", header: "Тоо ширхэг" },
  { key: "totalPrice", header: "Нийт үнэ", align: "right" },
];

export function OrderDetailsDialog({
  order,
  open,
  onOpenChange,
}: {
  order: OrderDetailsDialogOrder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(50);

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl sm:max-w-5xl p-0 gap-0 overflow-hidden">
        <div className="flex h-[600px]">
          <div className="w-60 shrink-0 border-r border-default p-5 space-y-4">
            <div className="font-semibold text-lg">{order.orderNumber}</div>
            <StatusPill
              tone="warning"
              label={order.status ?? "Хүлээгдэж байна"}
            />

            <div className="space-y-1">
              <div className="text-xs text-foreground-tertiary">Салбар:</div>
              <div className="font-medium">{order.branch ?? "-"}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-foreground-tertiary">
                Захиалсан огноо:
              </div>
              <div className="font-medium">{order.orderDate ?? "-"}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-foreground-tertiary">
                Харсан огноо:
              </div>
              <div className="font-medium">{order.viewedDate ?? "-"}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-foreground-tertiary">
                Хүргэх огноо:
              </div>
              <div className="font-medium">{order.deliveryDate ?? "-"}</div>
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            <div className="py-4 px-2 flex items-center justify-between">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-tertiary" />
                <Input placeholder="Хайх" className="pl-9" />
              </div>
            </div>

            <div className="flex-1 min-h-0 px-2">
              <DataTable
                columns={itemColumns}
                data={mockItems}
                numbered
                getRowId={(row) => row.id}
                onHeaderMenuClick={() => console.log("Column settings")}
                stickyHeader
                emptyMessage="Захиалга олдсонгүй"
              />
            </div>

            <div className="p-4">
              <TablePagination
                page={page}
                pageSize={pageSize}
                totalItems={mockItems.length}
                onPageChange={setPage}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
