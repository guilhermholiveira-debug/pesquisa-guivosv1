import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function SelectableCard({
  icon: Icon,
  label,
  selected,
  onClick,
  disabled,
}: {
  icon: LucideIcon;
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled && !selected}
      className={cn(
        "relative w-full text-left rounded-2xl border bg-card p-4 transition-all",
        "flex flex-col items-start gap-3 min-h-[120px]",
        selected
          ? "border-primary border-2 shadow-[0_8px_30px_-12px_rgba(79,70,229,0.45)] bg-accent/40"
          : "border-border shadow-sm hover:border-primary/40",
        disabled && !selected && "opacity-40 cursor-not-allowed",
      )}
    >
      <div
        className={cn(
          "rounded-xl p-2.5 transition-colors",
          selected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
        )}
      >
        <Icon className="w-5 h-5" strokeWidth={1.8} />
      </div>
      <span className="text-sm font-medium leading-tight text-foreground">{label}</span>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 rounded-full bg-primary text-primary-foreground p-1"
        >
          <Check className="w-3 h-3" strokeWidth={3} />
        </motion.div>
      )}
    </motion.button>
  );
}
