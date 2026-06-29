export interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: number;
  children?: NavItem[];
}

export interface SidebarProps {
  logo?: React.ReactNode;
  brandName?: string;
  navItems?: NavItem[];
  bottomItems?: NavItem[];
  defaultCollapsed?: boolean;
  className?: string;
}
