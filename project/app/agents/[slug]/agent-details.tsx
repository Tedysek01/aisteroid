"use client";

import { Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Agent } from "@/lib/data/agents";

export function AgentDetails({ agent }: { agent: Agent | undefined }) {
  if (!agent) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Agent not found</h1>
          <Link href="/agents" className="text-blue-400 hover:text-blue-300">
            View all agents
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-8">
          <Link href="/agents" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
            <ArrowLeft size={20} />
            Back to agents
          </Link>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
          <h1 className="text-4xl font-bold mb-4">{agent.name}</h1>
          
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

          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-8">{agent.description}</p>
            
            <h2 className="text-2xl font-semibold mb-4">How it works</h2>
            <p className="mb-6">
              This AI agent uses advanced natural language processing to understand and execute your requests.
              It&apos;s trained on a vast dataset of {agent.category.toLowerCase()} tasks and can help you achieve
              better results faster.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Advanced AI processing</li>
              <li>Real-time responses</li>
              <li>Customizable outputs</li>
              <li>Integration capabilities</li>
            </ul>

            <div className="aspect-video rounded-lg overflow-hidden bg-black/30 flex items-center justify-center">
              <p className="text-gray-400">Demo video coming soon</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}