import type { JSX } from "react";
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

  if (isCreateOrEditPage) return null;

  return (
    <header className={styles["main-page-header-component"]}>
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
    </header>
  );
};

export default MainPageHeader;
