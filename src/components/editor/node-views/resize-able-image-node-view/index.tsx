import type { JSX } from "react";
import React, { useState, useEffect, useRef } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { TfiArrow } from "react-icons/tfi";

import styles from "./index.module.scss";

interface Props {
  node: { attrs: { src: string; alt: string; width: string; height: string } };
  updateAttributes: (attrs: Record<string, any>) => void;
};

const ResizeAbleImageNodeView = ({ node, updateAttributes }: Props): JSX.Element => {
  const { src, alt, width, height } = node.attrs;
  const [isResizeControllerActive, setIsResizeControllerActive] = useState<boolean>(false);
  const [isResizing, setIsResizing] = useState(false);
  const nodeViewWrapperRef = useRef<HTMLDivElement | null>(null);
  const startX = useRef<number>(0);
  const startWidth = useRef<number>(0);

  /**
   * 이미지 리사이즈 컨트롤러 마우스 다운 중 이미지 리사이즈 기능
   */
  const handleMouseDownResizeController = (e: React.MouseEvent) => {
    if (!isResizeControllerActive) return;
    setIsResizing(true);
    startX.current = e.clientX;
    startWidth.current = parseFloat(width);
    e.preventDefault();
  };

  /**
   * handleMouseDownResizeController가 동작중일 때, 마우스를 움직여서 이미지 크기를 변경
   */
  const handleMouseMoveControl = (e: MouseEvent) => {
    if (!isResizing) return;
    const newWidth = startWidth.current + (e.clientX - startX.current);
    updateAttributes({ width: `${newWidth}px` });
  };

  /**
   * mouseup 이벤트 발생 시, 이미지 리사이징 상태 off
   */
  const handleMouseUpControl = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMoveControl);
      document.addEventListener("mouseup", handleMouseUpControl);
    } else {
      document.removeEventListener("mousemove", handleMouseMoveControl);
      document.removeEventListener("mouseup", handleMouseUpControl);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMoveControl);
      document.removeEventListener("mouseup", handleMouseUpControl);
    };
  }, [isResizing]);

  /**
   * mousedown 이벤트 발생 시, 노드뷰 외부일 경우 isResizeControllerActive 상태값 비활성화
   */
  const handleMousedownOutSideNodeViewWrapper = (e: MouseEvent) => {
    const $target = e.target;
    if (!nodeViewWrapperRef?.current?.contains($target as HTMLElement)) {
      setIsResizeControllerActive(false);
    } 
  };

  /**
   * handleMousedownOutSide를 document 이벤트에 등록
   */
  useEffect(() => {
  document.addEventListener("mousedown", handleMousedownOutSideNodeViewWrapper);

  return () => {
    document.removeEventListener("mousedown", handleMousedownOutSideNodeViewWrapper);
  };
}, []);

  return (
    <NodeViewWrapper
      as="div"
      ref={nodeViewWrapperRef}
      className={styles["node-view-wrapper"]}
    >
      <img
        src={src}
        alt={alt}
        onClick={() => { setIsResizeControllerActive((prev: boolean) => !prev); } }
        style={{
          width,
          height,
          border: isResizeControllerActive ? "2px dashed black" : "none"
        }}
      />
      {isResizeControllerActive && (
        <div
          onMouseDown={handleMouseDownResizeController}
          className={styles["resize-controller-wrapper"]}
        >
          <TfiArrow
            size={18}
            color="black"
            className={styles["resize-controller"]}
          />
        </div>
      )}
    </NodeViewWrapper>
  );
};

export default ResizeAbleImageNodeView;
