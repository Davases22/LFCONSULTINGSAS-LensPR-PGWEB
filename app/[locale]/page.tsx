"use client";
import React from "react";
import CredibilitySection from "@/components/CredibilitySection";
import Paragraph from "@/components/paragraph";
import TravelHospitalityCarousel from "@/components/TravelHospitalityCarousel";
import ClientSection from "@/components/ClientSection";

export default function HomePage() {
  return (
    <main>
      <Paragraph />
      <CredibilitySection />
      <TravelHospitalityCarousel />
      <ClientSection />
    </main>
  );
}
