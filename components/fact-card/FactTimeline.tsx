"use client";

import { COLORS as C } from "@/lib/constants";
import { PiClockCounterClockwise } from "react-icons/pi";

const TIMELINE_COLORS = ["#FF8FA3", "#B388EB", "#7EC8E3", "#7DDBA3", "#FFD166", "#E8725C"];

interface TimelineItem {
  year: string | number;
  event: string;
}

interface FactTimelineProps {
  timeline: TimelineItem[];
  countryName: string;
  onAskAbout?: (question: string) => void;
}

export default function FactTimeline({ timeline, countryName, onAskAbout }: FactTimelineProps) {
  if (timeline.length === 0) return null;

  return (
    <>
      <div style={{ height: 1, background: "rgba(0,0,0,0.06)", margin: "0 0 12px", flexShrink: 0 }} />

      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, flexShrink: 0 }}>
        <PiClockCounterClockwise size={14} color={C.textMuted} />
        <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>
          Timeline
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto" as const, paddingRight: 4 }}>
        <div style={{ position: "relative", paddingLeft: 20 }}>
          <div style={{
            position: "absolute", left: 6, top: 4, bottom: 4,
            width: 2, borderRadius: 1,
            background: "linear-gradient(to bottom, #FF8FA3, #B388EB, #7EC8E3, #7DDBA3)",
          }} />

          {timeline.map((item, i) => {
            const color = TIMELINE_COLORS[i % TIMELINE_COLORS.length];
            return (
              <div
                key={i}
                onClick={() => onAskAbout?.(`Tell me more about "${item.event}" in ${item.year} in ${countryName}. What led to it and what were the consequences?`)}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 14,
                  marginBottom: i < timeline.length - 1 ? 16 : 0,
                  position: "relative", padding: "4px 6px", borderRadius: 8,
                  cursor: onAskAbout ? "pointer" : "default",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { if (onAskAbout) e.currentTarget.style.background = `${color}10`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{
                  position: "absolute", left: -17,
                  width: 12, height: 12, borderRadius: "50%",
                  background: "#fff", border: `2.5px solid ${color}`,
                  boxShadow: "0 0 0 3px rgba(255,255,255,0.8)", zIndex: 1,
                }} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color, fontVariantNumeric: "tabular-nums" }}>
                    {item.year}
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: 500, color: C.text, lineHeight: 1.4, marginTop: 1 }}>
                    {item.event}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
