"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Shield } from "lucide-react";
import { PromptCard } from "./prompt-card";

const prompts = [
  {
    id: "1",
    title: "Smart Analysis",
    description: "Advanced AI algorithms analyze your content for optimal results",
    icon: Brain,
    color: "bg-blue-500/20",
    delay: 0.2
  },
  {
    id: "2",
    title: "Real-time Processing",
    description: "Get instant results with our optimized processing pipeline",
    icon: Zap,
    color: "bg-purple-500/20",
    delay: 0.4
  },
  {
    id: "3",
    title: "Secure & Private",
    description: "Your data is protected with enterprise-grade security",
    icon: Shield,
    color: "bg-emerald-500/20",
    delay: 0.6
  }
];

export function PromptSection() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-[#121212] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
          >
            Powerful AI Prompts
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            Leverage our advanced prompts to get better results
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              title={prompt.title}
              description={prompt.description}
              icon={prompt.icon}
              color={prompt.color}
              delay={prompt.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}