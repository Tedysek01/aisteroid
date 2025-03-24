"use client";

import React from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Link href="/" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
            Zpět na web
          </Link>
        </div>
        
        <p className="mb-6">Vítejte v administrační sekci. Vyberte akci, kterou chcete provést:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <AdminCard 
            title="Přidat Prompt" 
            description="Vytvořit nový AI prompt"
            href="/admin/add-prompt"
            icon="📝"
          />
          <AdminCard 
            title="Přidat Agenta" 
            description="Vytvořit nového AI agenta"
            href="/admin/add-agent"
            icon="🤖"
          />
          <AdminCard 
            title="Přidat Blog" 
            description="Vytvořit nový blog post"
            href="/admin/add-blog"
            icon="📰"
          />
        </div>
        
        <div className="mt-12 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Přímé odkazy:</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/admin/dashboard" className="text-blue-400 hover:underline">
                Dashboard (tato stránka)
              </Link>
            </li>
            <li>
              <Link href="/admin/add-prompt" className="text-blue-400 hover:underline">
                Přidat prompt
              </Link>
            </li>
            <li>
              <Link href="/admin/add-agent" className="text-blue-400 hover:underline">
                Přidat agenta
              </Link>
            </li>
            <li>
              <Link href="/admin/add-blog" className="text-blue-400 hover:underline">
                Přidat blog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function AdminCard({ title, description, href, icon }: { title: string, description: string, href: string, icon: string }) {
  return (
    <Link 
      href={href}
      className="block p-6 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
    >
      <div className="flex items-center mb-3">
        <span className="text-2xl mr-3">{icon}</span>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-300">{description}</p>
    </Link>
  );
} 