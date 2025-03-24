import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Získání všech blogových příspěvků
  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
  
  // Získání všech agentů
  const { data: agents } = await supabase
    .from('agents')
    .select('slug, updated_at')
  
  // Získání všech promptů
  const { data: prompts } = await supabase
    .from('prompts')
    .select('slug, updated_at')

  // Základní statické stránky
  const staticPages = [
    {
      url: 'https://aisteroid.cz',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://aisteroid.cz/agents',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://aisteroid.cz/prompts',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://aisteroid.cz/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://aisteroid.cz/kontakt',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Generování URL pro blogové příspěvky
  const blogUrls = blogPosts?.map(post => ({
    url: `https://aisteroid.cz/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  })) || []

  // Generování URL pro agenty
  const agentUrls = agents?.map(agent => ({
    url: `https://aisteroid.cz/agents/${agent.slug}`,
    lastModified: new Date(agent.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  })) || []

  // Generování URL pro prompty
  const promptUrls = prompts?.map(prompt => ({
    url: `https://aisteroid.cz/prompts/${prompt.slug}`,
    lastModified: new Date(prompt.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  })) || []

  return [...staticPages, ...blogUrls, ...agentUrls, ...promptUrls]
} 