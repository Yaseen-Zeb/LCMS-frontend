import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDeleteFeedback, getFeedbacks } from "./api-services";
import { IApiBaseResponse } from "@/types";
import toast from "react-hot-toast";

export const useGetFeedbacks = () => {
  return useQuery({
    queryKey: ["getFeedbacks"],
    queryFn: getFeedbacks,
  });
};

export const useDeleteFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getDeleteFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries(["getFeedbacks"]);
      toast.success("Deleted successfully");
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};
