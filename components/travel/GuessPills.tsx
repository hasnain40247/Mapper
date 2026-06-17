"use client";

import { CODE, toFlag } from "@/lib/countries";
import { isOnValidPath } from "@/lib/borders";

interface GuessPillsProps {
  guesses: string[];
  correctPath: string[] | null;
  countryA: string;
  countryB: string;
  solved: boolean;
}

export default function GuessPills({ guesses, correctPath, countryA, countryB, solved }: GuessPillsProps) {
  if (guesses.length === 0) return null;

  return (
    <div style={{
      position: "absolute", top: 12, left: 12,
      display: "flex", flexWrap: "wrap" as const, gap: 4, maxWidth: "60%",
    }}>
      {guesses.map((g) => {
        const onBestPath = correctPath?.includes(g) ?? false;
        const onAnyValidPath = isOnValidPath(g, countryA, countryB);

        let bgColor: string;
        let symbol: string;
        if (solved) {
          bgColor = "rgba(45,212,168,0.9)"; symbol = "✓";
        } else if (onBestPath) {
          bgColor = "rgba(72,187,120,0.9)"; symbol = "✓";
        } else if (onAnyValidPath) {
          bgColor = "rgba(237,167,80,0.9)"; symbol = "~";
        } else {
          bgColor = "rgba(220,60,60,0.85)"; symbol = "✗";
        }

        return (
          <span key={g} style={{
            padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600,
            background: bgColor, color: "#fff",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", gap: 3,
          }}>
            {toFlag(CODE[g] || null)} {g} {symbol}
          </span>
        );
      })}
    </div>
  );
}
