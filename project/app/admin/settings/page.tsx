"use client";

import React from 'react';
import { 
  Bell, 
  Shield, 
  Mail, 
  Database,
  Save
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface BaseSetting {
  id: string;
  label: string;
  type: 'switch' | 'text' | 'number' | 'select';
}

interface SwitchSetting extends BaseSetting {
  type: 'switch';
  defaultValue: boolean;
}

interface TextSetting extends BaseSetting {
  type: 'text';
  defaultValue: string;
}

interface NumberSetting extends BaseSetting {
  type: 'number';
  defaultValue: number;
}

interface SelectSetting extends BaseSetting {
  type: 'select';
  defaultValue?: string;
  options: string[];
}

type Setting = SwitchSetting | TextSetting | NumberSetting | SelectSetting;

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ElementType;
  settings: Setting[];
}

const settingsSections: SettingsSection[] = [
  {
    id: 'notifications',
    title: 'Oznámení',
    icon: Bell,
    settings: [
      { id: 'email_notif', label: 'E-mailová oznámení', type: 'switch', defaultValue: true },
      { id: 'push_notif', label: 'Push notifikace', type: 'switch', defaultValue: false },
      { id: 'notif_frequency', label: 'Frekvence oznámení', type: 'select', options: ['Okamžitě', 'Denně', 'Týdně'] }
    ]
  },
  {
    id: 'security',
    title: 'Zabezpečení',
    icon: Shield,
    settings: [
      { id: '2fa', label: 'Dvoufaktorové ověření', type: 'switch', defaultValue: false },
      { id: 'session_timeout', label: 'Časový limit relace (minuty)', type: 'number', defaultValue: 30 }
    ]
  },
  {
    id: 'email',
    title: 'E-mailové Nastavení',
    icon: Mail,
    settings: [
      { id: 'smtp_host', label: 'SMTP Host', type: 'text', defaultValue: 'smtp.example.com' },
      { id: 'smtp_port', label: 'SMTP Port', type: 'number', defaultValue: 587 },
      { id: 'smtp_user', label: 'SMTP Uživatel', type: 'text', defaultValue: '' }
    ]
  },
  {
    id: 'database',
    title: 'Databáze',
    icon: Database,
    settings: [
      { id: 'backup_enabled', label: 'Automatické zálohy', type: 'switch', defaultValue: true },
      { id: 'backup_frequency', label: 'Frekvence záloh', type: 'select', options: ['Denně', 'Týdně', 'Měsíčně'] },
      { id: 'retention_days', label: 'Doba uchování (dny)', type: 'number', defaultValue: 30 }
    ]
  }
];

export default function SettingsPage() {
  const handleSave = (sectionId: string) => {
    // Implementace ukládání nastavení
    console.log('Ukládám nastavení pro sekci:', sectionId);
  };

  const renderSettingInput = (setting: Setting) => {
    switch (setting.type) {
      case 'switch':
        return <Switch defaultChecked={setting.defaultValue} />;
      
      case 'text':
        return (
          <Input
            type="text"
            defaultValue={setting.defaultValue}
            className="max-w-xs bg-[#242424] border-[#333]"
          />
        );
      
      case 'number':
        return (
          <Input
            type="number"
            defaultValue={setting.defaultValue}
            className="max-w-xs bg-[#242424] border-[#333]"
          />
        );
      
      case 'select':
        return (
          <select className="bg-[#242424] border border-[#333] rounded-md px-3 py-2 max-w-xs">
            {setting.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Nastavení</h1>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {settingsSections.map((section) => (
          <div key={section.id} className="bg-[#1C1C1C] rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <section.icon className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </div>

            <div className="space-y-6">
              {section.settings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between">
                  <label className="text-sm font-medium">{setting.label}</label>
                  {renderSettingInput(setting)}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Button 
                onClick={() => handleSave(section.id)}
                className="inline-flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Uložit {section.title}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 