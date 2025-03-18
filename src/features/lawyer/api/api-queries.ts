import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getLawyerProfile,
  getLawyers,
  lawyerUpdateProfile,
} from "./api-services";
import { dialogClose } from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { IApiBaseResponse } from "@/types";

export const useGetLawyers = () => {
  return useQuery({
    queryKey: ["getLawyers"],
    queryFn: getLawyers,
  });
};

export const useGetLawyerProfile = (id: number) => {
  return useQuery({
    queryKey: ["getLawyerProfile", id],
    queryFn: () => getLawyerProfile(id),
  });
};

export const useLawyerUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: lawyerUpdateProfile,
    onSuccess: () => {
      dialogClose();
      queryClient.invalidateQueries(["getLawyerProfile"]);
      toast.success("Profile updated successfully");
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};
