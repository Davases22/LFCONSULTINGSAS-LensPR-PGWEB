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
    countries: ["espana", "francia"],
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
};

const HIGHLIGHTED_NAMES = new Set(Object.values(COUNTRY_GEO_NAMES));
const GEO_NAME_TO_KEY = new Map(
  Object.entries(COUNTRY_GEO_NAMES).map(([key, name]) => [name, key])
);

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
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const name = geo.properties.name as string;
                  if (name === "Antarctica" || name === "Greenland") return null;
                  const key = GEO_NAME_TO_KEY.get(name);
                  const isHighlighted = HIGHLIGHTED_NAMES.has(name);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      strokeWidth={0.5}
                      className={
                        isHighlighted
                          ? "fill-black dark:fill-white stroke-white dark:stroke-zinc-900 outline-none cursor-pointer transition-colors duration-150 hover:fill-gray-700 dark:hover:fill-gray-300"
                          : "fill-gray-200 dark:fill-zinc-700 stroke-white dark:stroke-zinc-900 outline-none"
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
