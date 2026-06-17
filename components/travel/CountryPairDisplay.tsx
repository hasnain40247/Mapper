"use client";

import { CODE, toFlag } from "@/lib/countries";
import { COLORS as C } from "@/lib/constants";

const COLOR_SOLVED = "#7DDBA3";
const COLOR_A = "#FF8FA3";
const COLOR_B = "#B388EB";

interface CountryPairDisplayProps {
  countryA: string;
  countryB: string;
  solved: boolean;
}

export default function CountryPairDisplay({ countryA, countryB, solved }: CountryPairDisplayProps) {
  return (
    <div style={{ display: "flex", gap: 10, padding: "0 24px 12px", alignItems: "center", flexShrink: 0 }}>
      <div style={{
        flex: 1, padding: "10px 14px",
        background: solved ? "rgba(45,212,168,0.06)" : "rgba(255,143,163,0.08)",
        border: `1.5px solid ${solved ? "rgba(45,212,168,0.2)" : "rgba(255,143,163,0.25)"}`,
        borderRadius: 12, display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontSize: 24 }}>{toFlag(CODE[countryA] || null)}</span>
        <div>
          <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>From</div>
          <div style={{ fontWeight: 700, fontSize: 14, color: solved ? COLOR_SOLVED : COLOR_A }}>{countryA}</div>
        </div>
      </div>

      <div style={{ color: C.textMuted, fontSize: 18, flexShrink: 0 }}>→</div>

      <div style={{
        flex: 1, padding: "10px 14px",
        background: solved ? "rgba(45,212,168,0.06)" : "rgba(179,136,235,0.08)",
        border: `1.5px solid ${solved ? "rgba(45,212,168,0.2)" : "rgba(179,136,235,0.25)"}`,
        borderRadius: 12, display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontSize: 24 }}>{toFlag(CODE[countryB] || null)}</span>
        <div>
          <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>To</div>
          <div style={{ fontWeight: 700, fontSize: 14, color: solved ? COLOR_SOLVED : COLOR_B }}>{countryB}</div>
        </div>
      </div>
    </div>
  );
}
