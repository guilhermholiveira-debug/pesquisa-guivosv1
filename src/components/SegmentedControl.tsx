import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <motion.button
            key={opt.value}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative rounded-xl py-3 text-sm font-medium transition-colors border",
              active
                ? "bg-primary text-primary-foreground border-primary shadow-[0_6px_20px_-8px_rgba(79,70,229,0.55)]"
                : "bg-card text-foreground border-border hover:border-primary/40",
            )}
          >
            {opt.label}
          </motion.button>
        );
      })}
    </div>
  );
}
