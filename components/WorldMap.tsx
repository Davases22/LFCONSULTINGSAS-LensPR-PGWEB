"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import worldMap from "@/data/worldMap.json";

type Marker = { key: string; x: number; y: number };

type Props = {
  /** Claves de lugares agrupadas por continente, en el mismo orden que la lista */
  order: string[];
  /** Etiqueta legible por clave (viene de las traducciones) */
  labels: Record<string, string>;
  active: string | null;
  onActiveChange: (key: string | null) => void;
};

const { width, height, paths, markers } = worldMap as {
  width: number;
  height: number;
  paths: string[];
  markers: Marker[];
};

export default function WorldMap({ order, labels, active, onActiveChange }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const current = hovered ?? active;

  // Solo dibujamos los marcadores presentes en la lista, en su mismo orden
  const points = useMemo(() => {
    const byKey = new Map(markers.map((m) => [m.key, m]));
    return order.map((key) => byKey.get(key)).filter(Boolean) as Marker[];
  }, [order]);

  const tooltip = current ? points.find((p) => p.key === current) : undefined;

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        aria-hidden="true"
      >
        {/* Continentes: capa base neutra */}
        <g className="fill-gray-100 stroke-gray-300/80 dark:fill-zinc-800 dark:stroke-zinc-700">
          {paths.map((d, i) => (
            <path key={i} d={d} strokeWidth={0.8} vectorEffect="non-scaling-stroke" />
          ))}
        </g>

        {/* Presencia LensPR — la entrada se dispara en el grupo, no por marcador:
            así ningún punto cercano al borde se queda sin animar (y sin dibujar). */}
        <motion.g
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { delayChildren: 0.2, staggerChildren: 0.035 } },
          }}
        >
          {points.map((p) => {
          const isCurrent = current === p.key;
          const dimmed = current !== null && !isCurrent;

          return (
            <motion.g
              key={p.key}
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 20 },
                },
              }}
              style={{ transformOrigin: `${p.x}px ${p.y}px`, cursor: "pointer" }}
              onMouseEnter={() => setHovered(p.key)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onActiveChange(active === p.key ? null : p.key)}
            >
              {/* halo pulsante del punto activo */}
              {isCurrent && (
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={12}
                  className="fill-black/20 dark:fill-white/30"
                  animate={{ r: [12, 34], opacity: [0.55, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              {/* área de click generosa */}
              <circle cx={p.x} cy={p.y} r={22} fill="transparent" />
              <circle
                cx={p.x}
                cy={p.y}
                r={isCurrent ? 13 : 9}
                strokeWidth={2.5}
                className={`stroke-white transition-all duration-200 dark:stroke-zinc-900 ${
                  dimmed
                    ? "fill-black/30 dark:fill-white/30"
                    : "fill-black dark:fill-white"
                }`}
              />
            </motion.g>
          );
          })}
        </motion.g>
      </svg>

      {/* Etiqueta en HTML para que respete la tipografía del sitio */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(tooltip.x / width) * 100}%`,
            top: `${(tooltip.y / height) * 100}%`,
            marginTop: -14,
          }}
        >
          <span className="whitespace-nowrap rounded-full bg-black px-3 py-1 text-xs font-medium text-white shadow-lg dark:bg-white dark:text-black">
            {labels[tooltip.key] ?? tooltip.key}
          </span>
        </div>
      )}
    </div>
  );
}
