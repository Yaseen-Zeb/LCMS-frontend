import { IApiBaseResponse } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getLawyerReviews, submitReview } from "./api-services";
import { dialogClose } from "@/components/ui/dialog";

export const useSubmitReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["getMessages"]);
      toast.success("Congrates case completed successfully");
      dialogClose();
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};

export const useGetLawyerReviews = (id: number) => {
  return useQuery({
    queryKey: ["getLawyerReviews", id],
    queryFn: () => getLawyerReviews(id),
  });
};
