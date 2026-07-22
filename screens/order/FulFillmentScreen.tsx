"use client";

import { useState, useMemo } from "react";

import {
  DataTable,
  StatusPill,
  type DataTableColumn,
  DataTableColumnGroup,
} from "@/components/data-table";
import { TablePagination } from "@/components/table-pagination";
import { FilterBar } from "@/components/filters/filter-bar";
import { type FilterOption } from "@/components/filters/checklist-filter";
import { Eye } from "lucide-react";
import { OrderDetailsDialog } from "@/components/order-details-dialog";
import { Button } from "@/components/ui/button";

type OrderStatus = "delivered" | "prepared" | "pending";

interface OrderRow {
  id: string;
  orderNumber: string;
  orderDate: string;
  deliveryDate: string;
  viewedDate: string;
  branch: string;
  supplier: string;
  amount: string;
  status: OrderStatus;
}

const PAYMENTS_COLUMN_OPTIONS: FilterOption[] = [
  { value: "debit", label: "Дебит" },
  { value: "credit", label: "Кредит" },
  { value: "keyword", label: "Гүйлгээт үгтэй" },
];

const orders: OrderRow[] = [
  {
    id: "1",
    orderNumber: "#12456",
    orderDate: "2026/03/12",
    deliveryDate: "2026/03/12",
    viewedDate: "2026/03/12",
    branch: "Салбарын нэр",
    supplier: "Нийлүүлэгчийн нэр",
    amount: "123,456,789₮",
    status: "delivered",
  },
  {
    id: "2",
    orderNumber: "#12457",
    orderDate: "2026/03/13",
    deliveryDate: "2026/03/14",
    viewedDate: "2026/03/13",
    branch: "Баянзүрх салбар",
    supplier: "АПУ ХК",
    amount: "89,000,000₮",
    status: "prepared",
  },
  {
    id: "3",
    orderNumber: "#12458",
    orderDate: "2026/03/14",
    deliveryDate: "2026/03/15",
    viewedDate: "2026/03/14",
    branch: "Хан-Уул салбар",
    supplier: "MCS Coca-Cola",
    amount: "256,800,000₮",
    status: "pending",
  },
  {
    id: "4",
    orderNumber: "#12459",
    orderDate: "2026/03/15",
    deliveryDate: "2026/03/16",
    viewedDate: "2026/03/15",
    branch: "Сүхбаатар салбар",
    supplier: "Тэсо ХХК",
    amount: "65,300,000₮",
    status: "delivered",
  },
  {
    id: "5",
    orderNumber: "#12460",
    orderDate: "2026/03/16",
    deliveryDate: "2026/03/17",
    viewedDate: "2026/03/16",
    branch: "Чингэлтэй салбар",
    supplier: "Номин Холдинг",
    amount: "145,900,000₮",
    status: "prepared",
  },
];

const statusLabel: Record<
  OrderStatus,
  {
    label: string;
    tone: "success" | "warning" | "info";
  }
> = {
  delivered: {
    label: "Хүргэлтэд гарсан",
    tone: "warning",
  },
  prepared: {
    label: "Захиалга бэлтгэгдэж байна",
    tone: "info",
  },
  pending: {
    label: "Хүлээгдэж байна",
    tone: "success",
  },
};

const orderColumns: DataTableColumn<OrderRow>[] = [
  { key: "branch", header: "Салбар" },
  { key: "orderNumber", header: "Захиалгын дугаар" },
  { key: "orderDate", header: "Захиалгын огноо" },
  { key: "orderQty", header: "Тоо ширхэг", align: "right" },
  { key: "orderAmount", header: "Үнийн дүн", align: "right" },
  { key: "deliveryQty", header: "Тоо ширхэг", align: "right" },
  { key: "deliveryAmount", header: "Үнийн дүн", align: "right" },
  { key: "diffQty", header: "Тоо ширхэг", align: "right" },
  { key: "diffAmount", header: "Үнийн дүн", align: "right" },
  {
    key: "status",
    header: "Төлөв",
    render: (row) => {
      const { label, tone } = statusLabel[row.status];
      return <StatusPill tone={tone} label={label} />;
    },
  },
];

const orderColumnGroups: DataTableColumnGroup[] = [
  { key: "order", header: "Захиалга", columnKeys: ["orderQty", "orderAmount"] },
  {
    key: "delivery",
    header: "Нийлүүлэлт",
    columnKeys: ["deliveryQty", "deliveryAmount"],
  },
  { key: "diff", header: "Зөрүү", columnKeys: ["diffQty", "diffAmount"] },
];

export default function FulFillmentScreen() {
  const [selectedOrder, setSelectedOrder] = useState<OrderRow | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activeTab, setActiveTab] = useState("active");

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return orders.slice(start, start + pageSize);
  }, [orders, page, pageSize]);

  const refresh = async function onClickRefresh() {
    console.log("hello refresh hiisen");
  };

  const handleDownload = async () => {
    console.log("tataj avch baina aa .. ");
  };

  return (
    <div className="flex h-auto min-h-0 min-w-0 flex-col gap-6">
      <FilterBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        search={true}
        columnOptions={PAYMENTS_COLUMN_OPTIONS}
        showYearFilter={true}
        refresh={refresh}
        onDownload={handleDownload}
      />
      <div className="flex-1 min-h-0 min-w-0">
        <DataTable
          columns={orderColumns}
          columnGroups={orderColumnGroups}
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
                setSelectedOrder(row);
              }}
              aria-label="Дэлгэрэнгүй харах"
            >
              <Eye className="h-6 w-6" strokeWidth={1.75} />
            </Button>
          )}
          stickyHeader
          emptyMessage="Захиалга олдсонгүй"
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
      <OrderDetailsDialog
        order={selectedOrder}
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
      />
    </div>
  );
}
