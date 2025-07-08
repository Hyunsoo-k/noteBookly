import type { JSX, Dispatch, SetStateAction, RefObject, ChangeEvent } from "react";
import { useRef } from "react";
import { PiImageThin } from "react-icons/pi";
import { PiTrashThin } from "react-icons/pi";
import { CiTextAlignLeft } from "react-icons/ci";
import { CiTextAlignCenter } from "react-icons/ci";

import styles from "./index.module.scss";

interface Props {
  backgroundImageSrc: string | null;
  setBackgroundImageSrc: Dispatch<SetStateAction<string | null>>;
  titleInputRef: RefObject<HTMLHeadingElement | null>;
  subTitleInputRef: RefObject<HTMLInputElement | null>;
};

const TitleInputToolbar = ({
  backgroundImageSrc,
  setBackgroundImageSrc,
  titleInputRef,
  subTitleInputRef
}: Props): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      setBackgroundImageSrc(base64);
    };
  };

  const handleClickImageReset = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setBackgroundImageSrc(null);
    };
  };

  return (
    <div className={styles["title-input-toolbar"]}>
      <button
        type="button"
        onClick={() => { fileInputRef.current?.click(); }}
      >
        <PiImageThin
          size={25}
          color={backgroundImageSrc ? "#FFF" : "black"}
        />
      </button>
      <button
        type="button"
        onClick={() => {
          if (titleInputRef.current && subTitleInputRef.current) {
            titleInputRef.current.style.textAlign = "left";
            subTitleInputRef.current.style.textAlign = "left";
          }
        }}
      >
        <CiTextAlignLeft
          size={25}
          color={backgroundImageSrc ? "FFF" : "black"}
        />
      </button>
      <button
        type="button"
        onClick={() => {
          if (titleInputRef.current && subTitleInputRef.current) {
            titleInputRef.current.style.textAlign = "center";
            subTitleInputRef.current.style.textAlign = "center";
          }
        }}
      >
        <CiTextAlignCenter
          size={25}
          color={backgroundImageSrc ? "FFF" : "black"}
        />
      </button>
      {backgroundImageSrc && (
        <button
          type="button"
          onClick={handleClickImageReset}
        >
          <PiTrashThin
            size={25}
            color="#FFF"
          />
        </button>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{
          display: "none"
        }}
      />
    </div>
  );
};

export default TitleInputToolbar;