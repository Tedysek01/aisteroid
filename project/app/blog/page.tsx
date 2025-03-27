"use client";

import { motion } from "framer-motion";
import { Clock, User, Tag, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { BlogPost } from "@/lib/data/blog-posts";
import { BlogService } from "@/lib/services/blog-service";

// Pomocná funkce pro odstranění HTML značek
function stripHtml(html: string): string {
  if (typeof window === 'undefined') {
    return html.replace(/<[^>]*>/g, '');
  }
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Funkce pro generování barev pro různé blog posty
  const getPostColors = (index: number): {
    gradient: string,
    accent: string,
    accentLight: string
  } => {
    const colorSchemes = [
      {
        gradient: "from-blue-600 to-indigo-600",
        accent: "blue-600",
        accentLight: "blue-400"
      },
      {
        gradient: "from-purple-600 to-fuchsia-600",
        accent: "purple-600",
        accentLight: "purple-400"
      },
      {
        gradient: "from-teal-600 to-emerald-600",
        accent: "teal-600",
        accentLight: "teal-400"
      },
      {
        gradient: "from-rose-600 to-pink-600",
        accent: "rose-600",
        accentLight: "rose-400"
      },
      {
        gradient: "from-amber-600 to-orange-600",
        accent: "amber-600",
        accentLight: "amber-400"
      }
    ];

    return colorSchemes[index % colorSchemes.length];
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const firebasePosts = await BlogService.getPublishedPosts();
        
        if (firebasePosts.length > 0) {
          setPosts(firebasePosts);
        } else {
          console.log("Žádné publikované příspěvky nebyly nalezeny");
          setPosts([]);
        }
      } catch (error) {
        console.error("Chyba při načítání příspěvků:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadPosts();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: "150ms" }}></div>
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: "300ms" }}></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="max-w-7xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12 pb-4 border-b border-white/10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Blog</h1>
          <p className="text-gray-400">Články a novinky o AI a technologiích</p>
        </motion.div>
        
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post, index) => {
              const colorScheme = getPostColors(index);
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col overflow-hidden rounded-lg border border-white/10 h-full bg-[#1A1A1A] hover:border-white/20 transition-all duration-300"
                >
                  <Link href={`/blog/${post.id}`} className="block h-full">
                    <div className="relative h-48 overflow-hidden">
                      {/* Jemný barevný filtr podle kategorie */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-black/10 mix-blend-overlay z-10"></div>
                      <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.gradient} opacity-30 mix-blend-color z-10`}></div>
                      
                      <Image
                        src={post.coverImage || "https://images.unsplash.com/photo-1677442136019-21780ecad995"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Jemná lišta na spodní hraně obrázku */}
                      <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${colorScheme.gradient} opacity-70`}></div>
                      
                      {/* Datum v rohu */}
                      <div className="absolute top-3 right-3 px-2 py-1 bg-black/40 backdrop-blur-sm text-white/90 text-xs rounded z-20 border border-white/10">
                        {new Date(post.date).toLocaleDateString('cs-CZ', {year: 'numeric', month: 'short', day: 'numeric'})}
                      </div>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-grow">
                      {/* Metadata */}
                      <div className="flex items-center gap-4 mb-3">
                        <span className="flex items-center gap-1 text-sm text-gray-400">
                          <Clock size={14} />
                          {post.readTime}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-400">
                          <User size={14} />
                          {post.author}
                        </span>
                      </div>
                      
                      {/* Nadpis s jemným gradientem */}
                      <h2 className={`text-xl font-bold mb-3 text-white group-hover:text-${colorScheme.accentLight} transition-colors duration-300`}>
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-400 mb-5 flex-grow">
                        {stripHtml(post.excerpt)}
                      </p>
                      
                      {/* CTA */}
                      <div className={`mt-auto inline-flex items-center text-${colorScheme.accentLight} font-medium group-hover:translate-x-1 transition-transform duration-300`}>
                        Přečíst článek 
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="ml-1"
                        >
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center p-10 border border-white/10 rounded-lg bg-[#1A1A1A]"
          >
            <Tag size={32} className="mx-auto mb-4 text-gray-500" />
            <h2 className="text-xl font-medium mb-2">Žádné publikované příspěvky</h2>
            <p className="text-gray-400">
              Připravujeme pro vás nový obsah, který bude brzy k dispozici.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}