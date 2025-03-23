"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Settings } from "lucide-react";

export function Footer() {
  const [showAdminButton, setShowAdminButton] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAdminButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const now = Date.now();
    if (now - lastClickTime > 500) {
      // Reset if more than 500ms between clicks
      setClickCount(1);
    } else {
      setClickCount(prev => prev + 1);
    }
    setLastClickTime(now);

    // Check for double-click followed by single-click pattern
    if (clickCount === 2) {
      router.push("/admin");
      setClickCount(0);
    }
  };

  return (
    <footer className="bg-[#1C1C1C] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-gray-400">
              Empowering your workflow with next-generation AI tools and solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/agents" className="text-gray-400 hover:text-white transition-colors">
                  AI Agents
                </Link>
              </li>
              <li>
                <Link href="/prompts" className="text-gray-400 hover:text-white transition-colors">
                  Prompts
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-gray-400 hover:text-white transition-colors">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">
              Questions? Reach out to our support team.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
          <p className="text-gray-400">
            © 2025 AI Tools & Agents. All rights reserved.
          </p>
          {showAdminButton && (
            <button
              onClick={handleClick}
              className="w-6 h-6 opacity-20 hover:opacity-40 transition-opacity"
              aria-label="Site Options"
              tabIndex={-1}
            >
              <Settings className="w-full h-full text-gray-500" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}