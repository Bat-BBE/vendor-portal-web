"use client";

import { cn } from "@/lib/utils";
import { UserAvatarProps } from "@/models/headerModel";
import Image from "next/image";

export function UserAvatar({
  name = "U",
  src,
  size = 32,
  className,
}: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className={cn("rounded-full object-cover shrink-0", className)}
        style={{ width: size, height: size }}
      />
    );
  }

  const colors = [
    "#00A99A",
    "#3D6DFF",
    "#FF2461",
    "#FFB600",
    "#22B994",
    "#8B5CF6",
    "#F03131",
    "#0D6B5E",
  ];
  const idx =
    name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center text-white font-semibold shrink-0",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        backgroundColor: colors[idx],
      }}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
