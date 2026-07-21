/**
 * Genera data/worldMap.json (contornos del mapamundi + coordenadas de los mercados).
 *
 * Vuelve a ejecutarlo cuando cambie la lista de países/ciudades de
 * app/[locale]/sections/countries/page.tsx: si una clave no existe aquí,
 * el punto simplemente no se dibuja en el mapa (falla en silencio).
 *
 *   npm i -D topojson-client
 *   curl -o /tmp/world110.json https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json
 *   node scripts/generate-world-map.mjs
 */
import fs from "fs";
import { feature } from "topojson-client";

const topo = JSON.parse(fs.readFileSync("/tmp/world110.json", "utf8"));
const geo = feature(topo, topo.objects.countries);

// ---- Encuadre: banda atlántica (América + Europa occidental / África) ----
const LON_MIN = -130, LON_MAX = 22;
const LAT_MIN = -57, LAT_MAX = 60;

const WIDTH = 1000;

const merY = (lat) => {
  const phi = (Math.max(-84, Math.min(84, lat)) * Math.PI) / 180;
  return Math.log(Math.tan(Math.PI / 4 + phi / 2));
};

const y0 = merY(LAT_MAX);
const y1 = merY(LAT_MIN);
const scale = WIDTH / (((LON_MAX - LON_MIN) * Math.PI) / 180);
const HEIGHT = (y0 - y1) * scale;

const project = ([lon, lat]) => [
  ((lon - LON_MIN) * Math.PI / 180) * scale,
  (y0 - merY(lat)) * scale,
];

const r = (n) => Math.round(n * 10) / 10;

// Área con la fórmula del zapatero (shoelace) para descartar islas diminutas
const ringArea = (pts) => {
  let a = 0;
  for (let i = 0, n = pts.length; i < n; i++) {
    const [x1, yy1] = pts[i];
    const [x2, yy2] = pts[(i + 1) % n];
    a += x1 * yy2 - x2 * yy1;
  }
  return Math.abs(a / 2);
};

const MIN_AREA = 6; // px² en el espacio 1000 de ancho
const PAD = 60;     // margen de recorte fuera del viewBox

const paths = [];
let kept = 0, dropped = 0;

for (const f of geo.features) {
  const name = f.properties?.name ?? "";
  if (name === "Antarctica") continue;

  const polys =
    f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;

  const ds = [];
  for (const poly of polys) {
    for (const ring of poly) {
      const pts = ring.map(project);
      // fuera del encuadre por completo -> descartar
      const xs = pts.map((p) => p[0]);
      const ys = pts.map((p) => p[1]);
      if (
        Math.max(...xs) < -PAD || Math.min(...xs) > WIDTH + PAD ||
        Math.max(...ys) < -PAD || Math.min(...ys) > HEIGHT + PAD
      ) { dropped++; continue; }

      // artefactos del antimeridiano: tiras horizontales que cruzan todo el mapa
      const bw = Math.max(...xs) - Math.min(...xs);
      const bh = Math.max(...ys) - Math.min(...ys);
      if (bw > WIDTH * 0.8 && bh < WIDTH * 0.05) { dropped++; continue; }

      if (ringArea(pts) < MIN_AREA) { dropped++; continue; }

      // simplificación: elimina puntos consecutivos casi idénticos
      const out = [];
      for (const p of pts) {
        const q = [r(p[0]), r(p[1])];
        const last = out[out.length - 1];
        if (!last || last[0] !== q[0] || last[1] !== q[1]) out.push(q);
      }
      if (out.length < 4) { dropped++; continue; }

      ds.push("M" + out.map((p) => `${p[0]} ${p[1]}`).join("L") + "Z");
      kept++;
    }
  }
  if (ds.length) paths.push(ds.join(""));
}

// ---- Marcadores: países y ciudades donde opera LensPR ----
const places = [
  ["mexico", -102.0, 23.6],
  ["texas", -99.5, 31.3],
  ["florida", -81.6, 27.9],
  ["sanFranciscoBayArea", -122.3, 37.8],
  ["guatemala", -90.4, 15.6],
  ["honduras", -86.6, 14.8],
  ["elSalvador", -88.9, 13.7],
  ["nicaragua", -85.2, 12.9],
  ["costaRica", -84.1, 9.8],
  ["panama", -80.1, 8.6],
  ["repDominicana", -70.3, 18.8],
  ["colombia", -74.1, 4.6],
  ["ecuador", -78.5, -1.4],
  ["peru", -76.0, -9.9],
  ["brasil", -49.0, -12.0],
  ["chile", -70.7, -33.4],
  ["argentina", -63.6, -35.5],
  ["paraguay", -57.6, -23.4],
  ["uruguay", -56.0, -32.8],
  ["espana", -3.7, 40.4],
  ["francia", 2.3, 46.6],
];

const markers = places.map(([key, lon, lat]) => {
  const [x, y] = project([lon, lat]);
  return { key, x: r(x), y: r(y) };
});

const data = {
  width: WIDTH,
  height: Math.round(HEIGHT * 10) / 10,
  paths,
  markers,
};

fs.writeFileSync(
  new URL("../data/worldMap.json", import.meta.url),
  JSON.stringify(data)
);

console.log("height:", data.height, "aspect:", (WIDTH / HEIGHT).toFixed(2));
console.log("rings kept:", kept, "dropped:", dropped, "countries:", paths.length);
console.log("size KB:", (JSON.stringify(data).length / 1024).toFixed(1));
console.log("markers sample:", markers.slice(0, 3), markers.slice(-2));
