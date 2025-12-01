import SuccessCaseCard from "./SuccessCaseCard";
import { SuccessCase } from "@/types/successCases";

interface SuccessCasesGridProps {
  cases: SuccessCase[];
}

export default function SuccessCasesGrid({ cases }: SuccessCasesGridProps) {
  if (cases.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500 dark:text-gray-400">
          No hay casos de éxito disponibles en este momento.
        </p>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
      {cases.map((successCase) => (
        <div key={successCase.id} className="break-inside-avoid">
          <SuccessCaseCard successCase={successCase} />
        </div>
      ))}
    </div>
  );
}
