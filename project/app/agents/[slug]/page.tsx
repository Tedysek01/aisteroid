import { agents } from "@/lib/data/agents";
import { AgentDetails } from "./agent-details";

export function generateStaticParams() {
  return agents.map((agent) => ({
    slug: agent.id,
  }));
}

export default function AgentPage({ params }: { params: { slug: string } }) {
  const agent = agents.find(a => a.id === params.slug);
  return <AgentDetails agent={agent} />;
}