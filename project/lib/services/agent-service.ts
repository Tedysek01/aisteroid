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
  Firestore,
  DocumentData
} from "firebase/firestore";

export interface Agent extends DocumentData {
  id?: string;
  slug?: string;
  name: string;
  description: string;
  use_case: string;
  category: string;
  technology: string;
  difficulty: string;
  video?: string;
  tags: string[];
  created_at: string;
}

const AGENT_COLLECTION = "agents";
const TIMEOUT_MS = 10000; // 10 sekund timeout

// Pomocná funkce pro získání db instance
const getFirestore = (): Firestore => {
  const db = getDb();
  if (!db) {
    throw new Error("Firebase Firestore není inicializován");
  }
  return db;
};

// Pomocná funkce pro timeout
const withTimeout = async <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('Operace trvala příliš dlouho')), timeoutMs);
  });
  return Promise.race([promise, timeout]);
};

export class AgentService {
  static async getAllAgents(): Promise<Agent[]> {
    try {
      const db = getFirestore();
      const agentCollectionRef = collection(db, AGENT_COLLECTION);
      const snapshot = await withTimeout(getDocs(agentCollectionRef), TIMEOUT_MS);
      
      const agents = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id
        } as Agent;
      });
      
      return agents.sort((a: Agent, b: Agent) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } catch (error) {
      console.error('Error loading agents from Firebase:', error);
      return [];
    }
  }

  static async getAgentBySlug(slug: string): Promise<Agent | null> {
    try {
      const db = getFirestore();
      const agentCollectionRef = collection(db, AGENT_COLLECTION);
      const snapshot = await withTimeout(getDocs(agentCollectionRef), TIMEOUT_MS);
      
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

  static async createAgent(agent: Agent): Promise<string> {
    try {
      console.log('Začínám vytvářet agenta:', agent);
      const db = getFirestore();
      const agentCollectionRef = collection(db, AGENT_COLLECTION);
      
      // Vytvoření slugu z názvu
      const slug = agent.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      console.log('Vytvořený slug:', slug);
      
      // Vytvoření dokumentu s vlastním ID (slug)
      const docRef = doc(agentCollectionRef, slug);
      const agentData = {
        ...agent,
        id: slug,
        slug,
        created_at: new Date().toISOString()
      };
      
      console.log('Data pro uložení:', agentData);
      
      await withTimeout(setDoc(docRef, agentData), TIMEOUT_MS);
      console.log('Agent úspěšně uložen');
      
      return slug;
    } catch (error) {
      console.error('Detailní chyba při vytváření agenta:', error);
      if (error instanceof Error) {
        console.error('Stack trace:', error.stack);
      }
      throw new Error(`Nepodařilo se vytvořit agenta: ${error instanceof Error ? error.message : 'Neznámá chyba'}`);
    }
  }

  static async updateAgent(agent: Agent): Promise<void> {
    try {
      const db = getFirestore();
      const docRef = doc(db, AGENT_COLLECTION, agent.id || '');
      await withTimeout(updateDoc(docRef, agent), TIMEOUT_MS);
    } catch (error) {
      console.error('Error updating agent in Firebase:', error);
      throw new Error('Nepodařilo se aktualizovat agenta');
    }
  }

  static async deleteAgent(id: string): Promise<void> {
    try {
      const db = getFirestore();
      const docRef = doc(db, AGENT_COLLECTION, id);
      await withTimeout(deleteDoc(docRef), TIMEOUT_MS);
    } catch (error) {
      console.error('Error deleting agent from Firebase:', error);
      throw new Error('Nepodařilo se smazat agenta');
    }
  }
} 