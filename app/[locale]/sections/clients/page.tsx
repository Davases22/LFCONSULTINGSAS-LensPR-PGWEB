import { getTranslations } from "next-intl/server";
import ClientsList from "@/components/ClientsList";
import { clientsData } from "@/data/clientsData";

export default async function ClientsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await Promise.resolve(params).then((res) => res);
  const locale = resolvedParams?.locale;

  const t = await getTranslations("clients");

  return (
    <section className="bg-white dark:bg-zinc-900 py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-black dark:text-white">
          {t("title")}
        </h1>
        {clientsData.categories.length === 0 ? (
          <p className="text-center text-2xl text-gray-700 dark:text-gray-300">
            {t("noClients")}
          </p>
        ) : (
          <ClientsList categories={clientsData.categories} />
        )}
      </div>
    </section>
  );
}
