"use client";
import { useEditorState } from "@tiptap/react";
import { Bold, Italic, List, Underline } from "lucide-react";
import type { Editor } from "@tiptap/react";

export default function TiptapMenu({ editor }: { editor: Editor | null }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive("bold") ?? false,
      canBold: ctx.editor?.can().chain().toggleBold().run() ?? false,
      isItalic: ctx.editor?.isActive("italic") ?? false,
      canItalic: ctx.editor?.can().chain().toggleItalic().run() ?? false,
      isUnderline: ctx.editor?.isActive("underline") ?? false,
      canUnderline: ctx.editor?.can().chain().toggleUnderline().run() ?? false,
      isBulletList: ctx.editor?.isActive("bulletList") ?? false,
    }),
  });
  if (!editor) {
    return null;
  }

  if (!editorState) return null;

  return (
    <div className="bg-neutral-900 text-gray-100 py-2 px-5 flex gap-2 rounded-t-2xl">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState.canBold}
        className={`cursor-pointer hover:bg-rose-600 rounded-md text-gray-100 p-2 ${
          editorState.isBold ? "bg-rose-500 text-gray-100" : ""
        }`}
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editorState.canItalic}
        className={`cursor-pointer hover:bg-rose-600 rounded-md text-gray-100 p-2 ${
          editorState.isItalic ? "bg-rose-500 text-gray-100" : ""
        }`}
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editorState.canUnderline}
        className={`cursor-pointer hover:bg-rose-600 rounded-md text-gray-100 p-2 ${
          editorState.isUnderline ? "bg-rose-500 text-gray-100" : ""
        }`}
      >
        <Underline size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`cursor-pointer hover:bg-rose-600 rounded-md text-gray-100 p-2 ${
          editorState.isBulletList ? "bg-rose-500 text-gray-100" : ""
        }`}
      >
        <List size={16} />
      </button>
    </div>
  );
}
