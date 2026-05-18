"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Hero from "@/components/Hero";
import CredibilitySection from "@/components/CredibilitySection";
import Paragraph from "@/components/paragraph";
import TravelHospitalityCarousel from "@/components/TravelHospitalityCarousel";
import ClientSection from "@/components/ClientSection";

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <main>
      <Hero title={t("title")} subtitle={t("subtitle")} />
      <Paragraph />
      <CredibilitySection />
      <TravelHospitalityCarousel />
      <ClientSection />
    </main>
  );
}
