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

export interface Blog {
  id: string;
  slug: string;
  title: string;
  perex: string;
  content: string;
  author: string;
  created_at: string;
  reading_time: number | null;
  cover_image: string | null;
  tags: string[];
  seo_title: string;
  seo_description: string;
}

export class BlogService {
  private static collection = 'blog_posts';
  private static storage = getStorage();

  static async getAllPosts(): Promise<BlogPost[]> {
    try {
      const db = getDb();
      const blogCollectionRef = collection(db, BLOG_COLLECTION);
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
      const blogCollectionRef = collection(db, BLOG_COLLECTION);
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
      const blogCollectionRef = collection(db, BLOG_COLLECTION);
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
    perex: string;
    content: string;
    author: string;
    created_at: string;
    reading_time?: string;
    cover_image?: File | null;
    tags?: string[];
    seo_title?: string;
    seo_description?: string;
  }): Promise<string> {
    try {
      let coverImageUrl = null;
      
      if (data.cover_image) {
        const fileRef = ref(this.storage, `blog-images/${data.cover_image.name}`);
        await uploadBytes(fileRef, data.cover_image);
        coverImageUrl = await getDownloadURL(fileRef);
      }

      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const blogData = {
        title: data.title,
        perex: data.perex,
        content: data.content,
        author: data.author,
        created_at: data.created_at,
        reading_time: data.reading_time ? parseInt(data.reading_time) : null,
        cover_image: coverImageUrl,
        tags: data.tags || [],
        seo_title: data.seo_title || '',
        seo_description: data.seo_description || '',
        slug
      };

      const docRef = doc(collection(getDb(), this.collection), slug);
      await setDoc(docRef, blogData);

      return slug;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
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