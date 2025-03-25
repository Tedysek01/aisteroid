import React from 'react';
import { FormField } from '@/types/forms';
import { Editor } from '@tiptap/react';
import dynamic from 'next/dynamic';

const TipTap = dynamic(() => import('../TipTap'), { ssr: false });

interface FormFieldProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
}

export const FormFieldComponent: React.FC<FormFieldProps> = ({ field, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0]);
    }
  };

  const handleTagsChange = (tags: string[]) => {
    onChange(tags);
  };

  switch (field.type) {
    case 'text':
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          <input
            type="text"
            value={value || ''}
            onChange={handleChange}
            required={field.required}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      );

    case 'textarea':
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          <textarea
            value={value || ''}
            onChange={handleChange}
            required={field.required}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      );

    case 'richtext':
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          <TipTap content={value} onChange={onChange} />
        </div>
      );

    case 'select':
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          <select
            value={value || ''}
            onChange={handleChange}
            required={field.required}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Vyberte...</option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );

    case 'file':
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          <input
            type="file"
            onChange={handleFileChange}
            required={field.required}
            className="mt-1 block w-full"
          />
        </div>
      );

    case 'date':
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          <input
            type="date"
            value={value ? new Date(value).toISOString().split('T')[0] : ''}
            onChange={handleChange}
            required={field.required}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      );

    case 'number':
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          <input
            type="number"
            value={value || ''}
            onChange={handleChange}
            required={field.required}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      );

    case 'tags':
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          <div className="mt-1">
            {/* Zde by měla být implementace tagu, pro jednoduchost používám input */}
            <input
              type="text"
              value={Array.isArray(value) ? value.join(', ') : ''}
              onChange={(e) => handleTagsChange(e.target.value.split(',').map(tag => tag.trim()))}
              placeholder="Tagy oddělené čárkou"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}; 