"use client";

import { useRouter, usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function ChatbotFab() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Hide the FAB when already on the chat page
  if (pathname === "/Chat" || pathname.startsWith("/Chat/")) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 transition-all duration-700 sm:bottom-8 sm:right-8 ${
        mounted
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      }`}
    >
      {/* Tooltip — hidden on mobile */}
      <span
        className={`pointer-events-none hidden select-none rounded-lg border border-emerald-700/40 bg-gray-950/90 px-3 py-1.5 text-xs font-medium text-emerald-100 shadow-lg backdrop-blur-sm transition-all duration-300 sm:block ${
          hovered
            ? "translate-x-0 scale-100 opacity-100"
            : "translate-x-3 scale-95 opacity-0"
        }`}
      >
        Talk to Fin-AI
      </span>

      {/* FAB button */}
      <button
        aria-label="Talk to Fin-AI"
        onClick={() => router.push("/Chat")}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.45)] transition-all duration-300 hover:scale-110 hover:from-emerald-400 hover:to-emerald-500 hover:shadow-[0_6px_30px_rgba(16,185,129,0.6)] active:scale-95 sm:h-[60px] sm:w-[60px]"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30 duration-[2000ms]" />

        {/* Glow backdrop */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/20 blur-md transition-all duration-300 group-hover:bg-emerald-400/30 group-hover:blur-lg" />

        {/* Icon */}
        <MessageCircle className="relative z-10" size={26} strokeWidth={2.2} />
      </button>
    </div>
  );
}
