import type { JSX } from "react";

import CarouselArticle from "@/components/carousel/carousel-article";

import styles from "./index.module.scss";

const MainPage = (): JSX.Element => {
  return (
    <section className={styles["main-page-component"]}>
      <CarouselArticle />
    </section>
  );
};

export default MainPage;
