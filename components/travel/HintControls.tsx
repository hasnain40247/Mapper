"use client";

import { COLORS as C } from "@/lib/constants";
import { PiMagnifyingGlass, PiMapTrifold, PiCheckCircle } from "react-icons/pi";

const COLOR_ON_PATH = "#7EC8E3";

const CHIP_BASE = {
  padding: "5px 12px", borderRadius: 8,
  fontFamily: "'Quicksand',sans-serif", fontSize: 11, fontWeight: 600,
  backdropFilter: "blur(8px)",
  display: "flex", alignItems: "center", gap: 5,
} as const;

const BUTTON_STYLE = {
  ...CHIP_BASE,
  background: "rgba(255,255,255,0.7)",
  border: "1px solid rgba(0,0,0,0.08)",
  color: C.textMuted,
  cursor: "pointer",
  transition: "all 0.15s",
} as const;

interface HintControlsProps {
  hintUsed: boolean;
  outlinesUsed: boolean;
  solved: boolean;
  failed: boolean;
  onHint: () => void;
  onOutlines: () => void;
}

export default function HintControls({ hintUsed, outlinesUsed, solved, failed, onHint, onOutlines }: HintControlsProps) {
  return (
    <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 6, alignItems: "center" }}>
      {!hintUsed && !solved && !failed && (
        <button onClick={onHint} style={BUTTON_STYLE}>
          <PiMagnifyingGlass size={13} /> Show next country (1/2)
        </button>
      )}

      {hintUsed && !outlinesUsed && !solved && !failed && (
        <button onClick={onOutlines} style={BUTTON_STYLE}>
          <PiMapTrifold size={13} /> Show all outlines (2/2)
        </button>
      )}

      {hintUsed && (
        <span style={{ ...CHIP_BASE, background: "rgba(240,160,48,0.12)", border: "1px solid rgba(240,160,48,0.25)", color: "#D48A20" }}>
          <PiCheckCircle size={13} /> Hint used
        </span>
      )}

      {outlinesUsed && (
        <span style={{ ...CHIP_BASE, background: "rgba(91,155,213,0.1)", border: "1px solid rgba(91,155,213,0.2)", color: COLOR_ON_PATH }}>
          <PiCheckCircle size={13} /> Outlines used
        </span>
      )}
    </div>
  );
}
