"use client";

import { Tag, ArrowLeft, Code } from "lucide-react";
import Link from "next/link";
import type { Prompt } from "@/lib/data/prompts";

export function PromptDetails({ prompt }: { prompt: Prompt | undefined }) {
  if (!prompt) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Prompt not found</h1>
          <Link href="/prompts" className="text-blue-400 hover:text-blue-300">
            View all prompts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-8">
          <Link href="/prompts" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
            <ArrowLeft size={20} />
            Back to prompts
          </Link>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-sm bg-white/10 flex items-center gap-1">
              <Tag size={12} />
              <span className="capitalize">{prompt.category}</span>
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-6">{prompt.title}</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-8">{prompt.description}</p>
            
            <h2 className="text-2xl font-semibold mb-4">Full Description</h2>
            <p className="mb-8">{prompt.fullDescription}</p>

            <h2 className="text-2xl font-semibold mb-4">Example Usage</h2>
            <div className="bg-black/30 rounded-lg p-6 mb-8">
              {prompt.examples?.map((example, index) => (
                <div key={index} className="flex items-start gap-3 mb-4 last:mb-0">
                  <Code size={20} className="mt-1" />
                  <p className="text-gray-300">{example}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}