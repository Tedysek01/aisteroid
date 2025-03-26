"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Filter, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { PromptService, Prompt, PROMPT_CATEGORIES } from "@/lib/services/prompt-service";

// Pomocná funkce pro převod HTML na čistý text
function htmlToPlainText(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side: jednoduché odstranění HTML značek pomocí regex
    return html.replace(/<[^>]*>/g, '');
  }
  // Client-side: použití DOM API
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<string[]>(PROMPT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Upravím mapování barev pro nové kategorie
  const getCategoryColor = (category: string): {
    gradient: string,
    shadow: string,
    accent: string,
    lightAccent: string,
    borderStyle: string,
    cardStyle: string
  } => {
    const categoryMapping: Record<string, {
      gradient: string,
      shadow: string,
      accent: string,
      lightAccent: string,
      borderStyle: string,
      cardStyle: string
    }> = {
      "Vytvořit obsah (reels, texty, scénáře)": {
        gradient: "from-blue-600 via-blue-500 to-indigo-600",
        shadow: "rgba(59, 130, 246, 0.6)",
        accent: "blue-500",
        lightAccent: "blue-300",
        borderStyle: "border-blue-500/20 hover:border-blue-400/40",
        cardStyle: "bg-gradient-to-br from-blue-950/50 to-indigo-950/50"
      },
      "Naučit se nebo vysvětlit téma": {
        gradient: "from-purple-600 via-violet-500 to-fuchsia-600",
        shadow: "rgba(124, 58, 237, 0.6)",
        accent: "purple-500",
        lightAccent: "purple-300",
        borderStyle: "border-purple-500/20 hover:border-purple-400/40",
        cardStyle: "bg-gradient-to-br from-purple-950/50 to-fuchsia-950/50"
      },
      "Navrhnout nebo ověřit nápad": {
        gradient: "from-cyan-600 via-teal-500 to-emerald-600",
        shadow: "rgba(16, 185, 129, 0.6)",
        accent: "emerald-500",
        lightAccent: "emerald-300",
        borderStyle: "border-emerald-500/20 hover:border-emerald-400/40",
        cardStyle: "bg-gradient-to-br from-emerald-950/50 to-teal-950/50"
      },
      "Zautomatizovat úkol pomocí AI": {
        gradient: "from-amber-600 via-orange-500 to-red-600",
        shadow: "rgba(245, 158, 11, 0.6)",
        accent: "amber-500",
        lightAccent: "amber-300",
        borderStyle: "border-amber-500/20 hover:border-amber-400/40",
        cardStyle: "bg-gradient-to-br from-amber-950/50 to-red-950/50"
      },
      "Zlepšit psaní a komunikaci": {
        gradient: "from-rose-600 via-pink-500 to-purple-600",
        shadow: "rgba(244, 114, 182, 0.6)",
        accent: "rose-500",
        lightAccent: "rose-300",
        borderStyle: "border-rose-500/20 hover:border-rose-400/40",
        cardStyle: "bg-gradient-to-br from-rose-950/50 to-pink-950/50"
      },
      "Analyzovat, porovnat, rozhodnout se": {
        gradient: "from-indigo-600 via-blue-500 to-cyan-600",
        shadow: "rgba(99, 102, 241, 0.6)",
        accent: "indigo-500",
        lightAccent: "indigo-300",
        borderStyle: "border-indigo-500/20 hover:border-indigo-400/40",
        cardStyle: "bg-gradient-to-br from-indigo-950/50 to-cyan-950/50"
      },
      "Vymyslet název, pitch nebo strukturu": {
        gradient: "from-sky-600 via-blue-500 to-indigo-600",
        shadow: "rgba(14, 165, 233, 0.6)",
        accent: "sky-500",
        lightAccent: "sky-300",
        borderStyle: "border-sky-500/20 hover:border-sky-400/40",
        cardStyle: "bg-gradient-to-br from-sky-950/50 to-blue-950/50"
      },
      "Připravit prezentaci, výpisky, výuku": {
        gradient: "from-lime-600 via-green-500 to-emerald-600",
        shadow: "rgba(132, 204, 22, 0.6)",
        accent: "lime-500",
        lightAccent: "lime-300",
        borderStyle: "border-lime-500/20 hover:border-lime-400/40",
        cardStyle: "bg-gradient-to-br from-lime-950/50 to-green-950/50"
      },
      "Vylepšit svůj výstup": {
        gradient: "from-fuchsia-600 via-purple-500 to-violet-600",
        shadow: "rgba(217, 70, 239, 0.6)",
        accent: "fuchsia-500",
        lightAccent: "fuchsia-300",
        borderStyle: "border-fuchsia-500/20 hover:border-fuchsia-400/40",
        cardStyle: "bg-gradient-to-br from-fuchsia-950/50 to-violet-950/50"
      }
    };

    return categoryMapping[category] || {
      gradient: "from-blue-600 via-blue-500 to-indigo-600",
      shadow: "rgba(59, 130, 246, 0.6)",
      accent: "blue-500",
      lightAccent: "blue-300",
      borderStyle: "border-blue-500/20 hover:border-blue-400/40",
      cardStyle: "bg-gradient-to-br from-blue-950/50 to-indigo-950/50"
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
    ? prompts.filter(p => p.category === selectedCategory)
    : prompts;

  // Zavření dropdownu při kliknutí mimo
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-white to-purple-400 bg-clip-text text-transparent">Prompty</h1>
          
          {!isLoading && categories.length > 0 && (
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-4">
                <Filter size={20} className="text-pink-400" />
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 min-w-[300px]"
                  >
                    <span className="flex-1 text-left">
                      {selectedCategory || "Všechny kategorie"}
                    </span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-[300px] bg-[#1a1a1a] rounded-lg shadow-xl border border-pink-500/10 overflow-hidden z-50"
                      >
                        <div className="p-2">
                          <button
                            onClick={() => {
                              setSelectedCategory(null);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                              !selectedCategory
                                ? "bg-pink-500/20 text-pink-400"
                                : "hover:bg-white/10"
                            }`}
                          >
                            Všechny kategorie
                          </button>
                          
                          {categories.map(category => (
                            <button
                              key={category}
                              onClick={() => {
                                setSelectedCategory(category);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                                selectedCategory === category
                                  ? "bg-pink-500/20 text-pink-400"
                                  : "hover:bg-white/10"
                              }`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                  >
                    <X size={16} className="text-pink-400" />
                  </button>
                )}
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
              const colorScheme = getCategoryColor(prompt.category);
              return (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative overflow-hidden rounded-xl p-6 ${colorScheme.borderStyle} transition-all duration-500 group h-full ${colorScheme.cardStyle}`}
                  style={{
                    backdropFilter: "blur(12px)",
                    boxShadow: `0 0 25px ${colorScheme.shadow.replace('0.6', '0.2')}`
                  }}
                >
                  {/* Kategorie - nový design */}
                  <div className="relative z-10 flex items-center gap-2 mb-6">
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-medium bg-gradient-to-r ${colorScheme.gradient} bg-opacity-30 flex items-center gap-1 shadow-lg border border-${colorScheme.accent}/5`}
                    >
                      <Tag size={10} className={`text-${colorScheme.accent}`} />
                      <span className={`capitalize text-${colorScheme.lightAccent}`}>{prompt.category}</span>
                    </span>
                  </div>
                  
                  <div className="relative z-10">
                    <h2 className={`text-2xl font-bold mb-3 text-white group-hover:text-${colorScheme.lightAccent} transition-colors duration-300`}>
                      {prompt.title}
                    </h2>
                    <p className={`text-white/80 mb-6 group-hover:text-white transition-colors duration-300`}>
                      {htmlToPlainText(prompt.description)}
                    </p>
                    
                    <Link
                      href={`/prompts/${prompt.slug}`}
                      className={`relative inline-flex w-full py-2.5 px-4 justify-center items-center overflow-hidden rounded-lg transition-all duration-500 group-hover:shadow-lg bg-gradient-to-r ${colorScheme.gradient}`}
                      style={{
                        boxShadow: `0 0 15px ${colorScheme.shadow.replace('0.6', '0.2')}`
                      }}
                    >
                      {/* Animovaný světelný efekt */}
                      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      
                      <span className="relative z-10 text-white font-medium">
                        Zobrazit prompt
                      </span>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 text-pink-200/70">
            Žádné prompty nebyly nalezeny.
          </div>
        )}
      </main>
    </div>
  );
}