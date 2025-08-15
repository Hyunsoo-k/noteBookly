import type { JSX } from "react";
import type { Editor } from "@tiptap/react";
import ContentEditor from "@/components/editor/content-editor/content-editor";
import ContentEditorToolbar from "@/components/editor/content-editor/content-editor-toolbar";

import styles from "./index.module.scss";

interface Props {
  editor: Editor | null;
};

const ContentEditorBox = ({ editor }: Props): JSX.Element => {
  if (editor === null) {
    return (
      <div className={styles["content-editor-box-component--editor-null"]}></div>
    )
  }

  return (
    <div className={styles["content-editor-box-component"]}>
      <ContentEditor editor={editor} />
      <ContentEditorToolbar editor={editor} />
    </div>
  );
};

export default ContentEditorBox;
