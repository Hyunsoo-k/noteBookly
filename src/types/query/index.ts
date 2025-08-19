interface RequestPost {
  writer: string;
  password: string;
  title: string;
  subTitle: string | null;
  thumbnailUrl: string | null;
  headerAlign: "left" | "center";
  content: string;
};

interface ResponsePost {
  _id: string;
  writer: string;
  title: string;
  subTitle: string | null;
  thumbnailUrl: string | null;
  headerAlign: "left" | "center";
  content: string;
  createdAt: string;
  updatedAt: string;
  isEditd: boolean;
  __v: number;
};

type ResponsePostList = ResponsePost[];

export type { RequestPost, ResponsePost, ResponsePostList };