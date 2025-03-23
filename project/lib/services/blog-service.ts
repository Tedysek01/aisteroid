"use client";

import type { BlogPost } from "@/lib/data/blog-posts";

const BLOG_POSTS_KEY = "blogPosts";

export class BlogService {
  static getAllPosts(): BlogPost[] {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const storedPosts = JSON.parse(localStorage.getItem(BLOG_POSTS_KEY) || "[]");
      return storedPosts.sort((a: BlogPost, b: BlogPost) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } catch (error) {
      console.error('Error loading blog posts:', error);
      return [];
    }
  }

  static getPublishedPosts(): BlogPost[] {
    return this.getAllPosts().filter(post => post.status === 'published');
  }

  static getPostBySlug(slug: string): BlogPost | null {
    return this.getAllPosts().find(post => post.id === slug) || null;
  }

  static createPost(post: BlogPost): void {
    try {
      const posts = this.getAllPosts();
      posts.push(post);
      localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(posts));
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw new Error('Failed to create blog post');
    }
  }

  static updatePost(post: BlogPost): void {
    try {
      const posts = this.getAllPosts();
      const index = posts.findIndex(p => p.id === post.id);
      if (index !== -1) {
        posts[index] = post;
        localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(posts));
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw new Error('Failed to update blog post');
    }
  }

  static deletePost(id: string): void {
    try {
      const posts = this.getAllPosts();
      const filteredPosts = posts.filter(post => post.id !== id);
      localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(filteredPosts));
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw new Error('Failed to delete blog post');
    }
  }
}