import type { JSX } from "react";

import Carousel from "@/components/carousel";

import styles from "./index.module.scss";

const MainPage = (): JSX.Element => {
  return (
    <section className={styles["main-page-component"]}>
      <Carousel />
    </section>
  );
};

export default MainPage;
