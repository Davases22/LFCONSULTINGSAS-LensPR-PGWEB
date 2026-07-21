"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl = "/countries-110m.json";

type Continent = { key: string; countries: string[] };

const continents: Continent[] = [
  {
    key: "northAmerica",
    countries: [
      "mexico",
      "texas",
      "florida",
      "sanFranciscoBayArea",
    ],
  },
  {
    key: "centralAmerica",
    countries: [
      "panama",
      "costaRica",
      "repDominicana",
      "guatemala",
      "honduras",
      "elSalvador",
      "nicaragua",
    ],
  },
  {
    key: "southAmerica",
    countries: [
      "colombia",
      "brasil",
      "ecuador",
      "peru",
      "chile",
      "argentina",
      "uruguay",
      "paraguay",
    ],
  },
  {
    key: "europe",
    countries: ["espana", "francia", "reinoUnido"],
  },
];

// Nombre exacto usado por el topojson de world-atlas (Natural Earth) para cada país completo
const COUNTRY_GEO_NAMES: Record<string, string> = {
  mexico: "Mexico",
  panama: "Panama",
  costaRica: "Costa Rica",
  repDominicana: "Dominican Rep.",
  guatemala: "Guatemala",
  honduras: "Honduras",
  elSalvador: "El Salvador",
  nicaragua: "Nicaragua",
  colombia: "Colombia",
  brasil: "Brazil",
  ecuador: "Ecuador",
  peru: "Peru",
  chile: "Chile",
  argentina: "Argentina",
  uruguay: "Uruguay",
  paraguay: "Paraguay",
  espana: "Spain",
  francia: "France",
  estadosUnidos: "United States of America",
  reinoUnido: "United Kingdom",
};

const HIGHLIGHTED_NAMES = new Set(Object.values(COUNTRY_GEO_NAMES));
const GEO_NAME_TO_KEY = new Map(
  Object.entries(COUNTRY_GEO_NAMES).map(([key, name]) => [name, key])
);

// Patrones simplificados de banderas (franjas/colores principales; se omiten
// escudos, estrellas y emblemas finos por ser inviables a esta escala). Se usan
// solo como fill del estado "hover" en Geography — el resto del tiempo el país
// se ve negro/blanco según el tema.
function hStripes(colors: string[], weights?: number[]) {
  const w = weights ?? colors.map(() => 1);
  const total = w.reduce((a, b) => a + b, 0);
  let y = 0;
  return colors.map((c, i) => {
    const h = (w[i] / total) * 100;
    const rect = <rect key={i} x={0} y={y} width={100} height={h} fill={c} />;
    y += h;
    return rect;
  });
}
function vStripes(colors: string[], weights?: number[]) {
  const w = weights ?? colors.map(() => 1);
  const total = w.reduce((a, b) => a + b, 0);
  let x = 0;
  return colors.map((c, i) => {
    const wd = (w[i] / total) * 100;
    const rect = <rect key={i} x={x} y={0} width={wd} height={100} fill={c} />;
    x += wd;
    return rect;
  });
}

