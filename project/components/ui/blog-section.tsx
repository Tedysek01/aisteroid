"use client";

import { motion } from "framer-motion";
import { Clock, User, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BlogService } from "@/lib/services/blog-service";
import type { BlogPost } from "@/lib/data/blog-posts";
import { useEffect, useState } from "react";

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setIsDataLoaded(false);
        const publishedPosts = await BlogService.getPublishedPosts();
        const latestPosts = publishedPosts.slice(0, 3);
        setPosts(latestPosts);
      } catch (error) {
        console.error("Chyba při načítání příspěvků:", error);
        setPosts([]);
      } finally {
        setIsLoading(false);
        // Počkáme krátkou chvíli před zobrazením animací
        setTimeout(() => {
          setIsDataLoaded(true);
        }, 100);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#12001f,#0a0a0a)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,#240045,#0a0a0a)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#460038,#0a0a0a)] opacity-30" />
      
      {/* Digital noise overlay */}
      <div 
        className="absolute inset-0 opacity-5 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <FileText className="w-5 h-5 text-pink-400" />
              <span className="text-pink-400 font-medium">Blog</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Nejnovější články
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors relative group mt-4 md:mt-0"
            >
              <span>Zobrazit vše</span>
              <ArrowRight size={20} />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Placeholder loader s pink efektem
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-[#1A1A1A] border border-[#333333] rounded-xl p-6 animate-pulse h-64 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 to-purple-500/5 animate-pulse" />
              </div>
            ))
          ) : posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isDataLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-[#1A1A1A] backdrop-blur-lg rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-500 border border-[#333333] hover:border-pink-500/50"
              style={{
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-pink-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <Link href={`/blog/${post.id}`}>
                <div className="relative h-52 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent z-10 opacity-60" />
                  <div className="absolute inset-0 border-b border-pink-500/20" />
                  
                  <Image
                    src={post.coverImage || "https://images.unsplash.com/photo-1677442136019-21780ecad995"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Futuristic overlay pattern */}
                  <div className="absolute inset-0 opacity-20 mix-blend-overlay"
                    style={{
                      backgroundImage: `linear-gradient(45deg, rgba(236, 72, 153, 0.1) 25%, transparent 25%, transparent 50%, rgba(236, 72, 153, 0.1) 50%, rgba(236, 72, 153, 0.1) 75%, transparent 75%, transparent)`,
                      backgroundSize: '10px 10px'
                    }}
                  />
                </div>
                
                <div className="p-6 relative z-10">
                  <div className="flex items-center gap-4 text-sm text-pink-200/70 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-pink-400" />
                      <span className="group-hover:text-pink-300 transition-colors duration-300">{post.readTime}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} className="text-pink-400" />
                      <span className="group-hover:text-pink-300 transition-colors duration-300">{post.author}</span>
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-pink-100">{post.title}</h2>
                  <p className="text-pink-200/70 transition-colors duration-300 group-hover:text-pink-200">{post.excerpt}</p>
                  
                  <div className="mt-4 pt-3 border-t border-pink-500/10 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-pink-400 flex items-center text-sm font-medium">
                      <span>Číst článek</span>
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}