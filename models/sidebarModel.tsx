import type * as React from "react";

export type NavItemIcon = React.ReactNode | React.ElementType;

export interface NavItem {
  label: string;
  href?: string;
  icon?: NavItemIcon;
  badge?: number;
  roles?: UserRole[];
  children?: NavItem[];
  parentLabel?: string;
  description?: string;
}

export interface SidebarProps {
  logo?: React.ReactNode;
  brandName?: string;
  navItems?: NavItem[];
  bottomItems?: NavItem[];
  defaultCollapsed?: boolean;
  className?: string;
}

export type UserRole =
  | "system_admin"
  | "customer"
  | "accountant"
  | "pharmacy_manager"
  | "pharmacist"
  | "marketing_manager";

export interface AppSidebarProps {
  role: UserRole;
  brandName?: string;
  defaultCollapsed?: boolean;
}
