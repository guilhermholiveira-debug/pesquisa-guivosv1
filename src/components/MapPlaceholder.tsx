import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const pins = [
  { top: "30%", left: "22%" },
  { top: "55%", left: "48%" },
  { top: "40%", left: "72%" },
  { top: "70%", left: "30%" },
  { top: "20%", left: "60%" },
];

export function MapPlaceholder({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-border", className)}>
      {/* grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="oklch(0.85 0.04 277)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {/* curvy "roads" */}
        <path d="M0,80 Q80,40 160,90 T320,70" stroke="oklch(0.78 0.05 277)" strokeWidth="2" fill="none" />
        <path d="M0,180 Q120,140 220,200 T400,170" stroke="oklch(0.78 0.05 277)" strokeWidth="2" fill="none" />
        <path d="M60,0 Q90,100 50,200 T80,400" stroke="oklch(0.78 0.05 277)" strokeWidth="2" fill="none" />
      </svg>
      {pins.map((p, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ top: p.top, left: p.left }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
            <div className="relative bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg">
              <MapPin className="w-3 h-3" strokeWidth={2.2} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
