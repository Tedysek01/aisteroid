export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  fullDescription?: string;
  examples?: string[];
}

export type PromptCategory = {
  id: string;
  name: string;
  description: string;
};

export const promptCategories: PromptCategory[] = [
  {
    id: "marketing",
    name: "Marketing",
    description: "Prompts for content creation, social media, and marketing campaigns"
  },
  {
    id: "legal",
    name: "Legal",
    description: "Legal document analysis and contract review prompts"
  },
  {
    id: "education",
    name: "Education",
    description: "Educational content and lesson planning prompts"
  },
  {
    id: "business",
    name: "Business",
    description: "Business strategy and analysis prompts"
  }
];

export const prompts: Prompt[] = [
  {
    id: "social-media-content",
    title: "Social Media Content Generator",
    description: "Generate engaging social media posts for multiple platforms",
    category: "marketing",
    fullDescription: "Create platform-specific content that resonates with your audience...",
    examples: [
      "Create a week's worth of Instagram posts for a fitness brand",
      "Generate Twitter threads about AI technology"
    ]
  },
  {
    id: "contract-analyzer",
    title: "Contract Analysis Assistant",
    description: "Analyze legal documents and highlight key terms",
    category: "legal",
    fullDescription: "Review contracts and legal documents with AI assistance...",
    examples: [
      "Review an NDA agreement",
      "Analyze a service contract"
    ]
  },
  {
    id: "lesson-planner",
    title: "Lesson Plan Creator",
    description: "Create detailed lesson plans for any subject",
    category: "education",
    fullDescription: "Generate comprehensive lesson plans with objectives...",
    examples: [
      "Create a science lesson about photosynthesis",
      "Design a math lesson on fractions"
    ]
  }
];