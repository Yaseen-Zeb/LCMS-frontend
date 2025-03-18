import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signIn } from "./api-services";
import { IApiBaseResponse } from "@/types";
import { useAuthContext } from "@/providers/auth-provider";
import { dialogClose } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

export const useSignInMutation = () => {
  const navigate = useNavigate();
  const { initializeAuth } = useAuthContext();
  return useMutation({
    mutationFn: signIn,
    onSuccess: (response) => {
      localStorage.setItem("token", response.data.token);
      initializeAuth();
      dialogClose();
      navigate("/admin/dashboard")
      toast.success("Login successfully");
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};
