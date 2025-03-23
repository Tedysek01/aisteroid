export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
}

export const agents: Agent[] = [
  {
    id: "content-writer",
    name: "Content Writer Pro",
    description: "Generate engaging blog posts, articles, and social media content with AI-powered writing assistance.",
    category: "Content",
    tags: ["Writing", "Marketing", "SEO"]
  },
  {
    id: "data-analyst",
    name: "Data Insight Agent",
    description: "Analyze complex datasets and generate actionable insights with advanced data visualization.",
    category: "Analytics",
    tags: ["Data", "Business", "Reports"]
  },
  {
    id: "code-assistant",
    name: "Code Companion",
    description: "Your AI programming partner for code review, debugging, and optimization suggestions.",
    category: "Development",
    tags: ["Coding", "Development", "AI"]
  },
  {
    id: "image-enhancer",
    name: "Image Enhancement AI",
    description: "Enhance and optimize images with AI-powered editing and style transfer capabilities.",
    category: "Graphics",
    tags: ["Images", "Design", "AI"]
  },
  {
    id: "research-assistant",
    name: "Research Navigator",
    description: "Streamline research processes with intelligent document analysis and summary generation.",
    category: "Research",
    tags: ["Academic", "Analysis", "Writing"]
  }
];