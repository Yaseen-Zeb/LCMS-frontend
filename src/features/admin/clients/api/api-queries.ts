import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changeStatus, getClients } from "./api-services";
import toast from "react-hot-toast";
import { IApiBaseResponse } from "@/types";

export const useGetClient = () => {
  return useQuery({
    queryKey: ["getClients"],
    queryFn: getClients,
  });
};

export const useChangeStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["getClients"]);
      toast.success("Status changed successfully");
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};
