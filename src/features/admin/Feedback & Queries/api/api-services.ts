import { api } from "@/lib/api-client";
import { IApiBaseResponse, IFeedback } from "@/types";

export const getFeedbacks = (): Promise<{
  data: IFeedback[];
}> => {
  return api.get(`/feedback/list`);
};

export const getDeleteFeedback = (data:{id: number}): Promise<{
  data:IApiBaseResponse
}> => {
  return api.get(`/feedback/delete/${data.id}`);
};
