"use client";

import { motion } from "framer-motion";
import { agents } from "@/lib/data/agents";
import { Tag } from "lucide-react";
import Link from "next/link";

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold mb-12">AI Agents</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold mb-3">{agent.name}</h2>
              <p className="text-gray-300 mb-4">{agent.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {agent.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm bg-white/10 flex items-center gap-1"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
              
              <Link
                href={`/agents/${agent.id}`}
                className="inline-block w-full py-2 px-4 text-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 transition-all duration-300 font-medium"
              >
                Learn more
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}