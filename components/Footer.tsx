"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");

  return (
    <footer className="bg-gray-100 dark:bg-zinc-900 text-black dark:text-gray-300 py-16 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20">
        {/* Links y Redes Sociales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Columna 1: Información de la Marca */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">{t("brand")}</h3>
            <p className="text-base">{t("brandDescription")}</p>
          </div>
          {/* Columna 2: Enlaces Rápidos */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">{t("quickLinks")}</h3>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <Link
                href={`/${locale}/sections/aboutus`}
                className="hover:text-orange-400 text-base transition-colors"
              >
                {t("about")}
              </Link>
              <Link
                href={`/${locale}/sections/services`}
                className="hover:text-orange-400 text-base transition-colors"
              >
                {t("services")}
              </Link>
              <Link
                href={`/${locale}/sections/contact`}
                className="hover:text-orange-400 text-base transition-colors"
              >
                {t("contact")}
              </Link>
              <Link
                href={`/${locale}/sections/press`}
                className="hover:text-orange-400 text-base transition-colors"
              >
                {t("blog")}
              </Link>
            </div>
          </div>
          {/* Columna 3: Contacto */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">{t("contact")}</h3>

            <p className="text-base">{t("phone")}</p>
            <a href={`mailto:${t("email")}`} className="text-base">
              {t("email")}
            </a>
          </div>
          {/* Columna 4: Redes Sociales */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">{t("followUs")}</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/lenspr/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-base rounded-full border border-gray-400 dark:border-gray-600 hover:bg-orange-400 transition-colors"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.instagram.com/lensprlatam/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-base rounded-full border border-gray-400 dark:border-gray-600 hover:bg-orange-400 transition-colors"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Línea Divisoria Inferior */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} {t("brand")}. {t("bottom")}
            </div>
            <Link
              href="https://calendly.com/laura-lenspr/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-sm font-medium text-white bg-black rounded-full hover:bg-white hover:text-black hover:border hover:border-black transition-all duration-300"
            >
              {t("scheduleButton")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
