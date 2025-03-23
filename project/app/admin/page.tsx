"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./login-form";
import { AddPromptForm } from "./add-prompt-form";
import { AddAgentForm } from "./add-agent-form";
import { AddBlogPostForm } from "./add-blog-post-form";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email: string, password: string) => {
    if (email === "tadeas@raska.eu" && password === "741258963_Aa") {
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="prompts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#1C1C1C]">
            <TabsTrigger value="prompts">Add Prompt</TabsTrigger>
            <TabsTrigger value="agents">Add Agent</TabsTrigger>
            <TabsTrigger value="blog">Add Blog Post</TabsTrigger>
          </TabsList>
          
          <TabsContent value="prompts">
            <AddPromptForm />
          </TabsContent>
          
          <TabsContent value="agents">
            <AddAgentForm />
          </TabsContent>
          
          <TabsContent value="blog">
            <AddBlogPostForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}