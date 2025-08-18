import type { JSX } from "react";
import { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { PiMagnifyingGlassLight } from "react-icons/pi";

import useSearchingModal from "@/hooks/searching-modal/use-searching-modal";

import styles from "./index.module.scss";

const MainPageHeader = (): JSX.Element | null => {
  const location = useLocation();
  const isCreateOrEditPage =
    location.pathname === "/create-post" ||
    location.pathname.startsWith("/edit-post");
  const { setIsOpen: setIsSearchModalOpen } = useSearchingModal();
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const $header = headerRef.current;
    if (!$header) return;

    const updateHeaderShadow = () => {
      const isScrollTop = window.scrollY === 0;
      $header.style.boxShadow = isScrollTop
        ? "none"
        : "0 5px 5px #dddddd";
    };
    window.addEventListener("scroll", updateHeaderShadow);

    return () => { window.removeEventListener("scroll", updateHeaderShadow); };
  }, []);

  if (isCreateOrEditPage) return null;

  return (
    <header ref={headerRef} className={styles["main-page-header-component"]}>
      <div className={styles["content"]}>
        <h1 className={styles["banner"]}>
          <Link to="/">
            noteBookly
          </Link>
        </h1>
        <div className={styles["tool-box"]}>
          <Link to="/create-post">
            글쓰기
          </Link>
          <PiMagnifyingGlassLight
            size={25}
            onClick={(e) => {
              e.stopPropagation();
              setIsSearchModalOpen(true);
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default MainPageHeader;
