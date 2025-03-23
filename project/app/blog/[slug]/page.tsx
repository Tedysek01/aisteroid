
import { BlogPostDetails } from "./blog-post-details";
import { getBlogPosts } from "@/lib/data/blog-posts";

export function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  return <BlogPostDetails slug={params.slug} />;
}
