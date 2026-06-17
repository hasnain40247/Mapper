import type { CSSProperties } from "react";

export interface CountryInfo {
  name: string;
  code: string | null;
  lat: string;
  lng: string;
  isWater?: boolean;
}

export interface WaterLabel {
  name: string;
  lat: number;
  lng: number;
  size: number;
  minZ: number;
}

export interface ChatMessage {
  role: "user" | "assistant" | "system" | "error";
  text: string;
}

export interface OllamaStatus {
  status: "unknown" | "connected" | "offline";
  model: string;
}

export interface PillStyle extends CSSProperties {
  position: "absolute";
  zIndex: number;
  pointerEvents: "none";
}

export interface GeoFeature {
  type: "Feature";
  id?: string | number;
  properties: Record<string, unknown>;
  geometry: {
    type: string;
    coordinates: unknown;
  };
}

export interface GeoJSON {
  type: "FeatureCollection";
  features: GeoFeature[];
}

export interface TopoJSON {
  type: string;
  objects: Record<string, TopoObject>;
  arcs: number[][][];
  transform?: {
    scale: [number, number];
    translate: [number, number];
  };
}

export interface TopoObject {
  type: string;
  geometries?: TopoGeometry[];
  arcs?: number[][] | number[][][];
  properties?: Record<string, unknown>;
  id?: string | number;
}

export interface TopoGeometry {
  type: string;
  arcs: number[][] | number[][][];
  properties?: Record<string, unknown>;
  id?: string | number;
}
