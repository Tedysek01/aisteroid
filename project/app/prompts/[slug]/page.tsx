import { prompts } from "@/lib/data/prompts";
import { PromptDetails } from "./prompt-details";

export function generateStaticParams() {
  return prompts.map((prompt) => ({
    slug: prompt.id,
  }));
}

export default function PromptPage({ params }: { params: { slug: string } }) {
  const prompt = prompts.find(p => p.id === params.slug);
  return <PromptDetails prompt={prompt} />;
}