"use client";

import type { ReactNode } from "react";
import { COLORS as C } from "@/lib/constants";

interface FactRowProps {
  icon: ReactNode;
  iconBg: string;
  label: string;
  children: ReactNode;
  hoverBg: string;
  onClick?: () => void;
  alignItems?: "center" | "flex-start";
}

export default function FactRow({
  icon, iconBg, label, children, hoverBg, onClick, alignItems = "center",
}: FactRowProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex", alignItems, gap: 10,
        padding: "6px 8px", borderRadius: 10,
        cursor: onClick ? "pointer" : "default",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => { if (onClick) e.currentTarget.style.background = hoverBg; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: 10,
        background: iconBg,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: C.textMuted, textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>
          {label}
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginTop: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
