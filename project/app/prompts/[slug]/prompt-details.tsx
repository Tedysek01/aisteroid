"use client";

import { Tag, ArrowLeft, Code } from "lucide-react";
import Link from "next/link";
import type { Prompt } from "@/lib/services/prompt-service";

export function PromptDetails({ prompt }: { prompt: Prompt | undefined }) {
  if (!prompt) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Hledaný prompt jsme nenašli</h1>
          <Link href="/prompts" className="text-blue-400 hover:text-blue-300">
            Prozkoumat všechny dostupné prompty
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
        <div className="mb-6 sm:mb-8">
          <Link href="/prompts" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
            <ArrowLeft size={20} />
            Zpět na přehled promptů
          </Link>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 shadow-[0_10px_50px_rgba(0,0,0,0.5)] shadow-blue-900/20">
          <div className="bg-[#1a1a1a]/90 backdrop-blur-lg rounded-2xl p-4 sm:p-8 h-full">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="px-3 py-1 rounded-full text-sm bg-white/10 flex items-center gap-1">
                <Tag size={12} />
                <span className="capitalize">{prompt.industry}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">{prompt.title}</h1>
            
            <div className="prose prose-invert max-w-none prose-sm sm:prose-base">
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">{prompt.description}</p>
              
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Jak tento prompt použít</h2>
              <div className="bg-black/30 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 overflow-auto max-h-[400px] sm:max-h-[600px]">
                <pre className="text-sm sm:text-base text-gray-300 whitespace-pre-wrap break-words overflow-hidden">{prompt.promptText}</pre>
              </div>
              
              <div className="mt-8 sm:mt-10">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Získejte maximum z tohoto promptu</h2>
                <p className="mb-3 sm:mb-4">
                  Zkopírujte výše uvedený text a vložte jej přímo do svého oblíbeného AI nástroje. 
                  Prompt je připraven k okamžitému použití - stačí jej vložit a získat výsledky, 
                  které potřebujete.
                </p>
                <p className="mb-3 sm:mb-4">
                  Pro ještě lepší výsledky můžete prompt upravit podle svých specifických potřeb 
                  nebo jej kombinovat s dalšími prompty z naší rozsáhlé knihovny.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}