"use client";

import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare, Send, Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { ContactService } from "@/lib/services/contact-service";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isHovered, setIsHovered] = useState(false);
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
    <section className="py-24 px-6 bg-[#121212] relative overflow-hidden" id="contact">
      {/* Cyberpunk background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-70" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 cyberpunk-grid-bg" />
      
      <div className="max-w-4xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 text-sm font-medium mb-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>NAPIŠTE NÁM</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-purple-400">
            Kontaktujte nás
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Máte dotaz nebo nápad? Neváhejte nám napsat zprávu a my se vám brzy ozveme.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative bg-[#1A1A1A] backdrop-blur-lg rounded-2xl p-8 border border-[#333333] overflow-hidden"
        >
          {/* Subtle animated gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
          
          {/* Animated border */}
          <div className="absolute inset-0 rounded-2xl border border-blue-500/30 cyberpunk-border" />
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="relative">
              <label className="block text-sm font-medium mb-2 flex items-center gap-2 text-gray-300">
                <User className="w-4 h-4 text-blue-400" />
                Jméno
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-[#242424] border border-[#333] pl-10 py-6 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="Vaše jméno"
                  required
                  disabled={isSubmitting || isSuccess}
                  style={{ pointerEvents: "auto" }}
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-30" />
                
                {/* Focus highlight effect */}
                <div className="absolute inset-0 rounded-xl bg-blue-500/5 opacity-0 peer-focus:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium mb-2 flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4 text-blue-400" />
                E-mail
              </label>
              <div className="relative">
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-[#242424] border border-[#333] pl-10 py-6 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="vas@email.cz"
                  required
                  disabled={isSubmitting || isSuccess}
                  style={{ pointerEvents: "auto" }}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-30" />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium mb-2 flex items-center gap-2 text-gray-300">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                Zpráva
              </label>
              <div className="relative">
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-[#242424] border border-[#333] pl-10 py-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 z-20 contact-form-element"
                  placeholder="Napište nám, co máte na srdci..."
                  rows={6}
                  required
                  disabled={isSubmitting || isSuccess}
                  style={{ pointerEvents: "auto", position: "relative", zIndex: 20 }}
                />
                <MessageSquare className="absolute left-3 top-6 w-5 h-5 text-gray-400 z-30" />
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
            
            <motion.button
              type="submit"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileTap={{ scale: 0.98 }}
              className="w-full relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-all duration-300 overflow-hidden group"
              disabled={isSubmitting || isSuccess}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <span>Odesílání...</span>
                ) : isSuccess ? (
                  <>
                    <span>Odesláno</span>
                    <CheckCircle className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Odeslat zprávu</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </span>
              
              {/* Neon glow effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: "0 0 20px rgba(79, 70, 229, 0.5)",
                  animation: isHovered ? "glow 1.5s infinite ease-in-out" : "none"
                }}
              />
              
              {/* Animated shine effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  backgroundSize: '200% 100%',
                  animation: isHovered ? 'shineEffect 2s infinite linear' : 'none',
                }}
              />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}