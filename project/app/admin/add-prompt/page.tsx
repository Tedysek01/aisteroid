"use client";

import React from "react";
import { AddPromptForm } from "../add-prompt-form";

export default function AddPromptPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Přidat nový prompt</h1>
        <AddPromptForm />
      </div>
    </div>
  );
} 