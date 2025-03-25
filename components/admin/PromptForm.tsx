import React, { useState } from 'react';
import { FormFieldComponent } from './FormField';
import { PromptFormData } from '@/types/forms';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const promptFields = [
  { name: 'title', label: 'Název', type: 'text', required: true },
  { name: 'description', label: 'Krátký popis', type: 'textarea', required: true },
  { name: 'prompt', label: 'Prompt', type: 'textarea', required: true },
  { name: 'video', label: 'Video (odkaz nebo upload)', type: 'url', required: false },
  { name: 'category', label: 'Kategorie', type: 'select', options: ['Marketing', 'Programování', 'Design', 'Obecné', 'n8n', 'OpenAI'], required: false },
  { name: 'difficulty', label: 'Obtížnost', type: 'select', options: ['Začátečník', 'Pokročilý', 'Expert'], required: false },
  { name: 'example_output', label: 'Příklad výstupu', type: 'textarea', required: false },
  { name: 'instructions', label: 'Jak prompt použít/upravit', type: 'textarea', required: false },
  { name: 'created_at', label: 'Datum přidání', type: 'date', required: false }
];

export const PromptForm: React.FC = () => {
  const [formData, setFormData] = useState<Partial<PromptFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const promptData = {
        ...formData,
        created_at: formData.created_at || new Date()
      };

      await addDoc(collection(db, 'prompts'), promptData);
      setFormData({});
      alert('Prompt byl úspěšně uložen!');
    } catch (err) {
      setError('Došlo k chybě při ukládání promptu. Zkuste to prosím znovu.');
      console.error('Error saving prompt:', err);
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
      {promptFields.map((field) => (
        <FormFieldComponent
          key={field.name}
          field={field}
          value={formData[field.name as keyof PromptFormData]}
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
        {isSubmitting ? 'Ukládám...' : 'Uložit prompt'}
      </button>
    </form>
  );
}; 