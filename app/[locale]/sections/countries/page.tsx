"use client";

import React, { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import WorldMap from "@/components/WorldMap";

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

export default function CountriesPage() {
  const t = useTranslations("countriesPage");
  const [active, setActive] = useState<string | null>(null);

  const order = useMemo(
    () => continents.flatMap((c) => c.countries),
    []
  );

  const labels = useMemo(
    () => Object.fromEntries(order.map((key) => [key, t(`list.${key}`)])),
    [order, t]
  );

  return (
    <section className="bg-white dark:bg-zinc-900 pt-4 pb-12 md:pt-6 md:pb-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20">
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
            {t("title")}
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm md:text-base">
            {t("subtitle", { count: order.length })}
          </p>
        </header>

        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Mapamundi */}
          <div className="lg:col-span-7">
            <WorldMap
              order={order}
              labels={labels}
              active={active}
              onActiveChange={setActive}
            />
            <p className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500 lg:text-left">
              {t("hint")}
            </p>
          </div>

          {/* Listado por continente */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              {continents.map((continent) => (
                <div key={continent.key} className="min-w-0">
                  <h2 className="mb-3 flex items-baseline gap-2 text-sm font-bold uppercase tracking-wide text-black dark:text-white">
                    {t(`continents.${continent.key}`)}
                    <span className="text-xs font-normal text-gray-400">
                      {continent.countries.length}
                    </span>
                  </h2>
                  <ul className="space-y-0.5">
                    {continent.countries.map((country) => {
                      const isActive = active === country;
                      return (
                        <li key={country}>
                          <button
                            type="button"
                            onMouseEnter={() => setActive(country)}
                            onMouseLeave={() => setActive(null)}
                            onFocus={() => setActive(country)}
                            onBlur={() => setActive(null)}
                            onClick={() =>
                              setActive(isActive ? null : country)
                            }
                            aria-pressed={isActive}
                            className={`-mx-2 flex w-[calc(100%+1rem)] items-center gap-2 rounded-md px-2 py-1 text-left text-sm transition-colors ${
                              isActive
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                isActive
                                  ? "bg-white dark:bg-black"
                                  : "bg-gray-400"
                              }`}
                            />
                            {t(`list.${country}`)}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
