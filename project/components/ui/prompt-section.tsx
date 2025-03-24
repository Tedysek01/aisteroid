"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Shield, ArrowRight } from "lucide-react";
import { PromptCard } from "./prompt-card";
import { useState, useEffect } from "react";
import { PromptService, Prompt } from "@/lib/services/prompt-service";
import Link from "next/link";

export function PromptSection() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setIsLoading(true);
        setIsDataLoaded(false);
        const allPrompts = await PromptService.getAllPrompts();
        // Omezíme počet zobrazených promptů na 3
        const featuredPrompts = allPrompts.slice(0, 3);
        setPrompts(featuredPrompts);
      } catch (error) {
        console.error("Chyba při načítání promptů:", error);
      } finally {
        setIsLoading(false);
        // Počkáme krátkou chvíli před zobrazením animací
        setTimeout(() => {
          setIsDataLoaded(true);
        }, 100);
      }
    };

    fetchPrompts();
  }, []);

  // Mapování ikon k promptům podle ID nebo názvu (pro zobrazení správné ikony)
  const getIconForPrompt = (prompt: Prompt, index: number) => {
    // Jednoduché mapování ikon podle indexu
    if (index % 3 === 0) return Brain;
    if (index % 3 === 1) return Zap;
    return Shield;
  };

  // Mapování barev k promptům
  const getColorForPrompt = (prompt: Prompt, index: number) => {
    // Jednoduché mapování barev podle indexu
    if (index % 3 === 0) return "bg-blue-500/20";
    if (index % 3 === 1) return "bg-purple-500/20";
    return "bg-emerald-500/20";
  };

  return (
    <section className="py-24 px-6 lg:px-8 bg-[#121212] relative overflow-hidden prompt-section" id="prompt-section">
      {/* Cyberpunk background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-70" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 255, 0.2) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(0, 0, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }} 
      />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 text-sm font-medium mb-4"
          >
            AI PROMPTY
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-purple-400"
          >
            Prompty, co dávají smysl
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Vyber si z těch, které opravdu něco dělají – ne jen generujou náhodný text.
Připravené k použití. Vyladěné. Funkční.


          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Placeholder loader s cyberpunk efektem
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-[#1A1A1A] border border-[#333333] rounded-xl p-6 animate-pulse h-64 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 animate-pulse" />
              </div>
            ))
          ) : prompts.length > 0 ? (
            prompts.map((prompt, index) => (
              <PromptCard
                key={prompt.id}
                title={prompt.title}
                description={prompt.description}
                icon={getIconForPrompt(prompt, index)}
                color={getColorForPrompt(prompt, index)}
                delay={index * 0.2}
                slug={prompt.slug}
                isDataLoaded={isDataLoaded}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-10 text-gray-400">
              Žádné prompty nebyly nalezeny.
            </div>
          )}
        </div>
        
        {/* Tlačítko "Zobrazit vše" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link 
            href="/prompts" 
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 hover:from-blue-600/50 hover:to-purple-600/50 text-white font-medium transition-all duration-300 relative overflow-hidden group border border-blue-500/20"
          >
            <span className="relative z-10">Zobrazit vše</span>
            <ArrowRight className="w-5 h-5 relative z-10" />
            
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/50 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                 style={{
                   backgroundSize: '200% 100%',
                   animation: 'shineButtonEffect 3s linear infinite',
                 }}
            />
          </Link>
        </motion.div>
      </div>
      
      {/* Přidáváme animace pro tlačítko */}
      <style jsx global>{`
        @keyframes shineButtonEffect {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}