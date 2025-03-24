"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, User, MessageSquare, Send, User2, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { ContactService } from "@/lib/services/contact-service";

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validace formuláře
    if (!formData.name || !formData.email || !formData.message) {
      setError('Vyplňte prosím všechna pole.');
      return;
    }
    
    if (!formData.email.includes('@')) {
      setError('Zadejte prosím platný e-mail.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await ContactService.submitContactForm(formData);
      setIsSuccess(true);
      // Reset formuláře
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (err) {
      setError('Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.');
      console.error('Chyba při odesílání formuláře:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="max-w-6xl mx-auto px-6 py-24">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-purple-400">
            Kontakt
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Máte otázky nebo návrhy? Neváhejte nás kontaktovat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Section 1 - Owner Info */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Cyberpunk background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl -z-10" />
            <div className="absolute inset-0 cyberpunk-grid-bg opacity-10 rounded-2xl -z-10" />
            
            <div className="bg-[#1A1A1A] backdrop-blur-md rounded-2xl p-8 border border-[#333333] relative overflow-hidden">
              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl border border-blue-500/30 cyberpunk-border" />
              
              <h2 className="text-2xl font-bold mb-8 inline-flex items-center">
                <User2 className="mr-3 text-blue-400" />
                <span>Kdo za projektem stojí</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">Jméno</span>
                  <span className="text-xl font-medium">Tadeáš Raška</span>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">Email</span>
                  <div className="flex items-center gap-2">
                    <Link 
                      href="mailto:tadeas@raska.eu"
                      className="text-xl font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      tadeas@raska.eu
                    </Link>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("tadeas@raska.eu");
                        alert("Email byl zkopírován do schránky");
                      }}
                      className="text-gray-400 hover:text-blue-300 transition-colors p-1 rounded-md hover:bg-gray-800"
                      aria-label="Zkopírovat email"
                      title="Zkopírovat email"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">Telefon</span>
                  <Link 
                    href="tel:+420608404401"
                    className="text-xl font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    608 404 401
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
          
          {/* Section 2 - Contact Form */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#333333] relative overflow-hidden">
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/5 to-purple-500/10 opacity-50" />
              
              <h2 className="text-2xl font-bold mb-8 inline-flex items-center">
                <MessageSquare className="mr-3 text-purple-400" />
                <span>Zanechte nám zprávu</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-2 relative z-10">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Jméno
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-30">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="block w-full pl-10 pr-3 py-3 border border-[#333333] rounded-lg bg-[#242424] text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all z-20"
                      placeholder="Vaše jméno"
                      disabled={isSubmitting || isSuccess}
                      style={{ pointerEvents: "auto", position: "relative", zIndex: 20 }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2 relative z-10">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-30">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="block w-full pl-10 pr-3 py-3 border border-[#333333] rounded-lg bg-[#242424] text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all z-20"
                      placeholder="vas@email.cz"
                      disabled={isSubmitting || isSuccess}
                      style={{ pointerEvents: "auto", position: "relative", zIndex: 20 }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2 relative z-10">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    Zpráva
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 z-30 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="block w-full pl-10 px-3 py-3 border border-[#333333] rounded-lg bg-[#242424] text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all z-20 contact-form-element"
                      placeholder="Napište nám, co máte na srdci..."
                      disabled={isSubmitting || isSuccess}
                      style={{ pointerEvents: "auto", position: "relative", zIndex: 20 }}
                    ></textarea>
                  </div>
                </div>
                
                {/* Chybová zpráva */}
                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}
                
                {/* Úspěšná zpráva */}
                {isSuccess && (
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Děkujeme za vaši zprávu! Brzy se vám ozveme.</span>
                  </div>
                )}
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600/90 hover:to-blue-600/90 text-white font-medium transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">
                      {isSubmitting ? (
                        "Odesílání..."
                      ) : isSuccess ? (
                        "Odesláno"
                      ) : (
                        "Odeslat zprávu"
                      )}
                    </span>
                    {!isSubmitting && !isSuccess && <Send className="w-5 h-5 relative z-10" />}
                    {isSuccess && <CheckCircle className="w-5 h-5 relative z-10" />}
                    
                    {/* Animated glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/50 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        backgroundSize: '200% 100%',
                        animation: 'shineButtonEffect 3s linear infinite',
                      }}
                    />
                  </button>
                </div>
              </form>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
} 