"use client";

import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("@/components/world-map/WorldMap"), { ssr: false });
const FlagQuiz = dynamic(() => import("@/components/flag-quiz/FlagQuiz"), { ssr: false });

export default function FlagsPage() {
  return (
    <div style={{
      width: "100%",
      height: "100vh",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Quicksand','Nunito',system-ui,sans-serif",
    }}>
      {/* Map background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <WorldMap showChat={false} showHover={false} brightColors={true} />
      </div>

      {/* Blur overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        background: "rgba(255,255,255,0.3)",
        backdropFilter: "blur(7px) saturate(1.3)",
        WebkitBackdropFilter: "blur(16px) saturate(1.3)",
      }} />

      {/* Quiz card */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}>
        <div style={{ pointerEvents: "auto" }}>
          <FlagQuiz />
        </div>
      </div>
    </div>
  );
}