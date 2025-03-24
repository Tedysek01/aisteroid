"use client";

import React from "react";
import { AddBlogPostForm } from "../add-blog-post-form";

export default function AddBlogPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Přidat nový blog post</h1>
        <AddBlogPostForm />
      </div>
    </div>
  );
} 