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

export interface Agent {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  youtubeUrl?: string;
}

const AGENT_COLLECTION = "agents";

// Pomocná funkce pro získání db instance
const getFirestore = (): Firestore => {
  const db = getDb();
  if (!db) {
    throw new Error("Firebase Firestore není inicializován");
  }
  return db;
};

export class AgentService {
  static async getAllAgents(): Promise<Agent[]> {
    try {
      const db = getFirestore();
      const agentCollectionRef = collection(db, AGENT_COLLECTION);
      const snapshot = await getDocs(agentCollectionRef);
      
      const agents = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id
        } as Agent;
      });
      
      return agents;
    } catch (error) {
      console.error('Error loading agents from Firebase:', error);
      return [];
    }
  }

  static async getAgentBySlug(slug: string): Promise<Agent | null> {
    try {
      const db = getFirestore();
      const agentCollectionRef = collection(db, AGENT_COLLECTION);
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

  static async createAgent(agent: Agent): Promise<string> {
    try {
      const db = getFirestore();
      const agentCollectionRef = collection(db, AGENT_COLLECTION);
      
      // Použijeme slug jako ID dokumentu v Firebase
      const docRef = doc(agentCollectionRef, agent.slug);
      await setDoc(docRef, agent);
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating agent in Firebase:', error);
      throw new Error('Failed to create agent in Firebase');
    }
  }

  static async updateAgent(agent: Agent): Promise<void> {
    try {
      const db = getFirestore();
      const docRef = doc(db, AGENT_COLLECTION, agent.id);
      await updateDoc(docRef, { ...agent });
    } catch (error) {
      console.error('Error updating agent in Firebase:', error);
      throw new Error('Failed to update agent in Firebase');
    }
  }

  static async deleteAgent(id: string): Promise<void> {
    try {
      const db = getFirestore();
      const docRef = doc(db, AGENT_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting agent from Firebase:', error);
      throw new Error('Failed to delete agent from Firebase');
    }
  }
} 