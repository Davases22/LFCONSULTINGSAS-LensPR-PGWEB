"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Linkedin, Calendar, Mic } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function AboutUsSection() {
  const t = useTranslations("about");
  const locale = useLocale();

  if (!locale) return null;

  return (
    <section
      key={locale}
      className="bg-white dark:bg-zinc-900 py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-stretch">
          {/* Columna Izquierda: Foto grande */}
          <div className="md:col-span-5 flex flex-col">
            <div
              className="relative flex-1 w-full min-h-[500px] rounded-3xl overflow-hidden"
              style={{
                maskImage:
                  "radial-gradient(ellipse 95% 100% at 50% 50%, #000 35%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 95% 100% at 50% 50%, #000 35%, transparent 100%)",
              }}
            >
              <Image
                src="/images/laura.jpeg"
                alt="Laura M Forero"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-6">
              <h2 className="text-3xl font-bold text-black dark:text-white">
                Laura M Forero
              </h2>
              <div className="flex items-center gap-4 mt-3">
                <a
                  href="mailto:laura@lenspr.com"
                  className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition"
                  aria-label="Enviar email a Laura"
                >
                  <Mail className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/lauramarcelaforero/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition"
                  aria-label="Visitar perfil de LinkedIn de Laura"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Todo el texto organizado */}
          <div className="md:col-span-7 space-y-10">
            {/* Sobre Laura */}
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
                {t("title")}
              </h3>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("text1")}
              </p>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("text2")}
              </p>
            </div>

            {/* Más sobre LENS PR */}
            <div className="space-y-4 border-t border-gray-200 dark:border-zinc-700 pt-8">
              <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
                {t("lensPRInfo.title")}
              </h3>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("lensPRInfo.paragraph1")}
              </p>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("lensPRInfo.paragraph2")}
              </p>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("lensPRInfo.paragraph3")}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="https://calendly.com/laura-lenspr/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-transparent border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-6 py-4 rounded-full text-base font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                <Calendar className="w-5 h-5" />
                <span>{t("scheduleCta")}</span>
              </a>
              <Link
                href={`/${locale}/sections/contact?topic=speaker`}
                className="group inline-flex items-center justify-center gap-3 bg-transparent text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-6 py-4 rounded-full text-base font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                <Mic className="w-5 h-5" />
                <span>{t("speakerCta")}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
