"use client";

import { COLORS as C } from "@/lib/constants";

interface ChatInputProps {
  value: string;
  sending: boolean;
  countryName: string;
  onChange: (val: string) => void;
  onSend: () => void;
}

export default function ChatInput({ value, sending, countryName, onChange, onSend }: ChatInputProps) {
  return (
    <div style={{
      padding: "12px 16px 16px",
      borderTop: "1px solid rgba(255,255,255,0.4)",
      display: "flex", gap: 8, flexShrink: 0,
    }}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        placeholder={`Ask about ${countryName}…`}
        style={{
          flex: 1, padding: "10px 14px",
          background: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.5)",
          borderRadius: 10, color: C.text,
          fontFamily: "'Nunito',sans-serif", fontSize: 13.5,
          outline: "none", transition: "border-color 0.2s",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#E8725C"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
      />
      <button
        onClick={onSend}
        disabled={!value.trim() || sending}
        style={{
          padding: "0 18px", background: "#E8725C", border: "none", borderRadius: 10,
          color: "#fff", fontFamily: "'Quicksand',sans-serif", fontSize: 13, fontWeight: 700,
          cursor: value.trim() && !sending ? "pointer" : "not-allowed",
          opacity: value.trim() && !sending ? 1 : 0.5, transition: "all 0.15s",
        }}
      >Send</button>
    </div>
  );
}
