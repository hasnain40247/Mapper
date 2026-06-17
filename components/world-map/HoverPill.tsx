"use client";

import type { CountryInfo } from "@/lib/types";
import { COLORS as C, PILL_STYLE } from "@/lib/constants";
import { toFlag } from "@/lib/countries";

interface HoverPillProps {
  country: CountryInfo;
  flagUrl: string | null;
}

export default function HoverPill({ country, flagUrl }: HoverPillProps) {
  return (
    <div style={{
      ...PILL_STYLE,
      top: 20, left: 20,
      borderRadius: 14, padding: "10px 16px",
      display: "flex", alignItems: "center", gap: 10,
    }}>
      {flagUrl ? (
        <img
          src={flagUrl}
          alt={country.name}
          style={{
            width: 32, height: 22, borderRadius: 4, objectFit: "cover",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        />
      ) : (
        <span style={{ fontSize: 24, lineHeight: 1 }}>{toFlag(country.code)}</span>
      )}
      <div>
        <div style={{ fontWeight: 700, fontSize: 13.5, color: C.text }}>{country.name}</div>
        <div style={{ fontSize: 11, color: C.textMuted, fontVariantNumeric: "tabular-nums" }}>
          {country.lat}°, {country.lng}°
        </div>
      </div>
    </div>
  );
}
