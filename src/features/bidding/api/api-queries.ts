import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IApiBaseResponse } from "@/types";
import { dialogClose } from "@/components/ui/dialog";
import { bid } from "./api-services";

export const useBidMutation = () => {
  return useMutation({
    mutationFn: bid,
    onSuccess: () => {
      dialogClose();
      toast.success("Bid submitted successfully");
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};

