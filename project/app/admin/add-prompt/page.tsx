"use client";

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import dynamic from 'next/dynamic';
import { PromptService, PROMPT_CATEGORIES } from "@/lib/services/prompt-service";

const TipTap = dynamic(() => import('@/components/TipTap'), { ssr: false });

const difficultyLevels = ["Začátečník", "Pokročilý", "Expert"];

export default function AddPromptPage() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    prompt: "",
    video: "",
    category: "",
    difficulty: "",
    example_output: "",
    instructions: "",
    created_at: new Date().toISOString().split('T')[0],
    seoTitle: "",
    seoDescription: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Automaticky generovat slug z titulku
  useEffect(() => {
    if (formData.title && !formData.slug) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, formData.slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Odesílám data:', formData);
      const promptId = await PromptService.createPrompt(formData);
      console.log('Prompt vytvořen s ID:', promptId);

      // Reset formuláře
      setFormData({
        title: "",
        slug: "",
        description: "",
        prompt: "",
        video: "",
        category: "",
        difficulty: "",
        example_output: "",
        instructions: "",
        created_at: new Date().toISOString().split('T')[0],
        seoTitle: "",
        seoDescription: ""
      });

      alert('Prompt byl úspěšně přidán!');
    } catch (error) {
      console.error('Detailní chyba při přidávání promptu:', error);
      alert(`Nepodařilo se přidat prompt: ${error instanceof Error ? error.message : 'Neznámá chyba'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Přidat nový prompt</h1>
      
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
          <label className="block text-sm font-medium mb-2">URL slug</label>
          <Input
            value={formData.slug}
            onChange={(e) => {
              const newSlug = e.target.value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
              setFormData({ ...formData, slug: newSlug });
            }}
            className="bg-[#242424] border-[#333]"
            placeholder="napr-muj-prompt"
            required
          />
          <p className="text-sm text-gray-400 mt-1">
            URL slug se automaticky generuje z názvu, ale můžete ho upravit
          </p>
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
          <label className="block text-sm font-medium mb-2">Prompt</label>
          <div className="bg-[#242424] border-[#333] rounded-md">
            <TipTap
              content={formData.prompt}
              onChange={(content) => setFormData({ ...formData, prompt: content })}
              required
              rows={8}
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
          <label className="block text-sm font-medium mb-2">Kategorie</label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger className="bg-[#242424] border-[#333]">
              <SelectValue placeholder="Vyberte kategorii" />
            </SelectTrigger>
            <SelectContent className="bg-[#242424] border-[#333]">
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
          <div className="bg-[#242424] border-[#333] rounded-md">
            <TipTap
              content={formData.example_output}
              onChange={(content) => setFormData({ ...formData, example_output: content })}
              rows={6}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Jak prompt použít/upravit</label>
          <div className="bg-[#242424] border-[#333] rounded-md">
            <TipTap
              content={formData.instructions}
              onChange={(content) => setFormData({ ...formData, instructions: content })}
              rows={6}
            />
          </div>
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
            placeholder="Pokud není vyplněno, použije se název promptu"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">SEO popis</label>
          <div className="bg-[#242424] border-[#333] rounded-md">
            <TipTap
              content={formData.seoDescription}
              onChange={(content) => setFormData({ ...formData, seoDescription: content })}
              rows={4}
            />
          </div>
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