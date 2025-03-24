"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Settings } from "lucide-react";

export function Footer() {
  const [showAdminButton, setShowAdminButton] = useState(false);
  const [secretProgress, setSecretProgress] = useState<string[]>([]);
  const router = useRouter();
  
  // Reference pro sledování kliknutí
  const clickTimesRef = useRef<number[]>([]);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const secretCode = ['double', 'triple', 'hold', 'double'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAdminButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Sledovat tajný kód
  useEffect(() => {
    console.log("Tajný postup:", secretProgress);
    
    if (secretProgress.length > 0 && secretProgress.length === secretCode.length) {
      const isCorrect = secretProgress.every((action, index) => action === secretCode[index]);
      
      if (isCorrect) {
        router.push("/admin/dashboard");
        setSecretProgress([]);
      } else {
        // Resetovat při špatném pokusu
        setSecretProgress([]);
      }
    }
    
    // Resetovat postup po 3 sekundách nečinnosti
    const resetTimer = setTimeout(() => {
      if (secretProgress.length > 0) {
        setSecretProgress([]);
        clickTimesRef.current = [];
      }
    }, 3000);
    
    return () => clearTimeout(resetTimer);
  }, [secretProgress, router]);

  // Jednodušší detekce kombinací
  const handleClick = () => {
    const now = Date.now();
    clickTimesRef.current.push(now);
    
    // Uchovávat pouze posledních 5 kliknutí
    if (clickTimesRef.current.length > 5) {
      clickTimesRef.current = clickTimesRef.current.slice(-5);
    }
    
    // Detekce dvojkliku - dvě kliknutí v intervalu < 300ms
    if (clickTimesRef.current.length >= 2) {
      const lastTwo = clickTimesRef.current.slice(-2);
      if (lastTwo[1] - lastTwo[0] < 300) {
        // Kontrola správné sekvence
        const expectedNextAction = secretCode[secretProgress.length];
        
        // Přidat dvojklik pouze pokud na něj čekáme v sekvenci
        if (expectedNextAction === 'double') {
          setSecretProgress(prev => [...prev, 'double']);
        }
      }
    }
    
    // Detekce trojkliku - tři kliknutí, kde každé je od předchozího < 300ms
    if (clickTimesRef.current.length >= 3) {
      const lastThree = clickTimesRef.current.slice(-3);
      if (lastThree[1] - lastThree[0] < 300 && lastThree[2] - lastThree[1] < 300) {
        // Kontrola, zda trojklik nebyl již zaznamenán
        const lastAction = secretProgress[secretProgress.length - 1];
        const expectedNextAction = secretCode[secretProgress.length];
        
        // Přidat trojklik pouze pokud na něj čekáme v sekvenci a není již zaznamenán
        if (expectedNextAction === 'triple' && lastAction !== 'triple') {
          setSecretProgress(prev => [...prev, 'triple']);
        }
      }
    }
  };
  
  // Dlouhý stisk
  const handleMouseDown = () => {
    // Zrušit jakýkoliv předchozí timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    
    // Nastavit nový timer pro dlouhý stisk
    longPressTimerRef.current = setTimeout(() => {
      // Kontrola správné sekvence
      const expectedNextAction = secretCode[secretProgress.length];
      
      // Přidat dlouhý stisk pouze pokud na něj čekáme v sekvenci
      if (expectedNextAction === 'hold') {
        setSecretProgress(prev => [...prev, 'hold']);
      }
      
      longPressTimerRef.current = null;
    }, 800);
  };
  
  const handleMouseUp = () => {
    // Zrušit timer dlouhého stisku
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  return (
    <footer className="bg-[#121212] border-t border-white/10 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-semibold mb-4">O nás</h3>
            <p className="text-gray-400">
              Pomáháme lidem používat AI smysluplně – bez složitostí, bez keců.
              Dáváme ti do ruky nástroje, které ti šetří čas a fakt něco dělají.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Rychlé odkazy</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/agents" className="text-gray-400 hover:text-white transition-colors">
                  AI Agenti
                </Link>
              </li>
              <li>
                <Link href="/prompts" className="text-gray-400 hover:text-white transition-colors">
                  Prompty
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Zdroje</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">
                  Dokumentace
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-gray-400 hover:text-white transition-colors">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <p className="text-gray-400 mb-2">
              Máte otázky? Obraťte se na náš tým podpory.
            </p>
            <Link href="/kontakt" className="text-blue-400 hover:text-blue-300 transition-colors">
              Kontaktujte nás
            </Link>
          </div>
        </div>
      </div>
      
      {showAdminButton && (
        <button
          id="admin-secret-button"
          className="absolute bottom-4 right-4 opacity-40 hover:opacity-80 transition-opacity"
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          aria-label="Admin přístup"
        >
          <Settings className="w-8 h-8 text-gray-400" />
        </button>
      )}
      
      {/* Indikátor postupu */}
      {secretProgress.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-black/70 text-xs p-2 rounded text-white opacity-60">
          {secretProgress.map((action, i) => (
            <span key={i} className={`inline-block w-3 h-3 mx-1 rounded-full ${
              action === 'double' ? 'bg-blue-500' : 
              action === 'triple' ? 'bg-green-500' : 'bg-red-500'
            }`}/>
          ))}
        </div>
      )}
    </footer>
  );
}