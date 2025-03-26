"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';
import { BlogService } from "@/lib/services/blog-service";
import { Textarea } from "@/components/ui/textarea";

const TipTap = dynamic(() => import('@/components/TipTap'), { ssr: false });

export default function AddBlogPage() {
  const [formData, setFormData] = useState({
    title: "",
    perex: "",
    content: "",
    author: "",
    created_at: new Date().toISOString().split('T')[0],
    reading_time: "",
    cover_image: null as File | null,
    tags: [] as string[],
    seo_title: "",
    seo_description: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validace povinných polí
      if (!formData.title.trim()) {
        throw new Error('Název článku je povinný');
      }
      if (!formData.content.trim()) {
        throw new Error('Obsah článku je povinný');
      }
      if (!formData.author.trim()) {
        throw new Error('Autor je povinný');
      }

      console.log('Odesílám data:', formData);
      const blogId = await BlogService.createPost(formData);
      console.log('Blog vytvořen s ID:', blogId);

      // Reset formuláře
      setFormData({
        title: "",
        perex: "",
        content: "",
        author: "",
        created_at: new Date().toISOString().split('T')[0],
        reading_time: "",
        cover_image: null,
        tags: [],
        seo_title: "",
        seo_description: ""
      });

      alert('Blog byl úspěšně přidán!');
    } catch (error) {
      console.error('Detailní chyba při přidávání blogu:', error);
      const errorMessage = error instanceof Error ? error.message : 'Neznámá chyba při ukládání blogu';
      alert(`Nepodařilo se přidat blog: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, cover_image: file }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Přidat nový blog</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Název článku</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="bg-[#242424] border-[#333]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Krátký úvod / perex</label>
          <div className="bg-[#242424] border-[#333] rounded-md">
            <TipTap
              content={formData.perex}
              onChange={(content) => setFormData({ ...formData, perex: content })}
              required
              rows={4}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Obsah článku</label>
          <div className="bg-[#242424] border-[#333] rounded-md">
            <TipTap
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              required
              rows={8}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Autor</label>
          <Input
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="bg-[#242424] border-[#333]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Datum přidání</label>
          <Input
            type="date"
            value={formData.created_at}
            onChange={(e) => setFormData({ ...formData, created_at: e.target.value })}
            className="bg-[#242424] border-[#333]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Doba čtení (v minutách)</label>
          <Input
            type="number"
            value={formData.reading_time}
            onChange={(e) => setFormData({ ...formData, reading_time: e.target.value })}
            className="bg-[#242424] border-[#333]"
            placeholder="Např. 5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Náhledový obrázek</label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="bg-[#242424] border-[#333]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tagy / Kategorie</label>
          <Input
            type="text"
            value={formData.tags.join(', ')}
            onChange={handleTagsChange}
            className="bg-[#242424] border-[#333]"
            placeholder="Zadejte tagy oddělené čárkou"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">SEO titulek</label>
          <Input
            value={formData.seo_title}
            onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
            className="bg-[#242424] border-[#333]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">SEO popis</label>
          <div className="bg-[#242424] border-[#333] rounded-md">
            <TipTap
              content={formData.seo_description}
              onChange={(content) => setFormData({ ...formData, seo_description: content })}
              rows={4}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Ukládám..." : "Uložit blog"}
        </Button>
      </form>
    </div>
  );
} 