"use client";

import { motion } from "framer-motion";
import { Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BlogService } from "@/lib/services/blog-service";
import type { BlogPost } from "@/lib/data/blog-posts";
import { useEffect, useState } from "react";

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const latestPosts = BlogService.getPublishedPosts().slice(0, 3);
    setPosts(latestPosts);
  }, []);

  return (
    <section className="py-24 px-6 bg-[#121212]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold">Latest Articles</h2>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            View all
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
            >
              <Link href={`/blog/${post.id}`}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {post.author}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold mb-3">{post.title}</h2>
                  <p className="text-gray-300">{post.excerpt}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}