"use client";

import { AgentDetails } from "./agent-details";
import { useState, useEffect } from "react";
import { AgentService } from "@/lib/services/agent-service";
import type { Agent } from "@/lib/services/agent-service";

export default function AgentPage({ params }: { params: { slug: string } }) {
  const [agent, setAgent] = useState<Agent | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        setLoading(true);
        const agentData = await AgentService.getAgentBySlug(params.slug);
        setAgent(agentData || undefined);
      } catch (error) {
        console.error("Chyba při načítání agenta:", error);
        setAgent(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="animate-pulse text-2xl">Načítám agenta...</div>
      </div>
    );
  }

  return <AgentDetails agent={agent} />;
}