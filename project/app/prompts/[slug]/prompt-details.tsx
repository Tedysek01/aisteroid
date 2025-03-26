"use client";

import { Tag, ArrowLeft, Code, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import type { Prompt } from "@/lib/services/prompt-service";
import { useState } from "react";

// Pomocná funkce pro převod HTML na čistý text
function htmlToPlainText(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export function PromptDetails({ prompt }: { prompt: Prompt | undefined }) {
  const [showPlainText, setShowPlainText] = useState(false);

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
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-sm bg-white/10 flex items-center gap-1">
                  <Tag size={12} />
                  <span className="capitalize">{prompt.category}</span>
                </span>
              </div>
              <button
                onClick={() => setShowPlainText(!showPlainText)}
                className="px-3 py-1 rounded-full text-sm bg-white/10 hover:bg-white/20 flex items-center gap-1 transition-colors"
              >
                {showPlainText ? (
                  <>
                    <EyeOff size={12} />
                    <span>Zobrazit formátování</span>
                  </>
                ) : (
                  <>
                    <Eye size={12} />
                    <span>Zobrazit čistý text</span>
                  </>
                )}
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">{prompt.title}</h1>
            
            <div className="prose prose-invert max-w-none prose-sm sm:prose-base">
              <div 
                className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8"
              >
                {showPlainText ? htmlToPlainText(prompt.description) : (
                  <div dangerouslySetInnerHTML={{ __html: prompt.description }} />
                )}
              </div>
              
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Jak tento prompt použít</h2>
              <div className="bg-black/30 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 overflow-auto max-h-[400px] sm:max-h-[600px]">
                <div className="text-sm sm:text-base text-gray-300 whitespace-pre-wrap break-words overflow-hidden">
                  {showPlainText ? htmlToPlainText(prompt.prompt) : (
                    <div dangerouslySetInnerHTML={{ __html: prompt.prompt }} />
                  )}
                </div>
              </div>
              
              <div className="mt-8 sm:mt-10">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Příklad výstupu</h2>
                <div className="bg-black/30 rounded-lg p-4 sm:p-6 mb-6">
                  {showPlainText ? htmlToPlainText(prompt.example_output) : (
                    <div dangerouslySetInnerHTML={{ __html: prompt.example_output }} />
                  )}
                </div>
              </div>

              <div className="mt-8 sm:mt-10">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Jak prompt upravit</h2>
                <div className="bg-black/30 rounded-lg p-4 sm:p-6">
                  {showPlainText ? htmlToPlainText(prompt.instructions) : (
                    <div dangerouslySetInnerHTML={{ __html: prompt.instructions }} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}