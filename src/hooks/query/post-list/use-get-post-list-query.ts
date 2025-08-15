import { useQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import queryKey from "@/queryKey";

const queryFn = async (): Promise<any> => {
  const response = await instance.get("/post-list");

  return response.data;
};

const useGetPostListQuery = () => {
  return useQuery({
    queryKey: queryKey.postList,
    queryFn,
    gcTime: Infinity,
    staleTime: 10 * 6 * 1000
  });
};

export default useGetPostListQuery;