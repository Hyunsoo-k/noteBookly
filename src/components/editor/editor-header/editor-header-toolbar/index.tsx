import type { JSX, ChangeEvent } from "react";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { PiImageThin } from "react-icons/pi";
import { PiTrashThin } from "react-icons/pi";
import { CiTextAlignLeft } from "react-icons/ci";
import { CiTextAlignCenter } from "react-icons/ci";

import styles from "./index.module.scss";

const EditorHeaderToolbar = (): JSX.Element => {
  const { watch, setValue } = useFormContext();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      setValue("thumbnailUrl", base64);
    };
  };

  const handleClickImageReset = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setValue("thumbnailUrl", null);
    };
  };

  return (
    <div className={styles["title-editor-toolbar-component"]}>
      <button
        type="button"
        onClick={() => { fileInputRef.current?.click(); }}
      >
        <PiImageThin
          size={25}
          color={watch("thumbnailUrl") ? "#FFF" : "black"}
        />
      </button>
      <button
        type="button"
        onClick={() => { setValue("headerAlign", "left"); }}
      >
        <CiTextAlignLeft
          size={25}
          color={watch("thumbnailUrl") ? "FFF" : "black"}
        />
      </button>
      <button
        type="button"
        onClick={() => { setValue("headerAlign", "center"); }}
      >
        <CiTextAlignCenter
          size={25}
          color={watch("thumbnailUrl") ? "FFF" : "black"}
        />
      </button>
      {watch("thumbnailUrl") && (
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

export default EditorHeaderToolbar;