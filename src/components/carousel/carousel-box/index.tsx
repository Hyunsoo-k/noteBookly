import type { JSX } from "react";
import { useRef } from "react";

import useGetPostListQuery from "@/hooks/query/post-list/use-get-post-list-query";
import type { ResponsePost } from "@/types/query";
import CarouselItem from "@/components/carousel/carousel-item";
import CarouselArrow from "@/components/carousel/carousel-arrow";

import styles from "./index.module.scss";

const CarouselBox = (): JSX.Element => {
  const { data: queryData } = useGetPostListQuery();

  const carouselRef = useRef<HTMLUListElement | null>(null);

  return (
    <article ref={carouselRef} className={styles["carousel-box-component"]}>
      <ul className={styles["carousel-item-box"]}>
        {queryData?.postList.map((post: ResponsePost, index: number) => (
          <li key={index} className={styles["carousel-item-wrapper"]}>
            <CarouselItem post={post} />
          </li>
        ))}
      </ul>
      <div className={styles["carousel-arrow-box"]}>
        <CarouselArrow carouselRef={carouselRef} direction="left" />
        <CarouselArrow carouselRef={carouselRef} direction="right" />
      </div>
    </article>
  );
};

export default CarouselBox;
