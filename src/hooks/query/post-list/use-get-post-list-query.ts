import { useInfiniteQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import queryKey from "@/queryKey";

const queryFn = async (queryString: string, pageParam: string | null): Promise<any> => {
  if (queryString && pageParam) queryString = `${queryString}&cursor=${pageParam}`;
  if (!queryString && pageParam) queryString = `?cursor=${pageParam}`;
  const response = await instance.get(`/post-list${queryString}`);

  return response.data;
};

const useGetPostListQuery = (queryString: string) => {
  return useInfiniteQuery({
    queryKey: queryKey.postList(queryString),
    queryFn: ({ pageParam  = null }) => queryFn(queryString, pageParam),
    getNextPageParam: (lastPagesQuery: any) => {
      const lastPost = lastPagesQuery.postList.at(-1);
      return lastPost?._id ?? null;
    },
    staleTime: 10 * 60 * 1000,
    initialPageParam : null
  });
};

export default useGetPostListQuery;