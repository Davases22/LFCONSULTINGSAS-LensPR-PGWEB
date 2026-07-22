"use client";

import React from "react";
import { useTranslations } from "next-intl";

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

  return (
    <section className="bg-white dark:bg-zinc-900 pt-4 pb-12 md:pt-6 md:pb-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-black dark:text-white">
          {t("title")}
        </h1>

        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
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