const FLAG_PATTERNS: Record<string, React.ReactNode> = {
  mexico: vStripes(["#006341", "#FFFFFF", "#CE1126"]),
  panama: (
    <>
      <rect x={0} y={0} width={50} height={50} fill="#FFFFFF" />
      <rect x={50} y={0} width={50} height={50} fill="#D21034" />
      <rect x={0} y={50} width={50} height={50} fill="#0033A0" />
      <rect x={50} y={50} width={50} height={50} fill="#FFFFFF" />
    </>
  ),
  costaRica: hStripes(["#002B7F", "#FFFFFF", "#CE1126", "#FFFFFF", "#002B7F"], [1, 1, 2, 1, 1]),
  repDominicana: (
    <>
      <rect x={0} y={0} width={50} height={50} fill="#002D62" />
      <rect x={50} y={0} width={50} height={50} fill="#CE1126" />
      <rect x={0} y={50} width={50} height={50} fill="#CE1126" />
      <rect x={50} y={50} width={50} height={50} fill="#002D62" />
      <rect x={42} y={0} width={16} height={100} fill="#FFFFFF" />
      <rect x={0} y={42} width={100} height={16} fill="#FFFFFF" />
    </>
  ),
  guatemala: vStripes(["#4997D0", "#FFFFFF", "#4997D0"]),
  honduras: hStripes(["#0073CF", "#FFFFFF", "#0073CF"]),
  elSalvador: hStripes(["#0047AB", "#FFFFFF", "#0047AB"]),
  nicaragua: hStripes(["#0067C6", "#FFFFFF", "#0067C6"]),
  colombia: hStripes(["#FCD116", "#003893", "#CE1126"], [2, 1, 1]),
  brasil: (
    <>
      <rect x={0} y={0} width={100} height={100} fill="#009739" />
      <polygon points="50,8 92,50 50,92 8,50" fill="#FEDD00" />
      <circle cx={50} cy={50} r={17} fill="#002776" />
    </>
  ),
  ecuador: hStripes(["#FFDD00", "#034EA2", "#EF3340"], [2, 1, 1]),
  peru: vStripes(["#D91023", "#FFFFFF", "#D91023"]),
  chile: (
    <>
      <rect x={0} y={50} width={100} height={50} fill="#D52B1E" />
      <rect x={0} y={0} width={100} height={50} fill="#FFFFFF" />
      <rect x={0} y={0} width={33} height={50} fill="#0039A6" />
    </>
  ),
  argentina: hStripes(["#6CACE4", "#FFFFFF", "#6CACE4"]),
  uruguay: (
    <>
      <rect x={0} y={0} width={100} height={100} fill="#FFFFFF" />
      {hStripes(
        ["#0038A8", "#FFFFFF", "#0038A8", "#FFFFFF", "#0038A8", "#FFFFFF", "#0038A8", "#FFFFFF", "#0038A8"],
        [1, 1, 1, 1, 1, 1, 1, 1, 1]
      )}
    </>
  ),
  paraguay: hStripes(["#D52B1E", "#FFFFFF", "#0038A8"]),
  espana: hStripes(["#AA151B", "#F1BF00", "#AA151B"], [1, 2, 1]),
  francia: vStripes(["#0055A4", "#FFFFFF", "#EF4135"]),
  estadosUnidos: (
    <>
      {hStripes(
        ["#B22234", "#FFFFFF", "#B22234", "#FFFFFF", "#B22234", "#FFFFFF", "#B22234"],
        [1, 1, 1, 1, 1, 1, 1]
      )}
      <rect x={0} y={0} width={45} height={55} fill="#3C3B6E" />
    </>
  ),
  reinoUnido: (
    <>
      <rect x={0} y={0} width={100} height={100} fill="#00247D" />
      <line x1={0} y1={0} x2={100} y2={100} stroke="#FFFFFF" strokeWidth={22} />
      <line x1={100} y1={0} x2={0} y2={100} stroke="#FFFFFF" strokeWidth={22} />
      <line x1={0} y1={0} x2={100} y2={100} stroke="#CF142B" strokeWidth={9} />
      <line x1={100} y1={0} x2={0} y2={100} stroke="#CF142B" strokeWidth={9} />
      <rect x={0} y={40} width={100} height={20} fill="#FFFFFF" />
      <rect x={40} y={0} width={20} height={100} fill="#FFFFFF" />
      <rect x={0} y={45} width={100} height={10} fill="#CF142B" />
      <rect x={45} y={0} width={10} height={100} fill="#CF142B" />
    </>
  ),
};

// Texas, Florida y San Francisco no son países completos: se marcan como pines sobre EE. UU.
const CITY_MARKERS: { key: string; coordinates: [number, number] }[] = [
  { key: "texas", coordinates: [-99.9018, 31.4757] },
  { key: "florida", coordinates: [-81.5158, 27.6648] },
  { key: "sanFranciscoBayArea", coordinates: [-122.2711, 37.8044] },
];

