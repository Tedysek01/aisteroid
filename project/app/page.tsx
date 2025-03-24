"use client";

import { Bot, Sparkles, Rocket, Brain, Cpu, Zap } from "lucide-react";
import { Hero } from "@/components/ui/hero";
import { FeatureCard } from "@/components/ui/feature-card";
import { PromptSection } from "@/components/ui/prompt-section";
import { AgentsSection } from "@/components/ui/agents-section";
import { BlogSection } from "@/components/ui/blog-section";
import { WaitlistSection } from "@/components/ui/waitlist-section";
import { FAQ } from "@/components/ui/faq";
import { Contact } from "@/components/ui/contact";
import { PromptCard } from "@/components/ui/prompt-card";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Reální AI agenti, ne jen hračky",
      description: "Vybírej z agentů, kteří dělají konkrétní práci – shrnou e-maily, vytvoří texty, sledují recenze nebo připraví odpovědi.",
      icon: "Bot",
      gradient: "from-blue-600 via-blue-500 to-indigo-600",
      shadowColor: "rgba(59, 130, 246, 0.6)",
      iconColor: "text-blue-400"
    },
    {
      title: "Prompty, které fakt fungují",
      description: "Žádné napiš mi článek o X. Každý prompt je vyladěný tak, aby řešil konkrétní problém – s místem na doplnění, připravený ke zkopírování nebo použití s agentem..",
      icon: "Sparkles",
      gradient: "from-purple-600 via-violet-500 to-fuchsia-600",
      shadowColor: "rgba(124, 58, 237, 0.6)",
      iconColor: "text-purple-400"
    },
    {
      title: "Začni během 2 minut",
      description: "Nemusíš nic instalovat, nepotřebuješ žádné technické znalosti. Vyber si agenta nebo prompt, zadej vstup a sleduj výsledek.",
      icon: "Rocket",
      gradient: "from-cyan-600 via-teal-500 to-emerald-600",
      shadowColor: "rgba(16, 185, 129, 0.6)",
      iconColor: "text-emerald-400"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        <Hero />
        
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#121212] relative overflow-hidden">
          {/* Advanced Cyberpunk Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
          
          {/* Digital Circuit Pattern */}
          <div className="absolute inset-0 opacity-5" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230000ff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               }} 
          />
          
          {/* Grid Lines */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{
                 backgroundImage: `linear-gradient(rgba(0, 170, 255, 0.5) 1px, transparent 1px), 
                                   linear-gradient(90deg, rgba(0, 170, 255, 0.5) 1px, transparent 1px)`,
                 backgroundSize: '50px 50px'
               }} 
          />
          
          <div className="mx-auto max-w-7xl relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="inline-block px-3 sm:px-4 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 text-sm font-medium mb-4">
                <div className="flex items-center justify-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <span>HLAVNÍ FUNKCE</span>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-purple-400">
                Proč AISTEROID?
              </h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
                Protože AI nemusí být složitá.
                <br className="block sm:hidden" />
                <span className="inline">Aisteroid ti dá nástroje, které rovnou fungují – bez kódování, bez nastavování, bez zbytečnýho přemýšlení.</span>
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  className="relative rounded-2xl backdrop-blur-lg p-6 sm:p-8 group overflow-hidden"
                  style={{
                    boxShadow: `0 0 30px rgba(0, 0, 0, 0.3)`,
                  }}
                >
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-2xl" />
                  
                  {/* Hover gradient effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`} />
                  
                  {/* Border glow */}
                  <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-white/10 transition-colors duration-500" />
                  
                  {/* Animated corner lights */}
                  <div className="absolute w-20 h-20 -top-10 -right-10 bg-gradient-to-br from-white/0 via-white/0 to-white/5 rounded-full blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
                  <div className="absolute w-20 h-20 -bottom-10 -left-10 bg-gradient-to-tl from-white/0 via-white/0 to-white/5 rounded-full blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
                  
                  <div className="relative">
                    <div className="mb-4 sm:mb-6 inline-flex items-center justify-center rounded-xl p-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      {/* Icon container with specialized gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 rounded-xl`} />
                      
                      {/* Icon container with glow */}
                      <div 
                        className="relative p-3 sm:p-4 rounded-xl"
                        style={{
                          boxShadow: `0 0 20px ${feature.shadowColor}`
                        }}
                      >
                        {feature.icon === "Bot" && <Bot className={`h-6 w-6 sm:h-7 sm:w-7 ${feature.iconColor}`} />}
                        {feature.icon === "Sparkles" && <Sparkles className={`h-6 w-6 sm:h-7 sm:w-7 ${feature.iconColor}`} />}
                        {feature.icon === "Rocket" && <Rocket className={`h-6 w-6 sm:h-7 sm:w-7 ${feature.iconColor}`} />}

                        {/* Pulsing animation behind icon */}
                        <div 
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            background: `radial-gradient(circle, ${feature.shadowColor} 0%, rgba(0,0,0,0) 70%)`,
                            animation: 'pulse 2s infinite'
                          }}
                        />
                      </div>
                    </div>
                    
                    <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300 bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300"
                        style={{
                          backgroundImage: `linear-gradient(90deg, #fff 0%, #f0f0f0 100%)`,
                          backgroundSize: '200% 100%',
                          backgroundPositionX: '0%'
                        }}
                    >
                      {feature.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                    
                    {/* Subtle reveal link on hover */}
                    <div className="mt-4 sm:mt-5 pt-3 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 flex justify-end">
                      {index === 0 ? (
                        <Link href="/agents" className={`flex items-center text-sm font-medium ${feature.iconColor}`}>
                          <span>Zjistit více</span>
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                      ) : index === 1 ? (
                        <Link href="/prompts" className={`flex items-center text-sm font-medium ${feature.iconColor}`}>
                          <span>Zjistit více</span>
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                      ) : (
                        <a 
                          href="#prompt-section" 
                          className={`flex items-center text-sm font-medium ${feature.iconColor}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('.prompt-section')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          <span>Zjistit více</span>
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <PromptSection />
        <AgentsSection />
        <BlogSection />
        <WaitlistSection />
        <FAQ />
        <Contact />
      </main>
      
      {/* Add keyframes for animations */}
      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 0.3; transform: scale(0.97); }
          50% { opacity: 0.6; transform: scale(1.03); }
          100% { opacity: 0.3; transform: scale(0.97); }
        }
      `}</style>
    </div>
  );
}