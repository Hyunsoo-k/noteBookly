import type { JSX } from "react";
import { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import extendedTextAlign from "@/editor/extensions/extendedTextAlign";
import resizeAbleImageNode from "@/editor/nodes/resize-able-image-node";
import TitleInput from "@/components/editor/title-input/inex";
import EditorToolbar from "@/components/editor/toolbar/editor-toolbar";

import styles from "./index.module.scss";

const CreatePostPage = ():JSX.Element => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "내용을 입력하세요",
      }),
      extendedTextAlign.configure({
        types: [
          "heading",
          "paragraph",
          "resizeAbleImageNode"
        ],
      }),
      resizeAbleImageNode,
    ],
    content: "",
  });

  const editorContentWrapperRef = useRef<HTMLDivElement | null>(null);

  const handleClickEditorArea = (e: React.MouseEvent<HTMLDivElement>) => {
    const editorContentWrapper = editorContentWrapperRef.current;
    const $proseMirror = editorContentWrapper?.querySelector(".ProseMirror");
    if (!editor || !$proseMirror) return;

    const $lastChild = $proseMirror.children[$proseMirror.children.length - 1];
    if (!$lastChild) return;
    const clickY = e.clientY;
    const lastY = $lastChild.getBoundingClientRect().bottom;

    const isBelow = clickY > lastY;
    const isLastChildEmptyP = $lastChild.nodeName === "P" && $lastChild.textContent?.trim() === "";

    if (isBelow && !isLastChildEmptyP) {
      const end = editor.state.doc.content.size;
      editor.commands.insertContentAt(end, { type: "paragraph" });
      editor.commands.focus("end");
    }
  };

  return (
    <form className={styles["create-post-page-component"]}>
      <TitleInput />
      <div
        ref={editorContentWrapperRef}
        onClick={handleClickEditorArea}
        className={styles["editor-content-wrapper"]}
      >
        <EditorContent editor={editor} spellCheck="false" className={styles["editor-content"]} />
        <EditorToolbar editor={editor} />
      </div>
    </form>
  );
};

export default CreatePostPage;