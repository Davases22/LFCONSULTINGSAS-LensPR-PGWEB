"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { MapPin, PhoneCall, Mail, CheckCircle, XCircle, Calendar } from "lucide-react";

export default function ContactSection() {
  const t = useTranslations("contact");
  const searchParams = useSearchParams();
  const submissionType = searchParams?.get("topic") === "speaker" ? "speaker" : "contact";
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // URL del Google Apps Script desde las variables de entorno
  const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL!, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        setMessage({ type: 'success', text: t('successMessage') });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.message || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: t('errorMessage') });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-zinc-900 text-black dark:text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado centrado */}
        <h2 className="text-4xl font-bold mb-4 text-center">{t("title")}</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6 max-w-2xl mx-auto leading-relaxed">
          {t("subtitle")}
        </p>

        {/* CTA Calendly: alternativa rápida al formulario */}
        <div className="flex justify-center mb-10">
          <a
            href="https://calendly.com/laura-lenspr/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-orange-300 dark:bg-orange-400 text-zinc-900 hover:bg-zinc-900 hover:text-white px-8 py-4 rounded-full text-base font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1"
          >
            <Calendar className="w-5 h-5" />
            <span>{t("scheduleCallButton")}</span>
          </a>
        </div>

        {/* Contenedor de columnas */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          {/* Columna 1: Formulario en una "tarjeta" */}
          <div className="md:w-1/2 bg-gray-50 dark:bg-zinc-800 py-4 px-4 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">{t("formTitle")}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-base leading-relaxed">
              {t("formDescription")}
            </p>

            {/* Mensaje de éxito/error */}
            {message && (
              <div className={`mb-4 p-3 rounded flex items-center gap-2 ${
                message.type === 'success' 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tipo de envío (contact | speaker) — leído del query param ?topic= */}
              <input type="hidden" name="type" value={submissionType} />
              {/* Nombre */}
              <div>
                <label htmlFor="name" className="block mb-1 font-medium text-base">
                  {t("nameLabel")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border border-gray-300 dark:border-zinc-700 rounded py-2 px-4 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-400 text-base"
                  placeholder={t("namePlaceholder")}
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-1 font-medium text-base">
                  {t("emailLabel")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full py-2 px-4 border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-400 text-base"
                  placeholder={t("emailPlaceholder")}
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Mensaje */}
              <div>
                <label htmlFor="message" className="block mb-1 font-medium text-base">
                  {t("messageLabel")}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  name="message"
                  className="w-full border py-2 px-4 border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-400 text-base"
                  placeholder={t("messagePlaceholder")}
                  required
                  disabled={isLoading}
                ></textarea>
              </div>

              {/* Botón de envío */}
              <button
                type="submit"
                disabled={isLoading}
                className={`text-base font-semibold py-2 px-6 rounded transition-colors ${
                  isLoading 
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                    : 'bg-black dark:bg-white dark:text-black text-white hover:bg-orange-400 hover:text-black'
                }`}
              >
                {isLoading ? t("sendingButton") : t("sendButton")}
              </button>
            </form>
          </div>

          {/* Columna 2: Info de contacto y mapa en otra tarjeta */}
          <div className="md:w-1/2 bg-gray-50 dark:bg-zinc-800 px-4 py-4 rounded-lg shadow-lg text-base">
            <h3 className="text-2xl font-semibold mb-2">
              {t("contactInfoTitle")}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {t("contactInfoSubtitle")}
            </p>

            {/* Información de contacto con íconos */}
            <div className="space-y-4 text-gray-700 dark:text-gray-300 mb-8 text-lg">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-orange-400" />
                <p>
                  <strong>{t("addressLabel")}:</strong> {t("addressValue")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <PhoneCall className="w-6 h-6 text-orange-400" />
                <p>
                  <strong>{t("phoneLabel")}:</strong> {t("phoneValue")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-orange-400" />
                <p>
                  <strong>{t("emailLabel")}:</strong> {t("emailValue")}
                </p>
              </div>
            </div>

            {/* Mapa opcional */}
            <div className="aspect-video bg-gray-300 dark:bg-zinc-700 rounded overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.1021764939196!2d-74.0453245256206!3d4.752275195222938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f859b3913add1%3A0x65bafc38a70a9e02!2zQ3JhLiAyMGEgIzE3Mi0zMCwgVXNhcXXDqW4sIEJvZ290w6E!5e0!3m2!1ses!2sco!4v1743056619032!5m2!1ses!2sco"
                className="w-full h-full border-none"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
