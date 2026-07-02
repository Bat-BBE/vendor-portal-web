"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";

import {
  DataTable,
  StatusPill,
  ActionLink,
  type DataTableColumn,
} from "./data-table";

interface OrderRow {
  id: string;
  contract: string;
  createdAt: string;
  dueAt: string;
  totalAmount: string;
  paidAmount: string;
  status: "active" | "pending";
}

const orderData: OrderRow[] = [
  {
    id: "1",
    contract: "#Order",
    createdAt: "2026/05/12",
    dueAt: "2026/05/12",
    totalAmount: "523,456,789₮",
    paidAmount: "523,456,789₮",
    status: "active",
  },
  {
    id: "2",
    contract: "#Order",
    createdAt: "2026/05/12",
    dueAt: "2026/05/12",
    totalAmount: "523,456,789₮",
    paidAmount: "523,456,789₮",
    status: "pending",
  },
];

const orderColumns: DataTableColumn<OrderRow>[] = [
  { key: "contract", header: "Гэрээ" },
  { key: "createdAt", header: "Үүсгэсэн огноо" },
  { key: "dueAt", header: "Дуусах огноо" },
  { key: "totalAmount", header: "Нийт дүн", align: "right" },
  { key: "paidAmount", header: "Төлсөн дүн", align: "right" },
  {
    key: "status",
    header: "Төлөв",
    render: (row) =>
      row.status === "active" ? (
        <StatusPill tone="success" label="Идэвхтэй" />
      ) : (
        <StatusPill tone="warning" label="Хүлээгдэж буй" />
      ),
  },
  {
    key: "actions",
    header: "",
    align: "right",
    render: () => <ActionLink onClick={() => {}}>Тохируулах</ActionLink>,
  },
];

export function OrderTableExample() {
  return (
    <DataTable
      columns={orderColumns}
      data={orderData}
      numbered
      getRowId={(row) => row.id}
      getRowBadge={(row) =>
        row.status === "active" ? (
          <CheckCircle2
            className="ml-auto h-4 w-4 text-success"
            strokeWidth={1.75}
          />
        ) : null
      }
    />
  );
}

interface ProductRow {
  id: string;
  name: string;
  barcode: string;
  unit: string;
  price: string;
}

const productData: ProductRow[] = [
  {
    id: "p1",
    name: "Барааны нэр",
    barcode: "CDN-0417 PROD-33456",
    unit: "Шараар",
    price: "72,000₮",
  },
  {
    id: "p2",
    name: "Барааны нэр",
    barcode: "CDN-0417 PROD-33456",
    unit: "Шараар",
    price: "72,000₮",
  },
  {
    id: "p3",
    name: "Барааны нэр",
    barcode: "CDN-0417 PROD-33456",
    unit: "Шараар",
    price: "72,000₮",
  },
];

const productColumns: DataTableColumn<ProductRow>[] = [
  { key: "name", header: "Барааны нэр" },
  { key: "barcode", header: "Бар код" },
  { key: "unit", header: "Хэмжих нэгж" },
  { key: "price", header: "Худалдах үнэ", align: "right" },
];

export function ProductTableExample() {
  const [selected, setSelected] = React.useState<Set<string | number>>(
    new Set(),
  );

  return (
    <DataTable
      columns={productColumns}
      data={productData}
      getRowId={(row) => row.id}
      selectable
      selectedIds={selected}
      onSelectedIdsChange={setSelected}
      highlightedRowId="p3"
      onRowClick={(row) => setSelected(new Set([row.id]))}
    />
  );
}
