import { dialogClose } from "@/components/ui/dialog";
import { IApiBaseResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProfileImage } from "./api-services";

export const useUpdateProfileImage = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: updateProfileImage,
      onSuccess: () => {
        dialogClose();
        queryClient.invalidateQueries();
        toast.success("Profile picture updated successfully");
      },
      onError: (error: IApiBaseResponse) => {
        toast.error(error.message);
      },
    });
  };