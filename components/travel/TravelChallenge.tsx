"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import { CODE, toFlag } from "@/lib/countries";
import { COLORS as C } from "@/lib/constants";
import { pickConnectedPair, findPath, BORDERS, isOnValidPath } from "@/lib/borders";
import { topo2geo } from "@/lib/topo2geo";
import { playTuckSound, playSuccessSound } from "@/lib/audio";
import type { GeoJSON } from "@/lib/types";
import CountryPairDisplay from "./CountryPairDisplay";
import GuessInput from "./GuessInput";
import GuessPills from "./GuessPills";
import HintControls from "./HintControls";
import GameBanner from "./GameBanner";

const WORLD_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const MAX_GUESSES = 10;
const COLOR_ON_PATH = "#7EC8E3";
const COLOR_A = "#FF8FA3";
const COLOR_B = "#B388EB";
const COLOR_SOLVED = "#7DDBA3";
const allCountryNames = Object.keys(BORDERS);

function checkPathSolved(countryA: string, countryB: string, guesses: string[]): boolean {
  const available = new Set([countryA, countryB, ...guesses]);
  const queue = [countryA];
  const visited = new Set([countryA]);
  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current === countryB) return true;
    for (const neighbor of (BORDERS[current] || [])) {
      if (available.has(neighbor) && !visited.has(neighbor)) { visited.add(neighbor); queue.push(neighbor); }
    }
  }
  return false;
}

function isInChain(name: string, countryA: string, countryB: string, guesses: string[]): boolean {
  const available = new Set([countryA, countryB, ...guesses]);
  function canReach(from: string, to: string): boolean {
    const queue = [from];
    const visited = new Set([from]);
    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current === to) return true;
      for (const neighbor of (BORDERS[current] || [])) {
        if (available.has(neighbor) && !visited.has(neighbor)) { visited.add(neighbor); queue.push(neighbor); }
      }
    }
    return false;
  }
  return canReach(countryA, name) || canReach(name, countryB);
}

