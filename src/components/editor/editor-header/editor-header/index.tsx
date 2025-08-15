import type { JSX } from "react";
import { useFormContext } from "react-hook-form";

import TitleEditor from "@/components/editor/editor-header/title-editor";
import SubTitleEditor from "@/components/editor/editor-header/sub-title-editor";
import EditorHeaderToolbar from "@/components/editor/editor-header/editor-header-toolbar";
import PostAuthBox from "@/components/editor/editor-header/post-auth-box";

import styles from "./index.module.scss";

const EditorHeader = (): JSX.Element => {
  const { watch } = useFormContext();

  return (
    <div
      spellCheck="false"
      className={styles["editor-header-component"]}
      style={{
        backgroundImage: `${
          watch("thumbnailUrl")
            ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${watch("thumbnailUrl")})`
            : "none"
        }`,
      }}
    >
      <TitleEditor />
      <SubTitleEditor />
      <EditorHeaderToolbar />
      <PostAuthBox />
    </div>
  );
};

export default EditorHeader;
