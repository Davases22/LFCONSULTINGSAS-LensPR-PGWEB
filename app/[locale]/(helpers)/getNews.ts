import { createClient } from "@supabase/supabase-js";

type NewsRow = {
  id: number;
  media_url: string | null;
  created_at: string;
  client_id?: string | null;
  order_number?: number | null;
  title_spanish?: string | null;
  description_spanish?: string | null;
  editorial_spanish?: string | null;
  title_english?: string | null;
  description_english?: string | null;
  editorial_english?: string | null;
  title_portuguese?: string | null;
  description_portuguese?: string | null;
  editorial_portuguese?: string | null;
  client_name?: string | null;
  country?: string | null;
  vertical?: string | null;
  relevance?: string | null;
  news_link?: string | null;
  is_story?: boolean | null;
  published_at?: string | null;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getNewsByLocale(locale: string) {
  let titleColumn: keyof NewsRow,
    descriptionColumn: keyof NewsRow,
    editorialColumn: keyof NewsRow;

  if (locale === "en") {
    titleColumn = "title_english";
    descriptionColumn = "description_english";
    editorialColumn = "editorial_spanish";
  } else if (locale === "pt") {
    titleColumn = "title_portuguese";
    descriptionColumn = "description_portuguese";
    editorialColumn = "editorial_spanish";
  } else {
    // Por defecto 'es'
    titleColumn = "title_spanish";
    descriptionColumn = "description_spanish";
    editorialColumn = "editorial_spanish";
  }

  // Más reciente primero (published_at), fallback a created_at para empates
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching news:", error);
    return [];
  }

  // Mapear los datos de manera segura
  return (data || []).map((item) => ({
    id: item.id,
    mediaUrl: item.media_url,
    createdAt: item.created_at,
    clientId: item.client_id,
    title: item[titleColumn] ?? "Título no disponible",
    description: item[descriptionColumn] ?? "",
    editorial: item[editorialColumn] ?? null,
    clientName: item.client_name ?? null,
    country: item.country ?? null,
    vertical: item.vertical ?? null,
    relevance: item.relevance ?? null,
    newsLink: item.news_link ?? null,
    isStory: item.is_story ?? false,
    publishedAt: item.published_at ?? null,
  }));
}

export async function getNewsByClientId(clientId: string, locale: string) {
  let titleColumn: keyof NewsRow,
    descriptionColumn: keyof NewsRow,
    editorialColumn: keyof NewsRow;

  if (locale === "en") {
    titleColumn = "title_english";
    descriptionColumn = "description_english";
    editorialColumn = "editorial_spanish";
  } else if (locale === "pt") {
    titleColumn = "title_portuguese";
    descriptionColumn = "description_portuguese";
    editorialColumn = "editorial_spanish";
  } else {
    // Por defecto 'es'
    titleColumn = "title_spanish";
    descriptionColumn = "description_spanish";
    editorialColumn = "editorial_spanish";
  }

  // Noticias del cliente, más recientes primero
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("client_id", clientId)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching client news:", error);
    return [];
  }

  // Mapear los datos de manera segura
  return (data || []).map((item) => ({
    id: item.id,
    mediaUrl: item.media_url,
    createdAt: item.created_at,
    clientId: item.client_id,
    title: item[titleColumn] ?? "Título no disponible",
    description: item[descriptionColumn] ?? "",
    editorial: item[editorialColumn] ?? null,
    clientName: item.client_name ?? null,
    country: item.country ?? null,
    vertical: item.vertical ?? null,
    relevance: item.relevance ?? null,
    newsLink: item.news_link ?? null,
    isStory: item.is_story ?? false,
    publishedAt: item.published_at ?? null,
  }));
}
