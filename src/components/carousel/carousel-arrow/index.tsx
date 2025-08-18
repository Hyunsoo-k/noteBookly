import type { JSX, RefObject } from "react";
import { useRef } from "react";
import { PiArrowLeftThin } from "react-icons/pi";
import { PiArrowRightThin } from "react-icons/pi";

import styles from "./index.module.scss";

interface Props {
  carouselArticleRef: RefObject<HTMLUListElement | null>;
  direction: "left" | "right";
};

const CarouselArrow = ({ carouselArticleRef, direction }: Props): JSX.Element => {
  const ArrowImage  = direction === "left"
    ? PiArrowLeftThin
    : PiArrowRightThin
  const isScrollActive = useRef<boolean>(false);

  const handleClickArrow = (direction: "left" | "right"): void => {
    if (isScrollActive.current) return;
    isScrollActive.current = true;

    const $carouselArticle = carouselArticleRef.current;
    if (!$carouselArticle) return;

    const post = $carouselArticle.firstElementChild as HTMLElement;
    if (!post) return;

    const postWidth = 270;
    const gap = 25;
    const scrollAmount = (postWidth + gap) * 4;

    $carouselArticle.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    setTimeout(() => {
      isScrollActive.current = false;
    }, 300);
  };

  return (
    <button
      type="button"
      onClick={() => { handleClickArrow(direction); }}
      className={styles["carousel-arrow"]}
    >
      <ArrowImage size={80} color="#666666" />
    </button>
  );
};

export default CarouselArrow;