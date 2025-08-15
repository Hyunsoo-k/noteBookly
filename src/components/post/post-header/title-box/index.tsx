import type { JSX } from "react";

import styles from "./index.module.scss";
import Title from "../../post-header/title";
import SubTitle from "../../post-header/sub-title";

interface Props {
  title: string;
  subTitle: string;
  thumbnailUrl: string;
  headerAlign: "left" | "center";
};

const TitleBox = ({
  title,
  subTitle,
  thumbnailUrl,
  headerAlign
}: Props): JSX.Element => {
  return (
    <div
      className={styles["title-box-component"]}
        style={{
        backgroundImage: `${
          thumbnailUrl ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${thumbnailUrl})` : "none"
        }`,
      }}
    >
      <Title
        title={title}
        thumbnailUrl={thumbnailUrl}
        headerAlign={headerAlign}
      />
      <SubTitle
        subTitle={subTitle}
        thumbnailUrl={thumbnailUrl}
        headerAlign={headerAlign}
      />
    </div>
  );
};

export default TitleBox;