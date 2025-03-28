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
      description: formData.get('description') as string,
      video: formData.get('video') as string,
      technology: formData.get('technology') as string,
      use_case: formData.get('use_case') as string,
      difficulty: formData.get('difficulty') as string,
      tags: JSON.parse(formData.get('tags') as string),
      created_at: new Date().toISOString(),
      seoTitle: formData.get('seoTitle') as string || null,
      seoDescription: formData.get('seoDescription') as string || null,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    };

    const docRef = doc(collection(getDb(), 'agents'), data.slug);
    await setDoc(docRef, data);

    return NextResponse.json({ id: data.slug });
  } catch (error) {
    console.error('Error creating agent:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create agent' },
      { status: 500 }
    );
  }
} 