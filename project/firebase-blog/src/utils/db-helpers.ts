import { db } from '../config/firebase';
import { BlogPost } from '../types/blog';
import { collection, getDocs } from 'firebase/firestore';

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const blogPostsCollection = collection(db, 'blogPosts');
  const blogPostsSnapshot = await getDocs(blogPostsCollection);
  const blogPosts: BlogPost[] = blogPostsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as BlogPost[];

  return blogPosts;
};

// Additional utility functions for adding, updating, or deleting blog posts can be added here.