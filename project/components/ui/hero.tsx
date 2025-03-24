"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-purple-500/20 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="max-w-2xl lg:flex-shrink-0 lg:pt-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-white to-blue-100 bg-clip-text text-transparent"
          >
            AI tě nemá děsit. 
            <br className="hidden sm:block" />
            <span className="sm:inline">Má ti pomoct.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-300"
          >
            Vyber si nástroj, klikni – a nech AI pracovat za tebe.
            <br className="hidden sm:block" />
            <span className="sm:inline">Všechno je připravené a ty si můžeš klidně jen hrát.</span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex items-center gap-x-6"
          >
            <Link
              href="/agents"
              className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Začít používat
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </Link>
            
            <Link href="/blog" className="text-sm font-semibold leading-6 text-white hover:text-blue-400 transition-colors duration-300">
              Více informací <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative mt-16 lg:mt-0 lg:ml-16 flex-1"
        >
          <div className="relative w-full aspect-square max-w-[500px] mx-auto">
            {/* Abstract Neural Network Animation */}
            <div className="absolute inset-0">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#C084FC" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#818CF8" />
                    <stop offset="100%" stopColor="#F472B6" />
                  </linearGradient>
                </defs>
                
                {/* Animated Circles */}
                {[...Array(12)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={100 + Math.cos((i / 6) * Math.PI) * 60}
                    cy={100 + Math.sin((i / 6) * Math.PI) * 60}
                    r="4"
                    fill="url(#gradient1)"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                ))}
                
                {/* Connecting Lines */}
                {[...Array(18)].map((_, i) => (
                  <motion.line
                    key={`line-${i}`}
                    x1={100 + Math.cos((i / 9) * Math.PI) * 60}
                    y1={100 + Math.sin((i / 9) * Math.PI) * 60}
                    x2={100 + Math.cos(((i + 1) / 9) * Math.PI) * 60}
                    y2={100 + Math.sin(((i + 1) / 9) * Math.PI) * 60}
                    stroke="url(#gradient2)"
                    strokeWidth="0.5"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 0.5, 0],
                      pathLength: [0, 1, 0]
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                ))}
                
                {/* Central Node */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="8"
                  fill="url(#gradient1)"
                  initial={{ scale: 0.5 }}
                  animate={{ 
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </svg>
            </div>

            {/* Glowing Orb Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl scale-90 opacity-50 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}