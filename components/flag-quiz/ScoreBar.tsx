"use client";

import { COLORS as C } from "@/lib/constants";

interface ScoreBarProps {
  score: { correct: number; total: number };
  accuracy: number;
  streak: number;
}

export default function ScoreBar({ score, accuracy, streak }: ScoreBarProps) {
  const stats = [
    { label: "Score", value: `${score.correct}/${score.total}`, color: C.text },
    { label: "Accuracy", value: `${accuracy}%`, color: "#2A9D8F" },
    { label: "Streak", value: `${streak}🔥`, color: "#E8725C" },
  ];

  return (
    <div style={{ display: "flex", gap: 24, width: "100%", justifyContent: "center" }}>
      {stats.map(({ label, value, color }) => (
        <div key={label} style={{ textAlign: "center" as const }}>
          <div style={{ fontFamily: "'Quicksand',sans-serif", fontWeight: 700, fontSize: 22, color, lineHeight: 1 }}>
            {value}
          </div>
          <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4, textTransform: "uppercase" as const, letterSpacing: "0.5px", fontWeight: 600 }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
