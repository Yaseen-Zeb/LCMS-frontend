import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changeStatus, getLawyers } from "./api-services";
import toast from "react-hot-toast";
import { IApiBaseResponse } from "@/types";

export const useGetLawyers = () => {
  return useQuery({
    queryKey: ["getLawyers"],
    queryFn: getLawyers,
  });
};

export const useChangeStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["getLawyers"]);
      toast.success("Status changed successfully");
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};
