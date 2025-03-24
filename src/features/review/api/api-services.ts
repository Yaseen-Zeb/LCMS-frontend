import { api } from "@/lib/api-client";
import { IApiBaseResponse, IReview } from "@/types";

export const submitReview = (data: {
  lawyer_id: number;
  case_id: number;
  message: string;
}): Promise<IApiBaseResponse> => {
  return api.post(`/review/submit`, data);
};


export const getLawyerReviews = (id:number): Promise<{
  data: IReview[];
}> => {
  return api.get(`/review/lawyer/${id}`);
};