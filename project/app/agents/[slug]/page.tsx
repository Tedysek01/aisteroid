import { Metadata } from 'next';
import { AgentServiceServer } from "@/lib/services/agent-service-server";
import { AgentPageClient } from "./agent-page-client";

// Generování metadat pro stránku agenta
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const agent = await AgentServiceServer.getAgent(params.slug);
  
  if (!agent) {
    return {
      title: 'Agent nenalezen',
      description: 'Požadovaný agent nebyl nalezen.'
    };
  }

  return {
    title: agent.seoTitle || agent.name,
    description: agent.seoDescription || agent.description,
    openGraph: {
      title: agent.seoTitle || agent.name,
      description: agent.seoDescription || agent.description,
      type: 'article',
      locale: 'cs_CZ',
    },
  };
}

export default function AgentPage({ params }: { params: { slug: string } }) {
  return <AgentPageClient slug={params.slug} />;
}