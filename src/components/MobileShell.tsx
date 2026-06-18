import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MobileShell({
  children,
  className,
  withBottomNav = false,
  withFooter = false,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  withBottomNav?: boolean;
  withFooter?: boolean;
  /** Use a wider container on desktop (max-w-7xl, px-8 lg). */
  wide?: boolean;
}) {
  return (
    <div className="min-h-screen bg-neutral-100 flex justify-center">
      <div
        className={cn(
          "relative w-full bg-background min-h-screen shadow-[0_0_60px_-20px_rgba(79,70,229,0.18)]",
          wide
            ? "max-w-[480px] lg:max-w-7xl lg:px-8"
            : "max-w-[480px]",
          (withBottomNav || withFooter) && "pb-24",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
