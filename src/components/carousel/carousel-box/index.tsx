import type { JSX, Ref } from "react";
import type { ResponsePost } from "@/types/query";
import CarouselItem from "@/components/carousel/carousel-item";

import styles from "./index.module.scss";

interface Props {
  queryData: any;
  ref: Ref<HTMLLIElement>;
};

const CarouselBox = ({ queryData, ref }: Props): JSX.Element => {

  return (
    <ul className={styles["carousel-box-component"]}>
      {queryData?.pages?.map((page: any, pagesIndex: number) => (
        page.postList.map((post: ResponsePost, postListIndex: number) => (
          <li
            key={post._id}
            className={styles["carousel-item-wrapper"]}
            ref={
              pagesIndex === queryData.pages.length - 1 &&
              postListIndex === page.postList.length - 1
                ? ref
                : null
            }
          >
            <CarouselItem post={post} />
          </li>
        ))
      ))}
    </ul>
  );
};

export default CarouselBox;
