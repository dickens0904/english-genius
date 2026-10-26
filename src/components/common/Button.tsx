import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "success" | "warning" | "danger" | "purple" | "default";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md hover:shadow-lg",
  success: "bg-gradient-to-br from-fresh-500 to-fresh-600 text-white shadow-md hover:shadow-lg",
  warning: "bg-gradient-to-br from-sunny-400 to-sunny-500 text-white shadow-md hover:shadow-lg",
  danger: "bg-gradient-to-br from-coral-500 to-coral-600 text-white shadow-md hover:shadow-lg",
  purple: "bg-gradient-to-br from-lavender-500 to-lavender-600 text-white shadow-md hover:shadow-lg",
  default: "bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-base gap-2",
  lg: "px-7 py-3.5 text-lg gap-2.5",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, icon, disabled, children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-200",
          "active:scale-95",
          "hover:scale-[1.03]",
          "disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100",
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : icon ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
