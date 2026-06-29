import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
  Bookmark,
  Bell,
  Users,
  FileText,
  CreditCard,
  Store,
  Truck,
  Shield,
  Sliders,
} from "lucide-react";
import { NavItem } from "@/models/sidebarModel";

export type UserRole =
  | "admin"
  | "vendor"
  | "finance"
  | "logistics"
  | "marketing"
  | "viewer";

const COMMON_BOTTOM: NavItem[] = [
  { label: "Тусламж", href: "/help", icon: <HelpCircle size={16} /> },
  { label: "Сонирхол", href: "/saved", icon: <Bookmark size={16} /> },
  { label: "Гарах", href: "/logout", icon: <LogOut size={16} /> },
];

const NAV_CONFIG: Record<UserRole, { nav: NavItem[]; bottom?: NavItem[] }> = {
  admin: {
    nav: [
      {
        label: "Хяналтын самбар",
        href: "/dashboard",
        icon: <LayoutDashboard size={16} />,
      },
      {
        label: "Төлбөр тооцоо",
        icon: <CreditCard size={16} />,
        children: [
          { label: "Бүх захиалга", href: "/payments" },
          { label: "Хүлээгдэж буй", href: "/payments/pending" },
          { label: "Буцаалт", href: "/payments/refund" },
        ],
      },
      { label: "Захиалга", href: "/orders", icon: <ShoppingCart size={16} /> },
      {
        label: "Хамтын ажиллагаа",
        icon: <Users size={16} />,
        children: [
          { label: "Вендорууд", href: "/partners/vendors" },
          { label: "Нийлүүлэгчид", href: "/partners/suppliers" },
        ],
      },
      { label: "Тайлан", href: "/reports", icon: <BarChart2 size={16} /> },
      { label: "Хэрэглэгчид", href: "/users", icon: <Users size={16} /> },
      { label: "Тохиргоо", href: "/settings", icon: <Settings size={16} /> },
    ],
    bottom: [
      { label: "Эрхийн удирдлага", href: "/roles", icon: <Shield size={16} /> },
      ...COMMON_BOTTOM,
    ],
  },

  vendor: {
    nav: [
      { label: "Нүүр хуудас", href: "/", icon: <LayoutDashboard size={16} /> },
      { label: "Миний дэлгүүр", href: "/store", icon: <Store size={16} /> },
      {
        label: "Захиалгууд",
        icon: <ShoppingCart size={16} />,
        children: [
          { label: "Шинэ захиалга", href: "/orders/new" },
          { label: "Явагдаж буй", href: "/orders/active" },
          { label: "Дууссан", href: "/orders/done" },
        ],
      },
      { label: "Бүтээгдэхүүн", href: "/products", icon: <Package size={16} /> },
      {
        label: "Тайлан",
        href: "/reports",
        icon: <BarChart2 size={16} />,
        badge: 3,
      },
    ],
    bottom: COMMON_BOTTOM,
  },

  finance: {
    nav: [
      {
        label: "Хяналтын самбар",
        href: "/dashboard",
        icon: <LayoutDashboard size={16} />,
      },
      {
        label: "Төлбөр тооцоо",
        icon: <CreditCard size={16} />,
        children: [
          { label: "Авлага", href: "/finance/receivable" },
          { label: "Өглөг", href: "/finance/payable" },
          { label: "Буцаалт", href: "/finance/refund" },
        ],
      },
      { label: "Нэхэмжлэх", href: "/invoices", icon: <FileText size={16} /> },
      { label: "Тайлан", href: "/reports", icon: <BarChart2 size={16} /> },
    ],
    bottom: COMMON_BOTTOM,
  },

  logistics: {
    nav: [
      { label: "Нүүр хуудас", href: "/", icon: <LayoutDashboard size={16} /> },
      { label: "Хүргэлт", href: "/delivery", icon: <Truck size={16} /> },
      {
        label: "Захиалгууд",
        icon: <ShoppingCart size={16} />,
        children: [
          { label: "Хүлээгдэж буй", href: "/orders/pending" },
          { label: "Явагдаж буй", href: "/orders/active" },
        ],
      },
      { label: "Агуулах", href: "/warehouse", icon: <Package size={16} /> },
    ],
    bottom: COMMON_BOTTOM,
  },

  marketing: {
    nav: [
      { label: "Нүүр хуудас", href: "/", icon: <LayoutDashboard size={16} /> },
      {
        label: "Кампанит ажил",
        icon: <Bell size={16} />,
        children: [
          { label: "Идэвхтэй", href: "/campaigns/active" },
          { label: "Дууссан", href: "/campaigns/done" },
        ],
      },
      { label: "Тайлан", href: "/reports", icon: <BarChart2 size={16} /> },
      { label: "Тохиргоо", href: "/settings", icon: <Sliders size={16} /> },
    ],
    bottom: COMMON_BOTTOM,
  },

  viewer: {
    nav: [
      { label: "Нүүр хуудас", href: "/", icon: <LayoutDashboard size={16} /> },
      { label: "Тайлан", href: "/reports", icon: <BarChart2 size={16} /> },
    ],
    bottom: COMMON_BOTTOM,
  },
};

export function getNavByRole(role: UserRole) {
  return NAV_CONFIG[role] ?? NAV_CONFIG.viewer;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Админ",
  vendor: "Вендор",
  finance: "Санхүү",
  logistics: "Логистик",
  marketing: "Маркетинг",
  viewer: "Харагч",
};
