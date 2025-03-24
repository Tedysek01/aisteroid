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
  setDoc,
  Firestore
} from "firebase/firestore";

const BLOG_COLLECTION = "blogPosts";

// Pomocná funkce pro získání db instance
const getFirestore = (): Firestore => {
  const db = getDb();
  if (!db) {
    throw new Error("Firebase Firestore není inicializován");
  }
  return db;
};

export class BlogService {
  static async getAllPosts(): Promise<BlogPost[]> {
    try {
      const db = getFirestore();
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
      const db = getFirestore();
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
      const db = getFirestore();
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

  static async createPost(post: BlogPost): Promise<string> {
    try {
      const db = getFirestore();
      const blogCollectionRef = collection(db, BLOG_COLLECTION);
      
      const docRef = doc(blogCollectionRef, post.id);
      await setDoc(docRef, post);
      
      return post.id;
    } catch (error) {
      console.error('Error creating blog post in Firebase:', error);
      throw new Error('Failed to create blog post in Firebase');
    }
  }

  static async updatePost(post: BlogPost): Promise<void> {
    try {
      const db = getFirestore();
      const docRef = doc(db, BLOG_COLLECTION, post.id);
      await updateDoc(docRef, { ...post });
    } catch (error) {
      console.error('Error updating blog post in Firebase:', error);
      throw new Error('Failed to update blog post in Firebase');
    }
  }

  static async deletePost(id: string): Promise<void> {
    try {
      const db = getFirestore();
      const docRef = doc(db, BLOG_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting blog post from Firebase:', error);
      throw new Error('Failed to delete blog post from Firebase');
    }
  }
}