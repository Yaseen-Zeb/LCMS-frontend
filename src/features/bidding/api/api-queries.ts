import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IApiBaseResponse } from "@/types";
import { dialogClose } from "@/components/ui/dialog";
import { bid } from "./api-services";

export const useBidMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bid,
    onSuccess: () => {
      queryClient.invalidateQueries(["getCases"]);
      queryClient.invalidateQueries(["getClientProfile"]);
      queryClient.invalidateQueries(["getCaseDetail"]);
      dialogClose();
      toast.success("Bid submitted successfully");
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};
