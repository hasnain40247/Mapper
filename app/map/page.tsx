"use client";

import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("@/components/world-map/WorldMap"), {
  ssr: false,
  loading: () => (
    <div style={{
      width: "100vw", height: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 16,
      background: "#ffffff", fontFamily: "'Quicksand', sans-serif",
    }}>
      <div style={{ fontSize: 52, animation: "spin 3s linear infinite" }}>🌍</div>
      <div style={{ fontWeight: 600, fontSize: 16, color: "#5C4D6E" }}>Loading the world…</div>
    </div>
  ),
});

export default function MapPage() {
  return <WorldMap showChat={true} showHover={true} grayscale={false} />;
}
