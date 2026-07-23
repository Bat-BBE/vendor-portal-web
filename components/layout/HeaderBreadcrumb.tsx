import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/models/sidebarModel";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function HeaderBreadcrumb({ items }: { items: NavItem[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="flex-nowrap items-center gap-2.5">
        {items.length === 0 && (
          <BreadcrumbItem>
            <BreadcrumbPage className="text-[20px] font-bold uppercase leading-7 tracking-tight text-foreground">
              Dashboard
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}

        {items.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={item.label}>
              <BreadcrumbItem
                className={cn(!isFirst && !isLast && "hidden md:block")}
              >
                {isFirst ? (
                  <BreadcrumbPage className="text-[20px] font-bold uppercase leading-7 tracking-tight text-foreground">
                    {item.label}
                  </BreadcrumbPage>
                ) : isLast ? (
                  <BreadcrumbPage className="truncate text-[14px] leading-5 text-foreground">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={item.href ?? "#"}
                      className="truncate text-[14px] leading-5 text-foreground-secondary transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator className="text-brand-500">
                  |
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
