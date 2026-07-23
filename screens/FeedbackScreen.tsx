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
import { Eye, Plus } from "lucide-react";
import {
  OrderDetailsDialog,
  type OrderDetailsDialogOrder,
} from "@/components/order-details-dialog";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";

type OrderStatus = "resolved" | "pending" | "unresolved";

interface FeedbackRow {
  id: string;
  req_type: string;
  req_title: string;
  description: string;
  ref_image: string;
  status: OrderStatus;
}

const orders: FeedbackRow[] = [
  {
    id: "1",
    req_type: "Төрөл 01",
    req_title: "Захиалгын биелэлт зөрсөн",
    description: "Сая 11нд илгээсэн захиалгын тоо хэмжээ зөрсөн байна",
    ref_image: "",
    status: "resolved",
  },
  {
    id: "2",
    req_type: "Төрөл 02",
    req_title: "Захиалгын биелэлт зөрсөн",
    description: "Сая 11нд илгээсэн захиалгын тоо хэмжээ зөрсөн байна",
    ref_image: "",
    status: "unresolved",
  },
  {
    id: "3",
    req_type: "Төрөл 03",
    req_title: "Захиалгын биелэлт зөрсөн",
    description: "Сая 11нд илгээсэн захиалгын тоо хэмжээ зөрсөн байна",
    ref_image: "",
    status: "resolved",
  },
  {
    id: "4",
    req_type: "Төрөл 04",
    req_title: "Захиалгын биелэлт зөрсөн",
    description: "Сая 11нд илгээсэн захиалгын тоо хэмжээ зөрсөн байна",
    ref_image: "",
    status: "pending",
  },
];

const statusLabel: Record<
  OrderStatus,
  {
    label: string;
    tone: "success" | "warning" | "error";
  }
> = {
  resolved: {
    label: "Хүргэлтэд гарсан",
    tone: "warning",
  },
  unresolved: {
    label: "Захиалга бэлтгэгдэж байна",
    tone: "error",
  },
  pending: {
    label: "Хүлээгдэж байна",
    tone: "success",
  },
};

const orderColumns: DataTableColumn<FeedbackRow>[] = [
  { key: "req_type", header: "Хүсэлтийн төрөл" },
  { key: "req_title", header: "Хүсэлтийн гарчиг" },
  { key: "description", header: "Дэлгэрэнгүй" },
  { key: "ref_image", header: "Хавсралт материал" },
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
  const [selectedOrder, setSelectedOrder] =
    useState<OrderDetailsDialogOrder | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activeTab, setActiveTab] = useState("active");

  const summaryStartIndex = orderColumns.findIndex((c) => c.key === "orderQty");
  const columnsBeforeSummary = summaryStartIndex;

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return orders.slice(start, start + pageSize);
  }, [page, pageSize]);

  const refresh = async function onClickRefresh() {
    console.log("hello refresh hiisen");
  };

  function mapFeedbackToOrder(row: FeedbackRow): OrderDetailsDialogOrder {
    return {
      id: row.id,
      orderNumber: row.req_title,
      branch: row.req_type,
      orderDate: undefined,
      viewedDate: undefined,
      deliveryDate: undefined,
      status: row.status,
      req_type: row.req_type,
      req_title: row.req_title,
      description: row.description,
      ref_image: row.ref_image,
    };
  }

  const handleCreate = async () => {
    console.log("tataj avch baina aa .. ");
  };

  return (
    <div className="flex h-auto min-h-0 min-w-0 flex-col gap-6">
      <FilterBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        search={true}
        // columnOptions={PAYMENTS_COLUMN_OPTIONS}
        showYearFilter={true}
        refresh={refresh}
        // onDownload={handleDownload}
        actions={
          <Button
            variant="brandSecondary"
            className="
          h-10
          shrink-0
          rounded-full
          px-5
          py-5
        "
            onClick={handleCreate}
          >
            Санал хүсэлт илгээх
            <Plus className="ml-1 h-4 w-4" />
          </Button>
        }
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
                setSelectedOrder(mapFeedbackToOrder(row));
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
                  colSpan={columnsBeforeSummary}
                  className="body-2-bold px-4 text-foreground"
                >
                  Нийт
                </TableCell>
                <TableCell className="body-2-bold text-right px-4 py-2 text-foreground"></TableCell>
                <TableCell className="body-2-bold text-right px-4 py-2 text-foreground"></TableCell>
                <TableCell className="body-2-bold text-right px-4 py-2 text-foreground"></TableCell>
                <TableCell className="body-2-bold text-right px-4 py-2 text-foreground"></TableCell>
                <TableCell className="body-2-bold text-right px-4 py-2 text-foreground"></TableCell>
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
      {/* <OrderDetailsDialog
        order={selectedOrder}
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
      /> */}
    </div>
  );
}
