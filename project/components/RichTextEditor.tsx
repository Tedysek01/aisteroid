"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Youtube from '@tiptap/extension-youtube';
import Link from '@tiptap/extension-link';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Paragraph from '@tiptap/extension-paragraph';
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  List,
  ListOrdered,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Heading3,
  Youtube as YoutubeIcon,
  Check,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Youtube.configure({
        inline: false,
        HTMLAttributes: {
          class: 'w-full aspect-video rounded-lg my-4',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-700 underline',
        },
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList,
      OrderedList,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Bold,
      Italic,
      Paragraph,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addYoutubeVideo = () => {
    const url = prompt('Vložte URL YouTube videa:');
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
      });
    }
  };

  const addLink = () => {
    const url = prompt('Vložte URL odkazu:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-[#1C1C1C] p-2 border-b border-gray-700 flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('bold') ? 'bg-gray-700' : ''}`}
          title="Tučné"
        >
          <BoldIcon size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('italic') ? 'bg-gray-700' : ''}`}
          title="Kurzíva"
        >
          <ItalicIcon size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('bulletList') ? 'bg-gray-700' : ''}`}
          title="Odrážkový seznam"
        >
          <List size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('orderedList') ? 'bg-gray-700' : ''}`}
          title="Číslovaný seznam"
        >
          <ListOrdered size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('taskList') ? 'bg-gray-700' : ''}`}
          title="Seznam úkolů"
        >
          <Check size={20} />
        </button>
        <button
          onClick={addLink}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('link') ? 'bg-gray-700' : ''}`}
          title="Přidat odkaz"
        >
          <LinkIcon size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-700' : ''}`}
          title="Nadpis 1"
        >
          <Heading1 size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-700' : ''}`}
          title="Nadpis 2"
        >
          <Heading2 size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-700' : ''}`}
          title="Nadpis 3"
        >
          <Heading3 size={20} />
        </button>
        <button
          onClick={addYoutubeVideo}
          className="p-2 rounded hover:bg-gray-700"
          title="Přidat YouTube video"
        >
          <YoutubeIcon size={20} />
        </button>
      </div>
      <EditorContent editor={editor} className="prose prose-invert max-w-none p-4 min-h-[200px]" />
    </div>
  );
};

export default RichTextEditor; 