"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AgentService } from "@/lib/services/agent-service";
import dynamic from 'next/dynamic';

const TipTap = dynamic(() => import('@/components/TipTap'), { ssr: false });

const technologies = ["n8n", "Zapier", "Make.com", "Langchain", "Jiné"];
const difficultyLevels = ["Jednoduchý", "Střední", "Složitý"];

export default function AddAgentPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    video: "",
    technology: "",
    use_case: "",
    difficulty: "",
    tags: [] as string[],
    category: "AI Agent",
    created_at: new Date().toISOString().split('T')[0],
    seoTitle: "",
    seoDescription: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Odesílám data:', formData);
      const agentId = await AgentService.createAgent(formData);
      console.log('Agent vytvořen s ID:', agentId);

      // Reset formuláře
      setFormData({
        name: "",
        description: "",
        video: "",
        technology: "",
        use_case: "",
        difficulty: "",
        tags: [],
        category: "AI Agent",
        created_at: new Date().toISOString().split('T')[0],
        seoTitle: "",
        seoDescription: ""
      });

      alert('Agent byl úspěšně přidán!');
    } catch (error) {
      console.error('Detailní chyba při přidávání agenta:', error);
      alert(`Nepodařilo se přidat agenta: ${error instanceof Error ? error.message : 'Neznámá chyba'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Přidat nového agenta</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Název</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-[#242424] border-[#333]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Krátký popis</label>
          <div className="bg-[#242424] border-[#333] rounded-md">
            <TipTap
              content={formData.description}
              onChange={(content) => setFormData({ ...formData, description: content })}
              required
              rows={4}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Video (odkaz)</label>
          <Input
            type="url"
            value={formData.video}
            onChange={(e) => setFormData({ ...formData, video: e.target.value })}
            className="bg-[#242424] border-[#333]"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Použitá technologie</label>
          <Select
            value={formData.technology}
            onValueChange={(value) => setFormData({ ...formData, technology: value })}
          >
            <SelectTrigger className="bg-[#242424] border-[#333]">
              <SelectValue placeholder="Vyberte technologii" />
            </SelectTrigger>
            <SelectContent className="bg-[#242424] border-[#333]">
              {technologies.map((tech) => (
                <SelectItem 
                  key={tech} 
                  value={tech}
                  className="hover:bg-[#333]"
                >
                  {tech}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Use-case / problém, který řeší</label>
          <div className="bg-[#242424] border-[#333] rounded-md">
            <TipTap
              content={formData.use_case}
              onChange={(content) => setFormData({ ...formData, use_case: content })}
              required
              rows={6}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Obtížnost nastavení</label>
          <Select
            value={formData.difficulty}
            onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
          >
            <SelectTrigger className="bg-[#242424] border-[#333]">
              <SelectValue placeholder="Vyberte obtížnost" />
            </SelectTrigger>
            <SelectContent className="bg-[#242424] border-[#333]">
              {difficultyLevels.map((level) => (
                <SelectItem 
                  key={level} 
                  value={level}
                  className="hover:bg-[#333]"
                >
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tagy</label>
          <Input
            type="text"
            value={formData.tags.join(', ')}
            onChange={handleTagsChange}
            className="bg-[#242424] border-[#333]"
            placeholder="Zadejte tagy oddělené čárkou"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Datum přidání</label>
          <Input
            type="date"
            value={formData.created_at}
            onChange={(e) => setFormData({ ...formData, created_at: e.target.value })}
            className="bg-[#242424] border-[#333]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">SEO titulek</label>
          <Input
            value={formData.seoTitle}
            onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
            className="bg-[#242424] border-[#333]"
            placeholder="Pokud není vyplněno, použije se název agenta"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">SEO popis</label>
          <div className="bg-[#242424] border-[#333] rounded-md">
            <TipTap
              content={formData.seoDescription}
              onChange={(content) => setFormData({ ...formData, seoDescription: content })}
              rows={4}
              placeholder="Pokud není vyplněno, použije se krátký popis"
            />
          </div>
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