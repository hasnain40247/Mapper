"use client";

import { COLORS as C } from "@/lib/constants";

export interface QuizOption {
  name: string;
  code: string;
  isCorrect: boolean;
}

interface AnswerOptionsProps {
  options: QuizOption[];
  selected: number | null;
  onPick: (idx: number) => void;
}

export default function AnswerOptions({ options, selected, onPick }: AnswerOptionsProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column" as const, gap: 10, width: "100%" }}>
      {options.map((opt, i) => {
        const wasSelected = selected === i;
        const isAnswered = selected !== null;
        const isCorrectOption = opt.isCorrect;

        let bg = "rgba(255,255,255,0.5)";
        let borderColor = "rgba(255,255,255,0.5)";
        let textColor: string = C.text;

        if (isAnswered) {
          if (isCorrectOption) {
            bg = "rgba(42,157,143,0.12)";
            borderColor = "#2A9D8F";
            textColor = "#2A9D8F";
          } else if (wasSelected) {
            bg = "rgba(232,114,92,0.1)";
            borderColor = "#E8725C";
            textColor = "#E8725C";
          } else {
            textColor = C.textMuted;
          }
        }

        return (
          <button
            key={i}
            onClick={() => onPick(i)}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 18px", borderRadius: 14,
              border: `1.5px solid ${borderColor}`,
              background: bg,
              cursor: isAnswered ? "default" : "pointer",
              fontFamily: "'Nunito',sans-serif", fontSize: 15, fontWeight: 600,
              color: textColor, transition: "all 0.2s ease",
              textAlign: "left" as const, width: "100%",
            }}
          >
            <span style={{
              width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
              background: isAnswered && isCorrectOption
                ? "#2A9D8F"
                : isAnswered && wasSelected
                ? "#E8725C"
                : "rgba(255,255,255,0.6)",
              border: `1.5px solid ${isAnswered && (isCorrectOption || wasSelected) ? "transparent" : "rgba(200,185,210,0.4)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700,
              color: isAnswered && (isCorrectOption || wasSelected) ? "#fff" : C.textMuted,
            }}>
              {isAnswered && isCorrectOption
                ? "✓"
                : isAnswered && wasSelected
                ? "✗"
                : String.fromCharCode(65 + i)}
            </span>
            {opt.name}
          </button>
        );
      })}
    </div>
  );
}
