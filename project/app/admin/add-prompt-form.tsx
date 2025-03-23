"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { BlogPost } from "@/lib/data/blog-posts";

const industries = ["Marketing", "Development", "Legal", "Education", "Business", "Healthcare"];

export function AddPromptForm() {
  const [formData, setFormData] = useState({
    title: "",
    industry: "",
    description: "",
    promptText: "",
    slug: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store prompt in local array
    const prompts = JSON.parse(localStorage.getItem("prompts") || "[]");
    prompts.push({ ...formData, id: Date.now() });
    localStorage.setItem("prompts", JSON.stringify(prompts));
    
    // Create blog post from prompt
    const blogPost: BlogPost = {
      id: formData.slug || String(Date.now()),
      title: formData.title,
      excerpt: formData.description,
      content: `
        <div class="space-y-6">
          <p>${formData.description}</p>
          
          <div class="bg-gray-800 rounded-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Prompt Template</h3>
            <pre class="whitespace-pre-wrap">${formData.promptText}</pre>
          </div>
          
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">
              ${formData.industry}
            </span>
          </div>
        </div>
      `,
      date: new Date().toISOString().split('T')[0],
      readTime: "3 min read",
      author: "AI Prompt Team",
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      status: 'published',
      tags: [formData.industry]
    };

    // Store blog post
    const blogPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
    blogPosts.push(blogPost);
    localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
    
    // Reset form
    setFormData({
      title: "",
      industry: "",
      description: "",
      promptText: "",
      slug: ""
    });
    
    alert("Prompt and blog post saved successfully!");
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
          <label className="block text-sm font-medium mb-2">Title</label>
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
          <label className="block text-sm font-medium mb-2">Industry</label>
          <Select
            value={formData.industry}
            onValueChange={(value) => setFormData({ ...formData, industry: value })}
          >
            <SelectTrigger className="bg-[#242424] border-[#333]">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry.toLowerCase()}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-[#242424] border-[#333]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Prompt Text</label>
          <Textarea
            value={formData.promptText}
            onChange={(e) => setFormData({ ...formData, promptText: e.target.value })}
            className="bg-[#242424] border-[#333]"
            rows={6}
            required
          />
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Save Prompt & Create Blog Post
        </Button>
      </form>
    </div>
  );
}