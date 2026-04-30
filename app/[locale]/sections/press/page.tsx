import { getTranslations } from "next-intl/server";
import { getNewsByLocale } from "../../(helpers)/getNews";
import NewsFilterableList from "@/components/NewsFilterableList";

export default async function PressPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations("press");
  const news = await getNewsByLocale(locale);

  return (
    <section className="bg-white dark:bg-zinc-900 py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20">
        <h1 className="text-4xl font-bold mb-8 text-center text-black dark:text-white">
          {t("title")}
        </h1>
        {news.length === 0 ? (
          <p className="text-center text-2xl text-gray-700 dark:text-gray-300">
            {t("noNews")}
          </p>
        ) : (
          <NewsFilterableList news={news} seeMoreText={t("seeMore")} />
        )}
      </div>
    </section>
  );
}
