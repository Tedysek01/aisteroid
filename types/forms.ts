export type BaseField = {
  name: string;
  label: string;
  type: string;
  required: boolean;
}

export type SelectField = BaseField & {
  type: 'select';
  options: string[];
}

export type TextField = BaseField & {
  type: 'text' | 'textarea' | 'richtext' | 'url';
}

export type FileField = BaseField & {
  type: 'file';
}

export type DateField = BaseField & {
  type: 'date';
}

export type NumberField = BaseField & {
  type: 'number';
}

export type TagsField = BaseField & {
  type: 'tags';
}

export type FormField = TextField | SelectField | FileField | DateField | NumberField | TagsField;

export type PromptFormData = {
  title: string;
  description: string;
  prompt: string;
  video?: string;
  category?: string;
  difficulty?: string;
  example_output?: string;
  instructions?: string;
  created_at?: Date;
}

export type AgentFormData = {
  title: string;
  description: string;
  video?: string;
  technology?: string;
  use_case?: string;
  difficulty?: string;
  tags?: string[];
  json_file?: File;
  created_at?: Date;
}

export type BlogFormData = {
  title: string;
  perex?: string;
  content: string;
  author: string;
  created_at: Date;
  reading_time?: number;
  cover_image?: File;
  tags?: string[];
  seo_title?: string;
  seo_description?: string;
} 