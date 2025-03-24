"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "AI Agenti", href: "/agents" },
    { name: "Prompty", href: "/prompts" },
    { name: "Blog", href: "/blog" },
    { name: "Kontakt", href: "/kontakt" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 -mt-[2px]">
      <div className="h-[1px] w-full bg-gradient-to-r from-blue-500/0 via-purple-500/50 to-blue-500/0"></div>
      <nav className="bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] backdrop-blur-xl shadow-2xl shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <Image 
                  src="/images/aisteroid-logo.png" 
                  alt="AISTEROID Logo" 
                  width={180} 
                  height={40} 
                  className="group-hover:scale-105 transition-all duration-300"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      pathname === item.href
                        ? "bg-[#232323] text-white shadow-lg shadow-black/20 border-t border-white/5 border-l border-r border-b-0 border-b-transparent relative after:absolute after:bottom-0 after:left-[10%] after:right-[10%] after:h-[2px] after:rounded-full after:bg-gradient-to-r after:from-blue-500/0 after:via-purple-500 after:to-blue-500/0"
                        : "text-gray-300 hover:text-white hover:bg-[#232323]/50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#232323]/50 focus:outline-none transition-all duration-200"
              >
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] shadow-inner shadow-black/50">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-[#232323] text-white shadow-lg shadow-black/20 border-l-2 border-purple-500"
                      : "text-gray-300 hover:text-white hover:bg-[#232323]/50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="h-[1px] w-full bg-gradient-to-r from-blue-500/0 via-purple-500/50 to-blue-500/0 mt-3"></div>
          </div>
        )}
      </nav>
      <div className="h-[1px] w-full bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-blue-500/0"></div>
    </div>
  );
}