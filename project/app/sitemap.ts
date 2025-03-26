import { MetadataRoute } from 'next'
import { getDb } from '@/lib/firebase/config'
import { collection, getDocs } from 'firebase/firestore'

// Pomocná funkce pro bezpečné získání data
const getValidDate = (dateValue: any): Date => {
  if (!dateValue) return new Date()
  try {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue)
    return isNaN(date.getTime()) ? new Date() : date
  } catch {
    return new Date()
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = getDb()
  if (!db) {
    throw new Error('Firebase není inicializován')
  }

  // Získání všech blogových příspěvků
  const blogPostsSnapshot = await getDocs(collection(db, 'blog_posts'))
  const blogPosts = blogPostsSnapshot.docs.map(doc => ({
    slug: doc.data().slug,
    updated_at: getValidDate(doc.data().updated_at)
  }))
  
  // Získání všech agentů
  const agentsSnapshot = await getDocs(collection(db, 'agents'))
  const agents = agentsSnapshot.docs.map(doc => ({
    slug: doc.data().slug,
    updated_at: getValidDate(doc.data().updated_at)
  }))
  
  // Získání všech promptů
  const promptsSnapshot = await getDocs(collection(db, 'prompts'))
  const prompts = promptsSnapshot.docs.map(doc => ({
    slug: doc.data().slug,
    updated_at: getValidDate(doc.data().updated_at)
  }))

  // Základní statické stránky
  const staticPages = [
    {
      url: 'https://www.aisteroid.cz',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://www.aisteroid.cz/agents',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://www.aisteroid.cz/prompts',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://www.aisteroid.cz/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://www.aisteroid.cz/kontakt',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Generování URL pro blogové příspěvky
  const blogUrls = blogPosts.map(post => ({
    url: `https://www.aisteroid.cz/blog/${post.slug}`,
    lastModified: post.updated_at,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Generování URL pro agenty
  const agentUrls = agents.map(agent => ({
    url: `https://www.aisteroid.cz/agents/${agent.slug}`,
    lastModified: agent.updated_at,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Generování URL pro prompty
  const promptUrls = prompts.map(prompt => ({
    url: `https://www.aisteroid.cz/prompts/${prompt.slug}`,
    lastModified: prompt.updated_at,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogUrls, ...agentUrls, ...promptUrls]
} 