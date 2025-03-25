"use client";

import { redirect } from 'next/navigation';

export default function AdminPage() {
  redirect('/admin/login');
}

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Cookies from 'js-cookie';

function AdminCard({ title, description, href }: { title: string, description: string, href: string }) {
  return (
    <a 
      href={href}
      className="block p-6 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </a>
  );
}