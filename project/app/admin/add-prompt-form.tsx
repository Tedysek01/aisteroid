"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PromptService, PROMPT_CATEGORIES } from "@/lib/services/prompt-service";

const difficultyLevels = ["Začátečník", "Pokročilý", "Expert"];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function AddPromptForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    prompt: "",
    video: "",
    category: "",
    difficulty: "",
    example_output: "",
    instructions: "",
    created_at: new Date().toISOString().split('T')[0]
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const slug = generateSlug(formData.title);
      const promptId = await PromptService.createPrompt({
        ...formData,
        slug
      });
      
      // Reset formuláře
      setFormData({
        title: "",
        description: "",
        prompt: "",
        video: "",
        category: "",
        difficulty: "",
        example_output: "",
        instructions: "",
        created_at: new Date().toISOString().split('T')[0]
      });
      
      alert(`Prompt úspěšně uložen!`);
    } catch (error) {
      console.error("Chyba při ukládání:", error);
      alert(`Chyba při ukládání: ${error instanceof Error ? error.message : 'Neznámá chyba'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1C1C1C] p-6 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Název</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
          <label className="block text-sm font-medium mb-2">Prompt</label>
          <Textarea
            value={formData.prompt}
            onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
            className="bg-[#242424] border-[#333]"
            rows={6}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Video (odkaz nebo upload)</label>
          <Input
            type="url"
            value={formData.video}
            onChange={(e) => setFormData({ ...formData, video: e.target.value })}
            className="bg-[#242424] border-[#333]"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Kategorie</label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger className="bg-[#242424] border-[#333] w-[300px]">
              <SelectValue placeholder="Vyberte kategorii" />
            </SelectTrigger>
            <SelectContent className="bg-[#242424] border-[#333] w-[300px]">
              {PROMPT_CATEGORIES.map((category) => (
                <SelectItem 
                  key={category} 
                  value={category}
                  className="hover:bg-[#333]"
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Obtížnost</label>
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
          <label className="block text-sm font-medium mb-2">Příklad výstupu</label>
          <Textarea
            value={formData.example_output}
            onChange={(e) => setFormData({ ...formData, example_output: e.target.value })}
            className="bg-[#242424] border-[#333]"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Jak prompt použít/upravit</label>
          <Textarea
            value={formData.instructions}
            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            className="bg-[#242424] border-[#333]"
            rows={4}
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
          {isSubmitting ? "Ukládám..." : "Uložit prompt"}
        </Button>
      </form>
    </div>
  );
}