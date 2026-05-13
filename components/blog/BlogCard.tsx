import React from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/types/blog";

interface BlogCardProps {
  post: BlogPost;
  locale: string;
}

export function BlogCard({ post, locale }: BlogCardProps) {
  return (
    <Link
      href={`/${locale}/sections/blog/${post.slug}`}
      className="group block rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition"
    >
      {post.coverImage && (
        <div className="aspect-video w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        </div>
      )}
      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-lg font-semibold leading-snug line-clamp-2 group-hover:text-black dark:group-hover:text-white transition">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-auto">
          {post.category && (
            <span className="inline-flex items-center text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full whitespace-nowrap">
              {post.category}
            </span>
          )}
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center text-xs px-2 py-1 bg-transparent border border-black dark:border-white text-black dark:text-white rounded-full whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
