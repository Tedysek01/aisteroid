"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export interface PromptCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  delay?: number;
  id?: string; // Make id optional since it's only used for the key prop
  slug?: string; // Add slug for navigation
  isDataLoaded?: boolean;
}

export function PromptCard({
  title,
  description,
  icon: Icon,
  color,
  delay = 0,
  slug,
  isDataLoaded = false
}: PromptCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const promptUrl = slug ? `/prompts/${slug}` : '#';
  
  const cardContent = (
    <>
      {/* Futuristic background patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E1E1E] to-[#0A0A0A] rounded-xl" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 rounded-xl opacity-[0.03] overflow-hidden" 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 170, 255, 0.5) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(0, 170, 255, 0.5) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Digital circuit pattern */}
      <div className="absolute inset-0 rounded-xl opacity-5 overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230055ff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Animated gradient border on hover */}
      <div 
        className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`}
        style={{
          background: 'transparent',
          backgroundSize: '300% 300%',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderImage: `linear-gradient(90deg, ${color.replace('/20', '/0')}, ${color.replace('/20', '/80')}, ${color.replace('/20', '/0')}) 1`,
          borderImageSlice: 1,
          animation: isHovered ? 'borderPosition 3s infinite linear' : 'none'
        }}
      />
      
      {/* Hover glow effect */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(circle at center, ${color.replace('/20', '/30')} 0%, transparent 70%)`,
        }}
      />
      
      <div className="relative z-20 h-full flex flex-col">
        {/* Icon with futuristic design */}
        <div className="relative mb-6">
          {/* Hexagon background */}
          <div
            className={`w-14 h-14 relative ${color} flex items-center justify-center rounded-lg transform group-hover:scale-110 transition-transform duration-500 overflow-hidden`}
            style={{
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
              boxShadow: `0 0 20px ${color.includes('blue') ? 'rgba(59, 130, 246, 0.5)' : 
                          color.includes('purple') ? 'rgba(124, 58, 237, 0.5)' : 
                          'rgba(16, 185, 129, 0.5)'}`
            }}
          >
            {/* Inner neon effect */}
            <div className="absolute inset-0 opacity-30"
              style={{
                background: `linear-gradient(135deg, ${color.replace('/20', '/0')}, ${color.replace('/20', '/40')})`
              }}
            />
            
            {/* Pulsing light behind icon */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle, ${color.replace('/20', '/70')} 0%, transparent 70%)`,
                animation: isHovered ? 'pulseLight 2s infinite ease-in-out' : 'none'
              }}
            />
            
            {/* Icon */}
            <Icon className="w-6 h-6 relative z-10 text-white" />
          </div>
          
          {/* Tech decoration lines */}
          <div className="absolute h-[1px] w-8 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent top-1/2 -right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute h-[1px] w-8 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent top-1/2 -left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        {/* Content with enhanced styling */}
        <h3 className="text-xl font-bold mb-3 transition-all duration-300"
            style={{
              color: isHovered ? color.replace('/20', '') : '#fff',
              textShadow: isHovered ? `0 0 10px ${color.replace('/20', '/50')}` : 'none'
            }}
        >
          {title}
        </h3>
        
        <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
        
        {/* Bottom glowing line */}
        <div className="mt-auto">
          <div className="w-full h-[1px] bg-[#333333] relative overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-blue-500/70 to-transparent w-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                animation: isHovered ? 'moveGlow 3s infinite linear' : 'none'
              }}
            />
          </div>
          
          {/* Action button with enhanced effect */}
          <div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="flex items-center text-sm font-medium" 
                 style={{ color: color.replace('/20', '') }}>
              <Zap className="w-3 h-3 mr-1 opacity-70" />
              <span>Otevřít</span>
              <ArrowRight className="ml-1 w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx global>{`
        @keyframes shineEffect {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        @keyframes borderPosition {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulseLight {
          0% { opacity: 0.3; transform: scale(0.97); }
          50% { opacity: 0.7; transform: scale(1.03); }
          100% { opacity: 0.3; transform: scale(0.97); }
        }
        
        @keyframes moveGlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
      `}</style>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isDataLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group bg-transparent h-full rounded-xl p-6 border border-[#333333] overflow-hidden hover:border-transparent transition-all duration-500 flex flex-col"
      style={{
        boxShadow: "0 0 30px rgba(0, 0, 0, 0.3)",
      }}
    >
      {slug ? (
        <Link href={promptUrl} className="block absolute inset-0 z-30" aria-label={`Otevřít prompt: ${title}`}>
          <span className="sr-only">Otevřít {title}</span>
        </Link>
      ) : null}
      {cardContent}
    </motion.div>
  );
}