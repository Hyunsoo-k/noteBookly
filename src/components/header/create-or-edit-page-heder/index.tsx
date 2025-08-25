import type { JSX } from "react";
import { Link } from "react-router-dom";

import styles from "./index.module.scss";

interface Props {
  isPending: boolean;
};

const CreateOrEditPageHeader = ({ isPending }: Props): JSX.Element => {
  return (
    <header className={styles["create-or-edit-page-header-component"]}>
      <h1 className={styles["banner"]}>
        <Link to="/">noteBookly</Link>
      </h1>
      <button
        disabled={isPending}
        className={styles["create-post-button"]}
      >
        저장
      </button>
    </header>
  );
};

export default CreateOrEditPageHeader;