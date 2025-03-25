import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/firebase/config';
import { collection, doc, setDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const data = {
      title,
      perex: formData.get('perex') as string,
      content: formData.get('content') as string,
      author: formData.get('author') as string,
      created_at: formData.get('created_at') as string,
      reading_time: formData.get('reading_time') ? parseInt(formData.get('reading_time') as string) : null,
      tags: JSON.parse(formData.get('tags') as string),
      seo_title: formData.get('seo_title') as string,
      seo_description: formData.get('seo_description') as string,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    };

    const docRef = doc(collection(getDb(), 'blog_posts'), data.slug);
    await setDoc(docRef, data);

    return NextResponse.json({ id: data.slug });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create blog' },
      { status: 500 }
    );
  }
} 