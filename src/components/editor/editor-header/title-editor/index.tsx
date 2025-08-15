import type { JSX } from "react";
import { useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";

import styles from "./index.module.scss";

const TITLE_FONT_SIZE = 45;
const TITLE_LINE_HEIGHT = 1.4;
const TITLE_MAX_LINES = 2;

const TitleEditor = (): JSX.Element => {
  const { control, watch } = useFormContext();

  const titleEditorRef = useRef<HTMLHeadingElement | null>(null);
  const titlePrevInnerHTMLRef = useRef<string>(titleEditorRef?.current?.innerHTML || "");

  /**
   * 입력처리 전 줄 수를 2줄로 제한하는 메서드
   */
  const handleLimitLineBeforeInput = (e: any): void => {
    if (titleEditorRef === null) return;
    const $titleEditor = titleEditorRef.current;
    if (!$titleEditor) return;
    titlePrevInnerHTMLRef.current = $titleEditor.innerHTML;

    const inputType = e.inputType || e.nativeEvent?.inputType;
    const isLineBreak = e.data === "\n" || inputType === "insertLineBreak" || inputType === "insertParagraph";
    if (!isLineBreak) return;

    const titleHeight = Math.round($titleEditor.getBoundingClientRect().height);
    const lineHeight = Math.round(TITLE_FONT_SIZE * TITLE_LINE_HEIGHT);
    const isLinesExceededOne = Math.round(titleHeight / lineHeight) > TITLE_MAX_LINES - 1;

    if (isLinesExceededOne) {
      e.preventDefault();
    }
  };

  /**
   * 줄 수가 제한을 초과하면 이전 상태로 복구하는 메서드
   */
  const handleLimitLineOnInput = (): void => {
    const $titleEditorRef = titleEditorRef.current;
    if (!$titleEditorRef) return;

    const text = $titleEditorRef.innerText.trim();
    if (text === "") $titleEditorRef.innerHTML = "";

    const titleHeight = Math.round($titleEditorRef.getBoundingClientRect().height);
    const lineHeight = Math.round(TITLE_FONT_SIZE * TITLE_LINE_HEIGHT);
    const isLinesExceededTwo = Math.round(titleHeight / lineHeight) > TITLE_MAX_LINES;

    if (isLinesExceededTwo) {
      $titleEditorRef.innerHTML = titlePrevInnerHTMLRef.current;

      const range = document.createRange();
      const selection = window.getSelection();
      if (!selection) return;
      range.selectNodeContents($titleEditorRef);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return (
    <Controller
      name="title"
      control={control}
      rules={{
        required: "제목을 입력하세요.",
        validate: (value: string): string | true => {
          if (value.trim().length < 2) {
            return "제목을 2자 이상 입력해 주세요.";
          }
          return true;
        },
        maxLength: {
          value: 40,
          message: "제목은 최대 40자까지 입력 가능합니다.",
        }
      }}
      render={({ field }) => (
        <h1
          contentEditable="true"
          data-placeholder="제목을 입력하세요"
          ref={(el) => {
            field.ref(el);
            titleEditorRef.current = el;
          }}
          onBeforeInput={handleLimitLineBeforeInput}
          onInput={(e) => {
            field.onChange(e.currentTarget.textContent);
            handleLimitLineOnInput();
          }}
          className={`
            ${styles["title-editor-component"]} 
            ${watch("thumbnailUrl") ? styles["--active-background-image"] : ""}
          `}
          style={
            { textAlign: watch("headerAlign") }
          }
        />
      )}
    />
  );
};

export default TitleEditor;
