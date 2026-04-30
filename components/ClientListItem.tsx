"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { getNewsByClientId } from "@/app/[locale]/(helpers)/getNews";
import { useLocale } from "next-intl";
import { Client } from "@/types/clients";

interface ClientListItemProps {
  client: Client;
}

export default function ClientListItem({ client }: ClientListItemProps) {
  const [open, setOpen] = useState(false);
  const [clientNews, setClientNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    if (open && client.id) {
      setLoading(true);
      getNewsByClientId(client.id, locale)
        .then((news) => {
          setClientNews(news);
        })
        .catch((error) => {
          console.error("Error loading client news:", error);
          setClientNews([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open, client.id, locale]);

  if (client.website) {
    return (
      <a
        href={client.website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-left text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 py-1 text-sm md:text-base"
      >
        {client.name}
      </a>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-left text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 py-1 text-sm md:text-base"
      >
        {client.name}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-4">
              {client.name}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-8">
            <div className={`flex flex-col gap-8 ${clientNews.length > 0 ? 'lg:flex-row' : ''}`}>
              {client.media_url && (
                <div className={`flex-shrink-0 ${clientNews.length > 0 ? 'lg:w-1/3' : 'w-full flex justify-center'}`}>
                  <div className={`${clientNews.length > 0 ? 'w-full h-80' : 'w-auto h-80'} flex justify-center items-center rounded-lg`}>
                    <img
                      src={client.media_url}
                      alt={client.name ?? "Client image"}
                      className="rounded-lg object-contain max-w-full max-h-full"
                    />
                  </div>
                </div>
              )}

              <div className={`flex-1 flex flex-col ${clientNews.length > 0 ? 'justify-center' : 'justify-start'}`}>
                {client.description && (
                  <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                    {client.description}
                  </p>
                )}

                {client.website && (
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 mt-4 inline-block"
                  >
                    Visitar sitio web →
                  </a>
                )}

                {(client.jobTitle || client.country) && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-4">
                    {client.jobTitle && client.country
                      ? `${client.jobTitle}, ${client.country}`
                      : client.jobTitle || client.country
                    }
                  </p>
                )}
              </div>
            </div>

            {loading && (
              <div className="text-center py-4">
                <p className="text-gray-500">Cargando noticias relacionadas...</p>
              </div>
            )}

            {!loading && clientNews.length > 0 && (
              <div className="border-t pt-8">
                <h3 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">
                  Noticias Relacionadas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {clientNews.map((news) => (
                    <a
                      key={news.id}
                      href={`/${locale}/sections/press`}
                      className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-zinc-700 hover:shadow-md hover:border-orange-300 dark:hover:border-orange-500 transition-all duration-200 cursor-pointer transform hover:scale-[1.02]"
                    >
                      {news.mediaUrl && (
                        <div className="w-full h-48 mb-4 overflow-hidden rounded-lg bg-white">
                          <img
                            src={news.mediaUrl}
                            alt={news.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200 line-clamp-2 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                        {news.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
                        {news.description}
                      </p>
                      {news.editorial && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 italic border-t pt-2">
                          {news.editorial}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        {new Date(news.createdAt).toLocaleDateString()}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
