// Importy Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Firebase konfigurace
// Poznámka: V reálné aplikaci by tato konfigurace měla přijít z proměnných prostředí
const firebaseConfig = {
  apiKey: "AIzaSyCq1BfaI1hqDamMJZ3fstzNY9t-HBHqODw",
  authDomain: "aisteroid-d2d77.firebaseapp.com",
  projectId: "aisteroid-d2d77",
  storageBucket: "aisteroid-d2d77.appspot.com",
  messagingSenderId: "922789177202",
  appId: "1:922789177202:web:4a725a340948eefea89feb",
};

// Inicializace Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

if (!db) {
  throw new Error('Firebase není inicializován');
}

export const getDb = (): Firestore => db;
