"use client";

import { motion } from "framer-motion";
import { Mail, Star, CheckCircle } from "lucide-react";

export function WaitlistSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">Early Access</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-white to-yellow-100 bg-clip-text text-transparent"
            >
              Join the Waitlist
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400"
            >
              Be among the first to experience our advanced AI tools. Sign up now for early access and exclusive benefits.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative bg-gradient-to-b from-white/[0.08] to-transparent rounded-2xl p-8"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10" />
            
            <div className="relative">
              <form className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 placeholder-gray-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/50"
                >
                  Join Waitlist
                </button>
              </form>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  "Early access to new features",
                  "Priority support",
                  "Special launch pricing"
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-400"
                  >
                    <CheckCircle className="w-4 h-4 text-yellow-400" />
                    <span>{benefit}</span>
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