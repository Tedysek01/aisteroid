"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, ArrowRight, Sparkles, Zap, Cpu } from "lucide-react";
import { useState, useEffect } from "react";
import { AgentService, Agent } from "@/lib/services/agent-service";

export function AgentsSection() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setIsLoading(true);
        const allAgents = await AgentService.getAllAgents();
        // Omezíme počet zobrazených agentů na 3
        const featuredAgents = allAgents.slice(0, 3);
        setAgents(featuredAgents);
      } catch (error) {
        console.error("Chyba při načítání agentů:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgents();
  }, []);

  // Získej ikonu pro agenta podle indexu
  const getIconForAgent = (index: number) => {
    if (index % 3 === 0) return Brain;
    if (index % 3 === 1) return Cpu;
    return Zap;
  };

  return (
    <section className="relative py-24 overflow-hidden bg-[#121212]">
      {/* Cyberpunk background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-70" />
      
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230000ff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} 
      />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 text-sm font-medium mb-4"
          >
            AI AGENTI
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-white to-cyan-400 bg-clip-text text-transparent"
          >
            AI AGENTI, co makají za tebe
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Vyber si z připravených agentů, kteří zvládnou rutinu za tebe – od shrnutí e-mailů po hlídání recenzí.
Bez kódu. Bez chaosu. Jen výsledky.


          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Placeholder loader s cyberpunk efektem
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-[#1A1A1A] border border-[#333333] rounded-xl p-6 animate-pulse h-64 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 animate-pulse" />
              </div>
            ))
          ) : agents.length > 0 ? (
            agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gradient-to-b from-[#1A1A1A] to-[#161616] rounded-2xl p-6 border border-[#333333] hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
                style={{
                  boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
                }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Cyberpunk grid pattern */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500" 
                  style={{
                    backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(0, 128, 255, 0.3) 25%, rgba(0, 128, 255, 0.3) 26%, transparent 27%, transparent 74%, rgba(0, 128, 255, 0.3) 75%, rgba(0, 128, 255, 0.3) 76%, transparent 77%, transparent), 
                                      linear-gradient(90deg, transparent 24%, rgba(0, 128, 255, 0.3) 25%, rgba(0, 128, 255, 0.3) 26%, transparent 27%, transparent 74%, rgba(0, 128, 255, 0.3) 75%, rgba(0, 128, 255, 0.3) 76%, transparent 77%, transparent)`,
                    backgroundSize: '50px 50px',
                  }} 
                />
                
                <div className="relative">
                  {/* Neon Glowing Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex items-center justify-center mb-5 relative overflow-hidden group-hover:scale-110 transition-all duration-300"
                    style={{
                      boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
                    }}
                  >
                    {React.createElement(getIconForAgent(index), { 
                      className: "w-7 h-7 text-blue-400 relative z-10",
                    })}
                    
                    {/* Animated glow inside icon */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0) 70%)',
                        animation: 'pulseGlow 2s infinite ease-in-out',
                      }}
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors duration-300">{agent.name}</h3>
                  <p className="text-gray-400 mb-5 group-hover:text-gray-300 transition-colors duration-300">{agent.shortDescription}</p>
                  
                  <Link
                    href={`/agents/${agent.slug}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 relative group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <span>Více informací</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-10 text-gray-400">
              Žádní agenti nebyli nalezeni.
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600/30 to-cyan-600/30 hover:from-blue-600/50 hover:to-cyan-600/50 text-white font-medium transition-all duration-300 relative overflow-hidden group border border-blue-500/20"
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
      
      {/* Přidáváme animace pro pulzující efekt */}
      <style jsx global>{`
        @keyframes pulseGlow {
          0% { transform: scale(0.95); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 0.9; }
          100% { transform: scale(0.95); opacity: 0.7; }
        }
        
        @keyframes shineButtonEffect {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}