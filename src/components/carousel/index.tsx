import type { JSX } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { PiArrowLeftThin } from "react-icons/pi";
import { PiArrowRightThin } from "react-icons/pi";

import { mockData } from "@/mock-data/carousel";
import PostThumbnail from "@/components/post-thumbnail";

import styles from "./index.module.scss";

const Carousel = (): JSX.Element => {
  const carouselRef = useRef<HTMLUListElement | null>(null);
  const isScrollActive = useRef<boolean>(false);

  const handleClickArrow = (direction: "left" | "right"): void => {
    if (isScrollActive.current) return;
    isScrollActive.current = true;

    const $carousel = carouselRef.current;
    if (!$carousel) return;

    const post = $carousel.firstElementChild as HTMLElement;
    if (!post) return;

    const postWidth = 270;
    const gap = 25;
    const scrollAmount = postWidth + gap;

    $carousel.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    setTimeout(() => {
      isScrollActive.current = false;
    }, 300);
  };

  return (
    <article ref={carouselRef} className={styles["carousel-component"]}>
      <ul className={styles["post-box"]}>
        {mockData.map((postData: any, index: number) => (
          <li key={index} className={styles["post"]}>
            <Link to="/">
              <PostThumbnail postData={postData} />
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles["scroll-button-box"]}>
        <button
          type="button"
          onClick={() => {
            handleClickArrow("left");
          }}
          className={styles["scroll-button"]}
        >
          <PiArrowLeftThin size={80} color="#666666" />
        </button>
        <button
          type="button"
          onClick={() => {
            handleClickArrow("right");
          }}
          className={styles["scroll-button"]}
        >
          <PiArrowRightThin size={80} color="#666666" />
        </button>
      </div>
    </article>
  );
};

export default Carousel