"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { getNewsByClientId } from "@/app/[locale]/(helpers)/getNews";
import { useLocale } from "next-intl";

export default function ClientCard({ item, text }: { item: any; text: string }) {
  const [open, setOpen] = useState(false);
  const [clientNews, setClientNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const locale = useLocale();
  
  const truncatedDescription =
    item.description.length > 150
      ? `${item.description.substring(0, 150)}...`
      : item.description;

  // Cargar noticias cuando se abre el modal
  useEffect(() => {
    if (open && item.id) {
      setLoading(true);
      getNewsByClientId(item.id, locale)
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
  }, [open, item.id, locale]);

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-4 flex flex-col hover:shadow-xl transform hover:scale-[1.02] transition duration-300">
      {item.media_url && (
        <div className="w-full h-48 overflow-hidden dark:bg-zinc-700 flex items-center justify-center rounded-lg">
          <img
            src={item.media_url}
            alt={item.name ?? "Client image"}
            width={300}
            height={300}
            className="w-full h-full object-fill rounded-lg"
          />
        </div>
      )}
      <div className="mt-4 flex flex-col flex-1">
        <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
          {item.name}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 flex-1">
          {truncatedDescription}
        </p>
        {item.description.length > 150 && (
          <Button variant="link" onClick={() => setOpen(true)}>
            {text}
          </Button>
        )}
        {item.jobTitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400 italic">
            {item.jobTitle} , {item.country}
          </p>
        )}
      </div>

      {/* Modal para mostrar la descripción completa */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-4">{item.name}</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col gap-8">
            {/* Información del cliente con layout condicional */}
            <div className={`flex flex-col gap-8 ${clientNews.length > 0 ? 'lg:flex-row' : ''}`}>
              {item.media_url && (
                <div className={`flex-shrink-0 ${clientNews.length > 0 ? 'lg:w-1/3' : 'w-full flex justify-center'}`}>
                  <div className={`${clientNews.length > 0 ? 'w-full h-80' : 'w-auto h-80'} flex justify-center items-center rounded-lg`}>
                    <img
                      src={item.media_url}
                      alt={item.name ?? "Client image"}
                      width={400}
                      height={400}
                      className="rounded-lg object-contain max-w-full max-h-full"
                    />
                  </div>
                </div>
              )}
              <div className={`flex-1 flex flex-col ${clientNews.length > 0 ? 'justify-center' : 'justify-start'}`}>
                <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  {item.description}
                </p>
                {item.jobTitle && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-4">
                    {item.jobTitle}, {item.country}
                  </p>
                )}
              </div>
            </div>

            {/* Sección de noticias relacionadas */}
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
                      className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-zinc-700 hover:shadow-md hover:border-black dark:hover:border-white transition-all duration-200 cursor-pointer transform hover:scale-[1.02]"
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
                      <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200 line-clamp-2 hover:text-black dark:hover:text-white transition-colors">
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
    </div>
  );
}
