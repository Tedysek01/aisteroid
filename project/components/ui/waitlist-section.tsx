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
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 text-pink-400 text-sm font-medium mb-4"
            >
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>NOVINKY DO MAILU</span>
              </div>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400"
            >
              Chceš vědět, co chystám dál?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-pink-200/70 max-w-2xl mx-auto"
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
            className="relative bg-[#1A1A1A] backdrop-blur-lg rounded-2xl p-8 border border-pink-500/10 overflow-hidden"
          >
            {/* Subtle animated gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-pink-500/10 opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl border border-pink-500/30 cyberpunk-border" />
            
            <div className="relative z-10">
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-200/70 group-focus-within:text-pink-400 transition-colors duration-300 z-20">
                    <Mail className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <input
                    type="email"
                    placeholder="Zadejte váš e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#242424] border border-pink-500/20 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none transition-all duration-300 placeholder-pink-200/50 text-white relative z-10"
                    disabled={isSubmitting || isSuccess}
                  />
                  
                  {/* Highlight effect on focus */}
                  <div className="absolute inset-0 rounded-xl bg-pink-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                
                <motion.button
                  type="submit"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-8 py-3 rounded-xl bg-gradient-to-r from-pink-600/80 via-purple-600/80 to-pink-600/80 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-300 overflow-hidden group"
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
                      boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)",
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
                <div className="mt-3 flex items-center gap-2 text-rose-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}
              
              {/* Úspěšná zpráva */}
              {isSuccess && (
                <div className="mt-3 flex items-center gap-2 text-emerald-400 text-sm">
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
                    className="flex items-center gap-2 text-sm text-pink-200/70 group"
                  >
                    <div className="text-pink-400 group-hover:text-pink-300 transition-colors duration-300">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className="group-hover:text-pink-200 transition-colors duration-300">{benefit}</span>
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