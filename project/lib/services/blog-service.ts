"use client";

import type { BlogPost } from "@/lib/data/blog-posts";
import { getDb } from "@/lib/firebase/config";
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  setDoc
} from "firebase/firestore";
import { 
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage
} from "firebase/storage";

const BLOG_COLLECTION = "blogPosts";

// Pomocná funkce pro odstranění HTML značek
function stripHtml(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side: jednoduché odstranění HTML značek pomocí regex
    return html.replace(/<[^>]*>/g, '');
  }
  // Client-side: použití DOM API
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: number | null;
  coverImage: string | null;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  status: 'draft' | 'published';
  code_embed?: string;
}

export class BlogService {
  private static collection = BLOG_COLLECTION;
  private static storage = getStorage();

  static async getAllPosts(): Promise<BlogPost[]> {
    try {
      const db = getDb();
      const blogCollectionRef = collection(db, this.collection);
      const snapshot = await getDocs(blogCollectionRef);
      
      const posts = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id
        } as BlogPost;
      });
      
      return posts.sort((a: BlogPost, b: BlogPost) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } catch (error) {
      console.error('Error loading blog posts from Firebase:', error);
      return [];
    }
  }

  static async getPublishedPosts(): Promise<BlogPost[]> {
    try {
      const db = getDb();
      const blogCollectionRef = collection(db, this.collection);
      const q = query(blogCollectionRef, where("status", "==", "published"));
      const snapshot = await getDocs(q);
      
      const posts = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id
        } as BlogPost;
      });
      
      return posts.sort((a: BlogPost, b: BlogPost) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } catch (error) {
      console.error('Error loading published blog posts from Firebase:', error);
      return [];
    }
  }

  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const db = getDb();
      const blogCollectionRef = collection(db, this.collection);
      const snapshot = await getDocs(blogCollectionRef);
      
      const docWithSlugId = snapshot.docs.find(doc => doc.id === slug);
      if (docWithSlugId) {
        const data = docWithSlugId.data();
        return {
          ...data,
          id: docWithSlugId.id
        } as BlogPost;
      }
      
      const postWithSlugField = snapshot.docs.find(doc => {
        const data = doc.data();
        return data.id === slug;
      });
      
      if (postWithSlugField) {
        const data = postWithSlugField.data();
        return {
          ...data,
          id: data.id || postWithSlugField.id
        } as BlogPost;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting post by slug from Firebase:', error);
      return null;
    }
  }

  static async createPost(data: {
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    readTime?: string;
    coverImage?: File | null;
    tags?: string[];
    seoTitle?: string;
    seoDescription?: string;
    code_embed?: string;
  }): Promise<string> {
    try {
      // Validace povinných polí
      if (!data.title || !data.content || !data.author) {
        throw new Error('Chybí povinná pole: název, obsah nebo autor');
      }

      let coverImageUrl = null;
      
      if (data.coverImage) {
        try {
          // Převedení obrázku na Base64
          const reader = new FileReader();
          const base64Promise = new Promise<string>((resolve, reject) => {
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
          });
          reader.readAsDataURL(data.coverImage);
          coverImageUrl = await base64Promise;
        } catch (error) {
          console.error('Chyba při zpracování obrázku:', error);
          // Pokračujeme bez obrázku, pokud se zpracování nezdaří
        }
      }

      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        + '-' + Date.now().toString().slice(-4); // Přidáme unikátní identifikátor

      // Odstraníme HTML značky pouze z SEO polí
      const cleanTitle = stripHtml(data.title);
      const cleanSeoTitle = stripHtml(data.seoTitle || cleanTitle);
      const cleanSeoDescription = stripHtml(data.seoDescription || data.excerpt || '');

      const blogData = {
        title: data.title,
        excerpt: data.excerpt || '',
        content: data.content,
        author: data.author,
        date: data.date || new Date().toISOString(),
        readTime: data.readTime ? parseInt(data.readTime) : null,
        coverImage: coverImageUrl,
        tags: data.tags || [],
        seoTitle: cleanSeoTitle,
        seoDescription: cleanSeoDescription,
        code_embed: data.code_embed || '',
        slug,
        status: 'draft'
      };

      console.log('Ukládám data do Firebase:', blogData);
      const docRef = doc(collection(getDb(), this.collection), slug);
      await setDoc(docRef, blogData);
      console.log('Blog úspěšně uložen do Firebase');

      return slug;
    } catch (error) {
      console.error('Chyba při vytváření blogu:', error);
      if (error instanceof Error) {
        throw new Error(`Chyba při ukládání blogu: ${error.message}`);
      }
      throw new Error('Nepodařilo se vytvořit blog - neznámá chyba');
    }
  }

  static async getPost(slug: string): Promise<Blog | null> {
    try {
      const docRef = doc(collection(getDb(), this.collection), slug);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Blog;
      }
      return null;
    } catch (error) {
      console.error('Error getting blog:', error);
      throw error;
    }
  }

  static async updatePost(slug: string, data: Partial<Blog>): Promise<void> {
    try {
      const docRef = doc(collection(getDb(), this.collection), slug);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  }

  static async deletePost(slug: string): Promise<void> {
    try {
      const docRef = doc(collection(getDb(), this.collection), slug);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  }
}