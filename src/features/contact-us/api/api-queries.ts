import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IApiBaseResponse } from "@/types";
import { addFeedback } from "./api-services";
export const useAddFeedback = () => {
  return useMutation({
    mutationFn: addFeedback,
    onSuccess: () => {
      toast.success("Messgae sent successfully");
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};
