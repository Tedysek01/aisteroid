"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tag, Filter } from "lucide-react";
import Link from "next/link";
import { PromptService, Prompt } from "@/lib/services/prompt-service";

// Seznam kategorií promptů
const promptCategories = [
  "Práce a produktivita",
  "Copywriting a marketing",
  "SEO a obsah",
  "E-commerce a podnikání",
  "Strategie a plánování",
  "Osobní rozvoj",
  "Komunikace",
  "Vývoj a technologie",
  "Vzdělávání",
  "Kreativita a zábava"
];

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<string[]>(promptCategories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Pro získání barvy podle kategorie
  const getCategoryColor = (category: string): {
    gradient: string,
    shadow: string,
    accent: string,
    lightAccent: string
  } => {
    const categoryMapping: Record<string, {
      gradient: string,
      shadow: string,
      accent: string,
      lightAccent: string
    }> = {
      "Práce a produktivita": {
        gradient: "from-blue-600 via-blue-500 to-indigo-600",
        shadow: "rgba(59, 130, 246, 0.6)",
        accent: "blue-500",
        lightAccent: "blue-300"
      },
      "Copywriting a marketing": {
        gradient: "from-purple-600 via-violet-500 to-fuchsia-600",
        shadow: "rgba(124, 58, 237, 0.6)",
        accent: "purple-500",
        lightAccent: "purple-300"
      },
      "SEO a obsah": {
        gradient: "from-cyan-600 via-teal-500 to-emerald-600",
        shadow: "rgba(16, 185, 129, 0.6)",
        accent: "emerald-500",
        lightAccent: "emerald-300"
      },
      "E-commerce a podnikání": {
        gradient: "from-amber-600 via-orange-500 to-red-600",
        shadow: "rgba(245, 158, 11, 0.6)",
        accent: "amber-500",
        lightAccent: "amber-300"
      },
      "Strategie a plánování": {
        gradient: "from-rose-600 via-pink-500 to-purple-600",
        shadow: "rgba(244, 114, 182, 0.6)",
        accent: "rose-500",
        lightAccent: "rose-300"
      },
      "Osobní rozvoj": {
        gradient: "from-indigo-600 via-blue-500 to-cyan-600",
        shadow: "rgba(99, 102, 241, 0.6)",
        accent: "indigo-500",
        lightAccent: "indigo-300"
      },
      "Komunikace": {
        gradient: "from-sky-600 via-blue-500 to-indigo-600",
        shadow: "rgba(14, 165, 233, 0.6)",
        accent: "sky-500",
        lightAccent: "sky-300"
      },
      "Vývoj a technologie": {
        gradient: "from-lime-600 via-green-500 to-emerald-600",
        shadow: "rgba(132, 204, 22, 0.6)",
        accent: "lime-500",
        lightAccent: "lime-300"
      },
      "Vzdělávání": {
        gradient: "from-emerald-600 via-teal-500 to-cyan-600",
        shadow: "rgba(16, 185, 129, 0.6)",
        accent: "emerald-500",
        lightAccent: "emerald-300"
      },
      "Kreativita a zábava": {
        gradient: "from-fuchsia-600 via-purple-500 to-violet-600",
        shadow: "rgba(217, 70, 239, 0.6)",
        accent: "fuchsia-500",
        lightAccent: "fuchsia-300"
      },
    };

    return categoryMapping[category] || {
      gradient: "from-blue-600 via-blue-500 to-indigo-600",
      shadow: "rgba(59, 130, 246, 0.6)",
      accent: "blue-500",
      lightAccent: "blue-300"
    };
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setIsLoading(true);
        const allPrompts = await PromptService.getAllPrompts();
        setPrompts(allPrompts);
      } catch (error) {
        console.error("Chyba při načítání promptů:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  const filteredPrompts = selectedCategory
    ? prompts.filter(p => p.industry === selectedCategory)
    : prompts;

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h1 className="text-5xl font-bold">Prompty</h1>
          
          {!isLoading && categories.length > 0 && (
            <div className="flex items-center gap-4">
              <Filter size={20} />
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    !selectedCategory
                      ? "bg-blue-500 text-white"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  Všechny
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-blue-500 text-white"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {isLoading ? (
          // Loader - skeletony pro načítání
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 animate-pulse h-64"></div>
            ))}
          </div>
        ) : filteredPrompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrompts.map((prompt, index) => {
              const colorScheme = getCategoryColor(prompt.industry);
              return (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 group h-full"
                  style={{
                    background: "linear-gradient(145deg, rgba(18, 18, 18, 0.9), rgba(30, 30, 30, 0.6))",
                    backdropFilter: "blur(12px)",
                    boxShadow: `0 0 25px rgba(0, 0, 0, 0.5)`
                  }}
                >
                  {/* Futuristický cyberpunk podklad karty */}
                  <div className="absolute inset-0 z-0 opacity-10 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.gradient} opacity-20`} />
                    <div className="absolute inset-0 opacity-30" 
                         style={{
                           backgroundImage: `radial-gradient(circle at 50% 50%, ${colorScheme.shadow.replace('0.6', '0.1')} 0%, transparent 40%), 
                                             radial-gradient(circle at 90% 10%, ${colorScheme.shadow.replace('0.6', '0.1')} 0%, transparent 40%)`,
                         }} 
                    />
                  </div>
                  
                  {/* Horizontální linie na vrcholu karty */}
                  <div 
                    className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-${colorScheme.accent}/50 to-transparent group-hover:via-${colorScheme.lightAccent}/80 transition-all duration-700`}
                  />
                  
                  {/* Vertikální linie na pravé straně */}
                  <div 
                    className={`absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-${colorScheme.accent}/50 to-transparent group-hover:via-${colorScheme.lightAccent}/80 transition-all duration-700`}
                  />
                  
                  {/* Glow efekt při hoveru podle kategorie */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${colorScheme.gradient} opacity-0 group-hover:opacity-10 transition-all duration-700`}
                  />
                  
                  {/* Kategorie - nový design */}
                  <div className="relative z-10 flex items-center gap-2 mb-6">
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-medium bg-gradient-to-r ${colorScheme.gradient} bg-opacity-30 flex items-center gap-1 shadow-lg shadow-${colorScheme.accent}/20 border border-white/5`}
                    >
                      <Tag size={10} />
                      <span className="capitalize">{prompt.industry}</span>
                    </span>
                  </div>
                  
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white group-hover:from-white group-hover:via-white group-hover:to-white transition-all duration-500">
                      {prompt.title}
                    </h2>
                    <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors duration-300">
                      {prompt.description}
                    </p>
                    
                    <Link
                      href={`/prompts/${prompt.slug}`}
                      className="relative inline-flex w-full py-2.5 px-4 justify-center items-center overflow-hidden rounded-lg transition-all duration-500 group-hover:shadow-lg"
                      style={{
                        boxShadow: `0 0 15px ${colorScheme.shadow.replace('0.6', '0.2')}`
                      }}
                    >
                      {/* Gradient podklad */}
                      <span className={`absolute inset-0 bg-gradient-to-r ${colorScheme.gradient} opacity-80 group-hover:opacity-90`} />
                      
                      {/* Animovaný světelný efekt */}
                      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      
                      {/* Text tlačítka */}
                      <span className="relative z-10 font-medium text-white flex items-center">
                        Zobrazit detail
                        <svg className="w-5 h-5 ml-2 -mr-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                  
                  {/* Dekorativní cyberpunk prvky */}
                  <div className={`absolute bottom-0 left-0 w-[30%] h-[3px] bg-gradient-to-r from-${colorScheme.accent}/80 to-transparent`} />
                  <div className={`absolute bottom-0 right-[30%] w-[10%] h-[3px] bg-gradient-to-r from-transparent via-${colorScheme.accent}/80 to-transparent`} />
                  <div className={`absolute top-[20%] right-0 w-[3px] h-[20%] bg-gradient-to-b from-transparent via-${colorScheme.accent}/50 to-transparent`} />
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            Žádné prompty nebyly nalezeny.
          </div>
        )}
      </main>
    </div>
  );
}