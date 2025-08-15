import type { JSX } from "react";

import styles from "./index.module.scss";

interface Props {
  title: string;
  thumbnailUrl: string;
  headerAlign: "left" | "center";
};

const Title = ({
  title,
  thumbnailUrl,
  headerAlign
}: Props): JSX.Element => {
  return (
    <h1
      className={`
        ${styles["title-component"]} 
        ${thumbnailUrl ? styles["--active-background-image"] : ""}
      `}
      style={
        { textAlign: headerAlign }
      }
    >
      {title}
    </h1>
  );
};

export default Title;