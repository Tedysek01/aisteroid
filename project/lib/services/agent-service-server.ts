import { getDb } from "@/lib/firebase/config";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export interface Agent {
  id: string;
  slug: string;
  name: string;
  description: string;
  use_case: string;
  category: string;
  technology: string;
  difficulty: string;
  video?: string;
  tags: string[];
  created_at: string;
  seoTitle?: string;
  seoDescription?: string;
}

export class AgentServiceServer {
  static async getAgent(slug: string): Promise<Agent | null> {
    try {
      const db = getDb();
      const agentCollectionRef = collection(db, "agents");
      const snapshot = await getDocs(agentCollectionRef);
      
      // Zkontrolovat, jestli existuje dokument, který má id shodné se slugem
      const docWithSlugId = snapshot.docs.find(doc => doc.id === slug);
      if (docWithSlugId) {
        const data = docWithSlugId.data();
        return {
          ...data,
          id: docWithSlugId.id
        } as Agent;
      }
      
      // Pokud nebyl nalezen dokument s id shodným se slugem,
      // zkusit najít dokument, který má pole slug shodné se slugem
      const agentWithSlugField = snapshot.docs.find(doc => {
        const data = doc.data();
        return data.slug === slug;
      });
      
      if (agentWithSlugField) {
        const data = agentWithSlugField.data();
        return {
          ...data,
          id: agentWithSlugField.id
        } as Agent;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting agent by slug from Firebase:', error);
      return null;
    }
  }
} 