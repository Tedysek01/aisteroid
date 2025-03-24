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
    if (index % 3 === 0) return "bg-pink-500/20";
    if (index % 3 === 1) return "bg-purple-500/20";
    return "bg-emerald-500/20";
  };

  return (
    <section className="py-24 px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden prompt-section" id="prompt-section">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#2b0a3d,#0a0a0a)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,#1e0035,#0a0a0a)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#460038,#0a0a0a)] opacity-30" />
      
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff00ff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} 
      />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 text-pink-400 text-sm font-medium mb-4"
          >
            AI PROMPTY
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400"
          >
            Prompty, co dávají smysl
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-pink-200/70 max-w-2xl mx-auto"
          >
            Vyber si z těch, které opravdu něco dělají – ne jen generujou náhodný text.
Připravené k použití. Vyladěné. Funkční.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Placeholder loader s pink efektem
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-[#1A1A1A] border border-[#333333] rounded-xl p-6 animate-pulse h-64 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 to-purple-500/5 animate-pulse" />
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
            <div className="col-span-3 text-center py-10 text-pink-200/70">
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
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-pink-600/30 via-purple-600/30 to-pink-600/30 hover:from-pink-600/50 hover:via-purple-600/50 hover:to-pink-600/50 text-white font-medium transition-all duration-300 relative overflow-hidden group border border-pink-500/20"
          >
            <span className="relative z-10">Zobrazit vše</span>
            <ArrowRight className="w-5 h-5 relative z-10" />
            
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/0 via-pink-600/50 to-pink-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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