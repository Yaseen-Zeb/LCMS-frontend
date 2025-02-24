import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { clientSignUp, lawyerSignUp, signIn } from "./api-services";
import { IApiBaseResponse } from "@/types";
import { useAuthContext } from "@/providers/auth-provider";
import { dialogClose } from "@/components/ui/dialog";

export const useSignInMutation = () => {
  const { initializeAuth } = useAuthContext();
  return useMutation({
    mutationFn: signIn,
    onSuccess: (response) => {
      localStorage.setItem("token", response.data.token);
      initializeAuth();
      dialogClose();
      toast.success("Login successfully");
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};

export const useClientRegisterMutation = () => {
  const { initializeAuth } = useAuthContext();
  return useMutation({
    mutationFn: clientSignUp,
    onSuccess: (response) => {
      localStorage.setItem("token", response.data.token);
      initializeAuth();
      dialogClose();
      toast.success("Registered successfully");
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};

export const useLawyerRegisterMutation = () => {
  const { initializeAuth } = useAuthContext();
  return useMutation({
    mutationFn: lawyerSignUp,
    onSuccess: (response) => {
      localStorage.setItem("token", response.data.token);
      initializeAuth();
      dialogClose();
      toast.success("Registered successfully");
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};
