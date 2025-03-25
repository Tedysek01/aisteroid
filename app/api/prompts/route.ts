import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/firebase/config';
import { collection, doc, setDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const title = data.title;
    
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const promptData = {
      title,
      description: data.description,
      promptText: data.prompt,
      video: data.video,
      category: data.category,
      example_output: data.example_output,
      instructions: data.instructions,
      created_at: new Date().toISOString(),
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    };

    const docRef = doc(collection(getDb(), 'prompts'), promptData.slug);
    await setDoc(docRef, promptData);

    return NextResponse.json({ id: promptData.slug });
  } catch (error) {
    console.error('Error creating prompt:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create prompt' },
      { status: 500 }
    );
  }
} 