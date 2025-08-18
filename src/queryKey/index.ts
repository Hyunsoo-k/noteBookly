const queryKey = {
  postList: (queryString: string) => ["postList", queryString],
  post: (_id: string) => ["post", _id]
};

export default queryKey;