type Tooltip = { label: string; x: number; y: number };

export default function CountriesPage() {
  const t = useTranslations("countriesPage");
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  const showTooltip = (label: string) => (event: React.MouseEvent) => {
    setTooltip({ label, x: event.clientX, y: event.clientY });
  };
  const moveTooltip = (event: React.MouseEvent) => {
    setTooltip((prev) => (prev ? { ...prev, x: event.clientX, y: event.clientY } : prev));
  };
  const hideTooltip = () => setTooltip(null);

  return (
    <section className="bg-white dark:bg-zinc-900 pt-4 pb-12 md:pt-6 md:pb-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-black dark:text-white">
          {t("title")}
        </h1>

        <div className="relative mx-auto w-full">
          <ComposableMap
            width={800}
            height={370}
            projectionConfig={{ scale: 142, center: [0, 6.8] }}
            className="w-full h-auto"
          >
            <defs>
              {Object.entries(FLAG_PATTERNS).map(([key, content]) => (
                <pattern
                  key={key}
                  id={`flag-${key}`}
                  patternUnits="objectBoundingBox"
                  width={1}
                  height={1}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {content}
                </pattern>
              ))}
            </defs>

            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const name = geo.properties.name as string;
                  if (name === "Antarctica" || name === "Greenland") return null;
                  const key = GEO_NAME_TO_KEY.get(name);
                  const isHighlighted = HIGHLIGHTED_NAMES.has(name);
                  const hasFlag = Boolean(isHighlighted && key && FLAG_PATTERNS[key]);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      strokeWidth={0.5}
                      className={
                        isHighlighted
                          ? "fill-black dark:fill-white stroke-white dark:stroke-zinc-900 outline-none cursor-pointer transition-colors duration-150"
                          : "fill-gray-200 dark:fill-zinc-700 stroke-white dark:stroke-zinc-900 outline-none"
                      }
                      style={
                        hasFlag
                          ? {
                              hover: { fill: `url(#flag-${key})`, outline: "none" },
                              pressed: { fill: `url(#flag-${key})`, outline: "none" },
                            }
                          : undefined
                      }
                      onMouseEnter={
                        isHighlighted && key ? showTooltip(t(`list.${key}`)) : undefined
                      }
                      onMouseMove={isHighlighted ? moveTooltip : undefined}
                      onMouseLeave={isHighlighted ? hideTooltip : undefined}
                    />
                  );
                })
              }
            </Geographies>

            {CITY_MARKERS.map(({ key, coordinates }) => (
              <Marker
                key={key}
                coordinates={coordinates}
                onMouseEnter={showTooltip(t(`list.${key}`))}
                onMouseMove={moveTooltip}
                onMouseLeave={hideTooltip}
              >
                <circle
                  r={4}
                  strokeWidth={1.5}
                  className="fill-black dark:fill-white stroke-white dark:stroke-zinc-900 cursor-pointer"
                />
              </Marker>
            ))}
          </ComposableMap>

          {tooltip && (
            <div
              className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white shadow-lg dark:bg-white dark:text-black"
              style={{ left: tooltip.x, top: tooltip.y - 10 }}
            >
              {tooltip.label}
            </div>
          )}
        </div>

        <div className="mx-auto mt-4 flex max-w-5xl flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          {continents.map((continent) => (
            <div key={continent.key} className="text-center">
              <h2 className="text-lg md:text-xl font-bold text-black dark:text-white mb-3">
                {t(`continents.${continent.key}`)}
              </h2>
              <div className="flex flex-col space-y-1">
                {continent.countries.map((country) => (
                  <span
                    key={country}
                    className="text-gray-700 dark:text-gray-300 py-1 text-sm md:text-base"
                  >
                    {t(`list.${country}`)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