export default function TravelChallenge() {
  const svgRef = useRef<SVGSVGElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const zbRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const [world, setWorld] = useState<GeoJSON | null>(null);
  const [loading, setLoading] = useState(true);
  const [pair, setPair] = useState<[string, string]>(() => pickConnectedPair());
  const [dims, setDims] = useState({ w: 600, h: 400 });
  const [guesses, setGuesses] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [solved, setSolved] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [outlinesUsed, setOutlinesUsed] = useState(false);
  const correctPath = useRef<string[] | null>(null);

  const [countryA, countryB] = pair;

  useEffect(() => { correctPath.current = findPath(countryA, countryB); }, [countryA, countryB]);

  useEffect(() => {
    let stop = false;
    fetch(WORLD_URL)
      .then((r) => r.json())
      .then((topo) => { if (!stop) { setWorld(topo2geo(topo)); setLoading(false); } })
      .catch(() => { if (!stop) setLoading(false); });
    return () => { stop = true; };
  }, []);

  useEffect(() => {
    const measure = () => {
      if (mapContainerRef.current) {
        const r = mapContainerRef.current.getBoundingClientRect();
        setDims({ w: r.width || 600, h: r.height || 400 });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const revealed = new Set([countryA, countryB, ...guesses]);

  function flyToRevealed(names: string[]) {
    if (!world || !svgRef.current || !zbRef.current) return;
    const svg = d3.select(svgRef.current);
    const { w, h } = dims;
    const proj = d3.geoNaturalEarth1().fitSize([w - 20, h - 20], world as d3.ExtendedFeatureCollection).translate([w / 2, h / 2]);
    const pathGen = d3.geoPath().projection(proj);

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let found = 0;
    world.features.forEach((f) => {
      const name = (f as { properties?: { name?: string } }).properties?.name || "";
      if (names.includes(name)) {
        const bounds = pathGen.bounds(f as d3.GeoPermissibleObjects);
        if (bounds && isFinite(bounds[0][0])) {
          minX = Math.min(minX, bounds[0][0]); minY = Math.min(minY, bounds[0][1]);
          maxX = Math.max(maxX, bounds[1][0]); maxY = Math.max(maxY, bounds[1][1]);
          found++;
        }
      }
    });
    if (found === 0) return;

    const padding = 50;
    const scale = Math.min((w - padding * 2) / (maxX - minX), (h - padding * 2) / (maxY - minY), 6);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    svg.transition().duration(800).ease(d3.easeCubicInOut).call(zbRef.current.transform, d3.zoomIdentity.translate(w / 2 - cx * scale, h / 2 - cy * scale).scale(scale));
  }

  useEffect(() => {
    if (!world) return;
    const timer = setTimeout(() => flyToRevealed([countryA, countryB]), 150);
    return () => clearTimeout(timer);
  }, [world, countryA, countryB, dims]);

  useEffect(() => {
    if (guesses.length === 0 || !world) return;
    const timer = setTimeout(() => flyToRevealed([countryA, countryB, ...guesses]), 50);
    return () => clearTimeout(timer);
  }, [guesses]);

  useEffect(() => {
    if (!world || !svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const { w, h } = dims;

    const proj = d3.geoNaturalEarth1().fitSize([w - 20, h - 20], world as d3.ExtendedFeatureCollection).translate([w / 2, h / 2]);
    const pathGen = d3.geoPath().projection(proj);
    const g = svg.append("g");

    const hintCountry = hintUsed && correctPath.current
      ? correctPath.current.slice(1, -1).find((c) => !guesses.includes(c)) || null
      : null;

    g.selectAll("path.c")
      .data(world.features)
      .join("path")
      .attr("class", "c")
      .attr("d", pathGen as never)
      .style("vector-effect", "non-scaling-stroke")
      .attr("fill", (d) => {
        const name = (d as { properties?: { name?: string } }).properties?.name || "";
        if (!revealed.has(name)) return "transparent";
        if (solved) return COLOR_SOLVED;
        if (name === countryA) return COLOR_A;
        if (name === countryB) return COLOR_B;
        return isInChain(name, countryA, countryB, guesses) ? COLOR_ON_PATH : "#C4C4C4";
      })
      .attr("stroke", (d) => {
        const name = (d as { properties?: { name?: string } }).properties?.name || "";
        if (name === hintCountry) return "#D48A20";
        if (revealed.has(name)) return isInChain(name, countryA, countryB, guesses) || name === countryA || name === countryB ? "rgba(255,255,255,0.8)" : "rgba(180,180,180,0.5)";
        if (outlinesUsed) return "rgba(0,0,0,0.15)";
        return "transparent";
      })
      .attr("stroke-width", (d) => {
        const name = (d as { properties?: { name?: string } }).properties?.name || "";
        if (name === hintCountry) return 2;
        if (revealed.has(name)) return 1;
        if (outlinesUsed) return 0.4;
        return 0;
      })
      .attr("stroke-dasharray", (d) => {
        const name = (d as { properties?: { name?: string } }).properties?.name || "";
        return name === hintCountry ? "4 3" : "none";
      })
      .attr("opacity", (d) => {
        const name = (d as { properties?: { name?: string } }).properties?.name || "";
        if (!revealed.has(name)) return outlinesUsed ? 1 : 0;
        if (name === countryA || name === countryB) return 1;
        return isInChain(name, countryA, countryB, guesses) ? 1 : 0.45;
      })
      .style("cursor", (d) => {
        const name = (d as { properties?: { name?: string } }).properties?.name || "";
        return revealed.has(name) ? "pointer" : "default";
      })
      .on("mouseenter", function (event, d) {
        const name = (d as { properties?: { name?: string } }).properties?.name || "";
        if (!revealed.has(name)) return;
        const tooltip = d3.select(svgRef.current!.parentElement)
          .selectAll(".map-tooltip").data([null]).join("div")
          .attr("class", "map-tooltip")
          .style("position", "absolute").style("pointer-events", "none").style("z-index", "20")
          .style("padding", "6px 12px").style("border-radius", "10px")
          .style("background", "rgba(255,255,255,0.88)")
          .style("backdrop-filter", "blur(12px)").style("-webkit-backdrop-filter", "blur(12px)")
          .style("box-shadow", "0 4px 16px rgba(0,0,0,0.1)")
          .style("border", "1px solid rgba(255,255,255,0.6)")
          .style("font-family", "'Quicksand',sans-serif").style("font-size", "13px")
          .style("font-weight", "600").style("color", C.text).style("white-space", "nowrap")
          .html(`${toFlag(CODE[name] || null)} ${name}`);
        const [mx, my] = d3.pointer(event, svgRef.current!.parentElement);
        tooltip.style("left", `${mx + 14}px`).style("top", `${my - 10}px`);
      })
      .on("mousemove", function (event) {
        const [mx, my] = d3.pointer(event, svgRef.current!.parentElement);
        d3.select(svgRef.current!.parentElement).select(".map-tooltip").style("left", `${mx + 14}px`).style("top", `${my - 10}px`);
      })
      .on("mouseleave", function () {
        d3.select(svgRef.current!.parentElement).selectAll(".map-tooltip").remove();
      });

    const zb = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 10])
      .on("zoom", (e) => { g.attr("transform", e.transform.toString()); });
    zbRef.current = zb;
    svg.call(zb);
    svg.on("dblclick.zoom", () => svg.transition().duration(500).call(zb.transform, d3.zoomIdentity));
  }, [world, dims, countryA, countryB, guesses, solved]);

  useEffect(() => {
    if (!svgRef.current || !world) return;
    const svg = d3.select(svgRef.current);
    const g = svg.select("g");

    const hintCountry = hintUsed && correctPath.current
      ? correctPath.current.slice(1, -1).find((c) => !guesses.includes(c)) || null
      : null;

    g.selectAll(".hint-overlay").remove();

    svg.selectAll("path.c").each(function (d) {
      const el = d3.select(this);
      const name = (d as { properties?: { name?: string } }).properties?.name || "";
      if (revealed.has(name)) {
        const inChain = isInChain(name, countryA, countryB, guesses) || name === countryA || name === countryB;
        el.attr("stroke", inChain ? "rgba(255,255,255,0.8)" : "rgba(180,180,180,0.5)").attr("stroke-width", 1).attr("stroke-dasharray", "none");
      } else if (outlinesUsed) {
        el.attr("stroke", "rgba(0,0,0,0.15)").attr("stroke-width", 0.4).attr("stroke-dasharray", "none");
      } else {
        el.attr("stroke", "transparent").attr("stroke-width", 0).attr("stroke-dasharray", "none");
      }
      if (!revealed.has(name)) el.attr("opacity", (name === hintCountry) ? 1 : (outlinesUsed ? 1 : 0));
    });

    if (hintCountry) {
      const feature = world.features.find((f) => (f as { properties?: { name?: string } }).properties?.name === hintCountry);
      if (feature) {
        const proj = d3.geoNaturalEarth1().fitSize([dims.w - 20, dims.h - 20], world as d3.ExtendedFeatureCollection).translate([dims.w / 2, dims.h / 2]);
        const pathGen = d3.geoPath().projection(proj);
        g.append("path")
          .attr("class", "hint-overlay")
          .attr("d", pathGen(feature as d3.GeoPermissibleObjects))
          .attr("fill", "none").attr("stroke", "#D48A20").attr("stroke-width", 2)
          .attr("stroke-dasharray", "6 4").style("vector-effect", "non-scaling-stroke").style("pointer-events", "none");
      }
    }
  }, [hintUsed, outlinesUsed, guesses, world, countryA, countryB, solved, dims]);

  const suggestions = input.length > 0
    ? allCountryNames.filter((n) => n.toLowerCase().includes(input.toLowerCase()) && n !== countryA && n !== countryB && !guesses.includes(n)).slice(0, 6)
    : [];

  function submitGuess(name: string) {
    if (name === countryA || name === countryB || guesses.includes(name)) return;
    if (guesses.length >= MAX_GUESSES || solved || failed) return;
    const newGuesses = [...guesses, name];
    setGuesses(newGuesses);
    setInput("");
    setShowSuggestions(false);
    playTuckSound();
    if (checkPathSolved(countryA, countryB, newGuesses)) {
      setSolved(true);
      setTimeout(playSuccessSound, 200);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setFailed(true);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && suggestions.length > 0) submitGuess(suggestions[0]);
  }

  const newChallenge = useCallback(() => {
    setPair(pickConnectedPair());
    setGuesses([]); setSolved(false); setFailed(false);
    setHintUsed(false); setOutlinesUsed(false); setInput("");
  }, []);

  const pathLength = correctPath.current ? correctPath.current.length - 2 : 0;
  const correctGuesses = guesses.filter((g) => isInChain(g, countryA, countryB, guesses));
  const wrongGuesses = guesses.filter((g) => !isInChain(g, countryA, countryB, guesses));

  return (
    <div style={{
      width: "100%", height: "100vh",
      display: "flex", flexDirection: "column" as const,
      background: "linear-gradient(145deg, #FFF0F3 0%, #F0EFFF 40%, #E8F8F0 100%)",
      fontFamily: "'Quicksand','Nunito',system-ui,sans-serif",
    }}>
      {/* Top bar */}
      <div style={{ padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, color: C.text }}>Borderline</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4, display: "flex", alignItems: "center", gap: 8 }}>
            <span>Shortest: {pathLength}</span>
            <span style={{
              padding: "2px 10px", borderRadius: 6, fontWeight: 700, fontSize: 13,
              background: guesses.length >= 8 ? "rgba(230,80,80,0.12)" : "rgba(0,0,0,0.05)",
              color: guesses.length >= 8 ? "#D44" : C.text,
              border: `1px solid ${guesses.length >= 8 ? "rgba(230,80,80,0.2)" : "rgba(0,0,0,0.08)"}`,
            }}>
              {MAX_GUESSES - guesses.length} left
            </span>
            {wrongGuesses.length > 0 && <span style={{ color: "#D48A20" }}>{wrongGuesses.length} off path</span>}
          </div>
        </div>
        <button
          onClick={newChallenge}
          style={{ padding: "8px 18px", background: "#E8725C", border: "none", borderRadius: 10, color: "#fff", fontFamily: "'Quicksand',sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
        >New Challenge</button>
      </div>

      <CountryPairDisplay countryA={countryA} countryB={countryB} solved={solved} />

      {/* Map */}
      <div
        ref={mapContainerRef}
        style={{ flex: 1, margin: "0 24px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(0,0,0,0.04)", background: "rgba(255,255,255,0.45)", position: "relative" }}
      >
        {loading ? (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: C.textMuted, fontSize: 14 }}>
            Loading map…
          </div>
        ) : (
          <svg ref={svgRef} width={dims.w} height={dims.h} style={{ display: "block", cursor: "grab" }} />
        )}

        <GuessPills guesses={guesses} correctPath={correctPath.current} countryA={countryA} countryB={countryB} solved={solved} />
        <HintControls hintUsed={hintUsed} outlinesUsed={outlinesUsed} solved={solved} failed={failed} onHint={() => setHintUsed(true)} onOutlines={() => setOutlinesUsed(true)} />
        <GameBanner solved={solved} failed={failed} guessCount={guesses.length} correctGuessCount={correctGuesses.length} />
      </div>

      <GuessInput
        input={input} suggestions={suggestions} showSuggestions={showSuggestions}
        solved={solved} failed={failed}
        onChange={setInput} onShowSuggestions={setShowSuggestions}
        onSubmit={submitGuess} onKeyDown={handleKeyDown}
      />
    </div>
  );
}
