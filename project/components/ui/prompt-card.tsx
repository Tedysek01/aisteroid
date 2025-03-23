"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface PromptCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  delay?: number;
  id?: string; // Make id optional since it's only used for the key prop
}

export function PromptCard({
  title,
  description,
  icon: Icon,
  color,
  delay = 0,
}: PromptCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
    >
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${color}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}