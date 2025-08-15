import type { JSX, MouseEvent } from "react";
import { useRef } from "react";
import { Editor } from "@tiptap/react";
import { LuBold } from "react-icons/lu";
import { PiTextItalicLight } from "react-icons/pi";
import { RxQuote } from "react-icons/rx";
import { PiImageThin } from "react-icons/pi";
import { CiTextAlignLeft } from "react-icons/ci";
import { CiTextAlignCenter } from "react-icons/ci";
import { CiTextAlignRight } from "react-icons/ci";
import { VscHorizontalRule } from "react-icons/vsc";

import styles from "./index.module.scss";

interface Props {
  editor: Editor | null;
};

const ContentEditorToolbar = ({ editor }: Props): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      editor
        ?.chain()
        .focus()
        .insertContent({
          type: "resizeAbleImageNode",
          attrs: {
            src: base64,
          },
        })
        .run();
    };
  };

  return (
    <div
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
      }}
      className={styles["content-editor-toolbar-component"]}
    >
      <button
        type="button"
        onClick={() => {
          editor?.chain().focus().toggleBold().run();
        }}
      >
        <LuBold
          size={25}
          color={editor?.isActive("bold") ? "rgb(9, 204, 178)" : "black"}
        />
      </button>
      <button
        type="button"
        onClick={() => {
          editor?.chain().focus().toggleItalic().run();
        }}
      >
        <PiTextItalicLight
          size={25}
          color={editor?.isActive("italic") ? "rgb(9, 204, 178)" : "black"}
        />
      </button>
      <button
        type="button"
        onClick={() => {
          editor?.chain().focus().toggleBlockquote().run();
        }}
      >
        <RxQuote
          size={25}
          color={editor?.isActive("blockquote") ? "rgb(9, 204, 178)" : "black"}
        />
      </button>
      <button
        type="button"
        onClick={() => { fileInputRef.current?.click(); }}
      >
        <PiImageThin size={25} />
      </button>
      <button
        type="button"
        onClick={() => {
          editor?.chain().focus().toggleTextAlign("left").run();
        }}
      >
        <CiTextAlignLeft
          size={25}
          color={editor?.isActive({ textAlign: "left" }) ? "rgb(9, 204, 178)" : "black"}
        />
      </button>
      <button
        type="button"
        onClick={() => {
          editor?.chain().focus().toggleTextAlign("center").run();
        }}
      >
        <CiTextAlignCenter
          size={25}
          color={editor?.isActive({ textAlign: "center" }) ? "rgb(9, 204, 178)" : "black"}
        />
      </button>
      <button
        type="button"
        onClick={() => {
          editor?.chain().focus().toggleTextAlign("right").run();
        }}
      >
        <CiTextAlignRight size={25} color={editor?.isActive({ textAlign: "right" }) ? "rgb(9, 204, 178)" : "black"} />
      </button>
      <button
        type="button"
        onClick={() => { editor?.chain().focus().setHorizontalRule().run(); }}
      >
        <VscHorizontalRule size={25} />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default ContentEditorToolbar;