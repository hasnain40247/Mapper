import type { GeoJSON, TopoJSON, TopoGeometry } from "./types";

export function topo2geo(topo: TopoJSON): GeoJSON {
  const key = Object.keys(topo.objects)[0];
  const obj = topo.objects[key];
  const { arcs: ta, transform: tx } = topo;

  function decArc(i: number): [number, number][] {
    const raw = ta[i < 0 ? ~i : i];
    let x = 0;
    let y = 0;
    const pts: [number, number][] = raw.map(([dx, dy]) => {
      x += dx;
      y += dy;
      return (
        tx
          ? [x * tx.scale[0] + tx.translate[0], y * tx.scale[1] + tx.translate[1]]
          : [x, y]
      ) as [number, number];
    });
    return i < 0 ? pts.reverse() : pts;
  }

  function ring(r: number[]): [number, number][] {
    let c: [number, number][] = [];
    r.forEach((i) => {
      const d = decArc(i);
      if (c.length) d.shift();
      c = c.concat(d);
    });
    return c;
  }

  function geom(g: TopoGeometry): { type: string; coordinates: unknown } {
    if (g.type === "Polygon") {
      return {
        type: "Polygon",
        coordinates: (g.arcs as number[][]).map(ring),
      };
    }
    if (g.type === "MultiPolygon") {
      return {
        type: "MultiPolygon",
        coordinates: (g.arcs as number[][][]).map((p) => p.map(ring)),
      };
    }
    return { type: g.type, coordinates: g.arcs };
  }

  return {
    type: "FeatureCollection",
    features: (obj.geometries || []).map((g) => ({
      type: "Feature" as const,
      id: g.id,
      properties: g.properties || {},
      geometry: geom(g),
    })),
  };
}
