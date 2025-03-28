import { getDb } from "@/lib/firebase/config";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export interface BlogPost {
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

export class BlogServiceServer {
  static async getPost(slug: string): Promise<BlogPost | null> {
    try {
      const db = getDb();
      const blogCollectionRef = collection(db, "blog_posts");
      const snapshot = await getDocs(blogCollectionRef);
      
      // Zkontrolovat, jestli existuje dokument, který má id shodné se slugem
      const docWithSlugId = snapshot.docs.find(doc => doc.id === slug);
      if (docWithSlugId) {
        const data = docWithSlugId.data();
        return {
          ...data,
          id: docWithSlugId.id
        } as BlogPost;
      }
      
      // Pokud nebyl nalezen dokument s id shodným se slugem,
      // zkusit najít dokument, který má pole slug shodné se slugem
      const postWithSlugField = snapshot.docs.find(doc => {
        const data = doc.data();
        return data.slug === slug;
      });
      
      if (postWithSlugField) {
        const data = postWithSlugField.data();
        return {
          ...data,
          id: postWithSlugField.id
        } as BlogPost;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting blog post by slug from Firebase:', error);
      return null;
    }
  }
} 