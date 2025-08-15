import type { JSX } from "react";
import { BsFeather } from "react-icons/bs";

import formatToMonthAbbrYear from "@/utils/formatToMonthAbbrYear";

import styles from "./index.module.scss";

interface Props {
  writer: string;
  createdAt: string;
  thumbnailUrl: string;
  headerAlign: "left" | "center";
};

const PostInfoBox = ({
  writer,
  createdAt,
  thumbnailUrl,
  headerAlign
}: Props): JSX.Element => {
  const formatedDate = formatToMonthAbbrYear(createdAt);

  return (
    <div
      className={styles["post-info-box-component"]}
      style={{
        textAlign: headerAlign
      }}
    >
      <div className={styles["data-box"]}>
        <span className={`${thumbnailUrl ? styles["--active-background-image"] : ""}`}>
          <BsFeather size={12} color={thumbnailUrl ? "#FFF" : "2C2C2C"} />
          {writer}
        </span>
        <span className={
          `${styles["boundary-dot"]} ${thumbnailUrl ? styles["--active-background-image"] : ""}`}
        />
        <span className={`${thumbnailUrl ? styles["--active-background-image"] : ""}`}>
          {formatedDate}
        </span>
      </div>
    </div>
  );
};

export default PostInfoBox;