import { getBlogBySlug, getBlogs } from "../../../(helpers)/getBlogs";
import { BlogSidebarSuggestions } from "@/components/blog/BlogSidebarSuggestions";
import { SocialLinks } from "@/components/blog/SocialLinks";
import { Locale } from "@/lib/types/blog";
import { notFound } from "next/navigation";
import React from "react";
import { BlogContent } from "@/components/blog/BlogContent";

interface BlogDetailPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { locale, slug } = await params;

  try {
    const post = await getBlogBySlug(slug, locale);
    if (!post) notFound();

    const all = await getBlogs(locale);

    // Calcular tiempo de lectura estimado
    const wordsPerMinute = 200;
    const textContent = post.content?.replace(/<[^>]*>/g, "") || "";
    const wordCount = textContent.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    // Formatear fecha de publicación
    const publishedDate = post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString(locale, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;

    // Verificar si hay posts relacionados para mostrar el sidebar
    const relatedPosts = all.filter((p) => p.slug !== post.slug);
    const hasRelatedPosts = relatedPosts.length > 0;
    const hasSidebarContent = hasRelatedPosts || (post.tags && post.tags.length > 0);

    return (
      <main className="min-h-screen bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          <div className={`grid gap-8 lg:gap-12 ${hasSidebarContent ? 'lg:grid-cols-12' : ''}`}>
            <article className={hasSidebarContent ? 'lg:col-span-8' : 'max-w-4xl mx-auto w-full'}>
              {/* Header del artículo */}
              <header className="mb-8 lg:mb-12">
                {/* Título y metadatos principales */}
                <div className="mb-6 space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight tracking-tight">
                    {post.title}
                  </h1>

                  {/* Metadata del post */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    {publishedDate && post.publishedAt && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <time dateTime={post.publishedAt}>{publishedDate}</time>
                      </div>
                    )}
                    {readingTime > 0 && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{readingTime} min de lectura</span>
                      </div>
                    )}
                  </div>

                  {/* Categoría y tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.category && (
                      <span className="px-3 py-1.5 bg-transparent border border-black dark:border-white text-black dark:text-white text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    )}
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-transparent border border-black dark:border-white text-black dark:text-white text-xs rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Imagen de portada mejorada */}
                {post.coverImage && (
                  <div className="relative mb-6 group overflow-hidden rounded-2xl shadow-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-[280px] sm:h-[360px] lg:h-[440px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                )}

                {/* Excerpt si existe */}
                {post.excerpt && (
                  <div className="mb-6 p-6 bg-transparent border-l-4 border-black dark:border-white rounded-r-xl">
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
                      {post.excerpt}
                    </p>
                  </div>
                )}

                {/* Redes sociales */}
                {post.socialLinks && post.socialLinks.length > 0 && (
                  <div className="pt-6 border-t border-gray-200 dark:border-zinc-700">
                    <SocialLinks socialLinks={post.socialLinks} />
                  </div>
                )}
              </header>

              {/* Contenido del artículo con estilos mejorados */}
              <div className="bg-white dark:bg-zinc-900/50 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 backdrop-blur-sm border border-gray-200 dark:border-zinc-800">
                {post.content && (
                  <BlogContent
                    content={post.content}
                    className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none
                    prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                    prose-headings:font-bold prose-headings:tracking-tight
                    prose-h1:text-3xl prose-h1:sm:text-4xl prose-h1:lg:text-5xl prose-h1:mb-8 prose-h1:mt-2
                    prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:lg:text-4xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-zinc-700
                    prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:lg:text-3xl prose-h3:mt-10 prose-h3:mb-5
                    prose-h4:text-lg prose-h4:sm:text-xl prose-h4:lg:text-2xl prose-h4:mt-8 prose-h4:mb-4
                    prose-p:text-base prose-p:sm:text-lg prose-p:lg:text-xl prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                    prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-bold
                    prose-em:text-gray-800 dark:prose-em:text-gray-200
                    prose-a:text-black dark:prose-a:text-white prose-a:font-medium prose-a:underline
                    prose-a:decoration-black dark:prose-a:decoration-white prose-a:underline-offset-2
                    hover:prose-a:decoration-2 prose-a:transition-all
                    prose-blockquote:border-l-4 prose-blockquote:border-black dark:prose-blockquote:border-white prose-blockquote:bg-transparent
                    prose-blockquote:p-6 prose-blockquote:rounded-r-xl
                    prose-blockquote:my-8 prose-blockquote:not-italic prose-blockquote:text-gray-800
                    dark:prose-blockquote:text-gray-200 prose-blockquote:text-lg
                    prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1
                    prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-black dark:prose-code:text-white
                    prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-gray-900 dark:prose-pre:bg-black prose-pre:border prose-pre:border-gray-300
                    dark:prose-pre:border-gray-700 prose-pre:rounded-xl prose-pre:shadow-2xl prose-pre:my-8
                    prose-ul:my-6 prose-ul:text-base prose-ul:sm:text-lg prose-ul:lg:text-xl
                    prose-ol:my-6 prose-ol:text-base prose-ol:sm:text-lg prose-ol:lg:text-xl
                    prose-li:my-2 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:leading-relaxed
                    prose-ul:list-disc prose-ol:list-decimal
                    [&_ul]:pl-6 [&_ol]:pl-6
                    [&_img]:rounded-2xl [&_img]:shadow-2xl [&_img]:my-10 [&_img]:mx-auto
                    [&_img]:max-w-full [&_img]:h-auto [&_img]:border [&_img]:border-gray-200 dark:[&_img]:border-zinc-700
                    [&_img]:transition-transform [&_img]:duration-300 [&_img:hover]:scale-[1.01]
                    [&_table]:my-8 [&_table]:border-collapse [&_table]:rounded-xl [&_table]:overflow-hidden [&_table]:shadow-xl [&_table]:w-full
                    [&_th]:bg-black [&_th]:text-white [&_th]:font-bold [&_th]:p-4 [&_th]:text-left
                    [&_td]:p-4 [&_td]:border-b [&_td]:border-gray-200 dark:[&_td]:border-gray-700 [&_td]:text-gray-700 dark:[&_td]:text-gray-300
                    [&_tr:last-child_td]:border-b-0
                    [&_hr]:my-12 [&_hr]:border-gray-300 dark:[&_hr]:border-zinc-700"
                  />
                )}
              </div>
            </article>

            {/* Sidebar mejorado - Solo se muestra si hay contenido */}
            {hasSidebarContent && (
              <aside className="lg:col-span-4">
                <div className="sticky top-8 space-y-8">
                  {hasRelatedPosts && (
                    <div className="bg-white dark:bg-zinc-900/50 rounded-2xl shadow-xl p-6 backdrop-blur-sm border border-gray-200 dark:border-zinc-800">
                      <BlogSidebarSuggestions
                        posts={all}
                        currentSlug={post.slug}
                        locale={locale}
                      />
                    </div>
                  )}

                  {/* Información adicional del post */}
                  {post.tags.length > 0 && (
                    <div className="bg-white dark:bg-zinc-900/50 rounded-2xl shadow-xl p-6 backdrop-blur-sm border border-gray-200 dark:border-zinc-800">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-transparent border border-black dark:border-white text-black dark:text-white text-sm rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const locales = ["en", "es", "pt"] as const;
    const params = [];

    for (const locale of locales) {
      const posts = await getBlogs(locale);
      for (const post of posts) {
        params.push({
          locale,
          slug: post.slug,
        });
      }
    }

    return params;
  } catch (error) {
    console.error("Error generating static params for blog pages:", error);
    // Return empty array to fallback to runtime rendering if needed
    return [];
  }
}
