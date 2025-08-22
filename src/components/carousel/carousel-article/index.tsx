import type { JSX } from "react";
import { useEffect, useRef } from "react";
import { PulseLoader } from "react-spinners";
import { useLocation } from "react-router-dom";

import useGetPostListQuery from "@/hooks/query/post-list/use-get-post-list-query";
import CarouselBox from "@/components/carousel/carousel-box";
import CarouselArrowBox from "@/components/carousel/carousel-arrow-box";

import styles from "./index.module.scss";

const CarouselArticle = (): JSX.Element => {
  const queryString = useLocation().search;
  const {
    data: queryData,
    isLoading,
    hasNextPage,
    fetchNextPage
  } = useGetPostListQuery(queryString);

  const carouselBoxWrapperRef = useRef<HTMLDivElement | null>(null);
  const lastPostRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && hasNextPage && fetchNextPage(),
      { root: null, threshold: 0.5 }
    );
    lastPostRef?.current && io.observe(lastPostRef.current);

    return () => { lastPostRef?.current && io.unobserve(lastPostRef.current); };
  }, [queryData]);

  if (isLoading) {
    return (
      <article className={styles["carousel-article-component--loading"]}>
        <PulseLoader
          size={15}
          margin={10}
          color="rgb(9, 204, 178)"
        />
      </article>
    );
  };

  return (
    <article className={styles["carousel-article-component"]}>
      <div ref={carouselBoxWrapperRef} className={styles["carousel-box-wrapper"]}>
        <CarouselBox
          queryData={queryData}
          ref={lastPostRef}
        />
      </div>
      <CarouselArrowBox carouselArticleRef={carouselBoxWrapperRef} />
    </article>
  );
};

export default CarouselArticle;