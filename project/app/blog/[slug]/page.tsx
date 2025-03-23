"use client";

import { BlogPostDetails } from "./blog-post-details";

export default function BlogPost({ params }: { params: { slug: string } }) {
  return <BlogPostDetails slug={params.slug} />;
}