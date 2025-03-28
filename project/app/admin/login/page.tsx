"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Cookies from 'js-cookie';

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validace
    if (!validateEmail(email)) {
      setError("Prosím zadejte platnou e-mailovou adresu");
      return;
    }

    if (password.length < 8) {
      setError("Heslo musí mít alespoň 8 znaků");
      return;
    }

    setIsLoading(true);

    try {
      // Simulace API volání pro přihlášení
      // V reálné aplikaci by zde bylo volání na backend
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email === "admin@example.com" && password === "admin123") {
        // Uložení tokenu do cookie
        Cookies.set('adminToken', 'dummy-token', { 
          expires: 7, // Vyprší za 7 dní
          secure: process.env.NODE_ENV === 'production', // Pouze přes HTTPS v produkci
          sameSite: 'lax' // Změněno na lax pro lepší kompatibilitu
        });
        
        // Použití replace místo push pro lepší chování v historii
        router.replace("/admin/dashboard");
      } else {
        setError("Nesprávné přihlašovací údaje");
      }
    } catch (err) {
      setError("Došlo k chybě při přihlašování");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#1C1C1C] p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Admin Přihlášení</h1>
            <p className="text-gray-400">Přihlaste se pro přístup do administrace</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full bg-[#242424] border-[#333] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="admin@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Heslo</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full bg-[#242424] border-[#333] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Přihlašování..." : "Přihlásit"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-400 hover:underline">
              Zapomenuté heslo?
            </a>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-400">
          <p>
            Toto je zabezpečená oblast. Neoprávněný přístup je monitorován a může být trestně stíhán.
          </p>
        </div>
      </div>
    </div>
  );
} 