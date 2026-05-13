"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export default function NewsCard({ item, text }: { item: any; text: string }) {
  const [open, setOpen] = useState(false);
  const description = item.description || "";
  const truncatedDescription =
    description.length > 150
      ? `${description.substring(0, 150)}...`
      : description;

  const hasMeta = item.clientName || item.country || item.vertical;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-4 flex flex-col hover:shadow-lg transform hover:scale-[1.01] transition duration-200">
      {item.mediaUrl ? (
        <div className="w-full h-48 overflow-hidden bg-gray-100 dark:bg-zinc-700 flex items-center justify-center">
          <img
            src={item.mediaUrl}
            alt={item.title ?? ""}
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        <div className="w-full h-48 overflow-hidden bg-gray-100 dark:bg-zinc-700 border border-black dark:border-white flex items-center justify-center px-4">
          <span className="text-xl md:text-2xl font-semibold text-black dark:text-white text-center">
            {item.editorial || ""}
          </span>
        </div>
      )}
      <div className="mt-4 flex flex-col flex-1">
        {hasMeta && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.clientName && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black">
                {item.clientName}
              </span>
            )}
            {item.country && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-transparent text-black border border-black dark:text-white dark:border-white">
                {item.country}
              </span>
            )}
            {item.vertical && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 dark:bg-zinc-700 dark:text-gray-200 dark:border-zinc-600">
                {item.vertical}
              </span>
            )}
          </div>
        )}
        <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
          {item.title}
        </h2>
        {description && (
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 flex-1">
            {truncatedDescription}
          </p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
          {item.editorial}
        </p>
        <Button variant="link" onClick={() => setOpen(true)}>
          {text}
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-full">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-center mb-6">
              {item.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col gap-6">
            {/* Imagen dentro del modal con mejor tamaño */}
            {item.mediaUrl && (
              <div className="w-full flex justify-center">
                <div className="w-full max-w-3xl h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg bg-gray-50 dark:bg-zinc-800">
                  <img 
                    src={item.mediaUrl} 
                    alt={item.title ?? ""} 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
            
            {/* Contenido del artículo */}
            <div className="space-y-4">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                  {item.description}
                </p>
              </div>
              
              {/* Editorial */}
              {item.editorial && (
                <div className="border-t pt-4">
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 italic font-medium">
                    Editorial: {item.editorial}
                  </p>
                </div>
              )}
              
              {/* Fecha */}
              {item.createdAt && (
                <div className="border-t pt-4">
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-500">
                    Publicado: {new Date(item.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
              
              {/* Link externo si existe */}
              {item.newsLink && (
                <div className="border-t pt-4">
                  <a
                    href={item.newsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm md:text-base transition-colors"
                  >
                    📰 Leer artículo completo
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
