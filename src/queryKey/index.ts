const queryKey = {
  postList: ["postList"],
  post: (_id: string) => ["post", _id]
};

export default queryKey;