"use client";

import { Brain, Zap, Shield } from "lucide-react";
import { Hero } from "@/components/ui/hero";
import { FeatureCard } from "@/components/ui/feature-card";
import { PromptSection } from "@/components/ui/prompt-section";
import { AgentsSection } from "@/components/ui/agents-section";
import { BlogSection } from "@/components/ui/blog-section";
import { WaitlistSection } from "@/components/ui/waitlist-section";
import { FAQ } from "@/components/ui/faq";
import { Contact } from "@/components/ui/contact";

export default function Home() {
  const features = [
    {
      title: "Advanced AI Models",
      description: "Access state-of-the-art AI models trained on diverse datasets for superior performance.",
      icon: "Brain",
      gradient: "from-blue-600/20 via-blue-500/10 to-transparent"
    },
    {
      title: "Real-time Processing",
      description: "Get instant results with our optimized infrastructure and efficient processing pipeline.",
      icon: "Zap",
      gradient: "from-purple-600/20 via-purple-500/10 to-transparent"
    },
    {
      title: "Enterprise Security",
      description: "Your data is protected with enterprise-grade security and encryption protocols.",
      icon: "Shield",
      gradient: "from-emerald-600/20 via-emerald-500/10 to-transparent"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        <Hero />
        
        <section className="py-24 px-6 lg:px-8 bg-[#121212] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
          <div className="mx-auto max-w-7xl relative">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="relative rounded-[20px] bg-[#1C1C1C] p-8 transition-all duration-300 hover:bg-[#242424] overflow-hidden group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative">
                    <div className="mb-6 inline-flex items-center justify-center rounded-[12px] bg-[#2A2A2A] p-3 bg-gradient-to-br from-[#2A2A2A] to-[#1C1C1C]">
                      {feature.icon === "Brain" && <Brain className="h-6 w-6 text-blue-500" />}
                      {feature.icon === "Zap" && <Zap className="h-6 w-6 text-purple-500" />}
                      {feature.icon === "Shield" && <Shield className="h-6 w-6 text-emerald-500" />}
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PromptSection />
        <AgentsSection />
        <BlogSection />
        <WaitlistSection />
        <FAQ />
        <Contact />
      </main>
    </div>
  );
}