"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

const Counter = ({ value }: { value: string }) => {
  const [count, setCount] = useState(0);
  const hasPrefix = value.startsWith("+");

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/\D/g, ""));
    if (isNaN(end)) return;

    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {hasPrefix ? "+" : ""}
      {count}
    </span>
  );
};

const CredibilityStats = () => {
  const t = useTranslations("credibilityStats");
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "es";

  const stats = [
    {
      number: "+75",
      label: t("brands"),
      description: t("brandsDescription"),
      cta: t("brandsCta"),
      href: `/${locale}/sections/clients`,
    },
    {
      number: "12",
      label: t("countries"),
      description: t("countriesDescription"),
      cta: t("countriesCta"),
      href: `/${locale}/sections/countries`,
    },
    {
      number: "500",
      label: t("events"),
      description: t("eventsDescription"),
      cta: t("eventsCta"),
      href: `/${locale}/sections/events`,
    },
    {
      number: "+1500",
      label: t("publications"),
      description: t("publicationsDescription"),
      cta: t("publicationsCta"),
      href: `/${locale}/sections/press`,
    },
  ];

  return (
    <section className="bg-white text-black text-center px-4 md:px-6">
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:py-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col dark:bg-zinc-900 text-left py-4 h-full">
                <span className="text-7xl font-semibold">
                  <Counter value={stat.number} />
                </span>
                <hr className="bg-gray-500 w-full" />
                <h3 className="text-xl font-semibold mt-4">{stat.label}</h3>
                <p className="text-gray-500 text-sm mr-6">{stat.description}</p>
                <Link
                  href={stat.href}
                  className="group mt-auto pt-3 inline-flex items-center gap-1 text-sm font-medium text-black hover:text-orange-500 dark:text-white dark:hover:text-orange-300 transition-colors duration-200 self-start"
                >
                  <span className="underline-offset-4 group-hover:underline">
                    {stat.cta}
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredibilityStats;
