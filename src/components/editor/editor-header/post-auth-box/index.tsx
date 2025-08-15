import type { JSX, ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

import styles from "./index.module.scss";

const PostAuthBox = (): JSX.Element => {
  const { register, watch } = useFormContext();
  
  const handleLimitLength = (e: ChangeEvent<HTMLInputElement>, fieldType: "writer" | "password") => {
    const maxLength = fieldType === "writer" ? 7 : 14;
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
  };

  return (
    <div className={styles["post-auth-box-component"]}>
      <div
        className={styles["input-box"]}
        style={{
          margin: watch("headerAlign") === "center" ? "0 auto" : "",
          marginLeft: watch("headerAlign") === "center" ? "250px" : "0"
        }}
      >
        <div className={styles["input-area"]}>
          <label
            htmlFor="writer"
            className={`${watch("thumbnailUrl") ? styles["--active-background-image"] : ""}`}
          >
            작성자 :
          </label>
          <input
            id="writer"
            maxLength={7}
            spellCheck="false"
            autoComplete="off"
            {...register("writer", {
              required: "작성자를 입력해 주세요.",
              minLength: {
                value: 2,
                message: "작성자는 2자 이상이어야 합니다.",
              },
              maxLength: {
                value: 7,
                message: "작성자는 7자 이하여야 합니다.",
              },
              onChange: (e) => { handleLimitLength(e, "writer"); },
            })}
            className={`${watch("thumbnailUrl") ? styles["--active-background-image"] : ""}`}
          />
        </div>
        <div className={styles["input-area"]}>
          <label
            htmlFor="password"
            className={`${watch("thumbnailUrl") ? styles["--active-background-image"] : ""}`}
          >
            게시글 비밀번호 :
          </label>
          <input
            id="password"
            type="password"
            maxLength={15}
            spellCheck="false"
            autoComplete="off"
            {...register("password", {
              required: "비밀번호를 입력해 주세요.",
              minLength: {
                value: 4,
                message: "비밀번호는 4자 이상 이어야 합니다.",
              },
              maxLength: {
                value: 15,
                message: "비밀번호는 15자 이하 이어야 합니다.",
              },
              onChange: (e) => { handleLimitLength(e, "password"); },
            })}
            className={`${watch("thumbnailUrl") ? styles["--active-background-image"] : ""}`}
          />
        </div>
      </div>
    </div>
  );
};

export default PostAuthBox;
