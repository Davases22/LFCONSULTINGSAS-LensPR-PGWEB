import { SuccessCase } from "@/types/successCases";
import { successCasesData } from "@/data/successCasesData";

/**
 * Obtiene los casos de éxito
 * TODO: Reemplazar con llamada a API cuando el backend esté listo
 * Ejemplo de migración futura:
 *
 * export async function getSuccessCases(locale: string): Promise<SuccessCase[]> {
 *   const response = await fetch(`${API_URL}/success-cases?lang=${locale}`);
 *   const data = await response.json();
 *   return data.cases;
 * }
 */
export async function getSuccessCases(locale: string): Promise<SuccessCase[]> {
  // Simulamos un delay de API para mejor experiencia
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Por ahora retornamos datos mockeados
  // Cuando tengas el backend, solo cambia esto por:
  // const response = await fetch(`/api/success-cases?lang=${locale}`);
  // return response.json();

  return successCasesData;
}

/**
 * Obtiene un caso de éxito por ID
 * TODO: Reemplazar con llamada a API
 */
export async function getSuccessCaseById(
  id: string,
  locale: string
): Promise<SuccessCase | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const successCase = successCasesData.find(c => c.id === id);
  return successCase || null;
}

/**
 * Obtiene casos de éxito filtrados por categoría
 * TODO: Implementar filtros en el backend
 */
export async function getSuccessCasesByCategory(
  category: string,
  locale: string
): Promise<SuccessCase[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return successCasesData.filter(c => c.category === category);
}
