"use client";

import { getDb } from "@/lib/firebase/config";
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  setDoc,
  Firestore
} from "firebase/firestore";

export interface Prompt {
  id: string;
  title: string;
  industry: string;
  description: string;
  promptText: string;
  slug: string;
}

const PROMPT_COLLECTION = "prompts";

// Pomocná funkce pro získání db instance
const getFirestore = (): Firestore => {
  const db = getDb();
  if (!db) {
    throw new Error("Firebase Firestore není inicializován");
  }
  return db;
};

export class PromptService {
  static async getAllPrompts(): Promise<Prompt[]> {
    try {
      const db = getFirestore();
      const promptCollectionRef = collection(db, PROMPT_COLLECTION);
      const snapshot = await getDocs(promptCollectionRef);
      
      const prompts = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id
        } as Prompt;
      });
      
      return prompts;
    } catch (error) {
      console.error('Error loading prompts from Firebase:', error);
      return [];
    }
  }

  static async getPromptBySlug(slug: string): Promise<Prompt | null> {
    try {
      const db = getFirestore();
      const promptCollectionRef = collection(db, PROMPT_COLLECTION);
      const snapshot = await getDocs(promptCollectionRef);
      
      // Zkontrolovat, jestli existuje dokument, který má id shodné se slugem
      const docWithSlugId = snapshot.docs.find(doc => doc.id === slug);
      if (docWithSlugId) {
        const data = docWithSlugId.data();
        return {
          ...data,
          id: docWithSlugId.id
        } as Prompt;
      }
      
      // Pokud nebyl nalezen dokument s id shodným se slugem,
      // zkusit najít dokument, který má pole slug shodné se slugem
      const promptWithSlugField = snapshot.docs.find(doc => {
        const data = doc.data();
        return data.slug === slug;
      });
      
      if (promptWithSlugField) {
        const data = promptWithSlugField.data();
        return {
          ...data,
          id: promptWithSlugField.id
        } as Prompt;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting prompt by slug from Firebase:', error);
      return null;
    }
  }

  static async createPrompt(prompt: Prompt): Promise<string> {
    try {
      const db = getFirestore();
      const promptCollectionRef = collection(db, PROMPT_COLLECTION);
      
      // Použijeme slug jako ID dokumentu v Firebase
      const docRef = doc(promptCollectionRef, prompt.id || prompt.slug);
      await setDoc(docRef, prompt);
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating prompt in Firebase:', error);
      throw new Error('Failed to create prompt in Firebase');
    }
  }

  static async updatePrompt(prompt: Prompt): Promise<void> {
    try {
      const db = getFirestore();
      const docRef = doc(db, PROMPT_COLLECTION, prompt.id);
      await updateDoc(docRef, { ...prompt });
    } catch (error) {
      console.error('Error updating prompt in Firebase:', error);
      throw new Error('Failed to update prompt in Firebase');
    }
  }

  static async deletePrompt(id: string): Promise<void> {
    try {
      const db = getFirestore();
      const docRef = doc(db, PROMPT_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting prompt from Firebase:', error);
      throw new Error('Failed to delete prompt from Firebase');
    }
  }
} 