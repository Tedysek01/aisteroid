"use client";

import { motion } from "framer-motion";
import { HelpCircle, Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
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
    <section className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-blue-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <HelpCircle className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-semibold">FAQ</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-white to-purple-100 bg-clip-text text-transparent"
          >
            Často kladené otázky
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Najděte odpovědi na běžné dotazy o našich AI nástrojích a službách.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 rounded-xl bg-gradient-to-b from-white/[0.08] to-transparent hover:from-white/[0.12] transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">{faq.question}</span>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-purple-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-purple-400" />
                  )}
                </div>
                {openIndex === index && (
                  <p className="mt-4 text-gray-400">{faq.answer}</p>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}