import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteForEveryOne,
  deleteForMe,
  getMessages,
  getPartners,
  sendMessage,
  submitReview,
} from "./api-services";
import { IApiBaseResponse } from "@/types";
import toast from "react-hot-toast";

export const useGetPartners = () => {
  return useQuery({
    queryKey: ["getPartners"],
    queryFn: getPartners,
    refetchInterval: 15000,
  });
};

export const useGetMessages = (id: number, options: {}) => {
  return useQuery({
    queryKey: ["getMessages", id],
    queryFn: () => getMessages(id),
    refetchInterval: 5000,
    ...options,
  });
};


export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries(["getMessages"]);
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteForMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteForMe,
    onSuccess: () => {
      queryClient.invalidateQueries(["getMessages"]);
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteForEveryOne = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteForEveryOne,
    onSuccess: () => {
      queryClient.invalidateQueries(["getMessages"]);
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};

export const useSubmitReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["getMessages"]);
    },
    onError: (error: IApiBaseResponse) => {
      toast.error(error.message);
    },
  });
};