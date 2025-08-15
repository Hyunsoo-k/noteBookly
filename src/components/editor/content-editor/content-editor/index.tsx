import type { JSX } from "react";
import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { Editor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";

import styles from "./index.module.scss";

interface Props {
  editor: Editor;
};

const ContentEditor = ({ editor }: Props): JSX.Element => {
  const { control } = useFormContext();

  const contentEditorRef = useRef<HTMLDivElement | null>(null);

  const handleClickEditorArea = (e: React.MouseEvent<HTMLDivElement>) => {
    const $contentEditor = contentEditorRef.current;
    const $proseMirror = $contentEditor?.querySelector(".ProseMirror");
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
    <Controller
      name="content"
      control={control}
      rules={{
        validate: (): string | true => {
          if (editor?.getText().trim().length < 1) {
            return "내용을 입력해 주세요.";
          }
          return true;
        },
      }}
      render={() => (
        <EditorContent
          editor={editor}
          spellCheck="false"
          ref={contentEditorRef}
          onClick={handleClickEditorArea}
          className={styles["editor-content-component"]}
        />
      )}
    >

    </Controller>
  );
};

export default ContentEditor;