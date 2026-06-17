"use client";

import { usePathname, useRouter } from "next/navigation";
import { PiFlag, PiGlobe, PiAirplaneTilt } from "react-icons/pi";
import type { IconType } from "react-icons";
import { COLORS as C } from "@/lib/constants";

interface Tab {
  key: string;
  path: string;
  icon: IconType;
  label: string;
}

const tabs: Tab[] = [
  { key: "flags", path: "/flags", icon: PiFlag, label: "Flags" },
  { key: "map", path: "/map", icon: PiGlobe, label: "World Map" },
  { key: "travel", path: "/travel", icon: PiAirplaneTilt, label: "Travel" },
];

export default function TabBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        background: "rgba(255, 255, 255, 0.82)",
        backdropFilter: "blur(24px) saturate(1.4)",
        WebkitBackdropFilter: "blur(24px) saturate(1.4)",
        boxShadow: `0 8px 32px ${C.shadow}, inset 0 1px 0 rgba(255,255,255,0.5)`,
        border: `1px solid ${C.border}`,
        borderRadius: 22,
        padding: "8px 10px",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      {tabs.map(({ key, path, icon: Icon, label }) => {
        const isActive = pathname === path;
        return (
          <button
            key={key}
            onClick={() => router.push(path)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "14px 28px",
              borderRadius: 16,
              border: "none",
              cursor: "pointer",
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              transition: "all 0.2s ease",
              background: isActive ? "rgba(255,255,255,0.75)" : "transparent",
              color: isActive ? C.text : C.textMuted,
              boxShadow: isActive ? "0 2px 12px rgba(139,115,155,0.12)" : "none",
            }}
          >
            <Icon size={20} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
