import type { JSX } from "react";
import { SiGithub } from "react-icons/si";

import styles from "./index.module.scss";

const Footer = (): JSX.Element => {
  return (
    <div
      className={styles["footer-component"]}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(/image/crumpled-paper.jpg)`
      }}
    >
      <h2 className={styles["banner"]}>noteBookly</h2>
      <div className={styles["boundary-line"]}></div>
      <div className={styles["introduce-box"]}>
        <span>
          noteBookly는 카카오의 브런치스토리를 참고하여 만든 비영리 개인 프로젝트 입니다.
          <br/>
          본 프로젝트는 수익 창출과 상업적 이용과 무관하며, 학습과 연습, 포트폴리오 제작을 목적으로 합니다.
        </span>
        <a
          href="https://github.com/Hyunsoo-k/noteBookly"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiGithub size={25} color="black"/>
        </a>
      </div>
    </div>
  );
};

export default Footer;