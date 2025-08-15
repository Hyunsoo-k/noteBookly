import type { JSX } from "react";

import CarouselBox from "@/components/carousel/carousel-box";

import styles from "./index.module.scss";

const MainPage = (): JSX.Element => {
  return (
    <section className={styles["main-page-component"]}>
      <CarouselBox />
    </section>
  );
};

export default MainPage;
