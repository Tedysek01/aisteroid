"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AgentService, Agent } from "@/lib/services/agent-service";

export function AddAgentForm() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    shortDescription: "",
    fullDescription: "",
    youtubeUrl: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const agent: Agent = {
        id: formData.slug || String(Date.now()),
        name: formData.name,
        slug: formData.slug,
        category: formData.category,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        youtubeUrl: formData.youtubeUrl || undefined
      };
      
      const agentId = await AgentService.createAgent(agent);
      console.log("Agent uložen do Firebase s ID:", agentId);
      
      // Reset formuláře
      setFormData({
        name: "",
        slug: "",
        category: "",
        shortDescription: "",
        fullDescription: "",
        youtubeUrl: ""
      });
      
      alert(`Agent úspěšně uložen do Firebase! ID: ${agentId}`);
    } catch (error) {
      console.error("Chyba při ukládání agenta do Firebase:", error);
      alert(`Chyba při ukládání agenta: ${error instanceof Error ? error.message : 'Neznámá chyba'}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    setFormData({
      ...formData,
      name,
      slug
    });
  };

  return (
    <div className="bg-[#1C1C1C] p-6 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <Input
            value={formData.name}
            onChange={handleNameChange}
            className="bg-[#242424] border-[#333]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Slug</label>
          <Input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="bg-[#242424] border-[#333]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <Input
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="bg-[#242424] border-[#333]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Short Description</label>
          <Textarea
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            className="bg-[#242424] border-[#333]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Full Description</label>
          <Textarea
            value={formData.fullDescription}
            onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
            className="bg-[#242424] border-[#333]"
            rows={6}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">YouTube Video URL</label>
          <Input
            type="url"
            value={formData.youtubeUrl}
            onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
            className="bg-[#242424] border-[#333]"
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Ukládám..." : "Uložit agenta"}
        </Button>
      </form>
    </div>
  );
}