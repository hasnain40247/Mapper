"use client";

import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import type { CountryInfo, GeoJSON } from "@/lib/types";
import { COLORS as C, FILLS, FILLS_BRIGHT } from "@/lib/constants";
import { waterLabels } from "@/lib/waterLabels";
import { CODE } from "@/lib/countries";
import { topo2geo } from "@/lib/topo2geo";
import { fetchCountryFacts } from "@/lib/countryfacts";
import ChatPanel from "@/components/chat/ChatPanel";
import FactCard from "@/components/fact-card/FactCard";
import HoverPill from "./HoverPill";
import LoadingOverlay from "./LoadingOverlay";

const WORLD_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface WorldMapProps {
  grayscale?: boolean;
  showChat?: boolean;
  showHover?: boolean;
  brightColors?: boolean;
}

export default function WorldMap({
  grayscale = false, showChat = true, showHover = true, brightColors = false,
}: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 900, h: 600 });
  const [world, setWorld] = useState<GeoJSON | null>(null);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<CountryInfo | null>(null);
  const [clicked, setClicked] = useState<CountryInfo | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatCountry, setChatCountry] = useState<CountryInfo | null>(null);
  const [askQuestion, setAskQuestion] = useState<string | null>(null);
  const flagCacheRef = useRef<Record<string, string>>({});
  const [hoveredFlag, setHoveredFlag] = useState<string | null>(null);

  useEffect(() => {
    if (!hovered) { setHoveredFlag(null); return; }
    const name = hovered.name;
    if (flagCacheRef.current[name]) { setHoveredFlag(flagCacheRef.current[name]); return; }
    setHoveredFlag(null);
    fetchCountryFacts(name).then((f) => {
      if (f?.flagPng) { flagCacheRef.current[name] = f.flagPng; setHoveredFlag(f.flagPng); }
    });
  }, [hovered?.name]);

  useEffect(() => {
    const measure = () => {
      if (wrapRef.current) {
        const r = wrapRef.current.getBoundingClientRect();
        setDims({ w: r.width || 900, h: r.height || 600 });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    let stop = false;
    fetch(WORLD_URL)
      .then((r) => r.json())
      .then((topo) => { if (!stop) { setWorld(topo2geo(topo)); setLoading(false); } })
      .catch(() => { if (!stop) setLoading(false); });
    return () => { stop = true; };
  }, []);

  useEffect(() => {
    if (clicked && !clicked.isWater && showChat) {
      setChatCountry(clicked);
      setChatOpen(true);
    }
  }, [clicked, showChat]);

  useEffect(() => {
    if (!world || !svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const { w, h } = dims;
    const palette = brightColors ? FILLS_BRIGHT : FILLS;

    const margin = 60;
    const proj = d3.geoMercator()
      .fitSize([w - margin * 2, h], world as d3.ExtendedFeatureCollection)
      .center([0, 20])
      .translate([w / 2, h / 2]);

    const tempPath = d3.geoPath().projection(proj);
    const [[x0], [x1]] = tempPath.bounds(world as d3.ExtendedFeatureCollection);
    const [[, y0], [, y1]] = tempPath.bounds(world as d3.ExtendedFeatureCollection);
    const scale = proj.scale()! * Math.max((w - margin * 2) / (x1 - x0), h / (y1 - y0)) * 0.80;
    proj.scale(scale).translate([w / 2, h / 2]);
    const pathGen = d3.geoPath().projection(proj);

    const leftPt = proj([180, 0]);
    const rightPt = proj([-180, 0]);
    const mapWidth = leftPt && rightPt ? leftPt[0] - rightPt[0] : w;

    const container = svg.append("g");
    const offsets = [-mapWidth * 2, -mapWidth, 0, mapWidth, mapWidth * 2];

    offsets.forEach((ox) => {
      const g = container.append("g").attr("transform", `translate(${ox},0)`);

      g.append("path")
        .datum({ type: "Sphere" } as d3.GeoPermissibleObjects)
        .attr("d", pathGen)
        .attr("fill", C.ocean)
        .attr("stroke", "none");

      g.selectAll("path.c")
        .data(world.features)
        .join("path")
        .attr("class", "c")
        .attr("d", pathGen as never)
        .attr("fill", (_, i) => palette[i % palette.length])
        .attr("stroke", C.landStroke)
        .attr("stroke-width", 0.6)
        .style("cursor", "pointer")
        .on("mouseenter", function (_, d) {
          container.selectAll("path.c").filter((dd) => dd === d).attr("fill", C.landHover);
          const name = (d as { properties?: { name?: string } }).properties?.name || "";
          const cent = pathGen.centroid(d as d3.GeoPermissibleObjects);
          const inv = proj.invert?.(cent);
          setHovered({ name, code: CODE[name] || null, lat: inv ? inv[1].toFixed(2) : "0", lng: inv ? inv[0].toFixed(2) : "0" });
        })
        .on("mouseleave", function (_, d) {
          const i = world.features.indexOf(d as typeof world.features[0]);
          container.selectAll("path.c").filter((dd) => dd === d).attr("fill", palette[i % palette.length]);
          setHovered(null);
        })
        .on("click", function (event: MouseEvent, d) {
          event.stopPropagation();
          const [mx, my] = d3.pointer(event, g.node());
          const cent = pathGen.centroid(d as d3.GeoPermissibleObjects);
          const inv = proj.invert?.(cent);
          const name = (d as { properties?: { name?: string } }).properties?.name || "Unknown";
          setClicked({ name, code: CODE[name] || null, lat: inv ? inv[1].toFixed(2) : "0", lng: inv ? inv[0].toFixed(2) : "0" });
          container.selectAll("circle.pin").remove();
          container.selectAll("circle.ripple").remove();
          g.append("circle").attr("class", "ripple").attr("cx", mx).attr("cy", my).attr("r", 4)
            .attr("fill", C.pinColor).attr("opacity", 0.8)
            .transition().duration(900).attr("r", 26).attr("opacity", 0).remove();
          g.append("circle").attr("class", "pin").attr("cx", mx).attr("cy", my)
            .attr("r", 5).attr("fill", C.pinColor).attr("stroke", "#fff").attr("stroke-width", 2.5)
            .style("filter", "drop-shadow(0 2px 6px rgba(230,57,70,0.5))");
        });

      waterLabels.forEach((o) => {
        const pt = proj([o.lng, o.lat]);
        if (pt) {
          g.append("text")
            .attr("class", "ocean-label")
            .attr("data-base-size", o.size)
            .attr("data-min-zoom", o.minZ)
            .attr("x", pt[0]).attr("y", pt[1])
            .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
            .attr("fill", o.minZ <= 1 ? "#B0C0D4" : "#C0CCDA")
            .attr("font-family", "'Quicksand','Nunito',sans-serif")
            .attr("font-size", o.size).attr("font-weight", 600)
            .attr("letter-spacing", o.minZ <= 1 ? "2px" : "1.2px")
            .attr("font-style", "italic")
            .attr("opacity", o.minZ <= 1 ? 1 : 0)
            .style("pointer-events", "none").style("user-select", "none")
            .text(o.name.toUpperCase());
        }
      });
    });

    const zb = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 12])
      .on("zoom", (e: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        const k = e.transform.k;
        const yMin = h - h * k;
        const t = e.transform as unknown as { x: number; y: number; k: number };
        t.y = Math.max(yMin, Math.min(0, t.y));
        const scaledMapW = mapWidth * k;
        t.x = ((t.x % scaledMapW) + scaledMapW) % scaledMapW - scaledMapW;

        container.attr("transform", e.transform.toString());
        container.selectAll("path.c").attr("stroke-width", 0.6 / k);
        container.selectAll("circle.pin").attr("r", 5 / k).attr("stroke-width", 2.5 / k);

        container.selectAll("text.ocean-label").each(function () {
          const el = d3.select(this);
          const base = +(el.attr("data-base-size") || 0);
          const minZ = +(el.attr("data-min-zoom") || 0);
          const isOcean = minZ <= 1;
          const scaledSize = isOcean ? base * Math.pow(k, 0.3) / k : base * Math.pow(k, 0.6) / k;
          el.attr("font-size", scaledSize);
          el.attr("letter-spacing", (isOcean ? 2 : 1.2) * Math.pow(k, 0.3) / k + "px");
          el.attr("opacity", k >= minZ ? Math.min(1, (k - minZ + 0.5) * 1.5) : 0);
        });
      });

    svg.call(zb);
    svg.on("dblclick.zoom", () => svg.transition().duration(700).call(zb.transform, d3.zoomIdentity));
  }, [world, dims]);

  return (
    <div
      ref={wrapRef}
      style={{
        width: "100%", height: "100vh",
        background: grayscale ? "#f5f5f5" : C.ocean,
        position: "relative", overflow: "hidden",
        fontFamily: "'Quicksand','Nunito',system-ui,sans-serif",
      }}
    >
      <svg
        ref={svgRef}
        width={dims.w}
        height={dims.h}
        style={{
          display: "block",
          background: grayscale ? "#f5f5f5" : C.ocean,
          cursor: "grab",
          filter: grayscale ? "grayscale(1) contrast(1.1)" : "none",
          transition: "filter 0.4s ease, background 0.4s ease",
        }}
      />

      {showHover && hovered && <HoverPill country={hovered} flagUrl={hoveredFlag} />}

      {showChat && chatOpen && chatCountry && (
        <ChatPanel
          country={chatCountry}
          onClose={() => setChatOpen(false)}
          externalQuestion={askQuestion}
          onQuestionConsumed={() => setAskQuestion(null)}
        />
      )}

      {showChat && clicked && !clicked.isWater && (
        <FactCard
          country={clicked}
          onAskAbout={(question) => {
            if (!chatOpen) { setChatCountry(clicked); setChatOpen(true); }
            setAskQuestion(question);
          }}
        />
      )}

      {loading && <LoadingOverlay />}
    </div>
  );
}
