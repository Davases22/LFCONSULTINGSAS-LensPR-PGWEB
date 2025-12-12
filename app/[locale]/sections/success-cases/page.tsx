import SuccessCasesGrid from "@/components/SuccessCasesGrid";
import { getSuccessCases } from "../../(helpers)/getSuccessCases";

export default async function SuccessCasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await Promise.resolve(params).then((res) => res);
  const locale = resolvedParams?.locale;

  // Obtener casos de éxito (actualmente mock, preparado para API)
  const successCases = await getSuccessCases(locale);

  return (
    <section className="bg-white dark:bg-zinc-900 py-12 mt-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20">
        <SuccessCasesGrid cases={successCases} />
      </div>
    </section>
  );
}
