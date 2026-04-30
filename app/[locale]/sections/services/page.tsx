"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
// import { ChevronLeft, ChevronRight } from "lucide-react";

type GalleryItem = {
  src: string;
  title: string;
  description: string;
};

const serviceFilterKeys = [
  "freePress",
  "mediaAdvertising",
  "experienceDesign",
  "eventProduction",
  "mediaOutreach",
  "corporateMerch",
  "venueScouting",
  "influencerMarketing",
  "photoVideoCoverage",
  "podcastLivestream",
] as const;

export default function ServicesSection() {
  const t = useTranslations("services");
  const tFilters = useTranslations("services.filters");
  const tDetails = useTranslations("services.details");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] =
    useState<(typeof serviceFilterKeys)[number]>("freePress");

  // Array con las imágenes del carrusel
  const galleryItems: GalleryItem[] = [
    {
      src: "/images/diseñocontenidografico.png",
      title: t("galleryItems.designContentTitle"),
      description: t("galleryItems.designContentDescription"),
    },
    {
      src: "/images/free-press.png",
      title: t("galleryItems.freePressTitle"),
      description: t("galleryItems.freePressDescription"),
    },
    {
      src: "/images/eventostaylormade.png",
      title: t("galleryItems.eventsTitle"),
      description: t("galleryItems.eventsDescription"),
    },
  ];

  // Número de slides a mostrar en desktop (3)
  const slidesToShow = 3;
  const maxIndex = galleryItems.length - slidesToShow;

  // Funciones para navegar en el carrusel
  // const prevSlide = () => {
  //   setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  // };

  // const nextSlide = () => {
  //   setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  // };

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20 py-16">
      {/* Filtros de servicios */}
      <nav
        aria-label={t("filtersAriaLabel")}
        className="mb-10 -mx-6 md:-mx-12 lg:-mx-16 xl:-mx-20 px-6 md:px-12 lg:px-16 xl:px-20 overflow-x-auto"
      >
        <ul className="flex flex-nowrap md:flex-wrap items-center gap-x-2 gap-y-3">
          {serviceFilterKeys.map((key) => {
            const isActive = activeFilter === key;
            return (
              <li key={key} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveFilter(key)}
                  aria-pressed={isActive}
                  className={`whitespace-nowrap rounded-full border font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-black text-white border-black px-5 py-2.5 text-base shadow-md dark:bg-white dark:text-black dark:border-white"
                      : "bg-white text-black border-gray-300 px-4 py-2 text-sm hover:border-black dark:bg-zinc-900 dark:text-white dark:border-zinc-700 dark:hover:border-white"
                  }`}
                >
                  {tFilters(key)}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex flex-col md:flex-row items-start justify-between gap-8">
        {/* Bloque de texto */}
        <div className="w-full md:w-1/2">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300">
            {tDetails(`${activeFilter}.kicker`)}
          </h3>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mt-2">
            {tDetails(`${activeFilter}.title`)}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
            {tDetails(`${activeFilter}.description`)}
          </p>
          <a
            href="#"
            className="inline-block mt-6 text-sm font-semibold text-black dark:text-white hover:text-orange-400 transition-colors"
          >
            {tDetails(`${activeFilter}.ctaText`)}
          </a>
        </div>

        {/* Bloque del carrusel */}
        <div className="w-full md:w-1/2">
          {/* Contenedor del carrusel */}
          <div className="w-full overflow-hidden">
            {/* Contenedor de slides:
                - El ancho total es (nº items * 33.3333%) 
                - Se usa transform para desplazar según el currentIndex
            */}
            <div
              className="flex transition-transform duration-500"
              style={{
                width: `${galleryItems.length * 33.3333}%`,
                transform: `translateX(-${currentIndex * 33.3333}%)`,
              }}
            >
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className="w-[33.3333%] flex-shrink-0 flex justify-center p-2 box-border"
                >
                  <div className="relative group w-full max-w-[280px]">
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={280}
                      height={280}
                      className="rounded-lg shadow-lg object-cover w-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60 text-center p-4 opacity-0 group-hover:opacity-100 transition duration-300">
                      <h4 className="text-lg font-bold text-white uppercase">
                        {item.title}
                      </h4>
                      <p className="text-white text-sm mt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navegación del carrusel: Flechas */}
          {/* <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={prevSlide}
              className="bg-white dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded shadow hover:bg-orange-400 dark:hover:bg-orange-400 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded shadow hover:bg-orange-400 dark:hover:bg-orange-400 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
