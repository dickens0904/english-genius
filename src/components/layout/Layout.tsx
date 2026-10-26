import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

function FloatingShape({ className, children }: { className: string; children?: ReactNode }) {
  return <div className={className}>{children}</div>;
}

export default function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Floating background decorations */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <FloatingShape className="absolute top-20 left-[10%] w-16 h-16 bg-primary-200/30 rounded-full animate-float" />
        <FloatingShape className="absolute top-40 right-[15%] w-10 h-10 bg-sunny-200/40 rounded-full animate-float [animation-delay:1s]" />
        <FloatingShape className="absolute bottom-40 left-[20%] w-12 h-12 bg-pink-200/30 rounded-full animate-float [animation-delay:2s]" />
        <FloatingShape className="absolute top-60 left-[50%] w-8 h-8 bg-lavender-200/40 rounded-full animate-float [animation-delay:3s]" />
        <FloatingShape className="absolute bottom-60 right-[25%] w-14 h-14 bg-fresh-200/30 rounded-full animate-float [animation-delay:4s]" />
        {/* Star shapes */}
        <FloatingShape className="absolute top-32 right-[30%] text-2xl animate-wiggle">⭐</FloatingShape>
        <FloatingShape className="absolute bottom-32 left-[35%] text-xl animate-wiggle [animation-delay:0.5s]">☁️</FloatingShape>
        <FloatingShape className="absolute top-[70%] right-[10%] text-xl animate-wiggle [animation-delay:1.5s]">🌟</FloatingShape>
      </div>

      <Header />

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}
