import React from "react";
import { Bold, List, ListOrdered, Quote, Strikethrough } from "lucide-react";

const Toolbar = ({ editor }: any) => {
  if (!editor) return null; // Ensure editor is defined before rendering

  return (
    <div className="px-4 py-3 flex justify-between items-start gap-5 w-full">
      <div className="space-x-2">
        {/* Bold Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={`${
            editor.isActive("bold") ? "bg-sky-700 text-white p-2 rounded-lg" : "text-sky-400"
          }`}
          aria-label="Bold text"
          aria-pressed={editor.isActive("bold")}
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-5 h-5" />
        </button>

        {/* StrikeThrough Button (Fixed name) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={`${
            editor.isActive("strikeThrough") ? "bg-sky-700 text-white p-2 rounded-lg" : "text-sky-400"
          }`}
        >
          <Strikethrough className="w-5 h-5" />
        </button>

        {/* Bullet List Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={`${
            editor.isActive("bulletList") ? "bg-sky-700 text-white p-2 rounded-lg" : "text-sky-400"
          }`}
        >
          <List className="w-5 h-5" />
        </button>

        {/* Ordered List Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={`${
            editor.isActive("orderedList") ? "bg-sky-700 text-white p-2 rounded-lg" : "text-sky-400"
          }`}
        >
          <ListOrdered className="w-5 h-5" />
        </button>

        {/* Blockquote Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={`${
            editor.isActive("blockquote") ? "bg-sky-700 text-white p-2 rounded-lg" : "text-sky-400"
          }`}
        >
          <Quote className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
