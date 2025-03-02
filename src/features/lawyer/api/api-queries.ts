import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getLawyerDetail,
  getLawyers,
  getMyBids,
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

export const useGetLawyerDetail = (id: number) => {
  return useQuery({
    queryKey: ["getLawyerDetail"],
    queryFn: () => getLawyerDetail(id),
  });
};

export const useGetMyBids = () => {
  return useQuery({
    queryKey: ["getMyBids"],
    queryFn: getMyBids,
  });
};

export const useLawyerUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: lawyerUpdateProfile,
    onSuccess: () => {
      dialogClose();
      queryClient.invalidateQueries(["getLawyerDetail"]);
      toast.success("Profile updated successfully");
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};
