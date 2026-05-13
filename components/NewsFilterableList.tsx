"use client";

import React, { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import NewsCard from "./NewsCard";

type NewsItem = {
  id: number | string;
  title: string;
  description: string;
  editorial: string | null;
  mediaUrl: string | null;
  newsLink: string | null;
  clientName: string | null;
  country: string | null;
  vertical: string | null;
  isStory?: boolean;
  publishedAt?: string | null;
  createdAt?: string | null;
};

interface Props {
  news: NewsItem[];
  seeMoreText: string;
}

function uniq(values: (string | null | undefined)[]): string[] {
  return Array.from(new Set(values.filter((v): v is string => Boolean(v)))).sort(
    (a, b) => a.localeCompare(b, "es", { sensitivity: "base" })
  );
}

export default function NewsFilterableList({ news, seeMoreText }: Props) {
  const t = useTranslations("press.filters");
  const tPress = useTranslations("press");

  const [client, setClient] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [vertical, setVertical] = useState<string>("");

  const clients = useMemo(() => uniq(news.map((n) => n.clientName)), [news]);
  const countries = useMemo(() => uniq(news.map((n) => n.country)), [news]);
  const verticals = useMemo(() => uniq(news.map((n) => n.vertical)), [news]);

  const filtered = useMemo(
    () =>
      news.filter(
        (n) =>
          (!client || n.clientName === client) &&
          (!country || n.country === country) &&
          (!vertical || n.vertical === vertical)
      ),
    [news, client, country, vertical]
  );

  const hasActiveFilter = client || country || vertical;

  const selectClass =
    "w-full sm:w-auto min-w-[180px] bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-full px-5 py-3 text-base text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white cursor-pointer hover:border-black dark:hover:border-white transition-colors";

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center gap-4">
        <select
          aria-label={t("client")}
          value={client}
          onChange={(e) => setClient(e.target.value)}
          className={selectClass}
        >
          <option value="">{t("allClients")}</option>
          {clients.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          aria-label={t("country")}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className={selectClass}
        >
          <option value="">{t("allCountries")}</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          aria-label={t("vertical")}
          value={vertical}
          onChange={(e) => setVertical(e.target.value)}
          className={selectClass}
        >
          <option value="">{t("allVerticals")}</option>
          {verticals.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>

        {hasActiveFilter && (
          <button
            type="button"
            onClick={() => {
              setClient("");
              setCountry("");
              setVertical("");
            }}
            className="text-base font-medium text-black dark:text-white hover:underline underline-offset-4"
          >
            {t("clear")}
          </button>
        )}

        <span className="ml-auto text-base text-gray-500 dark:text-gray-400">
          {t("count", { count: filtered.length })}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-2xl text-gray-700 dark:text-gray-300 py-12">
          {tPress("noNews")}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((item) => (
            <NewsCard key={item.id} item={item} text={seeMoreText} />
          ))}
        </div>
      )}
    </div>
  );
}
