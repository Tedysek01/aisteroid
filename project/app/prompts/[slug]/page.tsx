"use client";

import { useState, useEffect } from "react";
import { PromptDetails } from "./prompt-details";
import { PromptService } from "@/lib/services/prompt-service";
import type { Prompt } from "@/lib/services/prompt-service";

export default function PromptPage({ params }: { params: { slug: string } }) {
  const [prompt, setPrompt] = useState<Prompt | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        setLoading(true);
        const promptData = await PromptService.getPrompt(params.slug);
        setPrompt(promptData || undefined);
      } catch (error) {
        console.error("Chyba při načítání promptu:", error);
        setPrompt(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompt();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="animate-pulse text-2xl">Načítám prompt...</div>
      </div>
    );
  }

  return <PromptDetails prompt={prompt} />;
}