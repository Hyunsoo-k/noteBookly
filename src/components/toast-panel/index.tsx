import type { JSX } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import useToastPanel from "@/hooks/toast-panel/use-toast-panel";

import styles from "./index.module.scss";

const ToastPanel = (): JSX.Element => {
  const { message, isToastPanelActive, resetToastPanelStore } = useToastPanel();

  useEffect(() => {
    setTimeout(() => {
      resetToastPanelStore();
    }, 3000)
  }, [isToastPanelActive]);

  return (
    <>
      {createPortal(
        <div
          className={`
          ${styles["toast-panel-component"]}
          ${isToastPanelActive ? styles["--is-active"] : ""}
        `}
      >
        <span className={styles["message"]}>{message}</span>
      </div>,
      document.getElementById("root") as HTMLDivElement
      )}
    </>
  );
};

export default ToastPanel;