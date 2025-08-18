import type { JSX } from "react";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";

import useGetPostQuery from "@/hooks/query/post/use-get-post-query";
import PostHeader from "@/components/post/post-header/post-header";
import Content from "@/components/post/content";

import styles from "./index.module.scss";

const PostPage = (): JSX.Element => {
  const { _id } = useParams();
  const { data: queryData } = useGetPostQuery(_id as string);

  console.log(queryData);

  if (!queryData) {
    return (
      <div className={styles["post-page-component--loading"]}>
        <PulseLoader
          size={15}
          margin={10}
          color="rgb(9, 204, 178)"
        />
      </div>
    )
  }

  return (
    <div className={styles["post-page-component"]}>
      <PostHeader
        writer={queryData.writer}
        createdAt={queryData.createdAt}
        title={queryData.title}
        subTitle={queryData.subTitle}
        thumbnailUrl={queryData.thumbnailUrl}
        headerAlign={queryData.headerAlign}
      />
      <Content content={queryData.content} />
    </div>
  );
};

export default PostPage;