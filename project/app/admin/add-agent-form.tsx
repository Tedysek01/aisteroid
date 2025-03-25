"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AgentService } from "@/lib/services/agent-service";

const technologies = ["n8n", "Zapier", "Make.com", "Langchain", "Jiné"];
const difficultyLevels = ["Jednoduchý", "Střední", "Složitý"];

export function AddAgentForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    video: "",
    technology: "",
    use_case: "",
    difficulty: "",
    tags: [] as string[],
    category: "AI Agent",
    created_at: new Date().toISOString().split('T')[0]
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const agentId = await AgentService.createAgent(formData);
      
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
        created_at: new Date().toISOString().split('T')[0]
      });
      
      alert(`Agent úspěšně uložen!`);
    } catch (error) {
      console.error("Chyba při ukládání:", error);
      alert(`Chyba při ukládání: ${error instanceof Error ? error.message : 'Neznámá chyba'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags }));
  };

  return (
    <div className="bg-[#1C1C1C] p-6 rounded-lg">
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
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-[#242424] border-[#333]"
            required
          />
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
          <Textarea
            value={formData.use_case}
            onChange={(e) => setFormData({ ...formData, use_case: e.target.value })}
            className="bg-[#242424] border-[#333]"
            rows={4}
          />
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