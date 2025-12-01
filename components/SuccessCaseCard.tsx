"use client";
import { SuccessCase } from "@/types/successCases";
import { useState } from "react";

interface SuccessCaseCardProps {
  successCase: SuccessCase;
}

export default function SuccessCaseCard({ successCase }: SuccessCaseCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group cursor-pointer mb-6 relative">
      {/* Imagen con tamaño y orientación natural */}
      <div className="relative w-full overflow-hidden">
        {!imageError ? (
          <img
            src={successCase.imageUrl}
            alt={successCase.title}
            className="w-full h-auto object-contain transition-all duration-300 group-hover:brightness-75"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-700 dark:to-zinc-800">
            <svg
              className="w-16 h-16 text-gray-400 dark:text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Texto en hover - aparece en la parte inferior */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
          <p className="text-white text-sm text-center">
            {successCase.description}
          </p>
        </div>
      </div>
    </div>
  );
}
