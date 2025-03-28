import { getDb } from "@/lib/firebase/config";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

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

export class PromptServiceServer {
  static async getPrompt(slug: string): Promise<Prompt | null> {
    try {
      const db = getDb();
      const promptCollectionRef = collection(db, "prompts");
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
} 