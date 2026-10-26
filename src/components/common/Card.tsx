import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "gradient" | "outlined";
type CardColor = "primary" | "sunny" | "fresh" | "coral" | "lavender" | "pink";
type CardPadding = "sm" | "md" | "lg";

const COLOR_GRADIENTS: Record<CardColor, string> = {
  primary: "from-primary-400 to-primary-600",
  sunny: "from-sunny-400 to-coral-500",
  fresh: "from-fresh-400 to-primary-500",
  coral: "from-coral-400 to-pink-500",
  lavender: "from-lavender-400 to-lavender-600",
  pink: "from-pink-400 to-pink-600",
};

const PADDING_CLASSES: Record<CardPadding, string> = {
  sm: "p-3 sm:p-4",
  md: "p-4 sm:p-6",
  lg: "p-6 sm:p-8",
};

interface CardProps {
  variant?: CardVariant;
  color?: CardColor;
  hoverable?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  padding?: CardPadding;
}

export default function Card({
  variant = "default",
  color = "primary",
  hoverable = false,
  onClick,
  children,
  className,
  padding = "md",
}: CardProps) {
  const variantClasses: Record<CardVariant, string> = {
    default: "bg-white shadow-md border border-white/50",
    gradient: `bg-gradient-to-br ${COLOR_GRADIENTS[color]} text-white`,
    outlined: "bg-white/60 backdrop-blur-sm border-2 border-slate-200",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-3xl transition-all duration-300 animate-pop",
        variantClasses[variant],
        PADDING_CLASSES[padding],
        hoverable && "hover:shadow-xl hover:-translate-y-1 cursor-pointer",
        onClick && !hoverable && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
