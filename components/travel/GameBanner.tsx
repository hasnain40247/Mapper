"use client";

import { PiTrophy, PiWarningCircle } from "react-icons/pi";

interface GameBannerProps {
  solved: boolean;
  failed: boolean;
  guessCount: number;
  correctGuessCount: number;
}

export default function GameBanner({ solved, failed, guessCount, correctGuessCount }: GameBannerProps) {
  if (solved) {
    return (
      <div style={{
        position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
        padding: "10px 24px", borderRadius: 12,
        background: "rgba(45,212,168,0.9)", color: "#fff",
        fontWeight: 700, fontSize: 15,
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 16px rgba(45,212,168,0.3)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <PiTrophy size={20} /> Path complete! · {guessCount} guesses
      </div>
    );
  }

  if (failed) {
    return (
      <div style={{
        position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
        padding: "10px 24px", borderRadius: 12,
        background: "rgba(200,60,60,0.9)", color: "#fff",
        fontWeight: 700, fontSize: 15,
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 16px rgba(200,60,60,0.3)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <PiWarningCircle size={20} /> Out of guesses! · {correctGuessCount} on path
      </div>
    );
  }

  return null;
}
