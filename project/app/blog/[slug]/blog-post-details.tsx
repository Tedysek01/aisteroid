"use client";

import { Clock, User, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { BlogPost } from "@/lib/data/blog-posts";
import { BlogService } from "@/lib/services/blog-service";

export function BlogPostDetails({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const userPost = await BlogService.getPostBySlug(slug);
        
        if (userPost) {
          setPost(userPost);
        } else {
          console.log(`Příspěvek se slugem ${slug} nebyl nalezen`);
          setPost(undefined);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setPost(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="animate-pulse text-2xl">Načítám příspěvek...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Příspěvek nenalezen</h1>
          <Link href="/blog" className="text-blue-400 hover:text-blue-300">
            Zpět na blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
        <div className="mb-6 sm:mb-8">
          <Link href="/blog" className="text-blue-400 hover:text-blue-300">
            ← Zpět na blog
          </Link>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 shadow-[0_10px_50px_rgba(0,0,0,0.5)] shadow-blue-900/20">
          <article className="bg-[#1a1a1a]/90 backdrop-blur-lg rounded-2xl p-4 sm:p-8 h-full">
            <div className="relative h-[250px] sm:h-[400px] rounded-xl overflow-hidden mb-6 sm:mb-8">
              <Image
                src={post.coverImage || "https://images.unsplash.com/photo-1677442136019-21780ecad995"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-400 mb-8 sm:mb-12">
              <span className="flex items-center gap-2">
                <User size={16} />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {post.readTime}
              </span>
            </div>

            <div 
              className="blog-content prose prose-invert max-w-none prose-sm sm:prose-base"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </main>
    </div>
  );
}