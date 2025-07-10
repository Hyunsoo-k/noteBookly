import type { JSX } from "react";
import { BsFeather } from "react-icons/bs";

import styles from "./index.module.scss";

interface Props {
  postData: any;
};

const PostThumbnail = ({ postData }: Props): JSX.Element => {

  return (
    <div className={styles["post-thumbnail-component"]}>
      {postData.thumbnailImageSrc && (
        <div className={styles["thumbnail-wrapper"]}>
          <img
            src={postData.thumbnailImageSrc}
            className={styles["thumbnail"]}
          />
        </div>
      )}
      <div className={styles["title-wrapper"]}>
        <h2 className={styles["title"]}>
          {postData.title}
        </h2>
      </div>
      <div className={styles["content-wrapper"]}>
        {postData.content}
      </div>
      <div className={styles["creator-wrapper"]}>
        <BsFeather size={14} color="#959595" />
        찡얼찡얼
      </div>
    </div>
  );
};

export default PostThumbnail;