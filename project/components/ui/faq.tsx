"use client";

import { motion } from "framer-motion";
import { HelpCircle, Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What makes your AI tools different?",
    answer: "Our AI tools are built on state-of-the-art models and are specifically designed for maximum efficiency and ease of use. We focus on delivering practical solutions that integrate seamlessly into your workflow."
  },
  {
    question: "How secure is my data?",
    answer: "We implement enterprise-grade security measures to protect your data. All information is encrypted both in transit and at rest, and we follow strict data privacy guidelines."
  },
  {
    question: "Can I customize the AI agents?",
    answer: "Yes, our AI agents can be customized to match your specific needs and preferences. You can adjust parameters, set custom rules, and train them on your specific use cases."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We provide comprehensive support including detailed documentation, video tutorials, and dedicated customer service. Premium users also get access to priority support."
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
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Find answers to common questions about our AI tools and services.
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