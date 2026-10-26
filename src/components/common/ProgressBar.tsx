import { cn } from "@/lib/utils";

type BarColor = "primary" | "sunny" | "fresh" | "coral" | "lavender" | "pink";
type BarSize = "sm" | "md" | "lg";

const COLOR_FILLS: Record<BarColor, string> = {
  primary: "from-primary-400 to-primary-600",
  sunny: "from-sunny-400 to-coral-500",
  fresh: "from-fresh-400 to-fresh-600",
  coral: "from-coral-400 to-coral-600",
  lavender: "from-lavender-400 to-lavender-600",
  pink: "from-pink-400 to-pink-600",
};

const SIZE_CLASSES: Record<BarSize, string> = {
  sm: "h-2",
  md: "h-3",
  lg: "h-5",
};

interface ProgressBarProps {
  value: number;
  color?: BarColor;
  showLabel?: boolean;
  size?: BarSize;
  animated?: boolean;
  className?: string;
}

export default function ProgressBar({
  value,
  color = "primary",
  showLabel = false,
  size = "md",
  animated = true,
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-semibold text-slate-500">Progress</span>
          <span className="text-xs font-bold text-slate-700">{Math.round(clamped)}%</span>
        </div>
      )}
      <div className={cn("w-full rounded-full bg-slate-100 overflow-hidden", SIZE_CLASSES[size])}>
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out",
            COLOR_FILLS[color],
            animated && "animate-pulse-glow"
          )}
          style={{ width: `${clamped}%` }}
        >
          {size === "lg" && animated && (
            <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
          )}
        </div>
      </div>
    </div>
  );
}
