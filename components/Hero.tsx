"use client";

import React from "react";

interface HeroProps {
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center px-4 sm:px-8 pt-24 pb-12 md:pt-28 md:pb-20 min-h-[40vh] bg-white dark:bg-zinc-900 transition-colors duration-300">
      <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold mb-4 md:mb-6 text-black dark:text-white">
        {title}
      </h1>
      <p className="text-lg md:text-2xl text-black/70 dark:text-white/70">
        {subtitle}
      </p>
    </section>
  );
};

export default Hero;
