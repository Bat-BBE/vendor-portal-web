"use client";

import { useState, useMemo } from "react";

import { DataTable, type DataTableColumn } from "@/components/data-table";
import { TablePagination } from "@/components/table-pagination";
import { FilterBar } from "@/components/filters/filter-bar";
import {
  OrderDetailsDialog,
  type OrderDetailsDialogOrder,
} from "@/components/order-details-dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";

interface BranchRow {
  id: string;
  branchName: string;
  address: string;
  phone: string;
  time_sche: string;
}

const orders: BranchRow[] = [
  {
    id: "1",
    branchName: "Монос - 34 ФМ",
    address:
      "СХД 30 хороо Хамба 2-12 тоот /1 хороололын арын зам дагуу 34 гүүрээр өгсөөд 3 давхар саарал байшин 1 давхарт",
    phone: "9900-1234",
    time_sche: "09:00 - 21:000",
  },
];

const orderColumns: DataTableColumn<BranchRow>[] = [
  { key: "branchName", header: "Салбарын нэр" },
  { key: "address", header: "Хаяг" },
  { key: "phone", header: "Утасны дугаар" },
  { key: "time_sche", header: "Цагын хуваарь" },
];

const ORDER_TABS = [
  { value: "active", label: "Газрын зураг" },
  { value: "list", label: "Жагсаалт" },
];

export default function BranchScreen() {
  const [selectedOrder, setSelectedOrder] =
    useState<OrderDetailsDialogOrder | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activeTab, setActiveTab] = useState<"active" | "list">("active");

  const amountIndex = orderColumns.findIndex((c) => c.key === "amount");
  const columnsBeforeAmount = amountIndex;
  const columnsAfterAmount = orderColumns.length - amountIndex - 1;

  function mapBranchToOrder(row: BranchRow): OrderDetailsDialogOrder {
    return {
      id: row.id,
      orderNumber: row.branchName,
      branch: row.branchName,
      orderDate: undefined,
      viewedDate: undefined,
      deliveryDate: undefined,
      status: undefined,
      req_type: "",
      req_title: "",
      description: "",
      ref_image: "",
    };
  }

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return orders.slice(start, start + pageSize);
  }, [page, pageSize]);

  function handleTabChange(value: string) {
    setActiveTab(value as "active" | "list");
  }

  return (
    <div className="flex h-auto min-h-0 min-w-0 flex-col gap-6">
      <FilterBar
        tabs={ORDER_TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        search={true}
        // columnOptions={
        //   activeTab === "active" ? PAYMENTS_COLUMN_OPTIONS : undefined
        // }
        showYearFilter={false}
        // refresh={refresh}
      />

      {activeTab === "active" ? (
        <div>Maps components</div>
      ) : (
        <>
          <div className="flex-1 min-h-0 min-w-0">
            <DataTable
              columns={orderColumns}
              data={paginatedOrders}
              numbered
              getRowId={(row) => row.id}
              onHeaderMenuClick={() => console.log("Column settings")}
              getRowBadge={(row) => (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-foreground-tertiary hover:text-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOrder(mapBranchToOrder(row));
                  }}
                  aria-label="Дэлгэрэнгүй харах"
                >
                  <Eye className="h-6 w-6" strokeWidth={1.75} />
                </Button>
              )}
              stickyHeader
              emptyMessage="Захиалга олдсонгүй"
              footer={() => {
                return (
                  <TableRow className="border-t border-default bg-[#E6EBF1] hover:bg-background-secondary">
                    <TableCell className="px-4" />
                    <TableCell
                      colSpan={columnsBeforeAmount}
                      className="body-2-bold px-4 text-foreground"
                    >
                      Нийт
                    </TableCell>

                    <TableCell className="body-2-bold text-foreground text-right px-4 py-2"></TableCell>

                    {columnsAfterAmount > 0 && (
                      <TableCell
                        colSpan={columnsAfterAmount}
                        className="px-4"
                      />
                    )}
                  </TableRow>
                );
              }}
            />
          </div>

          <TablePagination
            page={page}
            pageSize={pageSize}
            totalItems={orders.length}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
        </>
      )}
      <OrderDetailsDialog
        order={selectedOrder}
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
      />
    </div>
  );
}
