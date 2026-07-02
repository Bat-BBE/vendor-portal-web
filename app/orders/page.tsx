"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";

import {
  DataTable,
  StatusPill,
  ActionLink,
  type DataTableColumn,
} from "@/components/data-table";

type OrderStatus = "active" | "pending" | "cancelled";

interface OrderRow {
  id: string;
  contract: string;
  createdAt: string;
  dueAt: string;
  totalAmount: string;
  paidAmount: string;
  status: OrderStatus;
}

const orders: OrderRow[] = [
  {
    id: "ORD-1001",
    contract: "#Order-1001",
    createdAt: "2026/05/12",
    dueAt: "2026/05/20",
    totalAmount: "523,456,789₮",
    paidAmount: "523,456,789₮",
    status: "active",
  },
  {
    id: "ORD-1002",
    contract: "#Order-1002",
    createdAt: "2026/05/12",
    dueAt: "2026/05/20",
    totalAmount: "412,000,000₮",
    paidAmount: "0₮",
    status: "pending",
  },
  {
    id: "ORD-1003",
    contract: "#Order-1003",
    createdAt: "2026/05/10",
    dueAt: "2026/05/18",
    totalAmount: "98,750,000₮",
    paidAmount: "98,750,000₮",
    status: "active",
  },
  {
    id: "ORD-1004",
    contract: "#Order-1004",
    createdAt: "2026/05/08",
    dueAt: "2026/05/15",
    totalAmount: "215,300,000₮",
    paidAmount: "0₮",
    status: "cancelled",
  },
  {
    id: "ORD-1005",
    contract: "#Order-1005",
    createdAt: "2026/05/07",
    dueAt: "2026/05/14",
    totalAmount: "60,120,000₮",
    paidAmount: "40,000,000₮",
    status: "pending",
  },
];

const statusLabel: Record<
  OrderStatus,
  { label: string; tone: "success" | "warning" | "error" }
> = {
  active: { label: "Идэвхтэй", tone: "success" },
  pending: { label: "Хүлээгдэж буй", tone: "warning" },
  cancelled: { label: "Цуцлагдсан", tone: "error" },
};

const orderColumns: DataTableColumn<OrderRow>[] = [
  { key: "contract", header: "Гэрээ" },
  { key: "createdAt", header: "Үүсгэсэн огноо" },
  { key: "dueAt", header: "Дуусах огноо" },
  { key: "totalAmount", header: "Нийт дүн", align: "right" },
  { key: "paidAmount", header: "Төлсөн дүн", align: "right" },
  {
    key: "status",
    header: "Төлөв",
    render: (row) => {
      const { label, tone } = statusLabel[row.status];
      return <StatusPill tone={tone} label={label} />;
    },
  },
  {
    key: "actions",
    header: "",
    align: "right",
    render: (row) => (
      <ActionLink onClick={() => console.log("Тохируулах:", row.id)}>
        Тохируулах
      </ActionLink>
    ),
  },
];

export default function OrdersPage() {
  const [selectedIds, setSelectedIds] = React.useState<Set<string | number>>(
    new Set(),
  );
  return (
    <div className="flex flex-col gap-6">
      <DataTable
        columns={orderColumns}
        data={orders}
        numbered
        getRowId={(row) => row.id}
        selectable
        selectedIds={selectedIds}
        onSelectedIdsChange={setSelectedIds}
        getRowBadge={(row) =>
          row.status === "active" ? (
            <CheckCircle2
              className="ml-auto h-4 w-4 text-success"
              strokeWidth={1.75}
            />
          ) : null
        }
        onHeaderMenuClick={() => console.log("Багана тохиргоо нээх")}
        emptyMessage="Захиалга олдсонгүй"
      />
    </div>
  );
}
