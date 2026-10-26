import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type StarSize = "sm" | "md" | "lg";

const SIZE_MAP: Record<StarSize, string> = {
  sm: "h-5 w-5",
  md: "h-7 w-7",
  lg: "h-10 w-10",
};

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: StarSize;
  className?: string;
}

export default function StarRating({ rating, maxStars = 3, size = "md", className }: StarRatingProps) {
  const clamped = Math.max(0, Math.min(maxStars, Math.round(rating)));
  const iconClass = SIZE_MAP[size];

  return (
    <div className={cn("flex items-center gap-1", className)} role="img" aria-label={`${clamped} out of ${maxStars} stars`}>
      {Array.from({ length: maxStars }).map((_, i) => {
        const filled = i < clamped;
        return (
          <motion.div
            key={i}
            initial={filled ? { scale: 0, rotate: -180 } : false}
            animate={filled ? { scale: 1, rotate: 0 } : false}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: i * 0.12 }}
          >
            <Star
              className={cn(
                iconClass,
                "transition-colors duration-200",
                filled ? "text-sunny-400 drop-shadow-sm" : "text-slate-200"
              )}
              fill={filled ? "currentColor" : "none"}
              strokeWidth={filled ? 0 : 1.5}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
