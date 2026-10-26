import { useState } from "react";
import { cn } from "@/lib/utils";

type ViewerSize = "sm" | "md" | "lg" | "xl";

const SIZE_CLASSES: Record<ViewerSize, string> = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-48 h-48",
};

interface ImageViewerProps {
  src?: string;
  alt?: string;
  fallbackEmoji?: string;
  size?: ViewerSize;
  className?: string;
}

export default function ImageViewer({
  src,
  alt = "Image",
  fallbackEmoji = "🖼️",
  size = "md",
  className,
}: ImageViewerProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const showFallback = !src || error;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-2xl overflow-hidden bg-slate-100",
        "transition-transform duration-300 hover:scale-105",
        SIZE_CLASSES[size],
        className
      )}
    >
      {showFallback ? (
        <span className="text-4xl select-none">{fallbackEmoji}</span>
      ) : (
        <>
          {!loaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
          )}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              loaded ? "opacity-100" : "opacity-0"
            )}
          />
        </>
      )}
    </div>
  );
}
