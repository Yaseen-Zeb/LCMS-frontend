import { dialogClose } from "@/components/ui/dialog";
import { IApiBaseResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProfileImage } from "./api-services";
import { useAuthContext } from "@/providers/auth-provider";

export const useUpdateProfileImage = () => {
    const queryClient = useQueryClient();
  const {initializeAuth} = useAuthContext()
    return useMutation({
      mutationFn: updateProfileImage,
      onSuccess: (res) => {
        localStorage.setItem("token",res.data.token)
        initializeAuth()
        dialogClose();
        queryClient.invalidateQueries();
        toast.success("Profile picture updated successfully");
      },
      onError: (error: IApiBaseResponse) => {
        toast.error(error.message);
      },
    });
  };