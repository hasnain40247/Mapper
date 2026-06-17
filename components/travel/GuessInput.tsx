"use client";

import { CODE, toFlag } from "@/lib/countries";
import { COLORS as C } from "@/lib/constants";

interface GuessInputProps {
  input: string;
  suggestions: string[];
  showSuggestions: boolean;
  solved: boolean;
  failed: boolean;
  onChange: (val: string) => void;
  onShowSuggestions: (show: boolean) => void;
  onSubmit: (name: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export default function GuessInput({
  input, suggestions, showSuggestions, solved, failed,
  onChange, onShowSuggestions, onSubmit, onKeyDown,
}: GuessInputProps) {
  if (solved || failed) return <div style={{ padding: "12px 24px 110px" }} />;

  return (
    <div style={{ padding: "12px 24px 110px", position: "relative" as const, flexShrink: 0 }}>
      <div style={{ position: "relative" as const }}>
        <input
          value={input}
          onChange={(e) => { onChange(e.target.value); onShowSuggestions(true); }}
          onFocus={() => onShowSuggestions(true)}
          onBlur={() => setTimeout(() => onShowSuggestions(false), 150)}
          onKeyDown={onKeyDown}
          placeholder="Type a country name…"
          style={{
            width: "100%", padding: "12px 16px",
            background: "rgba(255,255,255,0.7)",
            border: "1.5px solid rgba(0,0,0,0.08)",
            borderRadius: 12, color: C.text,
            fontFamily: "'Nunito',sans-serif", fontSize: 14,
            outline: "none", transition: "border-color 0.2s",
          }}
          onFocusCapture={(e) => { e.currentTarget.style.borderColor = "#E8725C"; }}
          onBlurCapture={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
        />

        {showSuggestions && suggestions.length > 0 && (
          <div style={{
            position: "absolute" as const, bottom: "100%", left: 0, right: 0, marginBottom: 4,
            background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)",
            borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 -4px 20px rgba(139,115,155,0.1)", overflow: "hidden",
          }}>
            {suggestions.map((s) => (
              <div
                key={s}
                onMouseDown={() => onSubmit(s)}
                style={{
                  padding: "10px 16px", display: "flex", alignItems: "center", gap: 10,
                  cursor: "pointer", transition: "background 0.1s",
                  borderBottom: "1px solid rgba(0,0,0,0.03)",
                  fontSize: 14, color: C.text, fontWeight: 500,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(232,114,92,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ fontSize: 18 }}>{toFlag(CODE[s] || null)}</span>
                {s}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
