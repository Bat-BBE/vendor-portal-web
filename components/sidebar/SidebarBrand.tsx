import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarBrand() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <div className="flex h-[72px] p-5 justify-between items-center w-full self-stretch">
      <div className="flex items-center justify-center gap-2 min-w-0">
        {!collapsed && (
          <Image
            src="/assets/logo.svg"
            alt="logo"
            width={75}
            height={23}
            className="object-contain shrink-0 pb-1"
          />
        )}
        {!collapsed && (
          <>
            <span className="text-white/40 select-none text-[12px]">|</span>
            <p className="text-white text-[19px] font-semibold">VENDORSHIP</p>
          </>
        )}
        <button
          className="p-1 rounded-md text-background/50 hover:text-background hover:bg-white/10 transition-colors"
          aria-label="Toggle sidebar"
        >
          <MenuIcon size={22} color="background" />
        </button>
      </div>
    </div>
  );
}
