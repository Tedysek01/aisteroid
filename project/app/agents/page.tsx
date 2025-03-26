"use client";

import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AgentService, Agent } from "@/lib/services/agent-service";

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setIsLoading(true);
        const allAgents = await AgentService.getAllAgents();
        setAgents(allAgents);
      } catch (error) {
        console.error("Chyba při načítání agentů:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold mb-12">AI Agenti</h1>
        
        {isLoading ? (
          // Loader - skeletony pro načítání
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 animate-pulse h-64"></div>
            ))}
          </div>
        ) : agents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 group h-full"
                style={{
                  background: "linear-gradient(145deg, rgba(18, 18, 18, 0.9), rgba(30, 30, 30, 0.6))",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)"
                }}
              >
                {/* Futuristický cyberpunk podklad karty */}
                <div className="absolute inset-0 z-0 opacity-10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent" />
                  <div className="absolute inset-0 opacity-30" 
                       style={{
                         backgroundImage: `radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 40%), 
                                           radial-gradient(circle at 90% 10%, rgba(168, 85, 247, 0.1) 0%, transparent 40%)`,
                       }} 
                  />
                </div>
                
                {/* Horizontální linie na vrcholu karty */}
                <div 
                  className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent group-hover:via-blue-400/80 transition-all duration-700"
                />
                
                {/* Vertikální linie na pravé straně */}
                <div 
                  className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent group-hover:via-purple-400/80 transition-all duration-700"
                />
                
                {/* Glow efekt při hoveru */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-700 opacity-0 group-hover:opacity-100"
                />
                
                {/* Kategorie - nový design */}
                <div className="relative z-10 flex flex-wrap gap-2 mb-6">
                  <span
                    className="px-3 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-blue-500/30 to-purple-500/30 flex items-center gap-1 shadow-lg shadow-blue-900/20 border border-white/5"
                  >
                    <Tag size={10} />
                    {agent.category}
                  </span>
                </div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white group-hover:from-white group-hover:via-blue-200 group-hover:to-white transition-all duration-500">
                    {agent.name}
                  </h2>
                  <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors duration-300">
                    {agent.description}
                  </p>
                  
                  <Link
                    href={`/agents/${agent.slug}`}
                    className="relative inline-flex w-full py-2.5 px-4 justify-center items-center overflow-hidden rounded-lg transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-500/20"
                  >
                    {/* Gradient podklad */}
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80 group-hover:from-blue-500/90 group-hover:to-purple-500/90" />
                    
                    {/* Animovaný světelný efekt */}
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    
                    {/* Text tlačítka */}
                    <span className="relative z-10 font-medium text-white flex items-center">
                      Zjistit více
                      <svg className="w-5 h-5 ml-2 -mr-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Link>
                </div>
                
                {/* Dekorativní cyberpunk prvky */}
                <div className="absolute bottom-0 left-0 w-[30%] h-[3px] bg-gradient-to-r from-blue-500/80 to-transparent" />
                <div className="absolute bottom-0 right-[30%] w-[10%] h-[3px] bg-gradient-to-r from-transparent via-purple-500/80 to-transparent" />
                <div className="absolute top-[20%] right-0 w-[3px] h-[20%] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            Žádní agenti nebyli nalezeni.
          </div>
        )}
      </main>
    </div>
  );
}