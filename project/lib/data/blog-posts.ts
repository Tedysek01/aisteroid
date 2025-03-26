export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  coverImage: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
  status: 'draft' | 'published';
  tags?: string[];
  code_embed?: string;
}

// Load posts from localStorage on the client side
export function getBlogPosts(): BlogPost[] {
  if (typeof window === 'undefined') {
    return blogPosts;
  }
  
  try {
    const storedPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
    const publishedPosts = storedPosts.filter((post: BlogPost) => post.status === 'published');
    return [...blogPosts, ...publishedPosts].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return blogPosts;
  }
}

export const blogPosts: BlogPost[] = [
  {
    id: "future-of-ai",
    title: "The Future of AI Agents in 2025",
    excerpt: "Explore how AI agents are revolutionizing workflows and creating new possibilities for businesses and individuals alike.",
    date: "2025-01-15",
    readTime: "5 min read",
    author: "Sarah Chen",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    content: "Full article content here...",
    status: 'published'
  },
  {
    id: "ai-productivity",
    title: "10 Ways AI Can Boost Your Productivity",
    excerpt: "Discover practical applications of AI tools that can help you work smarter, not harder.",
    date: "2025-01-10",
    readTime: "4 min read",
    author: "Michael Rodriguez",
    coverImage: "https://images.unsplash.com/photo-1676277791608-ac54b2c89b03",
    content: "Full article content here...",
    status: 'published'
  },
  {
    id: "ai-ethics",
    title: "Ethics in AI: A Practical Guide",
    excerpt: "Understanding the importance of responsible AI development and implementation in modern applications.",
    date: "2025-01-05",
    readTime: "6 min read",
    author: "Dr. Emily Watson",
    coverImage: "https://images.unsplash.com/photo-1675256023053-94d30e2b9dd3",
    content: "Full article content here...",
    status: 'published'
  }
];