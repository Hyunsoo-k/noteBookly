import type { JSX } from "react";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./index.module.scss";

const CreateOrEditPageHeader = (): JSX.Element => {
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const $header = headerRef.current;
    if (!$header) return;

    const updateHeaderShadow = () => {
      const isScrollTop = window.scrollY === 0;

      if (isScrollTop) {
        $header.style.boxShadow = "none";
      } else {
        $header.style.boxShadow = "0 5px 5px #dddddd";
      }
    };

    window.addEventListener("scroll", updateHeaderShadow);

    return () => { window.removeEventListener("scroll", updateHeaderShadow); }
  }, []);

  return (
    <header
      ref={headerRef}
      className={styles["create-or-edit-page-header-component"]}
    >
      <h1 className={styles["banner"]}>
        <Link to="/">noteBookly</Link>
      </h1>
      <button className={styles["create-post-button"]}>
        저장
      </button>
    </header>
  );
};

export default CreateOrEditPageHeader;