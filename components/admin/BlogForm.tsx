import React, { useState } from 'react';
import { FormFieldComponent } from './FormField';
import { BlogFormData } from '@/types/forms';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

const blogFields = [
  { name: 'title', label: 'Název článku', type: 'text', required: true },
  { name: 'perex', label: 'Krátký úvod / perex', type: 'textarea', required: false },
  { name: 'content', label: 'Obsah článku', type: 'richtext', required: true },
  { name: 'author', label: 'Autor', type: 'text', required: true },
  { name: 'created_at', label: 'Datum přidání', type: 'date', required: true },
  { name: 'reading_time', label: 'Doba čtení (v minutách)', type: 'number', required: false },
  { name: 'cover_image', label: 'Náhledový obrázek', type: 'file', required: false },
  { name: 'tags', label: 'Tagy / Kategorie', type: 'tags', required: false },
  { name: 'seo_title', label: 'SEO titulek', type: 'text', required: false },
  { name: 'seo_description', label: 'SEO popis', type: 'textarea', required: false }
];

export const BlogForm: React.FC = () => {
  const [formData, setFormData] = useState<Partial<BlogFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let coverImageUrl = '';
      if (formData.cover_image instanceof File) {
        const fileRef = ref(storage, `blog-images/${formData.cover_image.name}`);
        await uploadBytes(fileRef, formData.cover_image);
        coverImageUrl = await getDownloadURL(fileRef);
      }

      const blogData = {
        ...formData,
        cover_image: coverImageUrl || null,
        created_at: formData.created_at || new Date(),
        reading_time: formData.reading_time ? parseInt(formData.reading_time.toString()) : null
      };

      await addDoc(collection(db, 'blogs'), blogData);
      setFormData({});
      alert('Blog byl úspěšně uložen!');
    } catch (err) {
      setError('Došlo k chybě při ukládání blogu. Zkuste to prosím znovu.');
      console.error('Error saving blog:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {blogFields.map((field) => (
        <FormFieldComponent
          key={field.name}
          field={field}
          value={formData[field.name as keyof BlogFormData]}
          onChange={(value) => handleFieldChange(field.name, value)}
        />
      ))}

      {error && (
        <div className="text-red-600 mb-4">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isSubmitting ? 'Ukládám...' : 'Uložit blog'}
      </button>
    </form>
  );
}; 