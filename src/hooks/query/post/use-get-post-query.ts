import { useQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import type { ResponsePost } from "@/types/query";
import queryKey from "@/queryKey";

const queryFn = async (_id: string): Promise<ResponsePost> => {
  const response = await instance.get(`/post/${_id}`);

  return response.data;
};

const useGetPostQuery = (_id: string) => {
  return useQuery({
    queryKey: queryKey.post(_id),
    queryFn: () => queryFn(_id),
    gcTime: Infinity,
    staleTime: 10 * 6 * 1000
  });
};

export default useGetPostQuery;