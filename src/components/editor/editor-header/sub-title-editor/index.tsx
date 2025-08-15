import type { JSX } from "react";
import { useFormContext } from "react-hook-form";

import styles from "./index.module.scss";

const SubTitleEditor = (): JSX.Element => {
  const { watch, register } = useFormContext();

  return (
    <input
      placeholder="소제목을 입력하세요"
      autoComplete="off"
      maxLength={40}
      {...register("subTitle", {
        maxLength: {
          value: 40,
          message: "소제목은 최대 40자까지 입력 가능합니다."
        }
      })}
      className={`
        ${styles["sub-title-editor-component"]} 
        ${watch("thumbnailUrl")
          ? styles["--active-background-image"]
          : ""}
      `}
      style={
        { textAlign: watch("headerAlign") }
      }
    />
  );
};

export default SubTitleEditor;