import type { JSX, RefObject } from "react";

import CarouselArrow from "../carousel-arrow";

import styles from "./index.module.scss";

interface Props {
  carouselArticleRef: RefObject<HTMLUListElement | null>;
};

const CarouselArrowBox = ({ carouselArticleRef }: Props): JSX.Element => {

  return (
    <div className={styles["carousel-arrow-box-component"]}>
      <CarouselArrow carouselArticleRef={carouselArticleRef} direction="left" />
      <CarouselArrow carouselArticleRef={carouselArticleRef} direction="right" />
    </div>
  );
};

export default CarouselArrowBox;