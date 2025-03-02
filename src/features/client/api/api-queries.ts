import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clientUpdateProfile, getClientDetail, getProfileDetail } from "./api-services";
import { IApiBaseResponse } from "@/types";
import { dialogClose } from "@/components/ui/dialog";
import toast from "react-hot-toast";

export const useGetClientDetail = (id: number) => {
  return useQuery({
    queryKey: ["getClientDetail"],
    queryFn: () => getClientDetail(id),
  });
};

export const useGetProfileDetail = () => {
  return useQuery({
    queryKey: ["getProfileDetail"],
    queryFn: getProfileDetail
  });
};

export const useclientUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clientUpdateProfile,
    onSuccess: () => {
      dialogClose();
      queryClient.invalidateQueries(["getProfileDetail"]);
      toast.success("Profile updated successfully");
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};
