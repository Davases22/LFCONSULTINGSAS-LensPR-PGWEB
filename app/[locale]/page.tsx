"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Hero from "@/components/Hero";
import CredibilitySection from "@/components/CredibilitySection";
import Paragraph from "@/components/paragraph";
import TravelHospitalityCarousel from "@/components/TravelHospitalityCarousel";
import ClientSection from "@/components/ClientSection";
import EventsPhotoCarousel from "@/components/EventsPhotoCarousel";

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <main>
      <Hero title={t("title")} subtitle={t("subtitle")} />
      <EventsPhotoCarousel />
      <Paragraph />
      <CredibilitySection />
      <TravelHospitalityCarousel />
      <ClientSection />
    </main>
  );
}
