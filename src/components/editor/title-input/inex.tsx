import type { JSX } from "react";
import { useState, useRef } from "react";

import TitleInputToolbar from "../toolbar/title-input-toolbar";

import styles from "./index.module.scss";

const TITLE_FONT_SIZE = 45;
const TITLE_LINE_HEIGHT = 1.4;
const TITLE_MAX_LINES = 2;

const TitleInput = (): JSX.Element => {
  const [backgroundImageSrc, setBackgroundImageSrc] = useState<string | null>(null);

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const titlePrevInnerHTMLRef = useRef<string>("");
  const subTitleRef = useRef<HTMLInputElement | null>(null);

  const handleLimitLineBeforeInput = (e: any): void => {
    const $title = titleRef.current;
    if (!$title) return;
    savePrevInnerHTML($title.innerHTML);

    const inputType = e.inputType || e.nativeEvent?.inputType;
    const isLineBreak =
      e.data === "\n" || inputType === "insertLineBreak" || inputType === "insertParagraph";
    if (!isLineBreak) return;

    const titleHeight = Math.round($title.getBoundingClientRect().height);
    const lineHeight = Math.round(TITLE_FONT_SIZE * TITLE_LINE_HEIGHT);
    const isLinesExceededOne = Math.round(titleHeight / lineHeight) > TITLE_MAX_LINES - 1;

    if (isLinesExceededOne) {
      e.preventDefault();
    }
  };

  const handleLimitLineOnInput = (): void => {
    const $title = titleRef.current;
    if (!$title) return;

    const text = $title.innerText.trim();
    if (text === "") {
      $title.innerHTML = "";
    }

    const titleHeight = Math.round($title.getBoundingClientRect().height);
    const lineHeight = Math.round(TITLE_FONT_SIZE * TITLE_LINE_HEIGHT);
    const isLinesExceededTwo = Math.round(titleHeight / lineHeight) > TITLE_MAX_LINES;

    if (isLinesExceededTwo) {
      returnToPrevInnerHTML($title, titlePrevInnerHTMLRef.current);
      $title.innerHTML = titlePrevInnerHTMLRef.current as string;
      setCursorToEnd($title);
    }
  };

  const savePrevInnerHTML = (titleInnerHTML: string): void => {
    titlePrevInnerHTMLRef.current = titleInnerHTML;
  };

  const returnToPrevInnerHTML = (
    $title: HTMLHeadingElement,
    titlePrevInnerHTML: string
  ): void => {
    $title.innerHTML = titlePrevInnerHTML;
  };

  const setCursorToEnd = (element: HTMLElement): void => {
    const range = document.createRange();
    const selection = window.getSelection();
    if (!selection) return;

    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  return (
    <div
      className={styles["title-input-component"]}
      style={{
        backgroundImage: `${backgroundImageSrc 
          ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backgroundImageSrc})`
          : "none"
        }`
      }}
    >
      <div
        spellCheck="false"
        className={styles["input-box"]}
      >
        <h1
          contentEditable="true"
          data-placeholder="제목을 입력하세요"
          onBeforeInput={handleLimitLineBeforeInput}
          onInput={handleLimitLineOnInput}
          ref={titleRef}
          className={`
            ${styles["title"]} 
            ${backgroundImageSrc
              ? styles["--active-background-image"]
              : ""}
          `}
        />
        <input
          placeholder="소제목을 입력하세요"
          maxLength={40}
          ref={subTitleRef}
          className={`
            ${styles["sub-title"]} 
            ${backgroundImageSrc
              ? styles["--active-background-image"]
              : ""}
          `}
        />
        <TitleInputToolbar
          backgroundImageSrc={backgroundImageSrc}
          setBackgroundImageSrc={setBackgroundImageSrc}
          titleInputRef={titleRef}
          subTitleInputRef={subTitleRef}
        />
      </div>
    </div>
  );
};

export default TitleInput