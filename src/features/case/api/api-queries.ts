import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IApiBaseResponse } from "@/types";
import { dialogClose } from "@/components/ui/dialog";
import { addCase, getCaseDetail, getCases, getMyCases } from "./api-services";

export const useGetCases = () => {
  return useQuery({
    queryKey: ["getCases"],
    queryFn: getCases,
  });
};

export const useGetCaseDetail = (id:number) => {
  return useQuery({
    queryKey: ["getCaseDetail"],
    queryFn: ()=>getCaseDetail(id),
  });
};

export const useGetMyCases = () => {
  return useQuery({
    queryKey: ["getMyCases"],
    queryFn: getMyCases,
  });
};

export const useAddCaseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCase,
    onSuccess: () => {
      queryClient.invalidateQueries(["getMyCases"]);
      queryClient.invalidateQueries(["getCases"]);
      dialogClose();
      toast.success("Case posted successfully");
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};
