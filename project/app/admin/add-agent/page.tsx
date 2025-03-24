"use client";

import React from "react";
import { AddAgentForm } from "../add-agent-form";

export default function AddAgentPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Přidat nového agenta</h1>
        <AddAgentForm />
      </div>
    </div>
  );
} 