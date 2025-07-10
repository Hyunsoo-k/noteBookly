import { type JSX } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "@/components/header";
import MainPage from "@/components/page/main";
import CreatePostPage from "@/components/page/create-post-page/inex";

import styles from "./App.module.scss";

const App = (): JSX.Element => {
  return (
    <div className={styles["app-component"]}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
