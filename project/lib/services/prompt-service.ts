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
  setDoc
} from "firebase/firestore";

export interface Prompt {
  id: string;
  slug: string;
  title: string;
  description: string;
  prompt: string;
  video: string | null;
  category: string;
  difficulty: string;
  example_output: string;
  instructions: string;
  created_at: string;
  seoTitle?: string;
  seoDescription?: string;
}

// Seznam kategorií promptů
export const PROMPT_CATEGORIES = [
  "Vytvořit obsah (reels, texty, scénáře)",
  "Naučit se nebo vysvětlit téma",
  "Navrhnout nebo ověřit nápad",
  "Zautomatizovat úkol pomocí AI",
  "Zlepšit psaní a komunikaci",
  "Analyzovat, porovnat, rozhodnout se",
  "Vymyslet název, pitch nebo strukturu",
  "Připravit prezentaci, výpisky, výuku",
  "Vylepšit svůj výstup"
];

export class PromptService {
  private static collection = 'prompts';

  static async createPrompt(data: {
    title: string;
    slug: string;
    description: string;
    prompt: string;
    video?: string;
    category?: string;
    difficulty?: string;
    example_output?: string;
    instructions?: string;
    created_at?: string;
    seoTitle?: string;
    seoDescription?: string;
  }): Promise<string> {
    try {
      console.log('Vstupní data pro vytvoření promptu:', data);

      const promptData = {
        title: data.title,
        description: data.description || '',
        prompt: data.prompt || '',
        video: data.video || null,
        category: data.category || '',
        difficulty: data.difficulty || '',
        example_output: data.example_output || '',
        instructions: data.instructions || '',
        created_at: data.created_at || new Date().toISOString(),
        slug: data.slug,
        seoTitle: data.seoTitle || '',
        seoDescription: data.seoDescription || ''
      };

      console.log('Data pro uložení do Firebase:', promptData);

      const docRef = doc(collection(getDb(), this.collection), data.slug);
      await setDoc(docRef, promptData);

      return data.slug;
    } catch (error) {
      console.error('Detailní chyba při vytváření promptu:', error);
      throw error;
    }
  }

  static async getPrompt(slug: string): Promise<Prompt | null> {
    try {
      const docRef = doc(collection(getDb(), this.collection), slug);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Prompt;
      }
      return null;
    } catch (error) {
      console.error('Error getting prompt:', error);
      throw error;
    }
  }

  static async getAllPrompts(): Promise<Prompt[]> {
    try {
      const querySnapshot = await getDocs(collection(getDb(), this.collection));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Prompt[];
    } catch (error) {
      console.error('Error getting prompts:', error);
      throw error;
    }
  }

  static async updatePrompt(slug: string, data: Partial<Prompt>): Promise<void> {
    try {
      const docRef = doc(collection(getDb(), this.collection), slug);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error('Error updating prompt:', error);
      throw error;
    }
  }

  static async deletePrompt(slug: string): Promise<void> {
    try {
      const docRef = doc(collection(getDb(), this.collection), slug);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting prompt:', error);
      throw error;
    }
  }
} 