"use client";

import type { CountryInfo } from "@/lib/types";
import { COLORS as C } from "@/lib/constants";
import { toFlag } from "@/lib/countries";

interface ChatHeaderProps {
  country: CountryInfo;
  flagUrl: string | null;
  ollamaStatus: "unknown" | "connected" | "offline";
  ollamaModel: string;
  onClear: () => void;
  onClose: () => void;
  onRetry: () => void;
}

export default function ChatHeader({
  country, flagUrl, ollamaStatus, ollamaModel, onClear, onClose, onRetry,
}: ChatHeaderProps) {
  return (
    <div style={{
      padding: 20, borderBottom: "1px solid rgba(255,255,255,0.4)",
      flexShrink: 0, position: "relative" as const,
    }}>
      <div style={{ position: "absolute" as const, top: 12, right: 12, display: "flex", gap: 6 }}>
        <button
          onClick={onClear}
          title="Clear messages"
          style={{
            width: 28, height: 28, borderRadius: 8,
            background: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.5)",
            color: C.textMuted, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, transition: "all 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(232,114,92,0.1)"; e.currentTarget.style.color = "#E8725C"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = C.textMuted; }}
        >⟳</button>
        <button
          onClick={onClose}
          style={{
            width: 28, height: 28, borderRadius: 8,
            background: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.5)",
            color: C.textMuted, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 600, transition: "all 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.6)"; e.currentTarget.style.color = C.text; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = C.textMuted; }}
        >✕</button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {flagUrl ? (
          <img
            src={flagUrl}
            alt={country.name}
            style={{
              width: 52, height: 36, borderRadius: 6, objectFit: "cover",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)", border: "1px solid rgba(0,0,0,0.06)",
            }}
          />
        ) : (
          <span style={{ fontSize: 42, lineHeight: 1 }}>{toFlag(country.code)}</span>
        )}
        <div>
          <div style={{ fontFamily: "'Quicksand',sans-serif", fontWeight: 700, fontSize: 20, color: C.text, letterSpacing: "-0.3px" }}>
            {country.name}
          </div>
          <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>
            {country.lat}° lat, {country.lng}° lng
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: C.textMuted }}>
        <span style={{
          width: 7, height: 7, borderRadius: "50%", display: "inline-block",
          background: ollamaStatus === "connected" ? "#2DD4BF" : ollamaStatus === "offline" ? "#F87171" : "#FBBF24",
          boxShadow: ollamaStatus === "connected" ? "0 0 6px #2DD4BF" : "none",
        }} />
        {ollamaStatus === "connected"
          ? `Connected · ${ollamaModel.split(":")[0]}`
          : ollamaStatus === "offline"
          ? "Ollama offline"
          : "Checking…"}
        {ollamaStatus === "offline" && (
          <span onClick={onRetry} style={{ color: "#E8725C", cursor: "pointer", textDecoration: "underline", marginLeft: 4 }}>
            retry
          </span>
        )}
      </div>
    </div>
  );
}
