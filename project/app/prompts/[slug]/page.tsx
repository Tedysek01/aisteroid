import { Metadata } from 'next';
import { PromptServiceServer } from "@/lib/services/prompt-service-server";
import { PromptPageClient } from "./prompt-page-client";

// Generování metadat pro stránku promptu
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const prompt = await PromptServiceServer.getPrompt(params.slug);
  
  if (!prompt) {
    return {
      title: 'Prompt nenalezen',
      description: 'Požadovaný prompt nebyl nalezen.'
    };
  }

  return {
    title: prompt.seoTitle || prompt.title,
    description: prompt.seoDescription || prompt.description,
    openGraph: {
      title: prompt.seoTitle || prompt.title,
      description: prompt.seoDescription || prompt.description,
      type: 'article',
      locale: 'cs_CZ',
    },
  };
}

export default function PromptPage({ params }: { params: { slug: string } }) {
  return <PromptPageClient slug={params.slug} />;
}