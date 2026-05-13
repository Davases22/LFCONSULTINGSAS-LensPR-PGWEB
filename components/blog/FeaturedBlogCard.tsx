import React from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/types/blog";

interface FeaturedBlogCardProps {
  post: BlogPost;
  locale: string;
}

export function FeaturedBlogCard({ post, locale }: FeaturedBlogCardProps) {
  return (
    <Link
      href={`/${locale}/sections/blog/${post.slug}`}
      className="relative group overflow-hidden rounded-2xl min-h-[260px] md:min-h-[340px] flex"
    >
      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-black/10" />
      <div className="relative z-10 p-6 md:p-10 flex flex-col justify-end w-full text-white">
        <h2 className="text-2xl md:text-4xl font-bold max-w-[75%] leading-tight drop-shadow-lg">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="hidden md:block mt-4 text-base max-w-[60%] opacity-90 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        {post.category && (
          <span className="text-xs md:text-sm inline-flex items-center self-start bg-transparent border border-white text-white backdrop-blur px-3 py-1 rounded-full mt-3 whitespace-nowrap">
            {post.category}
          </span>
        )}
      </div>
    </Link>
  );
}
