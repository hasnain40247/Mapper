"use client";

import { COLORS as C } from "@/lib/constants";

export default function LoadingOverlay() {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 100, background: C.ocean,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 16,
    }}>
      <div style={{ fontSize: 52, animation: "spin 3s linear infinite" }}>🌍</div>
      <div style={{ fontWeight: 600, fontSize: 16, color: C.text }}>Loading the world…</div>
    </div>
  );
}
