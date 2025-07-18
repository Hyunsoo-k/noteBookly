import type { JSX } from "react";
import { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { PiMagnifyingGlassLight } from "react-icons/pi";

import styles from "./index.module.scss";

const Header = (): JSX.Element => {
  const location = useLocation();
  const isCreatePostPage = location.pathname === "/create-post";

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
    <header ref={headerRef} className={styles["header-component"]}>
      <div className={styles["content"]}>
        <h1 className={styles["logo"]}>
          <Link to="/">noteBookly</Link>
        </h1>
        {isCreatePostPage ? (
          <button className={styles["create-post-button"]}>
            저장
          </button>
        ) : (
          <div className={styles["active-tool-box"]}>
            <Link to="/create-post">글쓰기</Link>
            <PiMagnifyingGlassLight size={25} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;