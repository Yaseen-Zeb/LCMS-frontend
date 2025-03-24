import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptBid, clientUpdateProfile, getClientProfile, updateBidStatus } from "./api-services";
import { IApiBaseResponse } from "@/types";
import { dialogClose } from "@/components/ui/dialog";
import toast from "react-hot-toast";

export const useGetClientProfile = (id: number) => {
  return useQuery({
    queryKey: ["getClientProfile", id],
    queryFn: () => getClientProfile(id),
  });
};

export const useClientUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clientUpdateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["getClientProfile"]);
      toast.success("Profile updated successfully");
      dialogClose();
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateBidStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBidStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["getClientProfile"]);
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};


export const useAcceptBid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:  acceptBid,
    onSuccess: () => {
      queryClient.invalidateQueries(["getClientProfile"]);
      toast.success("Bid accepted successfully");
      dialogClose();
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};
