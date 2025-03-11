import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IApiBaseResponse } from "@/types";
import { dialogClose } from "@/components/ui/dialog";
import {
  addCase,
  deleteCase,
  getCaseDetail,
  getCases,
  getMyCases,
  updateCase,
} from "./api-services";

export const useGetCases = () => {
  return useQuery({
    queryKey: ["getCases"],
    queryFn: getCases,
  });
};

export const useGetCaseDetail = (id: number) => {
  return useQuery({
    queryKey: ["getCaseDetail", id],
    queryFn: () => getCaseDetail(id),
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
      queryClient.invalidateQueries(["getClientProfile"]);
      dialogClose();
      toast.success("Case posted successfully");
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateCaseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCase,
    onSuccess: () => {
      queryClient.invalidateQueries(["getMyCases"]);
      queryClient.invalidateQueries(["getCases"]);
      queryClient.invalidateQueries(["getClientProfile"]);
      dialogClose();
      toast.success("Case updated successfully");
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteCase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCase,
    onSuccess() {
      toast.success("Case deleted successfully");
      queryClient.invalidateQueries(["getMyCases"]);
      queryClient.invalidateQueries(["getCases"]);
      queryClient.invalidateQueries(["getClientProfile"]);
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};
