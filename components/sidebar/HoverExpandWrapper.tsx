import * as React from "react";
import { useSidebar } from "@/components/ui/sidebar";

export function HoverExpandWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { state, setOpen, isMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const hoverTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHover = React.useRef(false);

  if (isMobile) return <>{children}</>;

  const clearHoverTimeout = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearHoverTimeout();
    if (collapsed) {
      openedByHover.current = true;
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    clearHoverTimeout();
    if (openedByHover.current) {
      hoverTimeout.current = setTimeout(() => {
        setOpen(false);
        openedByHover.current = false;
      }, 150);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="h-full"
    >
      {children}
    </div>
  );
}
