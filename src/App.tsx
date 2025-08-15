import { type JSX } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MainPageHeader from "@/components/header/main-page-header";
import MainPage from "@/components/pages/main";
import PostPage from "./components/pages/post-page";
import CreatePostPage from "@/components/pages/create-post-page/inex";
import Footer from "@/components/footer";

import styles from "./App.module.scss";

const queryClient = new QueryClient();

const App = (): JSX.Element => {

  return (
    <div className={styles["app-component"]}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <MainPageHeader />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/post/:_id" element={<PostPage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
          </Routes>
        </QueryClientProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
