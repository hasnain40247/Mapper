import type { CSSProperties } from "react";

export const COLORS = {
  bg: "#FDF6F0",
  ocean: "#FFFFFF",
  landStroke: "#9B8A7A",
  landHover: "#3CBBB1",
  text: "#5C4D6E",
  textMuted: "#B8A5C4",
  cardBg: "rgba(255, 255, 255, 0.35)",
  border: "rgba(255, 255, 255, 0.45)",
  shadow: "rgba(139, 115, 155, 0.15)",
  pink: "#E8A0BF",
  accent: "#3CBBB1",
  pinColor: "#E63946",
} as const;

export const FILLS: readonly string[] = [
  "#FFD1DC", "#B5EAD7", "#C7CEEA", "#FFDAC1", "#E2F0CB",
  "#FFB7B2", "#B5D8EB", "#F3E0A0", "#D4BBEE", "#A8E6CF",
];

export const FILLS_BRIGHT: readonly string[] = [
  "#FF6B8A", "#2DD4A8", "#7B8CFF", "#FF9F5A", "#8BDB68",
  "#FF5C8A", "#4ABAFF", "#FFD233", "#B47AFF", "#26D9A0",
];

export const PILL_STYLE: CSSProperties = {
  position: "absolute",
  zIndex: 10,
  pointerEvents: "none",
  background: COLORS.cardBg,
  backdropFilter: "blur(24px) saturate(1.4)",
  WebkitBackdropFilter: "blur(24px) saturate(1.4)",
  boxShadow: `0 8px 32px ${COLORS.shadow}, inset 0 1px 0 rgba(255,255,255,0.5)`,
  border: `1px solid ${COLORS.border}`,
};