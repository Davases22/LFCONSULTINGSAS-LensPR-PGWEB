"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const images = [...Array(15)].map((_, i) => `/images/eventos/evento${i + 1}.png`);

export default function EventsPhotoCarousel() {
    return (
        <motion.div className="relative w-full overflow-hidden bg-white dark:bg-black">
            <motion.div
                className="flex"
                animate={{ x: ["0%", "-100%"] }}
                transition={{
                    repeat: Infinity,
                    duration: 30,
                    ease: "linear",
                }}
            >
                {[...images, ...images].map((src, index) => (
                    <motion.div
                        key={index}
                        className="flex-shrink-0 transition-transform duration-1000"
                    >
                        <div className="w-44 h-24 lg:w-auto lg:h-64 flex items-center justify-center">
                            <Image
                                src={src}
                                alt={`Client ${index}`}
                                width={260}
                                height={260}
                                className="object-fill"
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
