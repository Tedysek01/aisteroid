"use client";

import { motion } from "framer-motion";
import { Mail, Star, CheckCircle, Send, AlertCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { ContactService } from "@/lib/services/contact-service";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validace e-mailu
    if (!email || !email.includes('@')) {
      setError('Zadejte prosím platný e-mail');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await ContactService.submitNewsletter(email);
      setIsSuccess(true);
      setEmail('');
    } catch (err) {
      setError('Nepodařilo se odeslat e-mail. Zkuste to prosím znovu.');
      console.error('Chyba při odesílání e-mailu:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Cyberpunk background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-70" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 cyberpunk-grid-bg" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 text-sm font-medium mb-4"
            >
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>NOVINKY DO MAILU</span>
              </div>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-purple-400"
            >
              Chceš vědět, co chystám dál?

            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-400 max-w-2xl mx-auto"
            >
              Zanech mi e-mail a občas ti pošlu nové agenty, prompty nebo tipy.
Bez spamu. Jen věci, co dávají smysl.


            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative bg-[#1A1A1A] backdrop-blur-lg rounded-2xl p-8 border border-[#333333] overflow-hidden"
          >
            {/* Subtle animated gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl border border-blue-500/30 cyberpunk-border" />
            
            <div className="relative z-10">
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="Zadejte váš e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#242424] border border-[#333333] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 placeholder-gray-500 text-white"
                    disabled={isSubmitting || isSuccess}
                  />
                  
                  {/* Highlight effect on focus */}
                  <div className="absolute inset-0 rounded-xl bg-blue-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                
                <motion.button
                  type="submit"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-all duration-300 overflow-hidden group"
                  disabled={isSubmitting || isSuccess}
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <span>Odesílání...</span>
                    ) : isSuccess ? (
                      <>
                        <span>Přihlášeno</span>
                        <CheckCircle className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>Přihlásit se</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </div>
                  
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

              {/* Chybová zpráva */}
              {error && (
                <div className="mt-3 flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}
              
              {/* Úspěšná zpráva */}
              {isSuccess && (
                <div className="mt-3 flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Děkujeme za přihlášení! Brzy se vám ozveme.</span>
                </div>
              )}

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  "Noví agenti jako první",
                  "Užitečné AI tipy",
                  "Vychytávky ze zákulisí"
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-400 group"
                  >
                    <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className="group-hover:text-gray-300 transition-colors duration-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}