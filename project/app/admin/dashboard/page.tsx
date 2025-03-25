"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Bot, 
  FileText, 
  PlusCircle, 
  Users, 
  Activity,
  TrendingUp
} from 'lucide-react';

// Dummy data pro ukázku - v reálné aplikaci by toto přišlo z API
const stats = [
  { name: 'Celkem Agentů', value: '12', change: '+2', changeType: 'increase', icon: Bot },
  { name: 'Celkem Promptů', value: '45', change: '+5', changeType: 'increase', icon: PlusCircle },
  { name: 'Blog Příspěvků', value: '28', change: '+3', changeType: 'increase', icon: FileText },
  { name: 'Aktivní Uživatelé', value: '1,234', change: '+201', changeType: 'increase', icon: Users },
];

const recentActivity = [
  { id: 1, type: 'agent', name: 'GPT Assistant', action: 'vytvořen', timestamp: '2 hodiny zpět' },
  { id: 2, type: 'prompt', name: 'Marketing Copy', action: 'aktualizován', timestamp: '3 hodiny zpět' },
  { id: 3, type: 'blog', name: 'AI Trendy 2024', action: 'publikován', timestamp: '5 hodin zpět' },
];

const performanceData = [
  { name: 'Úspěšnost Promptů', value: '94%', trend: 'up' },
  { name: 'Průměrná Odezva', value: '1.2s', trend: 'down' },
  { name: 'Spokojenost', value: '4.8/5', trend: 'up' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="space-x-4">
          <Link 
            href="/admin/add-agent" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            <Bot className="w-4 h-4 mr-2" />
            Nový Agent
          </Link>
          <Link 
            href="/admin/add-prompt" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Nový Prompt
          </Link>
        </div>
      </div>

      {/* Statistiky */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-[#1C1C1C] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <stat.icon className="w-8 h-8 text-blue-500" />
              <span className={`text-sm px-2.5 py-0.5 rounded-full ${
                stat.changeType === 'increase' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.name}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nedávná Aktivita */}
        <div className="bg-[#1C1C1C] rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Nedávná Aktivita</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-[#242424] rounded-lg">
                <div className="flex items-center space-x-3">
                  {item.type === 'agent' && <Bot className="w-5 h-5 text-blue-500" />}
                  {item.type === 'prompt' && <PlusCircle className="w-5 h-5 text-green-500" />}
                  {item.type === 'blog' && <FileText className="w-5 h-5 text-purple-500" />}
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.action}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{item.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Výkon Systému */}
        <div className="bg-[#1C1C1C] rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Výkon Systému</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {performanceData.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-[#242424] rounded-lg">
                <p className="font-medium">{item.name}</p>
                <div className="flex items-center space-x-2">
                  <span className={item.trend === 'up' ? 'text-green-400' : 'text-red-400'}>
                    {item.value}
                  </span>
                  {item.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-red-400 transform rotate-180" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 