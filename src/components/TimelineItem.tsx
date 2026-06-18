import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function TimelineItem({
  icon: Icon,
  title,
  subtitle,
  description,
  last,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  last?: boolean;
}) {
  return (
    <div className="relative flex gap-4">
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-primary text-primary-foreground p-2.5 shadow-[0_6px_20px_-6px_rgba(79,70,229,0.55)]">
          <Icon className="w-4 h-4" strokeWidth={2} />
        </div>
        {!last && <div className="w-px flex-1 bg-gradient-to-b from-primary/50 to-border my-1" />}
      </div>
      <div className={cn("pb-8 flex-1", last && "pb-2")}>
        <p className="text-[11px] uppercase tracking-wider text-primary font-semibold">{subtitle}</p>
        <h4 className="text-base font-semibold text-foreground mt-0.5">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
