import type { JSX } from "react";

import styles from "./index.module.scss";

interface Props {
  subTitle: string | null;
  thumbnailUrl: string | null;
  headerAlign: "left" | "center";
};

const SubTitle = ({
  subTitle,
  thumbnailUrl,
  headerAlign
}: Props): JSX.Element => {
  return (
    <span
      className={`
        ${styles["sub-title-component"]} 
        ${thumbnailUrl
          ? styles["--active-background-image"]
          : ""}
      `}
      style={
        { textAlign: headerAlign }
      }
    >
      {subTitle}
    </span>
  );
};

export default SubTitle;