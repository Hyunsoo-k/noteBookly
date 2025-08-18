import type { JSX, MouseEvent } from "react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useForm, type FieldErrors } from "react-hook-form";
import { SlArrowDown } from "react-icons/sl";
import { PiMagnifyingGlassLight } from "react-icons/pi";

import useSearchingModal from "@/hooks/searching-modal/use-searching-modal";

import styles from "./index.module.scss";

const SearchModal = (): JSX.Element | null => {
  const navigate = useNavigate();
  const { setIsOpen } = useSearchingModal();
  const [selectedOption, setSelectedOption]
    = useState<"제목 + 내용" | "작성자">("제목 + 내용");
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  const searchingModalRef = useRef<HTMLFormElement | null>(null);
  const optionBoxRef = useRef<HTMLDivElement | null>(null);
  const { handleSubmit, register } = useForm({ mode: "onChange" });

  /**
   * 모달 외부 백드롭 클릭 시 모달 비활성화
   */
  const handleClickModalOutSide = (e: any): void => {
    const $target = e.target as HTMLElement;
    if (!searchingModalRef.current) return;
    if (!searchingModalRef.current.contains($target)) setIsOpen(false);
  };

  /**
   * 쿼리옵션이 열려있을 때, 쿼리박스 외부 클릭 시 쿼리옵션 닫기
   */
  const handleClickOptionBoxOutSide = (e: any) => {
    const $target = e.target as HTMLElement;
    if (!optionBoxRef.current) return;
    if (!optionBoxRef.current.contains($target)) setIsOptionOpen(false);
  };

  /**
   * 쿼리옵션 클릭 시 쿼리옵션 상태값 변경, 쿼리옵션 닫기
   */
  const handleClickOption = (e: MouseEvent<HTMLLIElement>): void => {
    const value = e.currentTarget.textContent as "제목 + 내용" | "작성자";
    setSelectedOption(value);
    setIsOptionOpen(false);
    e.stopPropagation();
  };

  const submits = {
    onSubmit: (watch: Record<string, string>) => {
      const option = selectedOption;
      const query = watch.query;
      const urlMap = {
        "제목 + 내용": "titleAndContent",
        "작성자": "writer"
      };
      const queryString = `?select=${urlMap[option]}&query=${query} `;
      navigate(`/${queryString}`);
      setIsOpen(false);
    },
    onError: (error: FieldErrors<Record<string, string>>): void => {
      console.log(`submit error: ${error}`);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("click", handleClickModalOutSide);
    window.addEventListener("click", handleClickOptionBoxOutSide);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("click", handleClickModalOutSide);
      window.removeEventListener("click", handleClickOptionBoxOutSide);
    };
  }, []);

  return createPortal(
    <div className={styles["back-drop"]}>
      <form
        ref={searchingModalRef}
        onSubmit={handleSubmit(submits.onSubmit, submits.onError)}
        className={styles["search-modal-component"]}
      >
        <div ref={optionBoxRef} className={styles["option-box"]}>
          <div className={styles["selected-option"]}>
            <span>{selectedOption}</span>
            <button>
              <SlArrowDown
                size={15}
                onClick={() => {
                  setIsOptionOpen((prev: boolean) => !prev);
                }}
              />
            </button>
          </div>
          {isOptionOpen && (
            <ul className={styles["option-list"]}>
              <li onClick={handleClickOption}>제목+내용</li>
              <li onClick={handleClickOption}>작성자</li>
            </ul>
          )}
        </div>
        <div className={styles["input-box"]}>
          <input
            placeholder="검색어를 입력해 주세요."
            autoComplete="off"
            {...register("query", {
              required: "검색어를 입력해 주세요",
              minLength: { value: 2, message: "2자 이상 입력해 주세요." },
              maxLength: { value: 10, message: "10자 이하로 입력해 주세요." }
            })}
          />
          <button>
            <PiMagnifyingGlassLight size={20} />
          </button>
        </div>
      </form>
    </div>,
    document.getElementById("root") as HTMLDivElement
  );
};

export default SearchModal;
