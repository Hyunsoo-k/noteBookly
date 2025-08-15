import type { JSX } from "react";

import styles from "./index.module.scss";

interface Props {
  content: string;
};

const Content = ({ content }: Props): JSX.Element => {
  return (
    <div
      className={styles["content-component"]}
      dangerouslySetInnerHTML={{
      __html: content
      }}
    ></div>
  );
};

export default Content;