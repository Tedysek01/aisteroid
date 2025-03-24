"use client";

import { useState, useCallback } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import NextImage from 'next/image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CreatableSelect from 'react-select/creatable';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, Table as TableIcon, Image as ImageIcon, Eye, Save } from "lucide-react";
import type { BlogPost } from "@/lib/data/blog-posts";
import { BlogService } from "@/lib/services/blog-service";
import Select from 'react-select';

interface Tag {
  value: string;
  label: string;
}

const popularTags: Tag[] = [
  { value: 'ai', label: 'AI' },
  { value: 'machine-learning', label: 'Machine Learning' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'programming', label: 'Programming' },
  { value: 'technology', label: 'Technology' }
];

export function AddBlogPostForm() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    publishDate: new Date(),
    status: "draft",
    tags: [] as Tag[],
    seoTitle: "",
    seoDescription: "",
    featuredImage: null as File | null,
    featuredImagePreview: "",
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
      }),
      Link,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-[300px] focus:outline-none'
      }
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          featuredImage: file,
          featuredImagePreview: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      editor?.chain().focus().insertContent({
        type: 'image',
        attrs: { src: reader.result as string }
      }).run();
    };
    reader.readAsDataURL(file);
  }, [editor]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    setFormData(prev => ({
      ...prev,
      title,
      slug
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log('Form submission started');
      
      const blogPost: BlogPost = {
        id: formData.slug,
        title: formData.title,
        excerpt: formData.excerpt,
        content: editor?.getHTML() || "",
        date: format(formData.publishDate, "yyyy-MM-dd"),
        readTime: "5 min read",
        author: "Admin",
        coverImage: formData.featuredImagePreview || "https://images.unsplash.com/photo-1677442136019-21780ecad995",
        status: formData.status as 'draft' | 'published',
        tags: formData.tags.map(tag => tag.value),
        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription
      };

      console.log('Blog post data prepared:', blogPost);

      const postId = await BlogService.createPost(blogPost);
      console.log('Post created successfully with ID:', postId);
      console.log('Post URL:', `/blog/${postId}`);

      // Reset form
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        publishDate: new Date(),
        status: "draft",
        tags: [],
        seoTitle: "",
        seoDescription: "",
        featuredImage: null,
        featuredImagePreview: "",
      });
      
      editor?.commands.setContent("");
      alert(`Příspěvek byl úspěšně uložen do Firebase! ID: ${postId}\nURL: /blog/${postId}`);
    } catch (error) {
      console.error('Form submission error:', error);
      alert(`Chyba při ukládání příspěvku do Firebase: ${error instanceof Error ? error.message : 'Neznámá chyba'}`);
    }
  };

  return (
    <div className="bg-[#1C1C1C] p-6 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Create New Post</h2>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="flex items-center gap-2"
            >
              <Eye size={16} />
              {isPreviewMode ? "Edit" : "Preview"}
            </Button>
            <Button type="submit" className="flex items-center gap-2">
              <Save size={16} />
              Save Post
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              value={formData.title}
              onChange={handleTitleChange}
              className="bg-[#242424] border-[#333]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              className="bg-[#242424] border-[#333]"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Featured Image</label>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="bg-[#242424] border-[#333]"
            />
            {formData.featuredImagePreview && (
              <NextImage
                src={formData.featuredImagePreview}
                alt="Preview"
                width={80}
                height={80}
                className="object-cover rounded"
              />
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <CreatableSelect
            isMulti
            options={popularTags}
            value={formData.tags}
            onChange={(newValue) => setFormData(prev => ({ ...prev, tags: newValue as Tag[] }))}
            placeholder="Zadej nebo vyber tagy..."
            formatCreateLabel={(inputValue) => `Přidat "${inputValue}"`}
            className="react-select-container"
            classNamePrefix="react-select"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: '#242424',
                borderColor: '#333',
                '&:hover': {
                  borderColor: '#444'
                }
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: '#242424'
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? '#333' : '#242424',
                '&:hover': {
                  backgroundColor: '#333'
                }
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: '#333'
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: 'white'
              }),
              multiValueRemove: (base) => ({
                ...base,
                '&:hover': {
                  backgroundColor: '#444'
                }
              }),
              input: (base) => ({
                ...base,
                color: 'white !important'
              }),
              placeholder: (base) => ({
                ...base,
                color: 'rgba(255, 255, 255, 0.5)'
              })
            }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                neutral80: 'white',
                neutral60: 'white',
              },
            })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Excerpt</label>
          <Textarea
            value={formData.excerpt}
            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            className="bg-[#242424] border-[#333]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          {!isPreviewMode ? (
            <div className="border border-[#333] rounded-lg overflow-hidden">
              <div className="bg-[#242424] p-2 border-b border-[#333] flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={editor?.isActive('bold') ? 'bg-[#333]' : ''}
                >
                  <Bold size={16} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={editor?.isActive('italic') ? 'bg-[#333]' : ''}
                >
                  <Italic size={16} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleUnderline().run()}
                >
                  <UnderlineIcon size={16} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleBulletList().run()}
                >
                  <List size={16} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                >
                  <ListOrdered size={16} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                >
                  <AlignLeft size={16} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                >
                  <AlignCenter size={16} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                >
                  <AlignRight size={16} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
                  }}
                >
                  <TableIcon size={16} />
                </Button>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleEditorImageUpload(file);
                    }}
                  />
                  <Button type="button" variant="ghost" size="sm" asChild>
                    <span>
                      <ImageIcon size={16} />
                    </span>
                  </Button>
                </label>
              </div>
              <EditorContent editor={editor} className="p-4 bg-[#242424]" />
            </div>
          ) : (
            <div 
              className="prose prose-invert max-w-none 
                prose-headings:text-white 
                prose-h3:text-xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4
                prose-h4:text-lg prose-h4:font-semibold prose-h4:mt-6 prose-h4:mb-3
                prose-p:my-4 
                prose-ul:list-disc prose-ul:pl-5 
                prose-li:my-2
                prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:pl-4 prose-blockquote:italic
                prose-strong:font-bold prose-strong:text-white"
              dangerouslySetInnerHTML={{ __html: formData.content }}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Publish Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-[#242424] border-[#333]",
                    !formData.publishDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.publishDate ? format(formData.publishDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#242424]">
                <Calendar
                  mode="single"
                  selected={formData.publishDate}
                  onSelect={(date) => date && setFormData(prev => ({ ...prev, publishDate: date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <Select
              options={[
                { value: 'draft', label: 'Draft' },
                { value: 'published', label: 'Published' }
              ]}
              value={{ value: formData.status, label: formData.status.charAt(0).toUpperCase() + formData.status.slice(1) }}
              onChange={(newValue) => setFormData(prev => ({ ...prev, status: (newValue?.value || 'draft') }))}
              className="react-select-container"
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: '#242424',
                  borderColor: '#333',
                  '&:hover': {
                    borderColor: '#444'
                  }
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: '#242424'
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? '#333' : '#242424',
                  '&:hover': {
                    backgroundColor: '#333'
                  }
                })
              }}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">SEO Title</label>
              <Input
                value={formData.seoTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                className="bg-[#242424] border-[#333]"
                placeholder="SEO optimized title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">SEO Description</label>
              <Textarea
                value={formData.seoDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                className="bg-[#242424] border-[#333]"
                placeholder="Meta description for search engines"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}