"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CharacterCount } from "@tiptap/extensions";
import TiptapMenu from "./TiptapMenu";
import type { JSONContent } from "@tiptap/react";

type TiptapProps = {
  content: JSONContent;
  charLimit: number;
  onChange: (content: JSONContent, contentText: string) => void;
  isEditable: boolean;
};

export default function Tiptap({
  content,
  charLimit,
  onChange,
  isEditable,
}: TiptapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount.configure({
        limit: charLimit,
      }),
    ],
    content: content,
    editable: isEditable,
    editorProps: {
      attributes: {
        class: isEditable
          ? "border-1 border-gray-300 rounded-b-2xl p-3 focus:outline-rose-600 focus:outline-1 bg-gray-100 dark:bg-neutral-950 focus:border-transparent h-[150px] overflow-y-auto"
          : "",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON(), editor.getText());
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div>
        {isEditable && <TiptapMenu editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
