interface RequestPost {
  writer: string;
  password: string;
  thumbnailUrl: string | null;
  title: string;
  subTitle: string | null;
  headerAlign: "left" | "center";
  content: string;
};

interface ResponsePost {
  _id: string;
  __v: number;
  writer: string;
  thumbnailUrl: string | null;
  title: string;
  subTitle: string | null;
  headerAlign: "left" | "center";
  content: string;
  createdAt: string;
  updatedAt: string;
  isEditd: boolean;
};

type ResponsePostList = ResponsePost[];

export type { RequestPost, ResponsePost, ResponsePostList };