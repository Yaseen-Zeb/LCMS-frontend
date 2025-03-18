import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clientUpdateProfile, getClientProfile } from "./api-services";
import { IApiBaseResponse } from "@/types";
import { dialogClose } from "@/components/ui/dialog";
import toast from "react-hot-toast";

export const useGetClientProfile = (id: number) => {
  return useQuery({
    queryKey: ["getClientProfile",id],
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
