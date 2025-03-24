"use client";

import { Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Agent } from "@/lib/services/agent-service";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ContactService } from "@/lib/services/contact-service";

export function AgentDetails({ agent }: { agent: Agent | undefined }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Funkce pro odeslání poptávky
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) return;
    
    try {
      setIsSubmitting(true);
      
      await ContactService.submitProposal({
        name,
        email,
        message,
        agentSlug: agent?.slug,
        agentName: agent?.name,
      });
      
      setSubmitted(true);
      
      // Reset formuláře po úspěšném odeslání
      setTimeout(() => {
        setName("");
        setEmail("");
        setMessage("");
        setIsModalOpen(false);
        setSubmitted(false);
      }, 3000);
      
    } catch (error) {
      console.error("Chyba při odeslání poptávky:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Otevření modálu s předvyplněnou zprávou
  const openModal = () => {
    if (agent?.name) {
      setMessage(`Chtěl bych použít agenta: ${agent.name}`);
    }
    setIsModalOpen(true);
  };
  
  // Funkce pro transformaci YouTube URL (zajistí správné embedování)
  const getEmbedUrl = (url: string | undefined): string | null => {
    if (!url) return null;
    
    try {
      // Pokusíme se převést jakýkoliv formát YouTube URL na embed URL
      if (url.includes('youtube.com/watch')) {
        // www.youtube.com/watch?v=VIDEO_ID
        const videoId = new URL(url).searchParams.get('v');
        if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes('youtu.be/')) {
        // youtu.be/VIDEO_ID
        const parts = url.split('/');
        const videoId = parts[parts.length - 1].split('?')[0];
        if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes('youtube.com/embed/')) {
        // URL je již ve správném formátu pro embedding
        return url;
      }
    } catch (e) {
      console.error("Chyba při parsování YouTube URL:", e);
      return null;
    }
    
    // Pokud formát URL neodpovídá známým vzorům, vrátíme null
    return null;
  };

  const embedUrl = agent?.youtubeUrl ? getEmbedUrl(agent.youtubeUrl) : null;

  if (!agent) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Agent nenalezen</h1>
          <Link href="/agents" className="text-blue-400 hover:text-blue-300">
            Zobrazit všechny agenty
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-8">
          <Link href="/agents" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
            <ArrowLeft size={20} />
            Zpět na agenty
          </Link>
        </div>

        <div className="p-[2px] rounded-2xl bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 shadow-[0_10px_50px_rgba(0,0,0,0.5)] shadow-blue-900/20">
          <div className="bg-[#1a1a1a]/90 backdrop-blur-lg rounded-2xl p-8 h-full">
            <h1 className="text-4xl font-bold mb-4">{agent.name}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span
                className="px-3 py-1 rounded-full text-sm bg-white/10 flex items-center gap-1"
              >
                <Tag size={12} />
                {agent.category}
              </span>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-gray-300 mb-8">{agent.shortDescription}</p>
              
              <div className="mb-8" dangerouslySetInnerHTML={{ __html: agent.fullDescription }} />
              
              {embedUrl ? (
                <div className="aspect-video rounded-lg overflow-hidden bg-black/30 mb-8">
                  <iframe
                    width="100%"
                    height="100%"
                    src={embedUrl}
                    title={`Demo video: ${agent.name}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="aspect-video rounded-lg overflow-hidden bg-black/30 flex items-center justify-center mb-8">
                  <p className="text-gray-400">Demo video již brzy</p>
                </div>
              )}
              
              {/* Tlačítko pro zobrazení poptávkového formuláře */}
              <div className="flex justify-center mt-6">
                <Button 
                  onClick={openModal}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-md font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(56,178,255,0.5)] relative overflow-hidden group"
                >
                  <span className="relative z-10">Toho chci</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600/60 to-purple-600/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </div>
              
              {/* Modální okno s formulářem */}
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="bg-[#1a1a1a] border border-gray-800 text-white max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white mb-2">
                      Mám zájem o agenta
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Vyplňte formulář a my se vám co nejdříve ozveme.
                    </DialogDescription>
                  </DialogHeader>
                  
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                          Jméno
                        </label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="bg-[#252525] border-gray-700 text-white"
                          placeholder="Vaše jméno"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-[#252525] border-gray-700 text-white"
                          placeholder="vas@email.cz"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                          Zpráva
                        </label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          className="bg-[#252525] border-gray-700 text-white min-h-[100px]"
                          placeholder="Detaily vaší poptávky..."
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300"
                      >
                        {isSubmitting ? "Odesílání..." : "Odeslat poptávku"}
                      </Button>
                    </form>
                  ) : (
                    <div className="py-8 text-center">
                      <div className="mb-4 text-green-400 font-bold text-xl">Děkujeme!</div>
                      <p className="text-gray-300">Vaše poptávka byla úspěšně odeslána. Brzy se vám ozveme.</p>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}