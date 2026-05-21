"use client";
import { useTranslations } from "next-intl";
import ClientListItem from "./ClientListItem";
import { ClientCategory } from "@/types/clients";

interface ClientsListProps {
  categories: ClientCategory[];
}

// Mapeo de IDs de categorías a claves de traducción
const categoryKeyMap: Record<string, string> = {
  "hrtech": "hrtech",
  "finance-wealth": "financeWealth",
  "venture-capital": "ventureCapital",
  "fintech": "fintech",
  "web3-crypto": "web3Crypto",
  "saas": "saas",
  "proptech-contech": "proptechContech",
  "real-estate": "realEstate",
  "gaming": "gaming",
  "mobility-tech": "mobilityTech",
  "agri-foodtech": "agriFoodtech",
  "healthtech-pettech": "healthtechPettech",
  "edtech": "edtech",
  "legaltech": "legaltech",
  "ai-automation": "aiAutomation",
  "business-intelligence": "businessIntelligence",
  "telecom-it": "telecomIt",
  "ux": "ux",
  "institutions": "institutions",
  "personal-brand": "personalBrand",
  "agencies": "agencies",
  "health-wellness": "healthWellness"
};

export default function ClientsList({ categories }: ClientsListProps) {
  const t = useTranslations("clientCategories");

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-8 space-y-8">
      {categories.map((category) => (
        <div key={category.id} className="break-inside-avoid mb-8">
          <h2 className="text-lg md:text-xl font-bold text-black dark:text-white mb-3">
            {t(categoryKeyMap[category.id] || category.id)}
          </h2>

          <div className="flex flex-col space-y-1">
            {category.clients.map((client) => (
              <ClientListItem key={client.id} client={client} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
