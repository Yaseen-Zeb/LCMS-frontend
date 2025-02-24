import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IApiBaseResponse } from "@/types";
import { dialogClose } from "@/components/ui/dialog";
import { addCase, getCases } from "./api-services";


export const useGetCases = () => {
  return useQuery({
    queryKey: ["getCases"],
    queryFn: getCases,
    
  });
};

export const useGetMyCases = () => {
  return useQuery({
    queryKey: ["getMyCases"],
    queryFn: getCases,
    
  });
};

export const useAddCaseMutation = () => {
  return useMutation({
    mutationFn: addCase,
    onSuccess: () => {
      dialogClose();
      toast.success("Case posted successfully");
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};
