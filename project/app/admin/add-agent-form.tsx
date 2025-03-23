"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function AddAgentForm() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    shortDescription: "",
    fullDescription: "",
    youtubeUrl: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store in local array
    const agents = JSON.parse(localStorage.getItem("agents") || "[]");
    agents.push({ ...formData, id: Date.now() });
    localStorage.setItem("agents", JSON.stringify(agents));
    
    // Reset form
    setFormData({
      name: "",
      slug: "",
      category: "",
      shortDescription: "",
      fullDescription: "",
      youtubeUrl: ""
    });
    alert("Agent saved successfully!");
  };

  return (
    <div className="bg-[#1C1C1C] p-6 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Save Agent
        </Button>
      </form>
    </div>
  );
}