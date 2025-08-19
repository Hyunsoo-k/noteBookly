import type { JSX } from "react";

import Title from "@/components/post/post-header/title";
import SubTitle from "@/components/post/post-header/sub-title";
import PostInfoBox from "@/components/post/post-header/post-info-box";

import styles from "./index.module.scss";

interface Props {
  writer: string;
  createdAt: string;
  title: string;
  subTitle: string | null;
  thumbnailUrl: string | null;
  headerAlign: "left" | "center";
}

const PostHeader = ({
  writer,
  createdAt,
  title,
  subTitle,
  thumbnailUrl,
  headerAlign
}: Props): JSX.Element => {

  return (
    <div
      spellCheck="false"
      className={styles["post-header-component"]}
      style={{
        backgroundImage: `${
          thumbnailUrl
            ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${thumbnailUrl})`
            : "none"
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
      <PostInfoBox
        writer={writer}
        createdAt={createdAt}
        thumbnailUrl={thumbnailUrl}
        headerAlign={headerAlign}
      />
    </div>
  );
};

export default PostHeader;
