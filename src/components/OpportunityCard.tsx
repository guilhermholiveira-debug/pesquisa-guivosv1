import { Link } from "@tanstack/react-router";
import { Heart, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Opportunity } from "@/data/opportunities";
import { cn } from "@/lib/utils";

export function OpportunityCard({
  opp,
  variant = "horizontal",
}: {
  opp: Opportunity;
  variant?: "horizontal" | "wide";
}) {
  const [saved, setSaved] = useState(false);
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        "relative shrink-0 rounded-2xl overflow-hidden bg-card border border-border shadow-sm",
        variant === "horizontal" ? "w-[260px]" : "w-full",
      )}
    >
      <Link to="/oportunidade/$id" params={{ id: opp.id }} className="block">
        <div className={cn("relative h-32 bg-gradient-to-br", opp.gradiente)}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 text-xs font-medium text-white/95 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20">
            {opp.categoria}
          </span>
        </div>
        <div className="p-3.5 space-y-2">
          <h3 className="text-sm font-semibold leading-snug text-foreground line-clamp-2">
            {opp.titulo}
          </h3>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3" strokeWidth={1.8} />
              {opp.distancia}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3" strokeWidth={1.8} />
              {opp.data}
            </span>
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setSaved((s) => !s);
        }}
        className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-md p-2 shadow-sm hover:scale-105 transition-transform"
        aria-label="Salvar"
      >
        <Heart
          className={cn("w-4 h-4", saved ? "fill-primary text-primary" : "text-foreground")}
          strokeWidth={1.8}
        />
      </button>
    </motion.div>
  );
}
