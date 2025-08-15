import type { JSX } from "react";
import { Link } from "react-router-dom";
import { BsFeather } from "react-icons/bs";

import type { ResponsePost } from "@/types/query";

import styles from "./index.module.scss";

interface Props {
  post: ResponsePost;
};

const CarouselItem = ({ post }: Props): JSX.Element => {
  const {
    _id,
    thumbnailUrl,
    writer,
    title,
    content
  } = post;

  return (
    <Link
      to={`/post/${_id}`}
      className={styles["carousel-item-component"]}
    >
      {thumbnailUrl && (
        <div className={styles["thumbnail-wrapper"]}>
          <img src={thumbnailUrl} className={styles["thumbnail"]} />
        </div>
      )}
      <div className={styles["title-wrapper"]}>
        <h2 className={styles["title"]}>
          {title}
        </h2>
      </div>
      <div className={styles["content-wrapper"]}>
        {content}
      </div>
      <div className={styles["creator-wrapper"]}>
        <BsFeather size={14} color="#959595" />
        {writer}
      </div>
    </Link>
  );
};

export default CarouselItem;
