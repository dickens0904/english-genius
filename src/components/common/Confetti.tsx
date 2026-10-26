import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  shape: "circle" | "star";
}

const COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#f97316", "#8b5cf6", "#ec4899"];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

interface ConfettiProps {
  active: boolean;
  onComplete?: () => void;
}

export default function Confetti({ active, onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const items: Particle[] = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: randomBetween(5, 95),
      color: COLORS[i % COLORS.length],
      size: randomBetween(6, 14),
      delay: randomBetween(0, 0.5),
      shape: Math.random() > 0.5 ? "circle" : "star",
    }));
    setParticles(items);

    const timer = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, 1200);

    return () => clearTimeout(timer);
  }, [active, onComplete]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-1/3 animate-confetti"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.shape === "circle" ? p.color : "transparent",
            borderRadius: p.shape === "circle" ? "50%" : "0",
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.shape === "star" && (
            <span style={{ fontSize: p.size, color: p.color, lineHeight: 1 }}>★</span>
          )}
        </div>
      ))}
    </div>
  );
}
