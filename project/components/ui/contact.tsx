"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { ContactService } from "@/lib/services/contact-service";

export function Contact() {
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
      setError('Vyplňte prosím všechna pole');
      return;
    }
    
    if (!formData.email.includes('@')) {
      setError('Zadejte prosím platný e-mail');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await ContactService.submitContactForm(formData);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError('Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.');
      console.error('Chyba při odesílání formuláře:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#2b0a3d,#0a0a0a)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,#1e0035,#0a0a0a)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#460038,#0a0a0a)] opacity-30" />
      
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff00ff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} 
      />
      
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 text-pink-400 text-sm font-medium mb-4"
          >
            KONTAKTUJTE NÁS
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400"
          >
            Napište nám
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-pink-200/70 max-w-2xl mx-auto"
          >
            Máte otázku nebo nápad? Napište nám a my vám brzy odpovíme.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative bg-[#1A1A1A] backdrop-blur-lg rounded-2xl p-8 border border-pink-500/10 overflow-hidden"
        >
          {/* Subtle animated gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-pink-500/10 opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
          
          {/* Animated border */}
          <div className="absolute inset-0 rounded-2xl border border-pink-500/30 cyberpunk-border" />
          
          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <label htmlFor="name" className="block text-sm font-medium text-pink-200/70 mb-2">
                    Jméno
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#242424] border border-pink-500/20 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none transition-all duration-300 placeholder-pink-200/50 text-white relative z-10"
                    placeholder="Vaše jméno"
                    disabled={isSubmitting || isSuccess}
                  />
                  
                  {/* Highlight effect on focus */}
                  <div className="absolute inset-0 rounded-xl bg-pink-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                
                <div className="relative group">
                  <label htmlFor="email" className="block text-sm font-medium text-pink-200/70 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#242424] border border-pink-500/20 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none transition-all duration-300 placeholder-pink-200/50 text-white relative z-10"
                    placeholder="vas@email.cz"
                    disabled={isSubmitting || isSuccess}
                  />
                  
                  {/* Highlight effect on focus */}
                  <div className="absolute inset-0 rounded-xl bg-pink-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>
              
              <div className="relative group">
                <label htmlFor="message" className="block text-sm font-medium text-pink-200/70 mb-2">
                  Zpráva
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-[#242424] border border-pink-500/20 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none transition-all duration-300 placeholder-pink-200/50 text-white relative z-10 resize-none"
                  placeholder="Vaše zpráva..."
                  disabled={isSubmitting || isSuccess}
                />
                
                {/* Highlight effect on focus */}
                <div className="absolute inset-0 rounded-xl bg-pink-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              
              <div className="flex justify-end">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-8 py-3 rounded-xl bg-gradient-to-r from-pink-600/80 via-purple-600/80 to-pink-600/80 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-300 overflow-hidden group"
                  disabled={isSubmitting || isSuccess}
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <span>Odesílání...</span>
                    ) : isSuccess ? (
                      <>
                        <span>Odesláno</span>
                        <CheckCircle className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>Odeslat</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </div>
                  
                  {/* Neon glow effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)",
                    }}
                  />
                  
                  {/* Animated shine effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      backgroundSize: '200% 100%',
                      animation: 'shineEffect 2s infinite linear',
                    }}
                  />
                </motion.button>
              </div>
            </form>

            {/* Chybová zpráva */}
            {error && (
              <div className="mt-4 flex items-center gap-2 text-rose-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
            
            {/* Úspěšná zpráva */}
            {isSuccess && (
              <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Děkujeme za vaši zprávu! Brzy se vám ozveme.</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Add CSS animations */}
      <style jsx global>{`
        @keyframes shineEffect {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}