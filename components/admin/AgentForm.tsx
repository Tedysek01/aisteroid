import React, { useState } from 'react';
import { FormFieldComponent } from './FormField';
import { AgentFormData } from '@/types/forms';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

const agentFields = [
  { name: 'title', label: 'Název', type: 'text', required: true },
  { name: 'description', label: 'Krátký popis', type: 'textarea', required: true },
  { name: 'video', label: 'Video (odkaz nebo upload)', type: 'url', required: false },
  { name: 'technology', label: 'Použitá technologie', type: 'select', options: ['n8n', 'Zapier', 'Make.com', 'Langchain', 'Jiné'], required: false },
  { name: 'use_case', label: 'Use-case / problém, který řeší', type: 'textarea', required: false },
  { name: 'difficulty', label: 'Obtížnost nastavení', type: 'select', options: ['Jednoduchý', 'Střední', 'Složitý'], required: false },
  { name: 'tags', label: 'Tagy', type: 'tags', required: false },
  { name: 'json_file', label: 'JSON konfigurace agenta', type: 'file', required: false },
  { name: 'created_at', label: 'Datum přidání', type: 'date', required: false }
];

export const AgentForm: React.FC = () => {
  const [formData, setFormData] = useState<Partial<AgentFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let jsonFileUrl = '';
      if (formData.json_file instanceof File) {
        const fileRef = ref(storage, `agent-configs/${formData.json_file.name}`);
        await uploadBytes(fileRef, formData.json_file);
        jsonFileUrl = await getDownloadURL(fileRef);
      }

      const agentData = {
        ...formData,
        json_file: jsonFileUrl || null,
        created_at: formData.created_at || new Date()
      };

      await addDoc(collection(db, 'agents'), agentData);
      setFormData({});
      alert('Agent byl úspěšně uložen!');
    } catch (err) {
      setError('Došlo k chybě při ukládání agenta. Zkuste to prosím znovu.');
      console.error('Error saving agent:', err);
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
      {agentFields.map((field) => (
        <FormFieldComponent
          key={field.name}
          field={field}
          value={formData[field.name as keyof AgentFormData]}
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
        {isSubmitting ? 'Ukládám...' : 'Uložit agenta'}
      </button>
    </form>
  );
}; 