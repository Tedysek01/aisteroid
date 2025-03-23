"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { prompts, promptCategories } from "@/lib/data/prompts";
import { Tag, Filter } from "lucide-react";
import Link from "next/link";

export default function PromptsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPrompts = selectedCategory
    ? prompts.filter(p => p.category === selectedCategory)
    : prompts;

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h1 className="text-5xl font-bold">Prompts</h1>
          
          <div className="flex items-center gap-4">
            <Filter size={20} />
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  !selectedCategory
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                All
              </button>
              {promptCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-blue-500 text-white"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrompts.map((prompt, index) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold mb-3">{prompt.title}</h2>
              <p className="text-gray-300 mb-4">{prompt.description}</p>
              
              <div className="flex items-center gap-2 mb-6">
                <Tag size={16} />
                <span className="capitalize">{prompt.category}</span>
              </div>
              
              <Link
                href={`/prompts/${prompt.id}`}
                className="inline-block w-full py-2 px-4 text-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 transition-all duration-300 font-medium"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}