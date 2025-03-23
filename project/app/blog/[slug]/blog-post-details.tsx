"use client";

import { Clock, User, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { BlogPost } from "@/lib/data/blog-posts";
import { getBlogPosts, blogPosts } from "@/lib/data/blog-posts";

export function BlogPostDetails({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | undefined>(undefined);

  useEffect(() => {
    // First check user-created posts
    const userPosts = getBlogPosts();
    const userPost = userPosts.find(p => p.id === slug);
    
    if (userPost) {
      setPost(userPost);
    } else {
      // If not found in user posts, check default posts
      const defaultPost = blogPosts.find(p => p.id === slug);
      setPost(defaultPost);
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post not found</h1>
          <Link href="/blog" className="text-blue-400 hover:text-blue-300">
            Return to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-8">
          <Link href="/blog" className="text-blue-400 hover:text-blue-300">
            ← Back to blog
          </Link>
        </div>

        <article>
          <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-5xl font-bold mb-6">{post.title}</h1>

          <div className="flex items-center gap-6 text-gray-400 mb-12">
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
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </div>
  );
}