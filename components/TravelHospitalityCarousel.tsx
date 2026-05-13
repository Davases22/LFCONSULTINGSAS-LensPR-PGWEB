"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function LoudSection() {
  const t = useTranslations("loudSection");

  return (
    <section className="flex flex-col items-center text-center px-6 md:px-16 lg:px-6 py-16 space-y-12 pb-8 md:pb-12 lg:pb-16">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-penting">
        {t("title")}
      </h1>
      <p className="text-lg text-gray-600">{t("subtitle")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 xl:gap-24 w-full px-4 md:px-8 lg:px-12 xl:px-20">
        <div className="bg-black rounded-xl text-white p-6 md:p-6 lg:p-8 flex flex-col items-start text-left aspect-[2/1.4] max-w-sm md:max-w-md lg:max-w-lg mx-auto w-full">
          <div className="h-full flex flex-col space-y-3 md:space-y-4 lg:space-y-5">
            <div className="pt-2">
              <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-4xl leading-tight">
                {t("pressPublications.title")}
              </h3>
            </div>
            <div className="flex-1 flex items-center pb-3">
              <p className="text-gray-300 text-sm md:text-sm lg:text-base leading-relaxed">
                {t("pressPublications.description")}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-transparent border border-black dark:border-white rounded-xl flex flex-col items-start text-left relative overflow-hidden aspect-[2/1.4] max-w-sm md:max-w-md lg:max-w-lg mx-auto w-full">
          <div className="relative z-10 p-6 md:p-6 lg:p-8 h-full flex flex-col space-y-3 md:space-y-4 lg:space-y-5">
            <div className="pt-2">
              <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-4xl leading-tight text-black dark:text-white">
                {t("corporateEvents.title")}
              </h3>
            </div>
            <div className="flex-1 flex items-center pb-3">
              <p className="text-gray-800 dark:text-gray-300 text-sm md:text-sm lg:text-base leading-relaxed">
                {t("corporateEvents.description")}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-xl p-6 md:p-6 lg:p-8 flex flex-col items-start text-left aspect-[2/1.4] max-w-sm md:max-w-md lg:max-w-lg mx-auto w-full md:col-span-2 lg:col-span-1">
          <div className="h-full flex flex-col space-y-3 md:space-y-4 lg:space-y-5">
            <div className="pt-2">
              <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-4xl leading-tight text-gray-900">
                {t("tailorMadeProjects.title")}
              </h3>
            </div>
            <div className="flex-1 flex items-center pb-3">
              <p className="text-gray-600 text-sm md:text-sm lg:text-base leading-relaxed">
                {t("tailorMadeProjects.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
