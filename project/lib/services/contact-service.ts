"use client";

import { getDb } from "@/lib/firebase/config";
import { 
  collection, 
  addDoc, 
  Firestore
} from "firebase/firestore";

// Pomocná funkce pro získání db instance
const getFirestore = (): Firestore => {
  const db = getDb();
  if (!db) {
    throw new Error("Firebase Firestore není inicializován");
  }
  return db;
};

// Rozhraní pro kontaktní formulář
export interface ContactForm {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

// Rozhraní pro formulář newsletteru
export interface NewsletterForm {
  email: string;
  createdAt: Date;
}

// Rozhraní pro poptávkový formulář
export interface ProposalForm {
  name: string;
  email: string;
  message: string;
  agentSlug?: string;
  agentName?: string;
  createdAt: Date;
}

export class ContactService {
  // Uložení dat z kontaktního formuláře
  static async submitContactForm(formData: Omit<ContactForm, "createdAt">): Promise<string> {
    try {
      const db = getFirestore();
      const contactCollectionRef = collection(db, "pomoc");
      
      const data = {
        ...formData,
        createdAt: new Date()
      };
      
      const docRef = await addDoc(contactCollectionRef, data);
      return docRef.id;
    } catch (error) {
      console.error('Chyba při odesílání kontaktního formuláře do Firebase:', error);
      throw new Error('Nepodařilo se odeslat kontaktní formulář');
    }
  }

  // Uložení e-mailu z přihlášení k newsletteru
  static async submitNewsletter(email: string): Promise<string> {
    try {
      const db = getFirestore();
      const newsletterCollectionRef = collection(db, "newsletter");
      
      const data = {
        email,
        createdAt: new Date()
      };
      
      const docRef = await addDoc(newsletterCollectionRef, data);
      return docRef.id;
    } catch (error) {
      console.error('Chyba při ukládání e-mailu pro newsletter do Firebase:', error);
      throw new Error('Nepodařilo se přihlásit k odběru newsletteru');
    }
  }

  // Uložení dat z poptávkového formuláře
  static async submitProposal(formData: Omit<ProposalForm, "createdAt">): Promise<string> {
    try {
      const db = getFirestore();
      const proposalCollectionRef = collection(db, "proposals");
      
      const data = {
        ...formData,
        createdAt: new Date()
      };
      
      const docRef = await addDoc(proposalCollectionRef, data);
      return docRef.id;
    } catch (error) {
      console.error('Chyba při odesílání poptávky do Firebase:', error);
      throw new Error('Nepodařilo se odeslat poptávku');
    }
  }
} 