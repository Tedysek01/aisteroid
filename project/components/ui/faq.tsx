"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Je Aisteroid zdarma?",
    answer: "Ano! Všechny prompty, agenti i návody jsou aktuálně dostupné zdarma. Pokud bys chtěl něco speciálního na míru, třeba agenta nebo prompt pro tvůj projekt, ozvi se – to už může být placené."
  },
  {
    question: "Co když AI vůbec nerozumím?",
    answer: "V pohodě. Aisteroid je dělaný tak, aby ti pomohl pochopit a využít AI i bez technických znalostí. Najdeš tu hotové nástroje, vysvětlení, i videonávody krok za krokem. AI nemusí být složitá – jen musíš vědět, kde začít."
  },
  {
    question: "Jaké typy agentů tu najdu?",
    answer: "Většina agentů řeší reálné, každodenní úkoly – od shrnutí e-mailů až po monitoring recenzí nebo automatické odpovědi. Každý agent má vlastní detailní stránku, kde najdeš i video, jak ho vytvořit."
  },
  {
    question: "Jak fungují prompty na Aisteroidu?",
    answer: "Všechny prompty jsou připravené tak, aby dávaly smysl i běžnému uživateli. Žádné generické 'napiš článek'. Každý prompt má jasný účel, místo na doplnění a často i návod k použití."
  },
  {
    question: "Můžu tě nějak kontaktovat?",
    answer: "Jasně! Můžeš napsat na e-mail tadeas@raska.eu, zavolat na 608 404 401 nebo mě najdeš i na Instagramu, Facebooku nebo Telegramu. Když mi napíšeš, odepíšu. Jsem člověk, ne další chatbot."
  },
  {
    question: "Bude v budoucnu placený obsah?",
    answer: "Možná. Pokud bude velký zájem a už to nepůjde stíhat zdarma, přidám třeba prémiové členství nebo paywall na vybrané věci. Ale teď si všechno užij volně."
  },
  {
    question: "Chystáš i komunitu?",
    answer: "Jo! Až nás bude víc, spustím komunitu na Discordu nebo Telegramu. Místo, kde budeme sdílet agenty, tipy a AI nápady. Sleduj novinky – přijdou brzy."
  },
  {
    question: "Kde najdu návody, jak agenta vytvořit?",
    answer: "U každého agenta na webu najdeš i video s návodem, jak si ho krok za krokem postavit třeba v n8n. Můžeš jet podle videa, nebo si jen stáhnout JSON a importnout ho rovnou."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            FAQ
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400"
          >
            Často kladené otázky
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-pink-200/70 max-w-2xl mx-auto"
          >
            Vše, co potřebuješ vědět o AISTEROID
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqItems.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-[#1A1A1A] backdrop-blur-lg rounded-xl border border-pink-500/10 overflow-hidden"
            >
              {/* Subtle animated gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-pink-500/10 opacity-50" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl border border-pink-500/30 cyberpunk-border" />
              
              <div className="relative z-10">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group"
                >
                  <span className="text-lg font-medium text-pink-200 group-hover:text-pink-100 transition-colors duration-300">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-pink-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-pink-400" />
                    )}
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-pink-200/70">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}