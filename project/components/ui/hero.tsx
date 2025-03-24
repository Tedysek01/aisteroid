"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 via-purple-500/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500/20 via-purple-500/20 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-16 sm:pb-24 lg:flex lg:px-8 lg:py-40">
        <div className="max-w-2xl mx-auto lg:mx-0 lg:flex-shrink-0 lg:pt-8 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
          >
            <span className="block">AI tě nemá děsit.</span>
            <span className="block">Má ti pomoct.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 sm:mt-6 leading-7 sm:leading-8 text-pink-100 text-center lg:text-left"
          >
            <span className="block text-[clamp(14px,2.5vw,20px)]">Vyber si nástroj, klikni – a nech AI pracovat za tebe.</span>
            <span className="block text-[clamp(14px,2.5vw,20px)]">Všechno je připravené a ty si můžeš klidně jen hrát.</span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 sm:mt-10 flex flex-col items-center gap-y-4 sm:flex-row sm:gap-x-6 lg:justify-start relative z-10"
            style={{ contentVisibility: 'auto' }}
          >
            <Link
              href="/agents"
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/50 transition-all duration-300 overflow-hidden"
              prefetch={false}
            >
              <span className="relative z-10 flex items-center gap-2">
                Začít používat
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </Link>
            
            <Link 
              href="/blog" 
              className="text-sm font-semibold leading-6 text-pink-200 hover:text-pink-300 transition-colors duration-300 relative z-10"
              prefetch={false}
            >
              Více informací <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative -mt-8 sm:-mt-12 lg:mt-0 lg:ml-16 flex-1 flex justify-center lg:justify-end z-0"
          style={{ contentVisibility: 'auto' }}
        >
          <div className="relative w-full aspect-square max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] mx-auto">
            {/* Abstract Neural Network Animation */}
            <div className="absolute inset-0">
              <svg viewBox="0 0 200 200" className="w-full h-full" style={{ contentVisibility: 'auto' }}>
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F472B6" />
                    <stop offset="100%" stopColor="#F43F5E" />
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
                    style={{ contentVisibility: 'auto' }}
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
                    style={{ contentVisibility: 'auto' }}
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
                  style={{ contentVisibility: 'auto' }}
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}