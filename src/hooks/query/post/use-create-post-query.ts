import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { RequestPost } from "@/types/query";
import queryKey from "@/queryKey";
import { instance } from "@/axios";

const mutateFn = async (requestBody: RequestPost): Promise<any> => {
  const response = await instance.post(`/post`, requestBody);

  return response.data;
};

const useCreatePostQuery = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestBody: RequestPost) => mutateFn(requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: queryKey.postList("")});
      navigate("/");
    },
    onError: (err: Error) => { console.log("create post error : ", err); }
  })
};

export default useCreatePostQuery;