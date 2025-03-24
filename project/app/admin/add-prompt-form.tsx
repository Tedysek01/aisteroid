"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PromptService, Prompt } from "@/lib/services/prompt-service";

const promptCategories = [
  "Práce a produktivita",
  "Copywriting a marketing",
  "SEO a obsah",
  "E-commerce a podnikání",
  "Strategie a plánování",
  "Osobní rozvoj",
  "Komunikace",
  "Vývoj a technologie",
  "Vzdělávání",
  "Kreativita a zábava"
];

export function AddPromptForm() {
  const [formData, setFormData] = useState({
    title: "",
    industry: "",
    description: "",
    promptText: "",
    slug: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Vytvořit prompt v Firebase
      const prompt: Prompt = {
        id: formData.slug || String(Date.now()),
        title: formData.title,
        industry: formData.industry,
        description: formData.description,
        promptText: formData.promptText,
        slug: formData.slug
      };
      
      const promptId = await PromptService.createPrompt(prompt);
      console.log("Prompt uložen do Firebase s ID:", promptId);
      
      // Reset formuláře
      setFormData({
        title: "",
        industry: "",
        description: "",
        promptText: "",
        slug: ""
      });
      
      alert(`Prompt úspěšně uložen do Firebase!\nPrompt ID: ${promptId}`);
    } catch (error) {
      console.error("Chyba při ukládání do Firebase:", error);
      alert(`Chyba při ukládání do Firebase: ${error instanceof Error ? error.message : 'Neznámá chyba'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    setFormData({
      ...formData,
      title,
      slug
    });
  };

  return (
    <div className="bg-[#1C1C1C] p-6 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Název promptu</label>
          <Input
            value={formData.title}
            onChange={handleTitleChange}
            className="bg-[#242424] border-[#333]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">URL Slug</label>
          <Input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="bg-[#242424] border-[#333]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Kategorie</label>
          <Select
            value={formData.industry}
            onValueChange={(value) => setFormData({ ...formData, industry: value })}
          >
            <SelectTrigger className="bg-[#242424] border-[#333]">
              <SelectValue placeholder="Vyberte kategorii" />
            </SelectTrigger>
            <SelectContent className="bg-[#242424] border-[#333]">
              {promptCategories.map((category) => (
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
          <label className="block text-sm font-medium mb-2">Popis promptu</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-[#242424] border-[#333]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Text promptu</label>
          <Textarea
            value={formData.promptText}
            onChange={(e) => setFormData({ ...formData, promptText: e.target.value })}
            className="bg-[#242424] border-[#333]"
            rows={6}
            required
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