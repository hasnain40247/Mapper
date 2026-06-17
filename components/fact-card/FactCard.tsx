"use client";

import { useState, useEffect } from "react";
import type { CountryInfo } from "@/lib/types";
import { COLORS as C } from "@/lib/constants";
import { toFlag, CODE } from "@/lib/countries";
import { fetchCountryFacts, type CountryFact } from "@/lib/countryfacts";
import { PiMapPin, PiTranslate, PiFlag, PiUsers, PiCurrencyCircleDollar } from "react-icons/pi";
import FactRow from "./FactRow";
import FactTimeline from "./FactTimeline";

interface FactCardProps {
  country: CountryInfo;
  onAskAbout?: (question: string) => void;
}

export default function FactCard({ country, onAskAbout }: FactCardProps) {
  const [facts, setFacts] = useState<CountryFact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchCountryFacts(country.name).then((f) => { setFacts(f); setLoading(false); });
  }, [country.name]);

  return (
    <div style={{
      position: "absolute", bottom: 90, left: 20,
      width: 380, maxHeight: "calc(100vh - 180px)",
      overflow: "hidden", display: "flex", flexDirection: "column" as const,
      zIndex: 15,
      background: "rgba(255, 255, 255, 0.55)",
      backdropFilter: "blur(28px) saturate(1.4)",
      WebkitBackdropFilter: "blur(28px) saturate(1.4)",
      borderRadius: 20, border: "1px solid rgba(255,255,255,0.55)",
      boxShadow: "0 8px 40px rgba(139,115,155,0.15), inset 0 1px 0 rgba(255,255,255,0.6)",
      padding: "20px",
      animation: "panelIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      fontFamily: "'Quicksand','Nunito',system-ui,sans-serif",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
        {facts?.flagPng ? (
          <img
            src={facts.flagPng}
            alt={country.name}
            style={{ width: 56, height: 38, borderRadius: 6, objectFit: "cover", boxShadow: "0 2px 8px rgba(0,0,0,0.12)", border: "1px solid rgba(0,0,0,0.06)" }}
          />
        ) : (
          <span style={{ fontSize: 36, lineHeight: 1 }}>{toFlag(CODE[country.name] || country.code)}</span>
        )}
        <div>
          <div style={{ fontFamily: "'Quicksand',sans-serif", fontWeight: 700, fontSize: 18, color: C.text, letterSpacing: "-0.3px" }}>
            {country.name}
          </div>
          <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>
            {country.lat}° lat, {country.lng}° lng
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "20px 0", color: C.textMuted, fontSize: 13 }}>Loading facts…</div>
      ) : !facts ? (
        <div style={{ textAlign: "center", padding: "20px 0", color: C.textMuted, fontSize: 13 }}>No data available</div>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 18 }}>
            <FactRow
              icon={<PiMapPin size={16} color="#FF8FA3" />}
              iconBg="rgba(255,143,163,0.12)"
              label="Capital"
              hoverBg="rgba(255,143,163,0.08)"
              onClick={() => onAskAbout?.(`Tell me about ${facts.capital}, the capital of ${country.name}. What's it known for?`)}
            >
              {facts.capital}
            </FactRow>

            {facts.languages.length > 0 && (
              <FactRow
                icon={<PiTranslate size={16} color="#B388EB" />}
                iconBg="rgba(179,136,235,0.12)"
                label="Languages"
                hoverBg="rgba(179,136,235,0.08)"
                alignItems="flex-start"
                onClick={() => onAskAbout?.(`Tell me about the languages spoken in ${country.name}: ${facts.languages.join(", ")}. How did they develop?`)}
              >
                {facts.languages.join(", ")}
              </FactRow>
            )}

            {facts.population && (
              <FactRow
                icon={<PiUsers size={16} color="#7DDBA3" />}
                iconBg="rgba(125,219,163,0.12)"
                label="Population"
                hoverBg="rgba(125,219,163,0.08)"
                onClick={() => onAskAbout?.(`Tell me about ${country.name}'s population of ${facts.population?.toLocaleString()}. Demographics, growth trends, urbanization?`)}
              >
                {facts.population.toLocaleString()}
              </FactRow>
            )}

            {facts.currencies && facts.currencies.length > 0 && (
              <FactRow
                icon={<PiCurrencyCircleDollar size={16} color="#E8A838" />}
                iconBg="rgba(255,209,102,0.15)"
                label="Currency"
                hoverBg="rgba(255,209,102,0.08)"
                alignItems="flex-start"
                onClick={() => onAskAbout?.(`Tell me about the currency of ${country.name}: ${facts.currencies!.map(c => c.name).join(", ")}. History and economy?`)}
              >
                {facts.currencies.map((c) => `${c.name}${c.symbol ? ` (${c.symbol})` : ""}`).join(", ")}
              </FactRow>
            )}

            {facts.colonizedBy && (
              <FactRow
                icon={<PiFlag size={16} color="#7EC8E3" />}
                iconBg="rgba(126,200,227,0.12)"
                label="Colonized by"
                hoverBg="rgba(126,200,227,0.08)"
                onClick={() => onAskAbout?.(`Tell me about ${country.name}'s colonial history under ${facts.colonizedBy}. How did it shape the country?`)}
              >
                {facts.colonizedBy}
              </FactRow>
            )}
          </div>

          <FactTimeline
            timeline={facts.timeline}
            countryName={country.name}
            onAskAbout={onAskAbout}
          />
        </>
      )}
    </div>
  );
}
