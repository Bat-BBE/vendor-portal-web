import * as React from "react";
import { NavItem } from "@/models/sidebarModel";

export function renderIcon(icon?: NavItem["icon"], size: number = 24) {
  if (!icon) return null;
  if (React.isValidElement(icon)) {
    return React.cloneElement(
      icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
      {
        style: { width: size, height: size },
      },
    );
  }
  return React.createElement(icon as React.ElementType, {
    style: { width: size, height: size },
  });
}
