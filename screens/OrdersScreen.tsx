"use client";

import { useState, useMemo } from "react";

import {
  DataTable,
  StatusPill,
  type DataTableColumn,
} from "@/components/data-table";
import { TablePagination } from "@/components/table-pagination";
import { FilterBar } from "@/components/filters/filter-bar";
import { type FilterOption } from "@/components/filters/checklist-filter";
import { Eye } from "lucide-react";
import { OrderDetailsDialog } from "@/components/order-details-dialog";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";

type OrderStatus = "delivered" | "prepared" | "pending";
type TabKey = "active" | "history";
type OrderRow = ActiveOrderRow | HistoryOrderRow;

interface ActiveOrderRow {
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

interface HistoryOrderRow {
  id: string;
  orderNumber: string;
  orderDate: string;
  completedDate: string;
  branch: string;
  supplier: string;
  amount: string;
  paymentMethod: string;
}

function parseAmount(value: string) {
  return Number(value.replace(/[^\d]/g, "")) || 0;
}

const statusLabel: Record<
  OrderStatus,
  { label: string; tone: "success" | "warning" | "info" }
> = {
  delivered: { label: "Хүргэлтэд гарсан", tone: "warning" },
  prepared: { label: "Захиалга бэлтгэгдэж байна", tone: "info" },
  pending: { label: "Хүлээгдэж байна", tone: "success" },
};

const activeOrders: ActiveOrderRow[] = [
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

const historyOrders: HistoryOrderRow[] = [
  {
    id: "h1",
    orderNumber: "#12440",
    orderDate: "2026/02/10",
    completedDate: "2026/02/12",
    branch: "Хан-Уул салбар",
    supplier: "MCS Coca-Cola",
    amount: "256,800,000₮",
    paymentMethod: "Дансаар",
  },
  {
    id: "h2",
    orderNumber: "#12441",
    orderDate: "2026/02/11",
    completedDate: "2026/02/13",
    branch: "Сүхбаатар салбар",
    supplier: "Тэсо ХХК",
    amount: "65,300,000₮",
    paymentMethod: "Бэлнээр",
  },
  {
    id: "h3",
    orderNumber: "#12442",
    orderDate: "2026/02/14",
    completedDate: "2026/02/16",
    branch: "Чингэлтэй салбар",
    supplier: "Номин Холдинг",
    amount: "145,900,000₮",
    paymentMethod: "Дансаар",
  },
];

const activeOrderColumns: DataTableColumn<OrderRow>[] = [
  { key: "orderNumber", header: "Захиалгын дугаар" },
  { key: "orderDate", header: "Захиалгын огноо" },
  { key: "deliveryDate", header: "Хүргэх огноо" },
  { key: "viewedDate", header: "Харсан огноо" },
  { key: "branch", header: "Салбар" },
  { key: "supplier", header: "Нийлүүлэгч" },
  { key: "amount", header: "Үнийн дүн", align: "right" },
  {
    key: "status",
    header: "Төлөв",
    render: (row) => {
      if (!("status" in row)) return null;
      const { label, tone } = statusLabel[row.status];
      return <StatusPill tone={tone} label={label} />;
    },
  },
];

const historyOrderColumns: DataTableColumn<OrderRow>[] = [
  { key: "orderNumber", header: "Захиалгын дугаар" },
  { key: "orderDate", header: "Захиалгын огноо" },
  { key: "completedDate", header: "Дууссан огноо" },
  { key: "branch", header: "Салбар" },
  { key: "supplier", header: "Нийлүүлэгч" },
  { key: "amount", header: "Үнийн дүн", align: "right" },
  { key: "paymentMethod", header: "Төлбөрийн хэлбэр" },
];

const ACTIVE_COLUMN_OPTIONS: FilterOption[] = [
  { value: "debit", label: "Дебит" },
  { value: "credit", label: "Кредит" },
  { value: "keyword", label: "Гүйлгээт үгтэй" },
];

const HISTORY_COLUMN_OPTIONS: FilterOption[] = [
  { value: "cash", label: "Бэлнээр" },
  { value: "bank", label: "Дансаар" },
];

const ORDER_TABS = [
  { value: "active", label: "Идэвхтэй захиалга" },
  { value: "history", label: "Захиалгын түүх" },
];

interface TabConfig {
  data: OrderRow[];
  columns: DataTableColumn<OrderRow>[];
  filters: {
    search: boolean;
    showYearFilter: boolean;
    columnOptions: FilterOption[];
    showRefresh: boolean;
    showDownload: boolean;
    showExport: boolean;
  };
}

const TAB_CONFIG: Record<TabKey, TabConfig> = {
  active: {
    data: activeOrders,
    columns: activeOrderColumns,
    filters: {
      search: true,
      showYearFilter: true,
      columnOptions: ACTIVE_COLUMN_OPTIONS,
      showRefresh: true,
      showDownload: true,
      showExport: false,
    },
  },
  history: {
    data: historyOrders,
    columns: historyOrderColumns,
    filters: {
      search: true,
      showYearFilter: true,
      columnOptions: HISTORY_COLUMN_OPTIONS,
      showRefresh: false,
      showDownload: false,
      showExport: true,
    },
  },
};

export default function OrdersScreen() {
  const [selectedOrder, setSelectedOrder] = useState<ActiveOrderRow | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<TabKey>("active");

  const [pageByTab, setPageByTab] = useState<Record<TabKey, number>>({
    active: 1,
    history: 1,
  });
  const [pageSizeByTab, setPageSizeByTab] = useState<Record<TabKey, number>>({
    active: 10,
    history: 10,
  });

  const page = pageByTab[activeTab];
  const pageSize = pageSizeByTab[activeTab];

  const { data, columns, filters } = TAB_CONFIG[activeTab];

  const amountIndex = columns.findIndex((c) => c.key === "amount");
  const columnsBeforeAmount = amountIndex;
  const columnsAfterAmount = columns.length - amountIndex - 1;

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  function handleTabChange(value: string) {
    setActiveTab(value as TabKey);
  }

  function setPage(p: number) {
    setPageByTab((prev) => ({ ...prev, [activeTab]: p }));
  }

  function setPageSize(size: number) {
    setPageSizeByTab((prev) => ({ ...prev, [activeTab]: size }));
    setPageByTab((prev) => ({ ...prev, [activeTab]: 1 }));
  }

  const refresh = async () => {
    console.log("hello refresh hiisen");
  };

  const handleDownload = async () => {
    console.log("tataj avch baina aa .. ");
  };

  const handleTemplateDownload = () => {
    console.log("template tatah");
  };

  const handleExcelDownload = () => {
    console.log("excel tatah");
  };

  const handlePdfDownload = () => {
    console.log("pdf tatah");
  };

  return (
    <div className="flex h-auto min-h-0 min-w-0 flex-col gap-6">
      <FilterBar
        tabs={ORDER_TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        search={filters.search}
        columnOptions={filters.columnOptions}
        showYearFilter={filters.showYearFilter}
        refresh={filters.showRefresh ? refresh : undefined}
        onDownload={filters.showDownload ? handleDownload : undefined}
        onTemplateDownload={
          filters.showExport ? handleTemplateDownload : undefined
        }
        onExcelDownload={filters.showExport ? handleExcelDownload : undefined}
        onPdfDownload={filters.showExport ? handlePdfDownload : undefined}
      />

      <div className="flex-1 min-h-0 min-w-0">
        <DataTable
          key={activeTab}
          columns={columns}
          data={paginatedData}
          numbered
          getRowId={(row) => row.id}
          onHeaderMenuClick={() => console.log("Column settings")}
          getRowBadge={
            activeTab === "active"
              ? (row) => (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-foreground-tertiary hover:text-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOrder(row as ActiveOrderRow);
                    }}
                    aria-label="Дэлгэрэнгүй харах"
                  >
                    <Eye className="h-6 w-6" strokeWidth={1.75} />
                  </Button>
                )
              : undefined
          }
          stickyHeader
          emptyMessage="Захиалга олдсонгүй"
          footer={(rows) => {
            const totalAmount = rows.reduce(
              (sum, row: OrderRow) => sum + parseAmount(row.amount),
              0,
            );

            return (
              <TableRow className="border-t border-default bg-background-secondary hover:bg-background-secondary">
                <TableCell className="px-4" />
                <TableCell
                  colSpan={columnsBeforeAmount}
                  className="body-2-bold px-4 text-foreground"
                >
                  Нийт: {rows.length} захиалга
                </TableCell>

                <TableCell className="body-2-bold text-foreground">
                  {totalAmount.toLocaleString("mn-MN")}₮
                </TableCell>

                {columnsAfterAmount > 0 && (
                  <TableCell colSpan={columnsAfterAmount} className="px-4" />
                )}
                <TableCell className="px-2" />
              </TableRow>
            );
          }}
        />
      </div>

      <TablePagination
        page={page}
        pageSize={pageSize}
        totalItems={data.length}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />

      <OrderDetailsDialog
        order={selectedOrder}
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
      />
    </div>
  );
}
